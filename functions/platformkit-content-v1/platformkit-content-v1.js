// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    // Get filename from url parameter
    const file = event.queryStringParameters.file || ''
    
    // Get the relevant static file    
    var fs = require('fs');        
    // Test - referencing a static file in the current directory
     //var content =  __dirname + '/' + file + '.md';    
    var content =  __dirname + '/../../data/content/' + file + '.md';
    content = fs.readFileSync(content, 'utf8');  

    // Convert it to JSON
    var fm = require('front-matter');
    var data = fm(content);
    delete data.frontmatter;
    delete data.bodyBegin;
 
    return {
      statusCode: 200,
      body: JSON.stringify({status: 200, data: data, error: false, message: null }, null, 2)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({status: 500, data: null, error: true, message: err.toString()},null, 2) }
  }
}
