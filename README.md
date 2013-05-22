# varify [![build status](https://secure.travis-ci.org/thlorenz/varify.png)](http://travis-ci.org/thlorenz/varify)

browserify transform that converts all const assignments to var assignments.

    npm install varify

## Why?

So you can get the benefits of immutable variables with help of lint tools while staying compatible with older browsers
that have no `const`.

## Example

Given this JavaScript:

```js
const a = 1;

var keep = { const: 1 };
keep.const = 2;

const foo = function () {
  console.log('some const s should be left unchanged');
};
```

Running browserify with varify transform:

```js
require('browserify')
  .transform(require('varify'))
  .add(__dirname + '/sample.js')
  .bundle()
  .pipe(process.stdout);
```

Outputs:

```js
var a = 1;

var keep = { const: 1 };
keep.const = 2;

var foo = function () {
  console.log('some const s should be left unchanged');
};
```

## Usage from Commandline

    browserify -t varify sample.js > bundle.js
