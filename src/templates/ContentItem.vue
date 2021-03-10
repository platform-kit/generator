<template>
  <Layout class="contentItem">
    <h1
      v-if="($page.contentItem.media_full != null || $page.contentItem.media_preview != null) && ($page.contentItem.media_full != '' || $page.contentItem.media_preview != '')"
      class="title text-dark text-weight-800 text-shadow mb-5 pt-3 w-100 text-center mb-0"
    >{{ $page.contentItem.title }}</h1>

    <div
      class="d-inline-block justify-content-center text-center pb-0 pb-lg-3 px-3 pt-3"
      v-if="($page.contentItem.media_full != null && $page.contentItem.media_full != '') || ($page.contentItem.media_preview != null && $page.contentItem.media_preview  != '') "
      style="width:100%;min-height:300px;height:auto;display:block;background:linear-gradient(90deg, rgb(10, 20, 30) 0px, rgb(20, 30, 40) 100%);"
    >
      <div class="container" style="max-width:100%;">
        <div
          class="row"
          style="min-height:600px;"
          v-if="media != null && premiumContent != null && premiumContent.error == true"
        >
          <div class="col-md-6 m-auto justify-content-center text-left px-4 mb-0 pb-0">
            <span
              class="badge badge-pill badge-primary px-3 bg-light-green text-dark-green pull-left mb-0 opacity-80 text-left"
              style="margin-left:30px;"
            >PREVIEW</span>

            <div class="raised" style="border-radius:5px !important;overflow:hidden;margin:30px;">
              <div
                v-b-modal.modal-login
                style="cursor:pointer;min-height:300px;width:100%;background-size:cover;background-position:center;"
                v-if="media == ''"
                class="d-flex justify-content-center"
                :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }"
              >
                <div
                  class="my-auto raised bg-light br-25 text-center justify-content-center d-flex btn-login"
                >
                  <span class="my-auto fa fa-play"></span>
                </div>
              </div>
              <vue-plyr
                style="border-radius:5px;overflow:hidden;"
                v-else-if="media.includes('.mp4') "
              >
                <video
                  :src="media"
                  playsinline
                  controls
                  :poster="getThumbnailImage()"
                  style="width:100%;max-height:600px;margin:0px;border-radius:5px !important;overflow:hidden !important;"
                ></video>
              </vue-plyr>
              <vue-plyr v-else-if="media.includes('vimeo')">
                <div class="plyr__video-embed">
                  <iframe
                    style="height:calc(100vh - 500px) !important;"
                    :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                  ></iframe>
                </div>
              </vue-plyr>
              <vue-plyr
                style="overflow:hidden;border-radius:5px;"
                v-else-if="media.includes('youtube') "
              >
                <div
                  class="plyr__video-embed d-block"
                  style="overflow:hidden !important;border-radius:5px;"
                >
                  <iframe
                    style="overflow:hidden !important;border-radius:5px;display:block;"
                    :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                  ></iframe>
                </div>
              </vue-plyr>
            </div>
          </div>
          <div class="col-md-6 my-auto" my-auto justify-content-center text-center>
            <div v-if="$page.contentItem.requiredSubscription == null">
              <h3
                class="opacity-90 mt-2 d-none d-lg-inline-block"
              >You must sign in to to view this content.</h3>
              <h5
                class="opacity-90 mt-0 d-inline-block d-lg-none"
              >You must sign in to to view this content.</h5>
            </div>
            <div v-else>
              <h3
                class="opacity-90 mt-2 d-none d-lg-inline-block text-light"
              >Sign up or sign in to to view this content.</h3>
              <h5
                class="opacity-90 mt-0 d-inline-block d-lg-none text-light"
              >Sign up or sign to to view this content.</h5>
            </div>
            <div class="btn br-25 px-4 mt-3 mb-5 border-0 raised btn-shiny" v-b-modal.modal-login>
              Sign In
              <i class="fa fa-user ml-2"></i>
            </div>
            <a class="btn br-25 px-4 mt-3 mb-5 ml-2 border-0 raised btn-shiny" href="/pricing">
              Sign Up
              <i class="fa fa-sign-in ml-2"></i>
            </a>
          </div>
        </div>

        <div class="mx-0 px-0 d-block col-md-12 pb-3 mt-4 pt-1" v-else-if="media != null">
          <vue-plyr class="br-5" v-if="media.includes('.mp4') ">
            <video
              :src="media"
              playsinline
              controls
              :poster="getThumbnailImage()"
              style="width:100%;max-height:600px;margin:0px;border-radius:5px;"
            ></video>
          </vue-plyr>
          <vue-plyr class="br-5" style="overflow:hidden;" v-else-if="media.includes('vimeo')">
            <div class="plyr__video-embed">
              <iframe
                style="height:calc(100vh - 500px) !important;"
                :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
          <vue-plyr v-else-if="media.includes('vimeo')">
            <div class="plyr__video-embed">
              <iframe
                style="height:calc(100vh - 500px) !important;"
                :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
          <vue-plyr
            style="overflow:hidden;border-radius:5px;"
            v-else-if="media.includes('youtube')"
          >
            <div class="plyr__video-embed">
              <iframe
                :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
        </div>
      </div>
    </div>
    <div v-else>
      <b-card
        class="px-0 bg-dark card-image-tinted border-0 coverCard"
        style="width:100%;height:calc(100vh - 50px);                                                         
                background-size:cover;
                border-radius:0px !important;
                background-position:center !important;"
        :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }"
      >
        <div class="row h-100">
          <div class="col-sm-12 text-center my-auto">
            <h1
              class="d-none d-md-block text-white text-weight-800 text-shadow title"
            >{{ $page.contentItem.title }}</h1>
            <h2
              class="d-block d-md-none text-white text-weight-800 text-shadow title"
            >{{ $page.contentItem.title }}</h2>

            <div class="text-white py-4">
              <span class="description p-3">{{ $page.contentItem.description }}</span>
            </div>
            <span
              class="badge badge-pill px-3 py-2 mt-4 border text-light"
              style="z-index:999 !important;margin-left:0px;margin-top:5px;margin-bottom:25px;"
            >
              <i class="fa fa-fw fa-clock-o text-light mr-2"></i>
              <span>
                <span
                  v-if=" $page.contentItem.minutes_to_consume > 1"
                >{{ $page.contentItem.minutes_to_consume }} Minutes</span>
                <span v-else>{{ $page.contentItem.minutes_to_consume }} Minute</span>
              </span>
            </span>
            <br />
            <a data-scroll href="#more" class="scroll-button-down mt-4"></a>
          </div>
        </div>
      </b-card>
    </div>

    <div
      class="w-100"
      id="more"
      v-if="($page.contentItem.excerpt != null && $page.contentItem.excerpt != '') || media != null  || ($page.contentItem.content != null && $page.contentItem.content != '')"
    >
      <div
        class="row mx-0 mx-md-0 justify-content-center p-0 p-xl-0 test"
        v-if="$page.contentItem.content != null && $page.contentItem.content !== '' && $page.contentItem.content !== '\n' && $page.contentItem.requiredSubscription != null && $page.contentItem.requiredSubscription != ''"
      >
        <div
          v-if="premiumContent != null && premiumContent.error != true && $page.contentItem.content != null"
          class="content bg-none pt-0 px-3 px-md-3"
          v-bind:class="{ 'pt-5': hasVideo() == false }"
        >
          <v-runtime-template :template="template()"></v-runtime-template>
        </div>
        <div
          v-else-if="$page.contentItem.excerpt != null && $page.contentItem.excerpt != ''"
          v-html="$options.filters.markdown($page.contentItem.excerpt)"
          class="content bg-none pt-0 px-3 px-md-3"
          v-bind:class="{ 'pt-5': hasVideo() == false }"
        >{{ $options.filters.markdown($page.contentItem.excerpt) }}</div>
      </div>
      <div v-else>
        <v-runtime-template :template="template()"></v-runtime-template>
      </div>
    </div>

    <div v-if="$page.contentItem.topics != null" class="row">
      <div v-for="listedTopic in $page.contentItem.topics" v-bind:key="listedTopic" class="w-100">
        <div v-for="topic in $page.topics.edges" v-bind:key="topic" class="w-100">
          <div
            class="w-100"
            v-for="valueProposition in $page.valuePropositions.edges"
            v-bind:key="valueProposition"
          >
            <div
              class="bg-dark justify-content-center text-light text-center w-100 d-inline-flex"
              style="
                height:500px;                                     
                background-size:cover !important;
                background-position:center center;"
              :style="{ backgroundImage: `url('${valueProposition.node.cover_image}')` }"
            >
              <div class="w-100 my-auto py-0 px-2 pr-0 pr-lg-4 px-4">
                <h2 class="vp-title">{{ valueProposition.node.call_to_action_text }}</h2>

                <a
                  v-for="page in $page.pages.edges"
                  v-bind:key="page"
                  :href="'/' + page.node.slug"
                  v-on:click="convert(page.node.slug, valueProposition)"
                  class="d-inline-block btn btn-light btn-lg mt-3 raised br-25"
                >Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import socialSettings from "../../data/social.json";
import axios from "axios";
export default {
  components: {
    VRuntimeTemplate
  },
  data() {
    return {
      options: {},
      auth: null,
      window: null,
      relatedCollection: null,
      relatedCollections: null,
      relatedProductsCount: 0,
      premiumContent: null,
      media: null
    };
  },

  async mounted() {
    try {
      var URL = window.location.href;

      var arr = URL.split("/content/");
      //arr[0]='example.com'
      //arr[1]='event'
      //arr[2]='14aD9Uxp?p=10'

      var str = "/content/" + arr[1];
      //alert(str)
      const results = await this.$fetch(str);
      if (
        this.hasVideo() &&
        this.requiredSubscription != "" &&
        this.requiredSubscription != null
      ) {
        this.getPremiumContent(arr[1]);
      }

      //this.relatedCollections = results.data.contentItem.relatedCollections;
      //this.getRelatedCollection();
    } catch (error) {
      console.log(error);
    }
    this.window = window;
    this.addAnalyticEvent();
  },
  methods: {
    template(input) {
      return (
        "<div>" +
        this.$options.filters.markdown(this.$page.contentItem.content) +
        "</div>"
      );
    },
    hasVideo() {
      //return false;
      if (
        typeof this.media != "undefined" &&
        this.media != null &&
        this.media.length > 0 &&
        (this.media.includes("vimeo") ||
          this.media.includes("youtube") ||
          this.media.includes(".mp4"))
      ) {
        return true;
      } else {
        return false;
      }
    },
    convert(slug, valueProposition) {
      var data = { valueProposition: valueProposition.node.id };
      this.addAnalyticEvent("conversion", data);
      window.location.assign("/" + slug);
    },
    addAnalyticEvent(event, extraData) {
      if (event == null) {
        event = "content_view";
      }
      var token = null;
      var url = null;
      if (localStorage.auth != null) {
        var auth = JSON.parse(localStorage.auth);
        if (auth != null && auth.token != null) {
          token = auth.token;
        }
        var data = {};
        if (typeof extraData == "object") {
          var data = Object.assign(data, extraData);
        }
        data.url = encodeURI(this.window.location.href.split("#")[0]);
        data.contentItem = this.$page.contentItem.id;
        data.path = this.$page.contentItem.path;
        if (this.$page.contentItem.topics != null) {
          data.topics = this.$page.contentItem.topics;
        }
        data = JSON.stringify(data);
        if (typeof data != "undefined") {
          url =
            process.env.GRIDSOME_API_URL +
            "platformkit-analytics-event-v1" +
            "?token=" +
            token +
            "&event=" +
            event +
            "&data=" +
            data;
        } else {
          url =
            process.env.GRIDSOME_API_URL +
            "platformkit-analytics-event-v1" +
            "?token=" +
            token +
            "&event=" +
            event;
        }
      } else {
        url =
          process.env.GRIDSOME_API_URL +
          "platformkit-analytics-event-v1" +
          "?event=" +
          event +
          "&data=" +
          data;
      }

      console.log(data);

      try {
        axios
          .get(url)
          .then(response => console.log(response))
          .catch(function(error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getPremiumContent(file) {
      //alert(file);
      return null;
      try {
        var token = JSON.parse(localStorage.auth).token;
      } catch (err) {
        var token = null;
      }
      if (token != null) {
        //alert(token);
      }

      axios
        .get(
          "/.netlify/functions/platformkit-content-read-v1?file=" +
            this.$page.contentItem.id +
            "&token=" +
            token
        )
        .then(response => this.getMedia(response));
    },
    getMedia(response) {
      if (response == null || typeof response == "undefined ") {
      } else {
        this.premiumContent = response.data;
      }
      var media = null;
      if (
        this.premiumContent != null &&
        this.premiumContent.data != null &&
        this.premiumContent.data.attributes != null &&
        this.premiumContent.data.attributes.media_full != null
      ) {
        media = this.premiumContent.data.attributes.media_full;
      } else {
        media = this.$page.contentItem.media_preview;
      }
      this.media = media.toString();
      return media;
    },
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
      return true;
    },
    getThumbnailImage() {
      if (this.$page.contentItem.thumbnail_image != null) {
        return (
          process.env.GRIDSOME_APP_URL + this.$page.contentItem.thumbnail_image
        );
      }
      if (this.$page.contentItem.cover_image != null) {
        return (
          process.env.GRIDSOME_APP_URL + this.$page.contentItem.cover_image
        );
      } else {
        var url = null;
        return url;
      }
    },
    getRelatedCollection() {
      //if(this.relatedCollections.length >= 0) {
      this.relatedCollection = this.relatedCollections[
        Math.floor(Math.random() * this.relatedCollections.length)
      ];
      //}
    },
    getRelativeImageUrl(input) {
      var str = input;
      str = input.src;
      //str =  str.split('/images/').pop()
      //alert(str)
      return "" + str;
    },    
  },

  metaInfo() {
    
    return {
      title: this.$page.contentItem.title,
      //script: [{src: this.$page.contentItem.scripts, defer: true}],
      meta: [
        {
          name: "description",
          content: this.$page.contentItem.description
        },
        {
          name: "keywords",
          content: this.$page.contentItem.keywords
        },
        {
          property: "og:title",
          content: this.$page.contentItem.title
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
          cotent: this.$page.contentItem.description
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
      excerpt
      cover_image
      media_preview
      media_full
      minutes_to_consume
      requiredSubscription
      path
      topics      
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
  pages: allLandingPage(filter: { published: { eq: true }}) {
    edges {
      node {
        id        
        slug                
      }
    }
  }
  topics: allTopic(filter: { published: { eq: true }}) {
    edges {
      node {
        id        
        slug        
        valuePropositions                
      }
    }
  }
}
</page-query>

<style>
@media (min-width: 991px) {
  .contentItem .title {
    font-size: 400%;
  }
}

@media (max-width: 991px) {
  .contentItem .title {
    font-size: 275%;
  }
}
.contentItem .title {
  font-family: "DM Serif Text", serif !important;
  background: -webkit-linear-gradient(#fafaff, #fff);
  text-shadow: 0px 10px 30px rgba(16, 18, 51, 0.4),
    0px 3px 5px rgba(16, 18, 51, 0.1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contentItem .title.text-dark {
  box-shadow: 0px 0px 30px rgba(0, 50, 200, 0.05),
    0px 0px 10px rgba(0, 50, 200, 0.05);
  color: #000 !important;
  margin-top: 25px !important;
  text-align: center;
  background: #f9fafb;

  -webkit-background-clip: unset !important;
  background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  text-shadow: none !important;
  margin-bottom: 0px !important;
  padding: 30px 15px !important;
  margin-top: 0px !important;
  font-size: 150%;
  font-family: "Open Sans", serif !important;
  font-weight: 100 !important;
}

.contentItem .title.text-dark:after {
  content: "";
  background: linear-gradient(45deg, #669fe6, #0089ff29);
  box-shadow: 0px 0px 15px rgba(0, 150, 250, 0.2);
  width: 100%;
  max-width: 125px;
  display: none !important;
  height: 6px;
  margin: 15px auto 10px calc(50% - 62.5px);
  border-radius: 3px;
}

.subtitle {
  font-family: "DM Serif Text", serif !important;
  font-size: 180%;
  font-weight: 200 !important;
  text-shadow: 0px 3px 2px rgba(49, 51, 80, 0.25),
    1px 5px 4px rgba(20, 20, 56, 0.2) !important;
}

.description {
  max-width: 900px !important;
  display: inline-block;
  font-size: 133%;
  background: none !important;
  color: #fff !important;
}

.coverCard .card-body {
  background: radial-gradient(#09122065 0px, #00000000 100%);
}

.content a[href*="#"] {
  margin-left: -8px !important;
}

.content > * {
  max-width: 800px;
}

.content {
  padding: 50px !important;
}
</style>


<style lang="scss">
.plyr {
  max-height: calc(100vh - 300px) !important;
  max-width: 1200px !important;
  width: 100%;
}

:root {
  --plyr-color-main: #ffffff !important;
}

.plyr__control--overlaid,
.plyr--video .plyr__control.plyr__tab-focus,
.plyr--video .plyr__control:hover,
.plyr--video .plyr__control[aria-expanded="true"] {
  background-color: var(--plyr-color-main) !important;
}

.plyr--full-ui input[type="range"] {
  color: var(--plyr-color-main) !important;
}

.plyr__control--overlaid svg,
.plyr--video .plyr__control.plyr__tab-focus,
.plyr--video .plyr__control:hover,
.plyr--video .plyr__control[aria-expanded="true"] {
  fill: #333 !important;
  color: #333 !important;
}

.plyr__poster {
  background-size: cover !important;
}

.plyr--video {
  border-radius: 5px;
}

.plyr,
.plyr--full-ui,
.plyr--video,
.plyr--vimeo,
.plyr--fullscreen-enabled,
.plyr--paused,
.plyr--stopped,
.plyr__poster-enabled {
  margin-left: auto !important;
  margin-right: auto !important;
  padding-right: auto !important;
  padding-left: auto !important;
}

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

.content b,
.content strong {
  font-weight: 300 !important;
  background: #fffbc6 !important;
  color: #000 !important;
  padding: 3px 5px;
  border-radius: 4px;
  white-space: pre-wrap;
  display: inline !important;
}

.content a {
  color: #007bff;
  background: #fff;
  padding: 4px;
  border-radius: 3px;
  transition: all 0.3s;
}
.content a:hover {
  background: #007bff2e;
  text-decoration: none;
  box-shadow: 0px 3px 10px #007bff2e, 0px 3px 3px #1b30462e;
}

.btn-login {
  height: 50px;
  width: 50px;
  background-image: linear-gradient(0deg, rgba(0, 150, 200, 0.5) -20%, #fff);
}

.btn-shiny {
  background-image: linear-gradient(0deg, rgb(118, 138, 193) -20%, #fff 80%);
}

mark {
  background: #ffc10733 !important;
  border-radius: 3px;
  transition: 0.5s;
  padding: 0px 2px 0px 3px;
  white-space: pre-wrap;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
li:hover mark,
p:hover mark {
  background: #ffc10799 !important;
  transition: 0.5s;
}
</style>
