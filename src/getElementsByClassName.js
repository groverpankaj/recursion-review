// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
  ) {
    // your code here
    let result = [];

    let currElem;

    // first will be document.body , afterwards it will be given child element
    if(arguments[1] === undefined) {
      currElem = document.body;
    } else {
      currElem = arguments[1];
    }

    // get classname of the current element
    let allClasses = currElem.className;

    if (allClasses !== undefined) {   // Undefined - No class
      let allClassesArray = allClasses.split(' ');

      for(let i = 0; i < allClassesArray.length; i++) {
        if(allClassesArray[i] === className) {
          result.push(currElem); break;
        }
      }
    }

    let childElem = currElem.childNodes;

    // child nodes

    //iterate through each child nodes
    for(let i = 0; i < childElem.length; i++) {
      // call for recursion on each child element
      result = result.concat(getElementsByClassName(className, childElem[i]));
    }

      return result;
  };
