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
 
    return {
      statusCode: 200,
      body: JSON.stringify({data: data}, null, 2)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
