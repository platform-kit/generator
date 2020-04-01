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
          <div class="row mt-2 mb-3" v-for="edge, index in $page.featuredContent.edges" :key="edge.node.id">
            <br />
            <span
              class="badge badge-pill px-3 bg-light-blue border-light-blue text-primary"
              style="float:right;z-index:9999 !important;margin-left:0px;margin-top:5px;position:relative;left:-12px;top:30px;"
            >
              <span class="opacity-90">{{ edge.node.minutes_to_consume }} Minute Read</span>
            </span>
            <b-card
              v-on:click="window.location.assign('/content/' + edge.node.slug)"
              v-if="edge.node.cover_image != null"
              class="d-none d-md-inline-flex raised hero-card border-0 mb-3 p-0 mr-md-4 w-100"
              :key="edge.node.id"
              :post="edge.node"
              v-bind:class="{ odd: (index % 2 === 0) == false, even: (index % 2 === 0) }"
            >
              <div
                style="width:50%;height:100%;                              
                position: absolute;
                top: 0px;
                right: 0px;                
                background-size:cover;
                background-position:center center;"
                class="card-image-tinted"
                :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
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
              class="d-none d-md-inline-block raised hero-card border-0 mb-3"
              
              :post="edge.node"
            >
              <b-card-text class="pt-3 px-3 text-primary" style="line-height:25px;">
                <h5>{{ edge.node.title }}</h5>
              </b-card-text>
              <b-card-text class="pb-5 px-3" style="line-height:28px;">
                {{ edge.node.description.substr(0, 66) }}
                <span style="opacity:.5;">...</span>
              </b-card-text>

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
              v-if="edge.node.cover_image != null"
              :img-src="edge.node.cover_image"
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
              class="raised border-0 mb-3 pull-left mx-0 px-0 h-100 mr-md-3"
              :key="edge.node.id"
              :post="edge.node"
            >
              <b-card-text class="pt-3 px-3 text-primary" style="line-height:25px;">
                <h5>{{ edge.node.title }}</h5>
              </b-card-text>

              <b-button
                :href="'/content/' + edge.node.slug"
                style="position:absolute;bottom:25px;right:25px;width:calc(100% - 55px)"
                variant="light"
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
                v-if="edge.node.cover_image != null"
                :img-src="edge.node.cover_image"
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
  latestFeaturedContent: allContentItem(limit: 1, sortBy: "date", order: DESC, filter: {featured: { eq: true }}) {
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
        tags {
          id
          title
          path
        }
      }
    }
  }
  featuredContent: allContentItem(sortBy: "date", order: DESC, filter: { featured: { eq: true }}) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")        
        featured
        published
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
        path
        tags {
          id
          title
          path
        }
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
        tags {
          id
          title
          path
        }
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

export default {
  data() {
    return {
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
</style>