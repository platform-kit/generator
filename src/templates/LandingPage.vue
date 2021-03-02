<template>
  <Layout>
    <div class="container-fluid landing-page px-0" v-if="$page.landingPage.sections != null" style="overflow:hidden;">
      <div v-for="section, index in $page.landingPage.sections" class="section px-3 px-lg-0">
        <div v-if="section.type == 'valuePropositions'" class="row">
          <div
            class="image-tinted bg-dark justify-content-center text-light text-center w-100 d-inline-flex"
            v-if="section.list.includes(edge.node.id)"
            v-for="edge, index in $page.valuePropositions.edges"
            v-bind:class="{ 'col-lg-3': section.list.length >= 4, 'col-lg-6': section.list.length == 2, 'col-lg-4': section.list.length == 3, 'col-lg-12': section.list.length == 1   }"
            style="
                 min-height:500px;                                     
                background-size:cover !important;
                background-position:center center;"
            :style="{ backgroundImage: `url('${edge.node.thumbnail_image}')` }"
          >
            <div class="w-100 my-auto py-0 px-2 pr-0 pr-lg-4">
              <h2 class="vp-title">{{ edge.node.call_to_action_text }}</h2>

              <a
                v-for="page in $page.pages.edges"
                v-if="page.node.id == edge.node.conversionPage"
                :href="'/' + page.node.slug"
                v-on:click="convert(page.node.slug)"
                class="d-inline-block btn btn-light btn-lg mt-3 raised br-25"
              >Learn More</a>
              <a
                v-if="edge.node.call_to_action_button_text != null && edge.node.call_to_action_button_url.length > 0"
                :href="edge.node.call_to_action_button_url"
                class="d-inline-block btn btn-light btn-lg mt-3 raised br-25"
              >{{ edge.node.call_to_action_button_text }}</a>
            </div>
          </div>
        </div>

        <div v-else-if="section.type == 'contentItems'" class="contentItems border-bottom row">
          <div class="posts py-3 container" v-if="$page.contentItems.edges.length > 0">
            <div class="col-md-12 px-0 px-md-3">
              <b-card-group deck class="my-3 mt-4 my-md-3 mt-md-5 mr-2">
                <div
                  v-if="section.list.includes(edge.node.id)"
                  v-on:click="window.location.assign('/content/' + edge.node.slug)"
                  v-for="edge, index in $page.contentItems.edges"
                  class="justify-content-center px-0 pr-md-2 mb-4 col-md-12 bg"
                  v-bind:class="{ 'col-lg-3': section.list.length >= 4, 'col-lg-6': section.list.length == 2, 'col-lg-4': section.list.length == 3, 'col-lg-12': section.list.length == 1   }"
                >
                  <b-card
                    overlay
                    class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3 bg-dark w-100 d-block h-100 "
                    :key="edge.node.id"
                    :post="edge.node"
                    style="background-size:cover;min-height:330px;" :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                   
                  >
                  
                    
                    
                    <b-card-text
                      class="pt-3 px-3 text-light d-inline-block"
                      style="line-height:25px;"
                    >
                      <h3 class="contentItemTitle">{{ edge.node.title }}</h3>
                      <br />
                      <span
                        class="badge badge-pill px-3 bg-green border-light-green text-dark-green"
                        style="position:absolute;top:12px;left:-10px;"
                      >
                        <span class="opacity-90">
                          {{ edge.node.minutes_to_consume }} Minute<span v-if="edge.node.minutes_to_consume > 1">s</span>
                        </span>
                      </span>
                      <h4
                        v-if="section.list.length == 1"
                        class="description d-none d-lg-inline-block text-weight-200"
                      >{{ edge.node.description }}</h4>
                      <h4
                        v-if="section.list.length == 2"
                        class="d-none d-lg-inline-block text-weight-200"
                        style="font-size:200%;"
                      >{{ edge.node.subtitle }}</h4>
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
        <div v-else-if="section.type == 'collections'" class="border-bottom row collections">
          <div
            v-if="section.list.includes(edge.node.id)"
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
                v-if="collection.node.offerings.length > 0 && section.list.includes(collection.node.id)"
              >
                <h3
                  class="w-100 opacity-70 text-center text-primary mb-5 mt-4 pt-2 mr-3"
                >{{ collection.node.title }}</h3>

            

                      <div
                  v-for="item in collection.node.offerings"
                  
                  
                  class="col-12 px-0 pr-md-2 mb-1"
                  v-bind:class="{ 'col-lg-3': collection.node.offerings.length >= 4, 'col-lg-6': collection.node.offerings.length == 2, 'col-lg-4': collection.node.offerings.length == 3, 'col-lg-12': collection.node.offerings.length == 1   }"
                >
                  <div
                    v-on:click="window.location.assign('/buy/' + getOffering(item).slug)"
                    class="card raised border-0 mb-1 pull-left mx-0 px-0 h-100 mr-md-3 px-0 pb-3 m-0 mb-4"
                    :key="getOffering(item).id"
                    :post="getOffering(item)"
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
                        :style="{ backgroundImage: `url('${getOffering(item).thumbnail_image}')` }"
                      ></div>
                    </div>
                    <div class="card-body p-0">
                      <b-card-text class="pt-3 px-3" style="line-height:25px;">
                        <h5>{{ getOffering(item).title }}</h5>
                      </b-card-text>
                      <b-card-text class="pb-3 px-3 mb-4" style="line-height:28px;" v-html="getOffering(item).description">                        
                        <span v-if="getOffering(item).description.length >= 120" style="opacity:.5;">...</span>
                      </b-card-text>
                      <b-button
                        :href="'/buy/' + getOffering(item).slug"
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

        <div v-else-if="section.type == 'html'">
          <div
            v-if="section.list.includes(edge.node.id) && edge.node.code.lang == 'html'"
            v-for="edge, index in $page.pageElements.edges"
            v-html="edge.node.code.code"
            class="row"
          >test</div>
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
        thumbnail_image
        path        
      }
    }
  }
  pages: allLandingPage(filter: { published: { eq: true }}) {
    edges {
      node {
        id        
        slug                
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
        conversionPage
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
import socialSettings from "../../data/social.json";
export default {
  data() {
    return {
      test: null,
      window: null,
      results: null
    };
  },
  async mounted() {
    this.window = window;
    try {
    } catch (error) {
      console.log(error);
    }

    this.getOffering();
  },
  methods: {
    getOffering(id) {
      if(typeof id == 'undefined'){
         id = "offering-Kg8tzWA9Y";
      }
      var allOfferings = this.$page.offerings.edges;
      var results = this.$page.offerings.edges.filter(function(edge) {
        return edge.node.id === id;
      });

      if (results.length > 0) {
        console.log(results[0].node);
        return results[0].node;
      } else {
        return false;
      }
    },
    convert(input) {
      window.location.assign("/" + input);
    },
    goToCollection(id) {
      alert(id);
    },
    getThumbnailImage() {
      if (this.$page.landingPage.thumbnail_image != null) {
        return (
          process.env.GRIDSOME_APP_URL +
          this.$page.landingPage.thumbnail_image.src
        );
      }
      if (this.$page.landingPage.cover_image != null) {
        return (
          process.env.GRIDSOME_APP_URL + this.$page.landingPage.cover_image.src
        );
      } else {
        return "";
      }
    }
  },
  metaInfo() {
    return {
      title: this.$page.landingPage.title,
      meta: [
        {
          name: "description",
          content: this.$page.landingPage.description
        },
        {
          name: "keywords",
          content: this.$page.landingPage.keywords
        },
        {
          property: "og:title",
          content: this.$page.landingPage.title
        },
        {
          name: "twitter:card",
          content: this.getThumbnailImage() ? "summary_large_image" : "summary"
        },
        {
          name: "twitter:creator",
          content: "@" + socialSettings.twitter
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
.section:nth-child(odd) {
  background: linear-gradient(90deg, #ddedff66, #ddedff33, #ddedff66);
}
.section:nth-child(even) {
  background: linear-gradient(90deg, #ddedff33, #ddedff88, #ddedff33);
}

@media (min-width: 768px) {
  .description {
    margin: 50px;
  }
}
.description {
  line-height: 150%;
  font-size: 200%;
}

.contentItemTitle {
  /* font-family: "Open Sans"; */
  font-weight: 700 !important;
}

.contentItems:first-of-type .card-deck {
  margin-top: -38px !important;
}
@media (max-width: 991px) {
  .contentItems:first-of-type .card-deck {
    margin-top: -60px !important;
  }
}

.collections .card-deck {
  margin-top: -38px !important;
}
.collections .w-100 {
  display: none;
}
@media (max-width: 991px) {
  .collections .card-deck {
    margin-top: -60px !important;
  }
}
@media (min-width: 991px) {
  .landing-page .image-tinted {
    background-position: calc(50% - 5px) !important;
  }
}
</style>