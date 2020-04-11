<template>
  <Layout>
    <div
      class="d-inline-block justify-content-center text-center"
      v-if="($page.contentItem.media_full != null && $page.contentItem.media_full != '') || ($page.contentItem.media_preview != null && $page.contentItem.media_preview  != '') "
      style="width:100%;min-height:330px;height:auto;background-size:cover !important;background-position:center;display:block;"
    >
      <div
        style="pointer-events:none;position:absolute;top:0px;left:-100px;height:500px;cursor:pointer;background:#000;min-height:300px;width:100%;background-size:cover;background-position:center;z-index:0 !important;filter:blur(50px) contrast(200%);opacity:0.35;width:calc(100% + 200px);"
        v-if="$page.contentItem.cover_image != null && $page.contentItem.cover_image != null != ''"
        class="d-flex justify-content-center"
        :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }"
      ></div>
      <div class="container">
        <div
          class="row"
          style="min-height:600px;"
          v-if="media!= null && premiumContent != null && premiumContent.error == true"
        >
          <div class="col-md-6 m-auto justify-content-center text-left px-4 mb-0 pb-0">
            <span
              class="badge badge-pill badge-primary px-3 bg-light-blue text-primary pull-left mb-0 opacity-80 text-left"
              style="margin-left:30px;"
            >PREVIEW</span>
            <span
              class="badge px-3  pull-left mb-0 opacity-80 text-left"
              style="margin-left:0px;color:#000;"
            >{{ $page.contentItem.title }}</span>
            <div class="raised" style="border-radius:5px !important;overflow:hidden;margin:30px;">
              <div
                v-b-modal.modal-login
                style="cursor:pointer;background:#000;min-height:300px;width:100%;background-size:cover;background-position:center;"
                v-if="media == ''"
                class="d-flex justify-content-center"
                :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }"
              >
                <div
                  class="my-auto raised bg-light br-25 text-center justify-content-center d-flex"
                  style="height:50px;width:50px;background-image:linear-gradient(0deg, rgba(0,150,200,0.5) -20%, #fff);"
                >
                  <span class="my-auto fa fa-play"></span>
                </div>
              </div>
              <vue-plyr style="background:#000;" v-else-if="media.includes('.mp4') ">
                <video
                  :src="media"
                  playsinline
                  controls
                  style="width:100%;max-height:600px;margin:0px;border-radius:5px;"
                ></video>
              </vue-plyr>
              <vue-plyr style="background:#000;" v-else-if="media.includes('vimeo')">
                <div class="plyr__video-embed">
                  <iframe
                    style="height:calc(100vh - 300px) !important;"
                    :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                  ></iframe>
                </div>
              </vue-plyr>
              <vue-plyr
                style="background:#000;overflow:hidden;border-radius:5px;"
                v-else-if="media.includes('youtube') "
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
          <div class="col-md-6 my-auto" my-auto justify-content-center text-center>
            <h3
              class=" opacity-90 mt-2 d-none d-lg-inline-block"
            >You must sign in to to view this content.</h3>
            <h5
              class=" opacity-90 mt-0 d-inline-block d-lg-none"
            >You must sign in to to view this content.</h5>
            <div class="btn br-25 px-4 mt-3 mb-5 border-0 raised" style="background-image:linear-gradient(0deg, rgba(0,150,200,0.25) -20%, #fff 80%);" v-b-modal.modal-login>
              Sign In
              <i class="fa fa-sign-in ml-2"></i>
            </div>
          </div>
        </div>

        <div class="mx-0 px-0 d-block col-md-12 pb-3 mt-4 pt-1" v-else-if="media != null">
          <vue-plyr class="br-5" style="background:#000;" v-if="media.includes('.mp4') ">
            <video
              :src="media"
              playsinline
              controls
              style="width:100%;max-height:600px;margin:0px;border-radius:5px;"
            ></video>
          </vue-plyr>
          <vue-plyr
            class="br-5"
            style="overflow:hidden;background:#000;"
            v-else-if="media.includes('vimeo')"
          >
            <div class="plyr__video-embed">
              <iframe
                style="height:calc(100vh - 300px) !important;"
                :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
          <vue-plyr style="background:#000;" v-else-if="media.includes('vimeo')">
            <div class="plyr__video-embed">
              <iframe
                style="height:calc(100vh - 300px) !important;"
                :src="media + '?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media'"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
          <vue-plyr
            style="background:#000;overflow:hidden;border-radius:5px;"
            v-else-if="media.includes('youtube')"
          >
            123
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
      <div class="w-100 bg-none d-block" style="height:45px;"></div>
    </div>
    <div v-else>
      <b-card
        class="mb-4 px-0 bg-dark card-image-tinted border-0"
        style="width:100%;height:500px;                                                         
                background-size:cover;
                border-radius:0px !important;
                background-position:center !important;"
        :style="{ backgroundImage:
                  'url('+ $page.contentItem.cover_image + ')'
                 }"
      >
        <div class="row h-100">
          <div class="col-sm-12 text-center" style="margin-top:150px;">
            <h1
              class="d-none d-md-block text-white text-weight-300 text-shadow"
            >{{ $page.contentItem.title }}</h1>
            <h2
              class="d-block d-md-none text-white text-weight-300 text-shadow"
            >{{ $page.contentItem.title }}</h2>
            <div
              class="badge badge-pill badge-dark border-0 px-3 py-2 text-white opacity-90 mt-3 text-weight-400 bg-black"
              style="font-size:85%;"
            >{{ $page.contentItem.subtitle }}</div>
            <br />
            <a data-scroll href="#more" class="scroll-button-down mt-4"></a>
          </div>
        </div>
      </b-card>
    </div>

    <div class="container">
      <div class="row mx-0 mx-md-0 justify-content-center">
        <div
          id="more"
          class="col-md-12 bg-white br-5 py-5 p-md-5 mb-0 text-center"
          style="font-size:115%; margin-top:-50px;z-index:9; box-shadow:0px -20px 30px rgba(0,50,100,0.1)"
        >
          <div v-if="media != '' && media != null">
            <h4 class="d-block text-dark text-weight-300">{{ $page.contentItem.title }}</h4>
            <p
              class="py-2 text-dark text-weight-400 mb-2"
              style="font-size:100%;"
            >{{ $page.contentItem.subtitle }}</p>
          </div>
          {{ $page.contentItem.description }}
        </div>
        <div
          v-if="premiumContent != null && premiumContent.error != true"
          class="content col-md-9 bg-none border-top mt-3 pt-5 px-3 p-md-5"
          v-html="$page.contentItem.content"
        >{{ $page.contentItem.content }}</div>
        <div
          v-else
          v-html="$options.filters.markdown($page.contentItem.excerpt)"
          class="content col-md-9 bg-none border-top mt-3 pt-5 px-3 p-md-5"
        >{{ $options.filters.markdown($page.contentItem.excerpt) }}</div>
      </div>
    </div>

    <!-- Recent posts -->
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      relatedCollection: null,
      relatedCollections: null,
      relatedProductsCount: 0,
      premiumContent: null,
      media: null
    };
  },
  components: {},

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
      this.getPremiumContent(arr[1]);

      //this.relatedCollections = results.data.contentItem.relatedCollections;
      //this.getRelatedCollection();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getPremiumContent(file) {
      //alert(file);
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
          "https://www.dharmaworks.com" +
          this.$page.contentItem.thumbnail_image.src
        );
      }
      if (this.$page.contentItem.cover_image != null) {
        return (
          "https://www.dharmaworks.com" + this.$page.contentItem.cover_image.src
        );
      } else {
        return "";
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
    }
  },
  metaInfo() {
    return {
      title: this.$page.contentItem.title,
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
.plyr {
  max-height: calc(100vh - 300px) !important;
  max-width: 1200px !important;
  width: 100%;
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
</style>
