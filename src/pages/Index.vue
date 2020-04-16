<template>
  <Layout :show-logo="false">
    <div
      class="px-4 bg-none d-flex"
      style="height:100%;min-height:calc(100vh - 80px)"
      v-if="redirecting == true"
    >
      <h3
        class="justify-content-center my-auto w-100 text-center text-dark-blue opacity-20"
        style="position:relative;top:-40px !important;"
      >Please Wait...</h3>
    </div>
  </Layout>
</template>

<page-query>
query {  
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

      if (this.themeSettings.hasOwnProperty("homepage")) {
        this.redirectToLandingPage(this.themeSettings.homepage);
      } else {
        window.location.assign("/content");
        this.redirecting = redirecting;
      }
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