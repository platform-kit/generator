<template>
  <Layout :show-logo="false">
    <div class="container">
      <div class="row w-100 text-center">
        <h2
          class="justify-content-center text-center w-100 text-weight-200 pt-3 mt-3"
        >Terms of Service</h2>
      </div>
      <div
        v-if="legalSettings != null && legalSettings.terms != null"
        id="terms"
        class="p-5"
        v-html="$options.filters.markdown(legalSettings.terms)"
      >{{ legalSettings.terms }}</div>
    </div>
  </Layout>
</template>

<script>
import legalSettings from "../../data/legal.json";

export default {
  data() {
    return {
      legalSettings: legalSettings,
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
  metaInfo: {
    title: "Terms of Service"
  },
  methods: {
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
