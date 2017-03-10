'use strict';

var through = require('through')
  , redeyed = require('redeyed')
  , path = require('path');

var config = {
  Keyword: { 
    const: function (tokenString, info) { 
      var idx       =  info.tokenIndex
        , tokens    =  info.tokens
        , nextToken =  tokens[idx + 1];

      return nextToken && nextToken.type === 'Identifier' ? 'var' : tokenString;
    } 
  }
};

module.exports = function (file) {
  var data = '';
  function ondata (d) { data += d; }
  function onend() {
    try {
      if (!/const\s/.test(data)) return this.queue(data);
      this.queue(redeyed(data, config).code);
    } catch (e) {
      console.error('unable to remove consts from ' + file);
      console.error(e);
      this.queue(data);
    }
    this.emit('end');
  }
  return (path.extname(file) === '.json')
    ? through()
    : through(ondata, onend);
};
