// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


var getImage = function (input){
  var str = "/images/";    
  if(input != null) {    
      str = input;
      if(str.hasOwnProperty('src')){
        str = input.src;
      }
  }            
  str = str.split('/images/').pop();
  
  if(str == '/images/' || str == '' || str == null) {
    str = '/images/chat-avatar.jpg';
  }
  else {
    str = '/images/' + str;
  }
  //console.log(str);
  return str;
}

module.exports = {
  siteName: 'DharmaWorks',
  siteUrl: 'https://www.dharmaworks.com',
  siteDescription: 'Transformation & manifestation tools, content, & coaching.',
  titleTemplate: 'DharmaWorks - %s',

  chainWebpack (config) {
    //config.mode('development')
  },  

  icon: {
    favicon: './static/logos/icon.png',
    touchicon: './static/logos/touch-icon.png'
  },

  templates: {
    ContentItem: '/content/:slug',
    Offering: '/buy/:slug',
    LandingPage: '/:slug',
    Tag: '/tag/:id'
  },

  plugins: [    
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin-local`,
        htmlPath: `src/admin-local/index.html`,
        configPath: `src/admin-local/config.yml`,
        modulePath: `src/admin-local/index.js` ,
        //repository: process.env.REPOSITORY 
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        htmlPath: `src/admin/index.html`,
        configPath: `src/admin/config.yml`,
        modulePath: `src/admin/index.js` 
      }
    },
    {
      // Create content from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'LandingPage',
        path: 'data/pages/*.md',
      }
    },
    {
      // Create content from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'ContentItem',
        path: 'data/content/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },

    {
      // Create offerings from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Offering',
        path: 'data/offerings/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },

    {
      // Create offerings from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Collection',
        path: 'data/collections/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },

    {
      // Create social posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'SocialPost',
        path: 'data/socialPosts/*.md',
        refs: {
          
        }
      }
    },

    {
      // Create page elements from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'PageElement',
        path: 'data/pageElements/*.md',
        refs: {
          
        }
      }
    },


    {
      // Create value propositions from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'ValueProposition',
        path: 'data/valuePropositions/*.md',
        refs: {
          
        }
      }
    },

    {
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['SocialPost'],
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: 'Social Posts',
          description: 'The current social media post schedule.'
        },
        // === All options after this point show their default values ===
        // Optional; opt into which feeds you wish to generate, and set their output path
        rss: {
          enabled: true,
          output: '/feed.xml'
        },
        atom: {
          enabled: false,
          output: '/feed.atom'
        },
        json: {
          enabled: true,
          output: '/feed.json'
        },

        // Optional: the maximum number of items to include in your feed
        // maxItems: 25,

        // Optional: an array of properties passed to `Feed.addItem()` that will be parsed for
        // URLs in HTML (ensures that URLs are full `http` URLs rather than site-relative).
        // To disable this functionality, set to `null`.
        htmlFields: null, // ['description', 'content'],
        // Optional: if you wish to enforce trailing slashes for site URLs
        enforceTrailingSlashes: false,
        // Optional: a method that accepts a node and returns true (include) or false (exclude)
        // Example: only past-dated nodes: `filterNodes: (node) => node.date <= new Date()`
        filterNodes: (node) => true, 
        // Optional: a method that accepts a node and returns an object for `Feed.addItem()`
        // See https://www.npmjs.com/package/feed#example for available properties
        // NOTE: `date` field MUST be a Javascript `Date` object
        nodeToFeedItem: (node) => ({
          title: node.title,
          description: node.description,
          image: 'https://www.dharmaworks.com' + node.thumbnail_image,
          date: node.date || node.fields.date,          
          content: JSON.stringify(
            {
              published: node.published,
              repost_rules: node.repost_rules
            }
          )         
        })
      }
    }
  ],

  

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
}
