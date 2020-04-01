<template>
  <Layout>   
    
    <b-card
        class="mb-4 px-0 bg-dark card-image-tinted border-0" 
        style="width:100%;height:500px;                                                         
                background-size:cover;
                border-radius:0px !important;
                background-position:center !important;"                
                :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }">
                
      
        <div class="row h-100">
          <div class="col-sm-12 text-center" style="margin-top:150px;">            
             <h1 class="d-none d-md-block text-white text-weight-300 text-shadow ">               
                {{ $page.contentItem.title }}
             </h1>
             <h2 class="d-block d-md-none text-white text-weight-300 text-shadow">               
                {{ $page.contentItem.title }}
             </h2>
             <div class="badge badge-pill badge-dark border-0  px-3 py-2 text-white opacity-90 mt-3 text-weight-400 bg-black " style="font-size:85%;">{{ $page.contentItem.subtitle  }}</div><br>
             <a data-scroll href="#more" class="scroll-button-down mt-4"></a>
          </div>
        </div>       
    </b-card>
    
    <div class="container">
      <div class="row mx-3 mx-md-0 justify-content-center">          
        <div id="more" class="col-md-9 bg-white br-5 p-4 p-md-5 mb-0 " style="font-size:115%; margin-top:-50px;z-index:99; box-shadow:0px -45px 30px rgba(0,50,7,0.2)">
          {{ $page.contentItem.description }}
        </div>
        <div class="content col-md-9 bg-none  border-top mt-3 pt-5 px-3 p-md-5 " v-html="$page.contentItem.content">          
          {{ $page.contentItem.content }}
        </div>        
      </div>  
    </div>         

    <div class="container-fluid w-100 " v-if="relatedCollection != null">      
      
        <span v-for="edge, index in $page.collections.edges" v-if="relatedCollection == edge.node.slug">
          <h5 class="opacity-50 text-primary mb-4 w-100 text-center pt-3 pt-md-0 pb-3 pb-md-5">Recommended For You...</h5>
          <div deck class="row mb-3 mx-3 pb-3 mt-2 justify-content-center ">
          
              
               
              
               

                <b-card  v-for="offering, offeringIndex in $page.offerings.edges" v-if="edge.node.offerings.includes(offering.node.slug)" class="col-12 col-md-4 col-lg-2 mr-2 mb-2 raised col-lg-2 mx-0  border-0 h-100 " style="min-height:730px;float:left;"  :key="offering.node.id" >
                  <div                 
                style="width:100%;height:375px;                              
                position: absolute;
                top: 0px;
                right: 0px;                
                background-size:cover;                
                background-position:center;
                background-color:transparent;                
                border-radius:5px 5px 0px 0px;
                overflow:hidden;"
                class="card-image"
                :style="{ backgroundImage: `url('${offering.node.cover_image}')` }">
                </div> 
                  <b-card-text class="pt-5 px-3 text-primary" style="line-height:25px;margin-top:350px;z-index:99999999999 !important;"><h5>{{ offering.node.title }}</h5></b-card-text> 
                  <b-card-text class="pb-3 px-3" style="line-height:28px;z-index:99999999999 !important;">{{ offering.node.description.substr(0, 120) }}<span v-if="offering.node.description.length >= 120" style="opacity:.5;">...</span></b-card-text>
                  
                  <b-button :href="'/buy/' + offering.node.slug" style="position:absolute;bottom:25px;right:25px;" variant="dark">Learn More <span style="opacity:0.5;">→</span></b-button>
                  
                </b-card>  
                
              
          
            </div>
          

 <!-- Recent posts -->
  
       
          
      

        </span>
      </h5>
    </div> 



  </Layout>
</template>

<script>


export default {
    data () {
    return {
      relatedCollection: null,      
      relatedCollections: null,
      relatedProductsCount: 0       
    }
  },
  components: {
   },
   	
  async mounted() {          
    try {
      var URL= window.location.href

      var arr=URL.split('/content/')
      //arr[0]='example.com'
      //arr[1]='event'
      //arr[2]='14aD9Uxp?p=10'

      var str = '/content/' + arr[1]
      //alert(str)
      const results = await this.$fetch(str)
      
        this.relatedCollections = results.data.contentItem.relatedCollections
        this.getRelatedCollection()
              
      
    } catch (error) {
      console.log(error)
    }
  },  
  methods: {   
   
    limitRelatedProducts(includes) {
      /*  Currently doesn't work
      if(this.relatedProductsCount < 3) {               
        var count = this.relatedProductsCount
        this.relatedProductsCount = count + 1
        return true
      }

      else { 
        return false
      }
      */
      return true

    },
    getThumbnailImage(){
      if(this.$page.contentItem.thumbnail_image != null){
        return 'https://www.dharmaworks.com' + this.$page.contentItem.thumbnail_image.src
      }
      if(this.$page.contentItem.cover_image != null){
        return 'https://www.dharmaworks.com' + this.$page.contentItem.cover_image.src
      }
      else {
        return ''
      }
    },
    getRelatedCollection() {    
      //if(this.relatedCollections.length >= 0) {
        this.relatedCollection = this.relatedCollections[Math.floor(Math.random() * this.relatedCollections.length)]
      //}
    },
    getRelativeImageUrl(input) {   
       var str = input          
       str = input.src
        //str =  str.split('/images/').pop()
        //alert(str)
        return '' + str        
    }
  },
  metaInfo () {
    return {
      title: this.$page.contentItem.title,
      meta: [
        {
          name: 'description',
          content: this.$page.contentItem.description
        },
        {
          name: 'keywords',
          content: this.$page.contentItem.keywords
        },
        {
          property: "og:title",
          content: this.$page.contentItem.title
        },
        {
          name: "twitter:card",
          content: this.getThumbnailImage() ? "summary_large_image" : "summary",
        },
        {
          name: "twitter:creator",
          content: "@DharmaWorksLLC"
        },
        {
          property: "og:description",
          cotent: this.$page.contentItem.description
        },
        {
          property: "og:image",
          content: this.getThumbnailImage()
        }
      ]
    }
  }
}
</script>

<page-query>
query ContentItem ($id: ID!) {
  contentItem (id: $id) {
      id
      title
      subtitle
      content
      slug
      date (format: "D. MMMM YYYY")
      timeToRead
      keywords
      featured      
      description
      cover_image
      
      path
      tags {
        id
        title
        path
      }
  }
  collections: allCollection( sortBy: "slug", order: DESC, filter: { published: { eq: true } } ) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        featured
        description
        cover_image
        path
        tags {
          id
          title
          path
        }
        offerings
      }
    }
  }
   offerings: allOffering(sort: [{ by: "price" }, { by: "boost" }] order: ASC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        featured
        price
        type
        description
        cover_image
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>


<style lang="scss">

.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {

  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}

.content b, .content strong {
    font-weight: 300 !important;
    background: #fffbc6 !important;
    color: #000 !important;
    padding: 3px 5px;
    border-radius: 4px;
    white-space:pre-wrap;
    display:inline !important;
}

</style>
