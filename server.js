/* eslint-env node */
const express = require('express')
const lru = require('lru-cache')
const serveStatic = require('serve-static')
const nextApp = require('next')
const https = require('https')
const compression = require('compression')
const logListener = require('./server/logListener')

const cache = lru({
  max: 1e10,
  length: (entry, key) => entry.length,
})

const PORT = process.env.PORT || 8080
process.env.PORT = PORT

const dev =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV !== 'production'

const DEV_HTTPS =
  dev &&
  process.env.DEV_HTTPS === 'true'

const app = nextApp({ dev })

const handle = app.getRequestHandler()

const server = express()

server.use(compression())
// gzip all requests

// the static assets
server.use(
  '/static/fonts',
  serveStatic('static/fonts', {
    fallthrough: true,
    maxAge: 31536000,
  })
)

server.use(
  '/static',
  serveStatic('static', {
    fallthrough: true,
    maxAge: 86400,
  })
)

const nextAppHandler = pageComponentPath => async (req, res, next, UAIsMobile = false) => {
  const cached = cache.get(req.originalUrl)
  if (cached && req.query.nocache !== 'true' && !dev) {
    res.set('X-cache', 'hit')
    res.send(cached)
    return
  }

  const { basePath } = req.params
  const markup = await app.renderToHTML(
    req,
    res,
    pageComponentPath,
    {
      ...req.query,
      basePath,
    }
  )

  res.send(markup)
}


app.prepare().then(() => {
  server.use('/sw.js',
    serveStatic('.next/sw.js', {
      fallthrough: false,
      maxAge: 86400,
    })
  )

  // the next app handler will
  server.get('/:pathPrimary', nextAppHandler('/index'))
  server.get('/:pathPrimary/:pathSecondary', nextAppHandler('/index'))
  server.get('/:pathPrimary/:pathSecondary/:pathTertiary', nextAppHandler('/index'))

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

  server.get('*', handle)

  if (DEV_HTTPS) {
    const fs = require('fs')

    const cert = fs.readFileSync('server/dev-https/local_https.dev.crt', 'utf-8')
    const key = fs.readFileSync('server/dev-https/local_https.dev.key', 'utf-8')

    const options = {
      key,
      cert,
      // protocols: ['http/1.1'],
    }

    https
      .createServer(options, server)
      .listen(PORT, logListener('HTTP/2'))
  } else {
    server.listen(PORT, logListener('HTTP'))
  }
})
