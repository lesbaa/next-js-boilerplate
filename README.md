Next.js Boilerplate for using with SSR React Apps
=================================================

## Overview

A project set-up for using [Next.js](https://nextjs.org/) to build universal js app quickly and easily.

## Key Points

- Express is used for route handling on the server.
- Next.js renders the static HTML from a react app on the server and bundles this same react app as a js bundle for the client which then mounts the server rendered mark-up, the process is seamless.
- This project uses [Styled-jsx](https://github.com/zeit/styled-jsx) for styling components. The behaviour is similar to CSS Modules and styles are scoped to the component they are a child of. This means there is less need for BEM, SMACCS or OOCSS conventions, styled-jsx takes care of scoping and prevents any CSS collisions. See `PageHead.component` for using global styles such as resets, utility classes etc.
- The app falls back to plain 'ol server side HTML if javascript is disabled, the app will still render.

## Getting going

This project uses yarn as a dependency manager.

To run the dev environment: `yarn dev` and go to `http://localhost:8080`

To run the dev environment in https mode follow the instructions below and then `npm run dev:https` and go to `https://localhost:8080`
Redux dev tools freaks out on mobile browsers, to run without redux dev tools `npm run dev:no-redux`

This app uses [next.js](https://github.com/zeit/next.js/) to render the React app server side and serve this to the client along with the application bundle.

Use `yarn install` to install all dependencies
Use `yarn add <pkg>` to add a package to your dependencies.
Use the `--dev` flag for devDependencies.

Debugging on a non-chrome browser?
`yarn global add react-devtools`
`react-devtools`

This app requires development on node v8.0+

  - `server/` should contain node server side code (not compiled by babel)
  - `app/` should contain app view source code for rendering react, this code is compiled by babel into `build/`
  - currently `pages` must remain in the route until [this](https://github.com/zeit/next.js/pull/936) pr is merged into the next master branch, we can then move the pages folder in to `app/`

## Setting up https locally

In some instances hitting up a remote JSON endpoint may lead to CORS requests, this is dependent on the API. In this case you may need to edit your hosts file and run the app under an accepted domain name (talk with your Back end / API dev to see what domain to use, eg my-app.local). This can, in some instances knock out https on local envs, in which case you need to 'fake' https locally.

In order to set-up https locally, you'll need to do the following (this only works on OSX, it will be different on Linux, Windows etc):
  - create a folder within `/server` called `dev-https`
  - `yarn https:gen-dev-conf email=<youremail> domain=stv.<you>`, this will generate a config file within the above folder
  - `yarn https:gen-dev-cert`, this will ask you some questions and then generate a certificate and key in the dev-https folder, the default values should suffice.
  - restart the app using `yarn dev:https` and visit the site (make sure your are visiting it in https)
  - dev tools > security > overview > view certificate
  - drag the certificate icon to the desktop and doubleclick on it, this will open up keychain access.
  - drag the certificate icon to `login`, open up log-in and double click on the certificate (it should be named stv.les / stv.jon or similar)
  - open up the `trust` dropdown and select `always trust`
  - close the window, restart the app using `yarn dev:https`, close the browser tab and re-open it with the app running (again, make sure it's https in the url), you should now have full local https

## Development

See package.json for all the run commands.

### Want to debug node in dev tools?

open a terminal window > `ps | grep 'node server.js'` > look for the line that has only `node server.js`, ttysys number and the pid, take note of the pid, got it? okay.
`kill -usr1 <the pid>`

then go to `chrome://inspect` > inspect away.

For further info on contributing see `contributing.md`

### Common gotchas

This project uses babel module resolver to resolve all front end loaded modules using '~/' from a base of `./app/`.
As an example, all that is required in the code is similar to :
`import TestComponent from '~/components/test-component'` from any file anywhere.
Babel will deal with the resolving the component.  This means that when using components / modules there is no need for insane relative paths `../../` etc. This can be edited in the `.babelrc` file under `plug-ins` > `module-resolver`

If you're using vscode, you'll need this:
https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense

Setup for other text editors:
https://github.com/tleunen/babel-plugin-module-resolver#editors-autocompletion

Webpack HMR / Redux / Next don't play well together in dev mode on < IE 11.  The app works fine once it's built and run in production mode, but for whatever reason, the aforementioned combo doesn't function on IE 11 when run in dev mode.

If you're linking to a page within the app always use the `Link` component (same interface as the next.js `Link`, readme available [here](https://github.com/zeit/next.js/#with-link)) and avoid using vanilla anchor tags as this will force the user to leave the SPA and result in a fresh page reload (which we don't want).

```js
// good 
import Link from '~/components/common/link'

<Link
  href={{
    // this is passed to the getInitialProps() method on the linked page
    pathname: '/article', // the page you're loading
    query: {
      parentSection,
      baseSection,
      subSection,
      guid: article.guid, // query params to pass to the page
    }
  }}
  as={displayUrlAndHistoryEntry}
>
  <MoreOfMyComponentsAndTing />
</Link>

// bad
<a href="/news">stuff</a>
```

Missing out a '/' in the of `href` prop in `next/link` components can lead to a transient 404 page being shown between routes, before you go diving into redux, check you have a slash at the beginning of the route in the `href` prop. see [here](https://github.com/zeit/next.js/issues/2833) and [here](https://github.com/zeit/next.js/issues/2208)

Jest only likes the use of 'prefetch' in the link props in a production environment. We had to add a small link component and a condition for it to only run on live. This also messed with Storybook so a condition was added there too to check if Storybook is running and not to use prefetch

Getting a `ERR::PORT IN USE 8081` type error? `lsof -i tcp:8081` to find the pid of the node process and kill it with `kill <whatever the pid is>`
