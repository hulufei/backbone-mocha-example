backbone-mocha-example
=======================

[Backbone TodoMVC](http://todomvc.com/architecture-examples/backbone/) example with mocha tests based on a frontend boilerplate.

Frontend boilerplate modified from [generator-frontend](https://github.com/nDmitry/generator-frontend).

## Include

- Local Connect web-server
- Live reload
- Compiling Jade templates to HTML
- Compiling Stylus
- Prefixing your output CSS with [Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
- Spriting with output to sprites.styl file([grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith))
- CSS linting
- Compile CJS modules with [Browserify](https://github.com/substack/node-browserify)
- Concat Bower components
- CSS and JS minification([csso](https://github.com/t32k/grunt-csso): better CSS minification)
- Image optimization
- Mocha scaffold

## Getting started

- Make sure you have [Grunt](http://gruntjs.com) installed: `npm install -g grunt-cli`
- Install packages: `npm install & bower install`
- Run: `grunt` start a connect server with live reload, and watch for compiling

## Todo Example

To run the example:

With connect server running, open `localhost:9001`.

### Browserify

The JavaScript source code have been migrated to CJS modules.

### View Templates

Seperated view templates under `./src/js/templates`, required into js code by
browserify with [brfs](https://github.com/substack/brfs) transform.

### Tests

`Mocha + Chai + Sinon`

`./src/js/test/app.js` exported global variables for testing(compiled to `./test/` by browserify).

Run tests:

```shell
grunt mocha
```

Or run directly in browser: open `./test/index.html`.
