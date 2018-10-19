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

// this deals with serving the static bundle js assets
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

// this is what renders the react app on the server side
// and bundles the react app for use on the client
const nextAppHandler = pageComponentPath => async (req, res, next, UAIsMobile = false) => {
  const cached = cache.get(req.originalUrl)
  if (cached && req.query.nocache !== 'true' && !dev) {
    res.set('X-cache', 'hit')
    res.send(cached)
    return
  }

  const {
    pathPrimary,
    pathSecondary,
    pathTertiary,
  } = req.params

  // render the react app to html
  // the arguments below are passed to the getInitialProps
  // method in each page component
  const markup = await app.renderToHTML(
    req,
    res,
    pageComponentPath,
    {
      ...req.query,
      pathPrimary,
      pathSecondary,
      pathTertiary,
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

  // routing
  // TODO move this to a serperate config when there are more pages / routes
  server.get('/:pathPrimary', nextAppHandler('/index'))
  server.get('/:pathPrimary/:pathSecondary', nextAppHandler('/index'))
  server.get('/:pathPrimary/:pathSecondary/:pathTertiary', nextAppHandler('/index'))

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

  server.get('*', handle)

  // this is only used if the DEV_HTTPS runtime flag is set to 'true'
  // read the readme before running in this mode!
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
