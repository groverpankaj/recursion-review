// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // String
  if(typeof(obj) === 'string') {
    return ('"' + obj + '"');
  }

  // Number
  if(typeof(obj) === 'number') {
    return (obj.toString());
  }

  // Boolean
  if(typeof(obj) === 'boolean') {
    return ( obj.toString());
  }

  // Null
  if(obj === null) {
    return ('null');
  }

  // Array
  if(Array.isArray(obj)) {
    let result = '[';
    for(let i = 0; i < obj.length; i++ ) {
      if(i !== 0) {result += ',';}
      result += stringifyJSON(obj[i]);
    }
    result += ']';
    return result;
  }

  // Object
  if(typeof(obj) === 'object') {
    let result = '{';
    for(let currKey in obj) {
      if( (obj[currKey] === undefined) || (typeof(obj[currKey]) === 'function' ) ) {continue;}
      if(result !== '{') {result += ',';}
      result += stringifyJSON(currKey) + ":";
      result += stringifyJSON(obj[currKey]);
    }
    result += '}';
    return result;
  }

  // Function
  if(typeof(obj) === 'function') {
    return undefined;
  }

  // For undefined return undefined(nothing)
};
