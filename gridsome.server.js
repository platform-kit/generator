// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api/    
  })

  api.onCreateNode(node => {


    if (node.internal.typeName === 'ContentItem') {
      //console.log(node);               
      node.relatedCollections = null;
      
      if(node.role == 'prototype'){      
        if(process.env.ENVIRONMENT != 'development'){
          node.published = false;
        }
      }
      
    }

    if (node.internal.typeName === 'ValueProposition') {

      if (node.hasOwnProperty('title') == false) {
        node.title = '';
      }

      if (node.hasOwnProperty('published') == false) {
        node.published = false;
      }

      if (node.hasOwnProperty('headline') == false) {
        node.headline = '';
      }

      if (node.hasOwnProperty('call_to_action_text') == false) {
        node.call_to_action_text = '';
      }

      if (node.hasOwnProperty('call_to_action_button_text') == false) {
        node.call_to_action_button_text = '';
      }

      if (node.hasOwnProperty('call_to_action_button_url') == false) {
        node.call_to_action_button_url = '';
      }

      if (node.hasOwnProperty('slug') == false) {
        node.slug = '';
      }

      if (node.hasOwnProperty('date') == false) {
        node.date = new Date();
      }

      if (node.hasOwnProperty('featured') == false) {
        node.featured = false;
      }


      if (node.hasOwnProperty('description') == false) {
        node.description = '';
      }

      if (node.hasOwnProperty('cover_image') == false) {
        node.cover_image = '';
      }

    }

    if (node.internal.typeName === 'Offering') {
      if (node.hasOwnProperty('buy_button_data') == false) {
        node.buy_button_data = '{}';
      }
      if (node.hasOwnProperty('variants') == false) {
        node.variants = null;
      }

      if (node.hasOwnProperty('buy_button_data') == false) {
        node.price = null;
      }




    }



    return node;

  })

}