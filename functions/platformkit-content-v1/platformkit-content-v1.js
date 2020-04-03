// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  var hasSubscription = false;
  let thisCustomer = null;

  try {
    // Get filename from url parameter
    const file = event.queryStringParameters.file || ''
    const email = event.queryStringParameters.email || null
    
    // Get the relevant static file    
    var fs = require('fs');        
    // Test - referencing a static file in the current directory
     //var content =  __dirname + '/' + file + '.md';    
    var content =  __dirname + '/../../data/content/' + file + '.md';
    var errormessage = null;
    content =  fs.readFileSync(content, 'utf8');
    

    // Convert it to JSON
    var fm = require('front-matter');
    var data = fm(content);
    delete data.frontmatter;
    delete data.bodyBegin;



    /* Check Stripe to see if customer is a subscriber */ 
    const stripe = require('stripe')(STRIPE_SECRET_KEY);
        
    let allCustomers = await stripe.customers.list(null).then(function(customers) {
      return customers;
    }).then(function(result) {            
      return result;    
    }, function(err) {
      // Deal with an error
    });
    
    let customerId = null;

    for (let [key, value] of Object.entries(allCustomers.data)) {
      //console.log(value.email);
      if(value.email == email){
        console.log("\n\n");
        console.log(value.id);
        console.log(value.email);
        customerId = value.id;      
      }
    }

    let customer = await stripe.customers.retrieve(customerId).then(function(customer) {
      return customer;
    }).then(function(result) {            
      return result;            
    }, function(err) {
      // Deal with an error
    });

  
    // If customer is no subscriber, delete the body of the content item from the response
    if(customer.subscriptions.total_count == 0 || customer.id == null || email == null) {
      data.body = null;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({status: 200, data: data, error: false, message: null }, null, 3)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({status: 500, data: null, error: true, message: err.toString()}, null, 3) }
  }
}
