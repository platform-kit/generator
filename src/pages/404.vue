<template>
  <Layout :show-logo="false">
    <div class="container">
      <div class="row w-100 text-center mx-auto">
        <h2 class="justify-content-center text-center w-100 text-weight-200 mb-5 mt-4 pt-4 mr-3 text-dark-blue">Error 404</h2>
        <h3 class="w-100 text-dark-blue opacity-50 text-center pb-5 mb-4">Page Not Found</h3>
      </div>
    </div>
  </Layout>
</template>



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
  created() {},
  async mounted() {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  metaInfo: {
    title: 'Page Not Found'  
  }
};
</script>