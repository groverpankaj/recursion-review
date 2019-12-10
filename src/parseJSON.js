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
    if(input[i] === openBracket) {openCount++;}
    if(input[i] === closeBracket) {openCount--;}
    if(openCount === 0) {result = i;  break;}
  }

  return result;

}

const getCommaPos = function(input) {
  let isGood = false;
  let commaPos;

  
  if(input[0] !== '"') {
    commaPos = input.indexOf(',');
    isGood = true;
  }

  let startPos = 1;  
  while(isGood === false) {
    commaPos = input.indexOf(',', startPos);
    if(commaPos === -1) {
      break;
    }

    let nextQuotePos = input.indexOf('"', 1);
    if(commaPos < nextQuotePos) {      //ignore comma in quotes
      startPos = nextQuotePos + 1;
    } else {
      isGood = true;
    }
  }

  return commaPos;
  
}


var parseJSON = function(json) {
  // your code goes here
  json = json.replace(/\s/g, '');
  

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

  if(json[0] === '"') {
    let endPos = json.indexOf('"', 1);   //skip first pos i.e. opening "
    return (json.slice(1, endPos));
  }

  // Array
  if(json[0] === '[') {
    let closePos = findEnd(json);
    let arrayPortion = json.slice(1, closePos);

    let resultArray = [];

    while(arrayPortion.length > 0) {
      let commaPos = arrayPortion.indexOf(',');
      
      let currElem;
      if(commaPos === -1) {    //last element, no comma found
        currElem = arrayPortion;    
        arrayPortion = '';
      } else {
        currElem = arrayPortion.slice(0, commaPos);
        arrayPortion = arrayPortion.slice(commaPos+1);
      }

      resultArray.push(parseJSON(currElem));

    }
    
    return resultArray;

  }

   // Object
   if(json[0] === '{') {
    let closePos = findEnd(json);
    let objPortion = json.slice(1, closePos);


    let resultObject = {};

    while(objPortion.length > 0) {
      // let commaPos = objPortion.indexOf(',');

      let commaPos = getCommaPos(objPortion);

      
      
      let currElem;
      if(commaPos === -1) {    //last element, no comma found
        currElem = objPortion;    
        objPortion = '';
      } else {
        currElem = objPortion.slice(0, commaPos);
        objPortion = objPortion.slice(commaPos+1);
      }

      let collanPos = currElem.indexOf(':');
      let currKey = parseJSON(currElem.slice(0, collanPos));
      let currValue = parseJSON(currElem.slice(collanPos+1));
      
      resultObject[currKey] = currValue;

    }
    
    return resultObject;

  }


};


// let obj = {"foo": "bar"};

// let json = JSON.stringify(obj);

// console.log(json);

// json = '{"boolean, true": true, "boolean, false": false, "null": null }';

// json = '{"boolean, true": true, "boolean, false": false, "null": null }';

// console.log(parseJSON(json));

// console.log('---------');

// console.log(JSON.parse(json));


