<template>
  <Layout>
    <div class="container mt-3 mt-lg-5">
      <div class="row pb-4 text-center mb-3 mt-2">
        <div class="col-md-12 col-lg-6 br-5 justify-content-center">
          <div
            :style="{ backgroundImage: `url('${$page.offering.cover_image}')` }"
            class="br-5 raised square-image d-inline-block"
            style="background-position:center;background-size:cover;height:500px;width:500px;"
          ></div>
        </div>
        <div
          class="col-md-12 col-lg-6 br-5 text-left pl-3 pl-sm-3 pl-md-5 py-0 py-lg-5 mt-3 mt-md-0"
        >
          <div
            class="badge badge-pill bg-very-light-blue border-primary-translucent px-3 py-2 text-primary text-capitalize"
          >{{ $page.offering.type }}</div>
          <br />
          <h4 class="my-3 ">{{ $page.offering.title}}</h4>
          <p v-if="$page.offering.description != null && $page.offering.description != ''" class="text-dark my-3 pb-4">{{ $page.offering.description }}</p>
          <div v-else class="mt-1 pt-1"></div>
          <hr class="my-3 mb-4" v-if="$page.offering.type != 'subscription'" />
          <div v-if="$page.offering.type == 'product' && ($page.offering.buy_button_html == null || $page.offering.buy_button_html == '') && ($page.offering.buy_button_url == null || $page.offering.buy_button_url == '')">
            <div class="btn btn-lg text-left pr-0 pl-0 ml-0 mb-3 price mr-4">
              <span>
                <span class="text-dark-blue opacity-30">$</span>
                <span class>{{ $page.offering.price }}</span>
              </span>
            </div>
            <br />
            <div
              class="d-inline-block"
              v-if="($page.offering.buy_button_html == null || $page.offering.buy_button_html == '') && ($page.offering.buy_button_url == null || $page.offering.buy_button_url == '')"
            >
              <stripe-checkout
                class="d-inline mr-2"
                ref="checkoutRef"
                :sessionId="sessionId"
                :pk="publishableKey"
                :successUrl="successUrl"
                :cancelUrl="cancelUrl"
              >
                <template slot="checkout-button">
                  <button class="btn btn-lg btn-light btn-buy raised px-4 btn-buy" @click="buy">
                    <font-awesome :icon="['fa', 'shopping-cart']" class="mr-4" />Buy Now
                  </button>
                </template>
              </stripe-checkout>
            </div>            
            <div
              v-else-if="$page.offering.buy_button_url != null && $page.offering.buy_button_html != ''"
              class="d-inline-block"
            >
              <a
                class="btn btn-lg btn-light btn-buy raised px-4 btn-buy m"
                :href="$page.offering.buy_button_url"
                target="_blank"
              >
                <font-awesome :icon="['fa', 'shopping-cart']" class="mr-4" />Buy Now
              </a>
            </div>
            <div
              v-else-if="$page.offering.buy_button_html != null"
              class="d-inline-block"
              v-html="$page.offering.buy_button_html"
            >{{ $page.offering.buy_button_html }}</div>
          </div>
          <div v-else-if="$page.offering.plans != null">
            <div v-for="edge, index in $page.plans.edges" v-if="$page.offering.plans.includes(edge.node.id)"
            class="bg-light border br-5 p-3" >
              <div class="btn btn-lg text-left pr-0 pl-0 ml-0 my-1 price mr-4">
              <span>
                <span class="opacity-80 text-dark">{{ edge.node.title }} </span>
                <span class="text-dark-blue opacity-30 ml-3">$</span>
                <span class>{{ edge.node.price }}</span>
              </span>
            </div>
            
              <stripe-checkout
                class="d-inline mr-2 pull-right"
                ref="checkoutRef"
                :sessionId="sessionId"
                :pk="publishableKey"
                :successUrl="successUrl"
                :cancelUrl="cancelUrl"
              >
                <template slot="checkout-button">
                  <button class="btn btn-lg btn-primary raised px-4 mt-1" @click="subscribe(edge.node.id)">
                    Subscribe<i class="fa fa-shopping-cart ml-3" ></i>
                  </button>
                </template>
              </stripe-checkout>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { StripeCheckout } from "vue-stripe-checkout";
import axios from "axios";
import socialSettings from "../../data/social.json";

export default {
  components: {
    StripeCheckout
  },
  data() {
    return {
      window: null,
      publishableKey: process.env.GRIDSOME_STRIPE_PUBLIC_KEY,
      cancelUrl: process.env.GRIDSOME_APP_URL,
      items: [],
      successUrl: process.env.GRIDSOME_APP_URL,
      checkoutSession: null,
      sessionId: null,
      socialSettings: socialSettings
    };
  },
  async mounted() {
    if (localStorage.auth != null) {
      //alert(typeof localStorage.auth);
      var auth = JSON.parse(localStorage.auth);
    }
    console.log(auth);
    this.window = window;
    this.cancelUrl = window.location.href;
    this.successUrl = window.location.href;
  },
  methods: {
    subscribe(plan) {
      
      var offeringString = this.$page.offering.id + '::' + plan;
      //alert(offeringString);
      
      var queryString = "";
      if (localStorage.auth != null) {
        //alert(typeof localStorage.auth);
        var email = JSON.parse(localStorage.auth).data.sub;
        queryString = "&email=" + email;
      }

      axios
        .get(
          "/.netlify/functions/platformkit-payments-checkout-v1?items=" +
            this.$page.offering.id + '::' + plan +
            queryString
        )
        .then(response => this.getCheckoutSession(response));
        
    },
    buy() {
      var queryString = "";
      if (localStorage.auth != null) {
        //alert(typeof localStorage.auth);
        var email = JSON.parse(localStorage.auth).data.sub;
        queryString = "&email=" + email;
      }

      axios
        .get(
          "/.netlify/functions/platformkit-payments-checkout-v1?items=" +
            this.$page.offering.id +
            queryString
        )
        .then(response => this.getCheckoutSession(response));
    },
    getCheckoutSession(response) {
      if (response == null || typeof response == "undefined ") {
      } else {
        this.checkoutSession = response.data;
        this.sessionId = this.checkoutSession.data.sessionID;
        this.checkout();
      }
    },
    getThumbnailImage() {
      if (this.$page.offering.thumbnail_image != null) {
        return (
          process.env.GRIDSOME_APP_URL +
          "/files/" +
          this.$page.offering.thumbnail_image
        );
      }
      if (this.$page.offering.cover_image != null) {
        return (
          process.env.GRIDSOME_APP_URL +
          "/files/" +
          this.$page.offering.cover_image
        );
      } else {
        return "";
      }
    },  
    checkout() {
      //console.log(this.$refs);

      // TURN BACK ON:
      this.$refs.checkoutRef[0].redirectToCheckout();
    }
  },
  metaInfo() {
    return {
      title: this.$page.offering.title,
      meta: [
        {
          name: "description",
          content: this.$page.offering.description
        },
        {
          name: "keywords",
          content: this.$page.offering.keywords
        },
        {
          property: "og:title",
          content: this.$page.offering.title
        },
        {
          name: "twitter:card",
          content: this.getThumbnailImage() ? "summary_large_image" : "summary"
        },
        {
          name: "twitter:creator",
          content: "@" + socialSettings.twitter || null
        },
        {
          property: "og:description",
          cotent: this.$page.offering.description
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
query Offering ($id: ID!) {
  offering (id: $id) {
      id
      title
      slug
      date (format: "D. MMMM YYYY")
      timeToRead
      keywords
      featured    
      type
      price
      plans
      boost
      description
      cover_image
      path
      buy_button_html
      buy_button_url
      tags {
        id
        title
        path
      }
  }
  plans: allSubscriptionPlan(sortBy: "price", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        price
        published
        featured
        path        
      }
    }
  }
}
</page-query>


<style lang="scss">
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
</style>
