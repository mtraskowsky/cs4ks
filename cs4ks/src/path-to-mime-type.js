const path = require('path');

/** @function pathToMimeType 
 * Converts the supplied file path string to 
 * the corresponding MIME-TYPE 
 * @param {string} filePath - the file path
 * @returns {string} the corresponding MIME-TYPE
 */
function pathToMimeType(filePath) {
  // TODO: Implement function
  
  var extension = path.extname(filePath); // returns the ext after the "." in file name
  
  switch(extension) {
    case ".json":
      return "application/json";
    case ".html": 
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    default:
      return "application/octet-stream";
  }
}


module.exports = pathToMimeType;
