<template>
  <Layout>
    <div class="container mt-3 mt-lg-5">
      <div class="row pb-4 text-center mb-3 mt-2">
        <div class="col-md-12 col-lg-6 br-5 justify-content-center">
          <div
            :style="{ backgroundImage: `url('${getImage()}')` }"
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
          <h4 class="my-3">{{ $page.offering.title}}</h4>
          <p
            v-if="$page.offering.description != null && $page.offering.description != ''"
            class="text-dark my-3 pb-4"
          >{{ $page.offering.description }}</p>
          <div v-else class="mt-1 pt-1"></div>

          <div
            v-if="$page.offering.buy_button_url != null && $page.offering.buy_button_url != ''"
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
            v-else-if="$page.offering.buy_button_html != null && $page.offering.buy_button_html != ''"
            class="d-inline-block"
            v-html="$page.offering.buy_button_html"
          >{{ $page.offering.buy_button_html }}</div>

          <div
            v-if="$page.offering.type == 'product' && ($page.offering.buy_button_html == null || $page.offering.buy_button_html == '') && ($page.offering.buy_button_url == null || $page.offering.buy_button_url == '')"
            class="w-100"
          >
            <div
              class="d-block w-100"
              v-if="$page.offering.variants == null && ($page.offering.buy_button_html == null || $page.offering.buy_button_html == '') && ($page.offering.buy_button_url == null || $page.offering.buy_button_url == '')"
            >
              <div class="bg-light border br-5 p-3 w-100 d-block">
                <div class="btn btn-lg text-left pr-0 pl-0 ml-0 my-2 price mr-4">
                  <span>
                    <span class="text-dark-blue opacity-30">$</span>
                    <span class>{{ $page.offering.price }}</span>
                  </span>
                </div>
                <stripe-checkout v-if="window != null"
                  class="d-inline mr-2"
                  ref="checkoutRef"
                  :sessionId="sessionId"
                  :pk="publishableKey"
                  :successUrl="successUrl"
                  :cancelUrl="cancelUrl"
                >
                  <template slot="checkout-button">
                    <button
                      class="btn btn-lg btn-light btn-buy raised px-4 btn-buy pull-right my-2"
                      @click="buy"
                    >
                      Buy Now
                      <i class="fa fa-caret-right opacity-30 text-light ml-3"></i>
                      <i class="fa fa-shopping-cart ml-3"></i>
                    </button>
                  </template>
                </stripe-checkout>
              </div>
            </div>
            <div class="d-block w-100" v-if="$page.offering.variants != null">
              <div
                class="bg-light border br-5 p-3 w-100 d-block mb-2 text-right"
                v-for="variant in $page.offering.variants"
                v-b-toggle="'collapse-' + variant.id"
                style="cursor:pointer;"
                v-bind:key="variant.id"
                @mouseover="setImage(variant.image)"
                @mouseleave="clearImage()"
              >
                <div
                  :style="{ backgroundImage: `url('${ variant.image}')` }"
                  v-if="variant.image != null"
                  class="br-5 pull-left d-inline mr-3 my-2 ml-2"
                  style="height:50px;width:50px;background-size:cover !important;background-position:center;"
                ></div>
                <div class="btn btn-lg pull-left pr-0 pl-0 ml-0 my-2 price mr-4">
                  <span>
                    <span class="text-dark-blue opacity-30">$</span>
                    <span class>{{ variant.price }}</span>
                    <span
                      class="ml-2 opacity-50"
                      style="font-size:80%;"
                      v-if="variant.name != null && variant.name != ''"
                    >{{ variant.name }}</span>
                  </span>
                </div>
                <stripe-checkout
                  v-if="customerEmail != null && window != null"
                  class="d-inline mr-2"
                  ref="checkoutRef2"
                  :items="items"
                  :pk="publishableKey"
                  :successUrl="successUrl"
                  :cancelUrl="cancelUrl"
                  :customerEmail="customerEmail"
                >
                  <template slot="checkout-button">
                    <button
                      class="btn btn-lg btn-light btn-buy raised px-4 btn-buy my-2"
                      @click="buy(variant)"
                    >
                      Buy Now
                      <i class="fa fa-caret-right opacity-30 text-light ml-3"></i>
                      <i class="fa fa-shopping-cart ml-3"></i>
                    </button>
                  </template>
                </stripe-checkout>
                <stripe-checkout
                  v-else-if="window != null"
                  class="d-inline mr-2"
                  ref="checkoutRef2"
                  :items="items"
                  :pk="publishableKey"
                  :successUrl="successUrl"
                  :cancelUrl="cancelUrl"
                >
                  <template slot="checkout-button">
                    <button
                      class="btn btn-lg btn-light btn-buy raised px-4 btn-buy my-2"
                      @click="buy(variant)"
                    >
                      Buy Now
                      <i class="fa fa-caret-right opacity-30 text-light ml-3"></i>
                      <i class="fa fa-shopping-cart ml-3"></i>
                    </button>
                  </template>
                </stripe-checkout>

                <div class="w-100 text-left" v-if="variant.attributes != null">
                  <b-collapse :id="'collapse-' + variant.id" class="mt-2">
                    <span
                      class="badge badge-dark text-capitalize mr-2"
                      v-for="attribute in variant.attributes"
                      v-bind:key="attribute.key"
                    >
                      <span class="opacity-40 mr-2 text-uppercase">{{ attribute.key }}</span>
                      {{ attribute.value }}
                    </span>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="$page.offering.plans != null">
            <div
              v-for="edge, index in $page.plans.edges"
              v-if="$page.offering.plans.includes(edge.node.id)"
              class="bg-light border br-5 p-3"
            >
              <div class="btn btn-lg text-left pr-0 pl-0 ml-0 my-1 price mr-4">
                <span>
                  <span class="text-dark-blue opacity-30">$</span>
                  <span class>
                    {{ edge.node.price }}
                    <span
                      class="opacity-30 mr-2"
                      style="font-size:80%;"
                    >/ {{ edge.node.interval }}</span>
                  </span>
                  <span class="opacity-80 text-dark" style="font-size:80%;">{{ edge.node.title }}</span>
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
                  <button
                    class="btn btn-lg btn-primary raised px-4 mt-1 btn-buy"
                    @click="subscribe(edge.node.id)"
                  >
                    Subscribe
                    <i class="fa fa-caret-right opacity-30 text-light ml-3"></i>
                    <i class="fa fa-shopping-cart ml-3"></i>
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
import { StripeCheckout } from "../../node_overwrites/vue-stripe-checkout/vue-stripe-checkout";
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
      successUrl: null,
      checkoutSession: null,
      sessionId: null,
      socialSettings: socialSettings,
      image: null,
      customerEmail: null
    };
  },
  async mounted() {
    if (localStorage.auth != null) {
      //alert(typeof localStorage.auth);
      var auth = JSON.parse(localStorage.auth);
    }
    if(auth != null && auth.data != null && auth.data.sub != null){
      this.customerEmail = auth.data.sub;
    }
    console.log(auth);
    if(window != null){
    this.window = window;
      this.cancelUrl = window.location.href;
      this.successUrl = window.location.href;
    }

    var successUrl = process.env.GRIDSOME_APP_URL + '/success';
    successUrl = successUrl.replace('//success', '/success');
    this.successUrl = successUrl;
  },
  methods: {
    subscribe(plan) {
      var offeringString = this.$page.offering.id + "::" + plan;
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
            this.$page.offering.id +
            "::" +
            plan +
            queryString
        )
        .then(response => this.getCheckoutSession(response));
    },
    buy(variant) {
      console.log(variant);
      console.log(variant.id);
      var obj = {};
      /* obj.sku = variant.id;
      obj.quantity = 1;
      obj.name = variant.name;
      */
      obj.sku = variant.id;
      obj.quantity = 1;

      this.items.push(obj);

      this.$refs.checkoutRef2[0].redirectToCheckout();
    },
    getCheckoutSession(response) {
      if (response == null || typeof response == "undefined ") {
      } else {
        this.checkoutSession = response.data;
        this.sessionId = this.checkoutSession.data.sessionID;
        this.checkout();
      }
    },
    setImage(input) {
      this.image = input;
    },
    clearImage() {
      this.image = this.$page.offering.cover_image;
    },
    getImage() {
      if (this.image == null) {
        this.image = this.$page.offering.cover_image;
      }
      return this.image;
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
      variants {
        id
        name
        price
        image
        attributes {
          key
          value
        }
      }
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
        interval
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
