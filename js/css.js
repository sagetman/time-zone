/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var css = (function() {
  'use strict';

  var css =  {
    wrapper: {
      position: 'relative',
      display: 'inline-block'
    },
    hint: {
      position: 'absolute',
      top: '0',
      left: '0',
      borderColor: 'transparent',
      boxShadow: 'none',
      // #741: fix hint opacity issue on iOS
      opacity: '1'
    },
    input: {
      position: 'relative',
      verticalAlign: 'top',
      backgroundColor: 'transparent'
    },
    inputWithNoHint: {
      position: 'relative',
      verticalAlign: 'top'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: '0',
      zIndex: '100',
      display: 'none'
    },
    suggestions: {
      display: 'block'
    },
    suggestion: {
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    },
    suggestionChild: {
      whiteSpace: 'normal'
    },
    ltr: {
      left: '0',
      right: 'auto'
    },
    rtl: {
      left: 'auto',
      right:' 0'
    }
  };



  return css;
})();