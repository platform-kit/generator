<template>
  <Layout>
    <div class="container-fluid " v-if="$page.landingPage.sections != null">
      <div v-for="section, index in $page.landingPage.sections" class="section">
        <div v-if="section.type == 'valuePropositions'" class="row">
          <div
            class="image-tinted bg-dark justify-content-center text-light text-center w-100  d-inline-flex"
            v-if="section.list.includes(edge.node.id)"
            v-on:click="window.location.assign('/content/' + edge.node.slug)"
            v-for="edge, index in $page.valuePropositions.edges"
            v-bind:class="{ 'col-lg-3': section.list.length >= 4, 'col-lg-6': section.list.length == 2, 'col-lg-4': section.list.length == 3, 'col-lg-12': section.list.length == 1   }"
            style="
                 min-height:500px;                                     
                background-size:cover !important;
                background-position:center center;"
            :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
          >
            <div class="my-auto py-4 px-2 pr-0 pr-lg-4">
              <h1 class="text-shadow text-weight-800">{{ edge.node.headline }}</h1>
              <h3 class="text-shadow text-weight-300">{{ edge.node.call_to_action_text }}</h3>
              <a
                :href="edge.node.call_to_action_button_url"
                v-if="edge.node.call_to_action_button_url != null && edge.node.call_to_action_button_url != ''"
                class="btn btn-light mt-3 btn-lg br-25 px-4 raised text-dark border-0"                
              >{{ edge.node.call_to_action_button_text }}</a>
            </div>
          </div>
        </div>
        
        <div v-else-if="section.type == 'contentItems'" class="border-bottom row ">
          
          <div class="posts py-3 container" v-if="$page.contentItems.edges.length > 0">
            <div class="col-md-12 px-0 px-md-3 ">
              
              <b-card-group deck class="my-3 mt-4 my-md-3 mt-md-5">
                <div
                  v-if="section.list.includes(edge.node.id)"
                  v-on:click="window.location.assign('/content/' + edge.node.slug)"
                  v-for="edge, index in $page.contentItems.edges"
                  class="justify-content-center px-0 pr-md-2 mb-4 col-md-12 bg"
                  v-bind:class="{ 'col-lg-3': section.list.length >= 4, 'col-lg-6': section.list.length == 2, 'col-lg-4': section.list.length == 3, 'col-lg-12': section.list.length == 1   }"
                >
                  <b-card
                    overlay
                    class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3 bg-dark"
                    :key="edge.node.id"
                    :post="edge.node"
                    
                    :img-src="edge.node.cover_image"
                    img-top
                    img-width="50%;"
                  >
                    <b-card-text
                      class="pt-3 px-3 text-light d-inline-block"
                      style="line-height:25px;"
                    >
                      <h3>{{ edge.node.title }}</h3>
                      <br><span class="badge badge-pill px-3 bg-light-green border-light-green text-dark-green " style="position:absolute;top:12px;left:-10px;"><span class="opacity-90">{{ edge.node.minutes_to_consume }} Minute Read</span></span>
                      <h4 v-if="section.list.length == 1" class="description d-none d-lg-inline-block text-weight-200" >{{ edge.node.description }}</h4>
                      <h4 v-if="section.list.length == 2" class=" d-none d-lg-inline-block text-weight-200" style="font-size:200%;">{{ edge.node.subtitle }}</h4>
                      
                    </b-card-text>
                    <b-button
                      :href="'/content/' + edge.node.slug"
                      style="position:absolute;bottom:25px;right:25px;"
                      variant="light"
                    >
                      Read Article
                      <span style="opacity:0.5;">→</span>
                    </b-button>
                  </b-card>
                  
                </div>
              </b-card-group>
            </div>
          </div>
        </div>
        <div v-else-if="section.type == 'collections'" class="border-bottom row">
          <div
            v-if="section.list.includes(edge.node.id)"
            v-on:click="window.location.assign('/buy/' + edge.node.slug)"
            v-for="edge, index in $page.collections.edges"
            class="justify-content-center px-0 pr-md-2 mb-4 col-md-12"
            v-bind:class="{ 'col-lg-3': section.list.length >= 4, 'col-lg-6': section.list.length == 2, 'col-lg-4': section.list.length == 3, 'col-lg-12': section.list.length == 1   }"
          >
            <div class="container px-3">
              <b-card-group
                deck
                class="mb-3 mt-2 mx-1 justify-content-center"
                v-for="collection, index in $page.collections.edges"
                v-bind:key="collection.node.id"
                v-if="collection.node.featured == true  && collection.node.offerings.length > 0 && section.list.includes(collection.node.id)"
              >
                <h3
                  class="w-100 opacity-70 text-center text-primary mb-5 mt-4 pt-2 mr-3"
                >{{ collection.node.title }}</h3>

                <div
                  v-for="edge, index in $page.offerings.edges"
                  v-bind:key="edge.node.id"
                  v-if="collection.node.offerings.includes(edge.node.id) && edge.node.featured == true"
                  class="col-md-4 px-0 pr-md-2 mb-1"
                >
                  <div
                    class="card raised border-0 mb-1 pull-left mx-0 px-0 h-100 mr-md-3 px-0 pb-3 m-0 mb-4"
                    :key="edge.node.id"
                    :post="edge.node"
                  >
                    <div
                      class="card-header"
                      style="height:250px;background:none !important; border-radius:5px !important; overflow:hidden !important;"
                    >
                      <div
                        style="width:100%;height:250px;                              
                    position: absolute;
                    top: 0px;
                    right: 0px;                
                    background-size:cover;
                    background-position:center center;
                    border-radius:5px 5px 0px 0px "
                        :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                      ></div>
                    </div>
                    <div class="card-body p-0">
                      <b-card-text class="pt-3 px-3" style="line-height:25px;">
                        <h5>{{ edge.node.title }}</h5>
                      </b-card-text>
                      <b-card-text class="pb-3 px-3 mb-4" style="line-height:28px;">
                        {{ edge.node.description.substr(0, 120) }}
                        <span style="opacity:.5;">...</span>
                      </b-card-text>
                      <b-button
                        :href="'/buy/' + edge.node.slug"
                        class="d-block"
                        variant="outline-primary"
                        style="position:absolute !important;bottom:15px;left:15px;width:calc(100% - 30px);"
                      >
                        More Info
                        <span style="opacity:0.5;">→</span>
                      </b-button>
                    </div>
                  </div>
                </div>
              </b-card-group>
            </div>
          </div>
        </div>

        <div v-else-if="section.type == 'html'" >
        
          <div
          v-if="section.list.includes(edge.node.id) && edge.node.code.lang == 'html'"                                  
            v-for="edge, index in $page.pageElements.edges"
            v-html="edge.node.code.code" class="row">
            test
          </div>
          </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query LandingPage ($id: ID!) {
  landingPage (id: $id) {
      id
      title      
      content
      slug                      
      description            
      path   
      sections {
        type        
        list        
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
   contentItems: allContentItem(sortBy: "date", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        subtitle
        excerpt
        slug
        date (format: "D. MMMM YYYY")        
        featured
        description
        minutes_to_consume
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
  valuePropositions: allValueProposition(sortBy: "date", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        headline
        call_to_action_text
        call_to_action_button_text
        call_to_action_button_url
        slug
        date (format: "D. MMMM YYYY")        
        featured
        description
        cover_image
        path        
      }
    }
  }
  pageElements: allPageElement(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        published
        code {
          code
          lang
        }              
      }
    }
  }
  
}
</page-query>


<script>


export default {
  data() {
    return {
      test: null
    };
  },
  async mounted() {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  methods: {    
      getThumbnailImage(){
      if(this.$page.landingPage.thumbnail_image != null){
        return 'https://www.dharmaworks.com' + this.$page.landingPage.thumbnail_image.src
      }
      if(this.$page.landingPage.cover_image != null){
        return 'https://www.dharmaworks.com' + this.$page.landingPage.cover_image.src
      }
      else {
        return ''
      }
    },
  },
  metaInfo() {
    return {
      title: this.$page.landingPage.title,
      meta: [
        {
          name: 'description',
          content: this.$page.landingPage.description
        },
        {
          name: 'keywords',
          content: this.$page.landingPage.keywords
        },
        {
          property: "og:title",
          content: this.$page.landingPage.title
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
          cotent: this.$page.landingPage.description
        },
        {
          property: "og:image",
          content: this.getThumbnailImage()
        }
      ]
    };
  }
};
</script>


<style scoped>
.section:nth-child(odd){ 
    background: linear-gradient(90deg, #ddedff66, #ddedff33, #ddedff66);
}
.section:nth-child(even){ 
    background: linear-gradient(90deg, #ddedff33, #ddedff88, #ddedff33);
}

@media(min-width:768px){
  .description {
    margin:50px;
  }
}
.description {
  line-height:150%;
  font-size:200%;
}
</style>