<template>
  <Layout :show-logo="false">
    <div
      class="px-4 bg-light d-flex"
      style="height:100%;min-height:calc(100vh - 80px)"
      v-if="redirecting == true"
    >
      <h3
        class="justify-content-center my-auto w-100 text-center text-dark-blue opacity-20"
        style="position:relative;top:-40px !important;"
      >Please Wait...</h3>
    </div>
    <div class="px-4" v-if="redirecting != true">
      <!-- Featured posts -->
      <div class="posts mt-4">
        <div class="container mt-1 mt-lg-0">
         <div class="row mt-2 mb-3">
           <h5 class="text-center d-block d-md-none w-100 my-1">Featured Content</h5>           
            <div class="w-100 bg-none d-block p-3 br-5  mr-0 mr-md-4 text-center mt-2">
              <div class="btn btn-sm btn-neutral text-dark m-1"><i class="fa fa-fw fa-cogs mx-0 opacity-50"></i><span class="d-none d-md-inline ml-0 ml-md-1"> Filters</span></div>                            
              <div v-bind:class="{ 'tag-activated bg-dark text-white': filterTags.includes(tag), 'tags-selected': filterTags.length > 0 }" v-bind:key="tag" v-for="tag in features.content.featuredTags"  class="btn btn-sm br-25 px-3 text-capitalize m-1 tag-button"  @click="toggleTag(tag)">{{ tag }}</div>                                          
            </div>
         </div>
          <div
            class="row mt-2 mb-3"
            v-for="edge, index in $page.featuredContent.edges"
            :key="edge.node.id"
            v-if="passesFilter(edge.node.tags)"
          >
            <br />
            <span
              class="badge badge-pill px-3 bg-green text-dark-green"
              style="float:right;z-index:999 !important;margin-left:0px;margin-top:5px;position:relative;left:-12px;top:30px;"
            >
              <span>{{ edge.node.minutes_to_consume }} Minute<span v-if="edge.node.minutes_to_consume > 1">s</span></span>
            </span>
            
            <b-card
              v-on:click="window.location.assign('/content/' + edge.node.slug)"
              v-if="edge.node.thumbnail_image != null"
              class="d-none d-md-inline-flex raised hero-card border-0 mb-3 p-0 mr-md-4 w-100"
              :key="edge.node.id"
              :post="edge.node"
              v-bind:class="{ odd: index % 2 !== 0, even: (index %2 === 0) }"
            >
              <div
                v-if="edge.node.thumbnail_image != null && edge.node.thumbnail_image != ''"
                style="width:50%;height:100%;                              
                position: absolute;
                top: 0px;
                right: 0px;                
                background-size:cover;
                background-position:center center;"
                class="card-image-tinted"
                :style="{ backgroundImage: `url('${edge.node.thumbnail_image}')` }"
              ></div>
              <div
                class="hero-card-content p-0 p-md-3 p-lg-5 d-flex"
                style="width:50%;height:100%;
                display:inline-block;                
                position: absolute;
                top: 0px;
                left: 0px;"
              >
                <div class="mx-4 mx-lg-auto ml-lg-0 p0 px-lg-3 my-auto text-left">
                  <b-card-text class="px-3 text-primary d-none d-md-inline-block mb-1">
                    <h6>{{ edge.node.title }}</h6>
                  </b-card-text>
                  <b-card-text
                    class="px-3 text-primary d-inline-block d-md-none"
                    style="line-height:25px;"
                  >
                    <h5>{{ edge.node.title }}</h5>
                  </b-card-text>
                  <b-card-text class="pb-3 px-3" style="line-height:28px;">
                    <span class="d-inline d-lg-none">{{ edge.node.description.substr(0, 66) }}</span>
                    <span
                      class="d-none d-lg-inline"
                      style="font-size:150%;font-weight:300;"
                    >{{ edge.node.description }}</span>
                    <span style="opacity:.5;" class="d-inline d-lg-none">...</span>
                  </b-card-text>
                </div>
              </div>
            </b-card>

            <b-card
              v-on:click="window.location.assign('/content/' + edge.node.slug)"
              v-else
              class="d-none d-md-inline-block raised hero-card w-100 border-0 mb-3 mr-4 d-md-inline-flex"
              :post="edge.node"
            >
            <div class="p-4 text-center w-100 my-auto" style="height:100%;">
              <b-card-text class="pt-0 px-3 text-primary" style="line-height:25px;">
                <h3>{{ edge.node.title }}</h3>
              </b-card-text>
              <b-card-text class="pb-5 px-3" style="line-height:28px;font-size:150%;font-weight:300;">
                {{ edge.node.description.substr(0, 66) }}
                <span v-if="edge.node.description.length > 66"  style="opacity:.5;">...</span>
              </b-card-text>
              </div>
              <b-button
                :href="'/content/' + edge.node.slug"
                style="position:absolute;bottom:25px;right:25px;width:calc(100% - 55px)"
                variant="dark"
              >
                Read Article
                <span style="opacity:0.5;">→</span>
              </b-button>
            </b-card>
            <b-card
              overlay
              class="d-inline-block d-md-none raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3"
              :post="edge.node"
              style="z-index:99;"
              v-if="edge.node.thumbnail_image != null"
              :img-src="edge.node.thumbnail_image"
              img-top
              img-width="50%;"
            >
              <b-card-text
                class="pt-3 px-3 text-light d-none d-md-inline-block"
                style="line-height:25px;"
              >
                <h3>{{ edge.node.title }}</h3>
              </b-card-text>
              <b-card-text
                class="pt-3 px-3 text-light d-inline-block d-md-none"
                style="line-height:25px;"
              >
                <h5>{{ edge.node.title }}</h5>
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

            <b-card
              v-else
              class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3 w-100 d-inline-block d-md-none"
              :key="edge.node.id"
              :post="edge.node"
              style="min-height:300px;"
            >
              <b-card-text class="pt-3 px-3 text-primary" style="line-height:25px;">
                <h5>{{ edge.node.title }}</h5>
                <p class="card-text text-dark" style="font-size:133%;">{{ edge.node.description }}</p>
              </b-card-text>

              <b-button
                :href="'/content/' + edge.node.slug"
                style="position:absolute;bottom:25px;right:25px;width:calc(100% - 55px)"
                variant="primary"
              >
                Read Article
                <span style="opacity:0.5;">→</span>
              </b-button>
            </b-card>
          </div>
        </div>
      </div>

      <!-- Recent posts -->
      <div class="posts" v-if="$page.recentContent.edges.length > 0">
        <div class="container px-0 px-md-3">
          <span
            class="badge badge-pill bg-very-light-blue border border-light-blue text-primary mb-4 mt-3 d-inline-block"
          >Recent Content</span>

          <b-card-group deck class="mb-3 mt-2">
            <div
              v-on:click="window.location.assign('/content/' + edge.node.slug)"
              v-for="edge, index in $page.recentContent.edges"
              v-if="index < 6 && edge.node.featured != true"
              class="px-0 pr-md-2 mb-4"
              v-bind:class="{ 'col-md-3': $page.recentContent.edges.length >= 4, 'col-md-6': $page.recentContent.edges.length == 2, 'col-md-4': $page.recentContent.edges.length == 3, 'col-md-12': $page.recentContent.edges.length == 1   }"
            >
              <b-card
                overlay
                class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3"
                :key="edge.node.id"
                :post="edge.node"
                v-if="edge.node.thumbnail_image != null"
                :img-src="edge.node.thumbnail_image"
                img-top
                img-width="50%;"
              >
                <b-card-text
                  class="pt-3 px-3 text-light d-none d-md-inline-block"
                  style="line-height:25px;"
                >
                  <h3>{{ edge.node.title }}</h3>
                </b-card-text>
                <b-card-text
                  class="pt-3 px-3 text-light d-inline-block d-md-none"
                  style="line-height:25px;"
                >
                  <h5>{{ edge.node.title }}</h5>
                </b-card-text>
                <b-card-text
                  class="pb-3 px-3 text-light text-shadow d-none d-md-inline-block text-weight-300 mb-4"
                  style="line-height:28px;font-size:150% !important;"
                >
                  {{ edge.node.description.substr(0, 120) }}
                  <span style="opacity:.5;">...</span>
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

              <b-card
                v-else
                class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3"
                :key="edge.node.id"
                :post="edge.node"
              >
                <b-card-text class="pt-3 px-3 text-primary" style="line-height:25px;">
                  <h5>{{ edge.node.title }}</h5>
                </b-card-text>
                <b-card-text class="pb-3 px-3" style="line-height:28px;margin-bottom:50px;">
                  {{ edge.node.description.substr(0, 120) }}
                  <span style="opacity:.5;">...</span>
                </b-card-text>

                <b-button
                  :href="'/content/' + edge.node.slug"
                  style="position:absolute;bottom:25px;right:25px;"
                  variant="primary"
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
  </Layout>
</template>

<page-query>
query {  
  featuredContent: allContentItem(sortBy: "date", order: DESC, filter: { published: { eq: true }, featured: { eq: true }}) {
    edges {
      node {
        id
        title
        tags
        slug
        date (format: "D. MMMM YYYY")        
        featured
        published
        description
        minutes_to_consume
        cover_image
        thumbnail_image
        path      
      }
    }
  }
  content: allContentItem(sortBy: "date", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")        
        featured
        description
        cover_image
        thumbnail_image
        path        
      }
    }
  }
  recentContent: allContentItem(sortBy: "date", order: DESC, filter: { published: { eq: true }, featured: { eq: false }}) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")        
        featured
        description
        cover_image
        path        
      }
    }
  }
  allPages: allLandingPage(sortBy: "date", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        slug
      }
    }
  }
}
</page-query>

<script>
import themeSettings from "../../data/theme.json";

import features from "../../data/features.json";


export default {
  data() {
    return {
      filterTags: [],
      features: features,
      window: null,
      themeSettings: themeSettings,
      redirecting: false
    };
  },
  created() {
    try {
      this.window = window;
    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  metaInfo: {
    title: "Featured Content"
  },
  methods: {
    passesFilter(tags){      
      var result = false;
      if(this.filterTags.length == 0 ) { return true; }
      else {
        this.filterTags.forEach(element => {
          if(tags.includes(element.toLowerCase()) || tags.includes(element)) {
            //console.log(tags.includes(element));
            result = true;
          }
        });
        
      }
      return result;
    },
    toggleTag(input){          
      this.filterTags.indexOf(input) === -1 ? this.filterTags.push(input) : this.filterTags.splice(this.filterTags.indexOf(input), 1);      
      //console.log(this.filterTags);      
    },
    redirectToLandingPage(id) {
      if (this.$page.allPages.edges.length > 0) {
        let list = this.$page.allPages.edges;
        let results = [];
        let homepage = this.themeSettings.homepage;
        let window = this.window;
        let redirecting = false;
        $.each(list, function(key, value) {
          if (value.node.id == homepage) {
            var redirect = "/" + value.node.slug;
            redirecting = true;
            window.location.assign(redirect);
          }
        });

        this.redirecting = redirecting;
      }
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.isMobile {
  margin-top: 250px !important;
}
.d-md-inline-flex .card-body {
  display:inline-flex !important;
}

.tag-button {  
  border:2px solid rgba(0,0,50,0.15);
}

.tag-button.tags-selected {
  background:none !important;
  box-shadow:0px 10px 10px rgba(0,50,50, 0.15);
}

.tag-button.tags-selected:hover {
  background:rgba(0,50,150,0.08) !important;
  box-shadow:0px 10px 10px rgba(0,50,50, 0.15);
}


.tag-activated.tags-selected {
  background:#000 !important;
}

.tag-activated.tags-selected:hover {
  background:#333 !important;
}
</style>