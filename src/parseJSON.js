// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
const findEnd = function(input) {

  let result;

  // Initialize
  let openBracket = '{';
  let closeBracket = '}';

  if(input[0] === '[') {
    openBracket = '[';
    closeBracket = ']';
  }

  let openCount = 1;
  for(let i = 1; i < input.length; i++) {
    console.log(closeBracket)
    if(input[i] === openBracket) {openCount++;}
    if(input[i] === closeBracket) {openCount--;}
    if(openCount === 0) {result = i; console.log(i); break;}
  }

  return result;

}


var parseJSON = function(json) {
  // your code goes here
  if(Number(json) == json) {
    return (Number(json));
  }

  if(json.slice(0,4) === 'true') {
    return true;
  }

  if(json.slice(0,5) === 'false') {
    return false;
  }

  if(json.slice(0,4) === 'null') {
    return null;
  }

  if(json[0] === '[') {
    let closePos = findEnd(json);

  }


};
