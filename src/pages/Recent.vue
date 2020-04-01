<template>
  <Layout :show-logo="false">
    <div class="container py-3">
      <div class="row w-100 justify-content-center text-center">
        <h2 class="p-4 text-weight-200 ml-3">
          <a href="/">
            <img
              src="/images/logo.svg"
              style="max-width:300px;"
              v-on:click="window.location.assign(edge.node.link)"
              class="col-6 mb-4 pb-1 justify-content-center"
            />
          </a>
          <br />Recent Activity
        </h2>
      </div>
      <div class="row justify-content-center mx-auto" style="max-width:330px">
        <div
          v-on:click="window.location.assign(edge.node.link)"
          class="col-4 mx-auto border-light-blue image-grid-square"
          v-for="edge, index in $page.featuredSocialPosts.edges"
          v-bind:key="edge.node.id"
          :style="{ backgroundImage: `url('${getImageUrl(edge.node)}')` }"
        >&nbsp;</div>
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
        slug
        date (format: "D. MMMM YYYY")        
        featured        
        description
        cover_image
        thumbnail_image
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
  featuredSocialPosts: allSocialPost(sortBy: "date", order: DESC, filter: { published: { eq: true }, featured: { eq: true }}) {
    edges {
      node {
        id
        title
        date
        link        
        featured        
        description        
        thumbnail_image
        path        
      }
    }
  }       
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Recent Activity"
  },
  data() {
    return {
      window: null
    };
  },
  async mounted() {
    try {
      this.window = window;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getImageUrl(node) {
      var result = null;
      if (node.thumbnail_image != null) {
        result = node.thumbnail_image;
      }
      if (result == null) {
        if (node.cover_image != null) {
          result = node.cover_image;
        }
      }
      return result;
    }
  }
};
</script>

<style scoped>
#inline-search {
  max-width: 300px;
  border-radius: 25px;
}
.image-grid-square {
  background-color: #eee;
  border-radius: 3px;
  min-height: 100px !important;
  max-width: 100px !important;
  background-position: center;
  background-size: cover;
  float: left;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>