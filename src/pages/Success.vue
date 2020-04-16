<template>
  <Layout :show-logo="false">
    <div class="container mb-5" >
      <div class="d-flex">
        <div class="row w-100 text-center w-100 mx-auto">
          <h2 class="justify-content-center text-center w-100 text-weight-200 pt-3 px-3 my-3">
            <i class="text-success opacity-80 fa fa-check-circle mr-3"></i>Payment Complete
          </h2>
          <div
            class="card justify-content-center w-100 col-md-6 mx-auto mt-3 br-5 border-0 raised mb-3"
            style="background:#f0fff9;"
          >
            <div class="card-body">
              Your payment was succesful. Thank you for your support!
              <span v-if="email != null">
                <br />An confirmation has been sent to
                <br />
                <strong>{{ email || 'your email.' }}</strong>
              </span>
              <span v-else>
                <br />Check your email for a confirmation.
              </span>
            </div>
          </div>
          <div class="row w-100 mt-3 d-flex" v-if="planId != null && planId != 'undefined' && productId != null &&  productId != 'undefined'">
            <div class="col-md-6 mx-auto justify-content-center">
              <h5>Order Details</h5>

              
                <h6 class="mb-4 pb-2">You have subscribed to...</h6>
                <div
                  v-for="subscription in $page.subscriptions.edges"
                  v-if="subscription.node.id == productId"
                  :key="subscription.node.id"
                  class="w-100 justify-content-center text-left"
                >
                  <span class="badge badge-dark  badge-pill px-3 mr-1">Product Name</span>
                  <span class="badge">{{ subscription.node.title }}</span>
                  <br />

                  <span class="badge badge-dark badge-pill px-3 mr-1">Product ID</span>
                  <span class="badge">{{ subscription.node.id }}</span>
                  <br />

                  <span class="badge badge-dark badge-pill px-3 mr-1">Plan ID</span>
                  <span class="badge">{{ planId }}</span>
                  <br />
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  subscriptions: allOffering(sort: [{ by: "price" }, { by: "boost" }] order: DESC, filter: { featured: { eq: true }, type: { eq: "subscription"} }) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        published
        featured
        boost
        type
        description
        cover_image
        path  
      }
    }
  }  
}
</page-query>

<script>
export default {
  data() {
    return {
      window: null,
      email: null,
      productId: null,
      planId: null,
      vars: null
    };
  },
  async mounted() {
    this.window = window;
    this.vars = this.getUrlVars();
    var planId = decodeURI(this.getUrlVars()["planId"]);
    if (typeof planId != "undefined") {
      this.planId = planId;
    }
    var productId = decodeURI(this.getUrlVars()["productId"]);
    if (typeof productId != "undefined") {
      this.productId = productId;
    }
    if (localStorage.auth != null) {
      this.email = JSON.parse(localStorage.auth).data.sub;
    }
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
    getUrlVars() {
      var vars = {};
      var parts = this.window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function(m, key, value) {
          vars[key] = value;
        }
      );
      console.log("Vars:");
      console.log(vars);
      return vars;
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

<style scoped>
.badge-dark {
  min-width: 120px;
  text-align: left;
}
</style>