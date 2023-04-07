function convertToXML(obj) {
    const xml = Object.entries(obj).reduce((acc, [key, value]) => acc + `<${key}>${value}</${key}>`, '');
    return `<book>${xml}</book>`;
  }
  
  module.exports = {
    convertToXML,
  };