# Noire Web Application

React Frontend for the Noire server

**WARNING: Noire is currently under active development and not ready for production use**

## Develop

To spin off a local web server with live reload:

`npm run start`

## Build

[WebPack 4](https://webpack.js.org) is used to bundle the application by running:

`npm run build`

## Test

Uses [Jest](https://facebook.github.io/jest/) for running tests and assertions, and [Enzyme](http://airbnb.io/enzyme/) for asserting, manipulating, and traversing React Components output

## Deploy

## Documentation

### Style Guide

The [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) is used as a base for linting.

Linting is done by [ESLint](https://eslint.org), which runs [Prettier](https://prettier.io) for code formatting and error fixing, which also takes into consideration [EditorConfig](http://editorconfig.org) rules.

#### Files and Folder Structure

Files should stick to lower-case with dashes as separators (Pascal Case? ) and the `.jsx` extension used for React components. They should be grouped by domain first (app, bootcamp, admin, etc.). Common components and code should be placed in a `core` directory.

Each React component should be placed in its own file and be the default export. The component name should match the file name, but converted to Camel Case? (`user-list.jsx` should export a `UserList` component).

Imports are resolved both from `node_modules` and the `src` directory, making it possible to replace
`import HomePage from './src/pages/home/home-page.jsx'` with
`import HomePage from 'pages/home/home-page'`

Inspiration taken from:

https://www.sitepoint.com/organize-large-react-application/

https://marmelab.com/blog/2015/12/17/react-directory-structure.html
