<template>
  <div id="app" class="gradient-light-green-to-white">
    <client-only>
      <header class="header">
        <b-navbar
          v-if="currentPage != 'recent'"
          sticky
          toggleable="lg"
          class="w-100 p-3 bg-white text-dark border-bottom raised-nav"
          type="light"
          variant="light"
          style
        >
          <div class="container">
            <a
              href="/"
              class="m-0 ml-xs-2 p-0 text-decoration-none"
              v-on:click="this.search = null"
            >
              <g-image
                v-if="brandSettings != null && brandSettings.logo"
                :src="brandSettings.logo"
                style="transform:scale(1.5);margin-left:25px;margin-top:-5px;width:100%;max-width:90px;max-height:40px;display:inline-block;"
              />
              <span class="text-dark opacity-80" v-else>{{ companySettings.name || 'PlatformKit' }}</span>
            </a>

            <a
              href="#"
              class="nav-link snipcart-checkout d-inline-block d-sm-none text-primary"
              v-if="count > 0"
              style="position:absolute !important;top:22px;right:75px;"
            >
              <font-awesome :icon="['fa', 'shopping-cart']" class="text-primary opacity-50" />
              <span class="d-none d-md-inline-block">Cart</span>
              <div
                class="badge badge-pill text-white mt-1 mb-1 ml-1 mr-0"
                v-if="count > 0"
                style="float:right;position:relative;top:-1px;left:5px;display:block;border-radius:25px;height:auto;width:auto;"
                v-bind:class="{ 'badge-danger': count > 0 }"
              >{{ count }}</div>
            </a>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <g-link to="/content" exact class="nav-link" v-on:click="this.search = null">
                  <div
                    class="badge badge-pill bg-light-blue text-dark-blue m-1 d-none d-xl-inline"
                    v-if="hasNewContent"
                    style="position:relative;top:-1px;right:5px;"
                  >
                    <span class="d-none">{{ newContent.length }}</span>New
                  </div>Content
                </g-link>
                <g-link to="/products" class="nav-link" v-on:click="this.search = null">Products</g-link>
                <g-link to="/services" class="nav-link" v-on:click="this.search = null">Services</g-link>
                <g-link to="/pricing" class="nav-link" v-on:click="this.search = null">Pricing</g-link>

                <b-dropdown
                  block
                  right
                  menu-class="w-100 m-0"
                  v-if="auth != null"
                  id="dropdown-user-account"
                  variant="neutral"
                  :html="auth.data.sub.substr(0, 22) + '...' "
                  style="padding:0px !important;"
                  class="my-auto text-dark nav-link p-0 mx-0 mx-lg-3 d-inline-block"
                >
                  <b-dropdown-item href="#logout" @click="logout()">
                    Sign Out
                    <i class="text-danger fa fa-sign-out m-1 pull-right"></i>
                  </b-dropdown-item>
                </b-dropdown>
                <a href="#login" v-b-modal.modal-login class="nav-link mr-2" v-else>
                  <i class="fa fa-user opacity-50 text-dark mr-1"></i>
                  Login
                </a>

                <a href="#" class="nav-link snipcart-checkout mr-2 text-primary d-none d-sm-block" v-if="count > 0">
                  <font-awesome
                    :icon="['fa', 'shopping-cart']"
                    class="text-primary opacity-50 mr-2"
                  /><span class="d-none d-xl-inline">Cart</span>
                  <div
                    class="badge badge-pill text-white mt-1 mb-1 ml-1 mr-0"
                    style="float:right;position:relative;top:-1px;left:5px;display:block;border-radius:25px;height:auto;width:auto;"
                    v-bind:class="{ 'badge-danger': count > 0 }"
                  >{{ count }}</div>
                </a>
                <form class="form-inline my-2 my-lg-0">
                  <input
                    class="form-control mr-sm-2"
                    style="height:42px;"
                    type="search"
                    v-model="search"
                    @change="updateSearch"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
                <g-link
                  v-if="socialSettings != null && socialSettings.facebok != null"
                  class="nav-item btn btn-light btn-outline-light text-dark d-none d-xl-inline-block"
                  :to="'https://facebook.com/' + socialSettings.facebook"
                >
                  <i class="fa fa-facebook"></i>
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.instagram != null"
                  class="nav-item btn btn-light btn-outline-light text-dark d-none d-xl-inline-block"
                  :to="'https://instagram.com/' + socialSettings.instagram"
                >
                  <i class="fa fa-instagram"></i>
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.twitter != null"
                  class="nav-item btn btn-light btn-outline-light text-dark d-none d-xl-inline-block"
                  :to="'https://twitter.com/' + socialSettings.twitter"
                >
                  <i class="fa fa-twitter"></i>
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.github != null"
                  class="nav-item btn btn-light btn-outline-light text-dark d-none d-xl-inline-block"
                  :to="'https://github.com/' + socialSettings.github"
                >
                  <i class="fa fa-github"></i>
                </g-link>
              </b-navbar-nav>
            </b-collapse>
          </div>
        </b-navbar>
      </header>

      <main class="main px-0 pt-0" v-if="search == null || search == ''">
        <slot />
      </main>

      <div id="searchResults" v-if="search != null && search != ''">
        <div class="container">
          <div class="row w-100 text-center">
            <h2
              class="justify-content-center text-center w-100 text-weight-200 pt-3 mt-3"
            >Search Results</h2>
            <p class="w-100">
              <span class="opacity-50">You searched for</span>
              <span class="d-none d-md-inline-block">
                "{{ search }}"
                <span class="opacity-50">.</span>
              </span>
              <span class="opacity-50 d-inline-block d-md-none">...</span>
            </p>
            <p class="w-100 px-5">
              <input
                class="form-control d-inline-block d-md-none"
                type="search"
                v-model="search"
                @change="updateSearch"
                placeholder="Search"
                aria-label="Search"
              />
            </p>
          </div>
          <div id="contentResults">
            <ul class="list-group my-3 p-0">
              <li
                class="list-group-item p-0 border-0"
                v-for="edge, index in $static.offerings.edges"
                v-if="containsSearch(edge.node)"
              >
                <div class="row mt-3 ml-0">
                  <span class="col-12">
                    <div class="col-2">
                      <span
                        v-if="edge.node.cover_image != null"
                        style="width:80px; height:80px; background-size:cover;background-position:center;float:left;"
                        :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                        class="br-5 search-image"
                      ></span>
                    </div>
                    <div class="col-10">
                      <a
                        class="search-link"
                        @click="clearSearch"
                        :href="'/buy/' + edge.node.slug"
                      >{{ edge.node.title }}</a>
                      <br />
                      <span class="pt-3">
                        {{ edge.node.description }}
                        <br />
                        <a
                          class="btn btn-sm mt-3 btn-outline-primary text-capitalize mb-3"
                          style="float:right;"
                          @click="clearSearch"
                          :href="'/buy/' + edge.node.slug"
                        >View {{ edge.node.type }} →</a>
                      </span>
                    </div>
                  </span>
                </div>
              </li>
              <li
                class="list-group-item p-0 border-0"
                v-for="edge, index in $static.content.edges"
                v-if="containsSearch(edge.node)"
              >
                <div class="row mt-3 ml-0">
                  <span class="col-12">
                    <div class="col-2">
                      <span
                        v-if="edge.node.cover_image != null"
                        style="width:80px; height:80px; background-size:cover;background-position:center;float:left;"
                        :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                        class="br-5 search-image"
                      ></span>
                    </div>
                    <div class="col-10">
                      <a
                        class="search-link"
                        @click="clearSearch"
                        :href="'/content/' + edge.node.slug"
                      >{{ edge.node.title }}</a>
                      <br />
                      <span class="pt-3">
                        {{ edge.node.description }}
                        <br />
                        <a
                          class="btn btn-sm mt-3 btn-outline-primary text-capitalize mb-3"
                          style="float:right;"
                          @click="clearSearch"
                          :href="'/content/' + edge.node.slug"
                        >View {{ edge.node.type }} →</a>
                      </span>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <b-modal id="modal-login" title="Sign In" style="z-index:99999 !important;">
        <div class="pb-4 px-4 text-center" v-if="authRequestStatus != null && authRequest == null">
          <div class="m-auto justify-content-center">
            <i class="fa fa-spinner fa-spin text-dark"></i>
          </div>
        </div>
        <div class="pb-4 px-4 text-center" v-if="authRequest == null">
          <i class="fa fa-envelope text-primary opacity-50 mb-0"></i>
          <br />
          <p class="mb-4 mt-2 mx-auto text-center pb-2">Enter your email to continue.</p>
          <b-input-group class="mt-1">
            <template v-slot:prepend>
              <b-input-group-text class="bg-light">
                <strong class="text-dark opacity-50">
                  <i class="fa fa-envelope"></i>
                </strong>
              </b-input-group-text>
            </template>
            <b-form-input autocomplete="off" placeholder="tony.stark@marvel.com" v-model="email"></b-form-input>
          </b-input-group>
        </div>
        
        <div class="pb-4 px-4 text-center my-auto" v-else>
          <i class="fa fa-check text-success opacity-90 mb-2"></i>
          <br />
          <span class="text-dark mb-2 d-block">Check your e-mail.</span>
          A login link has been sent to the e-mail you provided:
          <span
            class="text-weight-500 mt-2 d-block"
          >{{ email }}</span>
        </div>
        <template v-slot:modal-footer v-if="authRequest == null">
          <div
            class="btn btn-dark br-25 px-4"
            @click="requestLogin()"
            v-bind:class="{ disabled: email == null || email == '' }"
          >
            Continue
            <i class="ml-2 fa fa-arrow-right opacity-50"></i>
          </div>
        </template>
        <template v-slot:modal-footer v-else>
          <div
            class="btn btn-dark br-25 px-4"
            @click="email = null; authRequest = null; authRequestStatus = null;"
            v-bind:class="{ disabled: email == null || email == '' }"
          >
            Try Again
            <i class="ml-2 fa fa-refresh opacity-50"></i>
          </div>
        </template>
      </b-modal>

      <div id="globalFooter" v-html="themeSettings.global_footer">{{ themeSettings.global_footer }}</div>
      <SiteFooter v-if="currentPage != 'recent'"></SiteFooter>
    </client-only>
  </div>
</template>

<static-query>
query {
  latestFeaturedContent: allContentItem(limit: 1, sortBy: "date", order: DESC, filter: { published: { eq: true }, featured: { eq: true }}) {
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
      }
    }
  }
  featuredContent: allContentItem(filter: { published: { eq: true }, featured: { eq: true }}) {
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
        content
        cover_image
        path        
      }
    }
  }
  offerings: allOffering(sortBy: "price", order: ASC, filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        slug
        type
        date (format: "D. MMMM YYYY")        
        featured
        description
        cover_image
        content
        path        
      }
    }
  }
  recentContent: allContentItem(filter: { published: { eq: true }, featured: { eq: false }}) {
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
      }
    }
  }
}
</static-query>


<script>
import Logo from "~/components/Logo.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import moment from "moment";
import companySettings from "../../data/company.json";
import brandSettings from "../../data/brand.json";
import themeSettings from "../../data/theme.json";
import socialSettings from "../../data/social.json";
import axios from "axios";

export default {
  data() {
    return {
      cart: null,
      count: null,
      search: null,
      newContent: [],
      hasNewContent: false,
      content: null,
      thirtyDaysAgo: null,
      result: null,
      currentPage: null,
      companySettings: companySettings,
      brandSettings: brandSettings,
      themeSettings: themeSettings,
      socialSettings: socialSettings,
      window: null,
      lock: null,
      user: null,
      auth: null,
      useAuth: false,
      email: null,
      authRequestStatus: null,
      authRequest: null
    };
  },
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo,
    SiteFooter
  },
  async mounted() {
    var oldAuth = null;
    if (localStorage.auth != null) {
      //alert(typeof localStorage.auth);
      var oldAuth = JSON.parse(localStorage.auth);
    } else {
      oldAuth = null;
    }
    if (oldAuth != null && oldAuth.hasOwnProperty("data")) {
      if (JSON.parse(localStorage.auth)) {
        this.$auth = JSON.parse(localStorage.auth);
        this.auth = JSON.parse(localStorage.auth);
      } else {
        this.$auth = null;
        this.auth = null;
        localstorage.auth = null;
      }
    }
    this.window = window;

    var token = this.getUrlVars()["token"];
    if (typeof token != "undefined") {
      this.$userToken = token;
      this.callApi({
        function: "platformkit-auth-validate-token-v1",
        token: token
      });
    }

    var URL = window.location.href;
    var arr = URL.split("/");
    var str = arr[1];
    this.currentPage = arr[3];
    if(arr[4] != null) {
      this.currentPage = this.currentPage + '/' + arr[4];
    }

    let list = this.$static.featuredContent.edges;
    let results = [];
    /*
    $.each(list, function(key, value) {
      var date = moment(value.node.date);
      var thirtyDaysAgo = moment().subtract(30, "days");
      var isBefore = null;
      isBefore = date.isBefore(thirtyDaysAgo);
      console.log(isBefore);
      if (isBefore) {
        results.push(key);
      }
    });
    */

    //console.log(results)
    this.newContent = results;
    if (results.length > 0) {
      this.hasNewContent = true;
    }

    //var customerJS = require('customer-js')

    /* Snipcart V3 
    /* this.cart = window.cart */
    this.count = 0;

    this.window.setInterval(() => {
      this.itemCount();
    }, 100);

    this.addAnalyticEvent();
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
      return vars;
    },
    addAnalyticEvent(event) {
      if(event == null) { event = 'page_view'; }
      var token = null;
      var url = null;
      if(localStorage.auth != null) {
        var auth = JSON.parse(localStorage.auth);
        if(auth != null && auth.token != null) {
          token = auth.token;
        }
        var data = JSON.stringify({url: encodeURI(this.window.location.href.split("#")[0])});
        url = process.env.GRIDSOME_API_URL +
              'platformkit-analytics-event-v1' +
              "?token=" +
              token + '&event=' + event + '&data=' + data;              
      }      

      else { 
        
        url = process.env.GRIDSOME_API_URL +
              'platformkit-analytics-event-v1' +
              '?event=' + event + '&data=' + data;
      }

      console.log(url);


      try {
        axios
          .get(
            url
          )
          .then(response =>            
            console.log(response)
          )
          .catch(function(error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    callApi(input) {
      try {
        axios
          .get(
            process.env.GRIDSOME_API_URL +
              input.function +
              "?token=" +
              input.token
          )
          .then(response =>
            //this.login(response.data)
            //this.$auth = response.data
            this.login(response)
          )
          .catch(function(error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    requestLogin() {
      //this.addAnalyticEvent('login_request');
      try {
        this.authRequestStatus = 'loading';
        axios
          .get(
            process.env.GRIDSOME_API_URL +
              "platformkit-auth-request-token-v1" +
              "?email=" +
              this.email +
              "&redirect=" +
              this.currentPage
          )
          .then(
            // alert(1234) // if it worked...
            response => (this.authRequest = response.data)
          )
          .catch(function(error) {
            console.log(error);
          });
          
      } catch (error) {
        console.log(error);
      }
    },
    login(authResponse) {
      this.$auth = authResponse.data;
      this.auth = authResponse.data;
      localStorage.auth = JSON.stringify(this.auth);
      location = location.href.split("?")[0];
    },
    logout() {
      localStorage.auth = null;
      this.$auth = null;
      this.auth = null;
      location.reload();
    },

    containsSearch(node) {
      var search = this.search.toLowerCase();
      var title = node.title.toLowerCase();
      var description = node.description.toLowerCase();
      var content = node.content.toLowerCase();
      var hasSubtitle = false;
      if (node.hasOwnProperty("subtitle") && node.subtitle.includes(search)) {
        hasSubtitle = true;
      } else {
        hasSubtitle = false;
      }

      if (
        title.includes(search) ||
        description.includes(search) ||
        hasSubtitle == true ||
        content.includes(search)
      ) {
        return true;
      }
    },

    clearSearch(node) {
      this.search = null;
    },

    itemCount() {
      /* V3
      this.cart = window.Snipcart.store.getState()
      this.count = this.cart.cart.items.length    
      */

      if (
        window != null &&
        window.Snipcart != null &&
        window.Snipcart.api != null &&
        window.snipcart.items != null
      ) {
        this.count = window.Snipcart.api.items.count();
      }
    },

    updateSearch() {
      // Something
    },

    displayOrHide(input) {
      if (this.collection === null) {
        return true;
      } else {
        if (this.offerings.includes(input)) {
          return true;
        } else {
          return false;
        }
      }
    },

    filterByCollection(input) {
      console.log(input);
      this.collection = input.collection;
      this.offerings = input.offerings;
      //alert(input.offerings)
    }
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 1000;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.search-label {
  min-width: 95px;
  border-color: transparent !important;
}

.search-link {
  z-index: 99;
}

.search-image {
  margin-right: 10px;
  margin-bottom: 10px;
}

#siteFooter {
  background: linear-gradient(#f6fbff, #fff) !important;
  border-top-color: rgba(0, 150, 250, 0.1) !important;
}

#siteFooter li {
  background: none !important;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;

  > span {
    margin: 0 0.35em;
  }

  a {
    color: currentColor;
  }
}

.nav-item a {
  padding: 5px 13px 5px 13px !important;
  margin-left: 3px;
  color: rgba(0, 20, 40, 0.7) !important;
  border-radius: 25px;
  transition: all 0.3s;
}
.nav-item.active a {
  color: #000 !important;
  border: 1px solid rgba(0, 50, 60, 0.1);
}
.nav-item a:hover {
  border-color: transparent !important;
  color: #000 !important;
  background: rgba(0, 50, 60, 0.1);
}

.nav-link {
  border: 2px solid transparent;
  border-radius: 4px;
}

@media (max-width: 991px) {
  .nav-link {
    padding-left: 10px !important;
  }
}

.nav-link.active {
  border-radius: 4px;
}

.raised {
  box-shadow: 5px 5px 25px rgba(0, 100, 150, 0.07),
    5px 5px 15px rgba(0, 100, 150, 0.05), 5px 5px 5px rgba(0, 50, 250, 0.07),
    0px 0px 5px rgba(0, 0, 0, 0.1);
}
.gradient-light-green-to-white {
  background-image: linear-gradient(
    180deg,
    rgba(238, 255, 250, 0.5) 0px,
    rgba(255, 255, 255, 0.5) 300px
  );
}

.card-image-tinted:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0) !important;
  opacity: 0.35;
  transition: all 0.3s;
}

.image-tinted {
  z-index: 0 !important;
  overflow: hidden !important;
}
.image-tinted:before {
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.85) !important;
  z-index: -1 !important;
  opacity: 0.2;
  transition: all 0.3s;
}

.image-tinted:hover:before {
  opacity: 0 !important;
}

.hero-card .btn-secondary {
  background: rgba(0, 0, 0, 0.85);
}

.hero-card:hover {
  cursor: pointer;
}
.hero-card:hover .btn-secondary {
  background: #000;
  transition: all 0.3s;
}

.one-result .carousel-control-prev,
.one-result .carousel-control-next,
.one-result .carousel-indicators {
  display: none;
}

.carousel-item:hover:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;

  cursor: default;
  transition: all 0.3s;
}

.carousel-item .btn {
  background: #fff !important;
  color: #000 !important;

  text-shadow: none !important;
}

.text-shadow {
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25), 1px 1px 4px rgba(0, 0, 50, 0.75);
}

.card-img-top {
  height: 100%;
  z-index: 0 !important;
  border-radius: 5px;
}

.carousel-slide {
  opacity: 1 !important;
  background: #000 !important;
  border-radius: 5px !important;
  transition: all 0.3s;
}

.carousel-slide div {
  z-index: 9 !important;
}

.carousel-slide .image-div:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000 !important;
  opacity: 0.35 !important;
  z-index: -1 !important;
  border-radius: 5px !important;
  transition: all 0.3s;
}

.card-img-top:before,
.card-img-overlay:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.35 !important;
  z-index: -1 !important;
  border-radius: 5px !important;
  transition: all 0.3s;
}

.card:hover .card-img-overlay:before,
.carousel-slide:hover .image-div:before {
  background-color: rgb(0, 90, 150) !important;
}

.card-body.card-img-overlay {
  z-index: 999 !important;
}

.card:hover .card-image-tinted:before {
  background-color: rgb(0, 90, 150) !important;
}

.bg-dark.card-image-tinted:before {
  background-color: #000 !important;
}

.bg-black {
  background: #000 !important;
}

.bg-dark-translucent {
  background: rgba(0, 0, 0, 0.85) !important;
}

.bg-light-blue {
  background: #ddedff;
}

.border-light-blue {
  border-color: #ddedff !important;
}

.bg-very-light-blue {
  background: #ecf5ff;
}

.bg-light-green {
  background: #3fe29f;
}

.text-dark-green {
  color: #0c8050;
}

.text-dark-blue {
  color: navy;
}

.hero-card {
  min-height: 425px;
}

.raised-nav {
  box-shadow: 5px 5px 25px rgba(0, 100, 150, 0.15);
  border-color: #ddedff !important;
}

.opacity-0 {
  opacity: 0 !important;
  transition: opacity 0.3s;
}

.opacity-10 {
  opacity: 0.1 !important;
  transition: opacity 0.3s;
}

.opacity-20 {
  opacity: 0.2 !important;
  transition: opacity 0.3s;
}

.opacity-30 {
  opacity: 0.3 !important;
  transition: opacity 0.3s;
}

.opacity-40 {
  opacity: 0.4 !important;
  transition: opacity 0.3s;
}

.opacity-50 {
  opacity: 0.5 !important;
  transition: opacity 0.3s;
}

.opacity-60 {
  opacity: 0.6 !important;
  transition: opacity 0.3s;
}

.opacity-70 {
  opacity: 0.7 !important;
  transition: opacity 0.3s;
}

.opacity-80 {
  opacity: 0.8 !important;
  transition: opacity 0.3s;
}

.opacity-90 {
  opacity: 0.9 !important;
  transition: opacity 0.3s;
}

.opacity-hover-100:hover {
  opacity: 1 !important;
}

.navbar-light .navbar-toggler,
.navbar-light .navbar-toggler:focus {
  border-color: transparent !important;
}

.br-5 {
  border-radius: 5px !important;
}

.br-10 {
  border-radius: 10px !important;
}

.br-15 {
  border-radius: 15px !important;
}

.br-20 {
  border-radius: 20px !important;
}

.br-25 {
  border-radius: 25px !important;
}

.odd .card-image-tinted,
.even .hero-card-content {
  left: auto !important;
  right: 0px !important;
}

.even .card-image-tinted,
.odd .hero-card-content {
  right: auto !important;
  left: 0px !important;
}

.odd .card-image-tinted {
  border-radius: 0px 4px 4px 0px !important;
}

.even .card-image-tinted {
  border-radius: 4px 0px 0px 4px !important;
}

.hero-card {
  overflow: hidden !important;
}
.navbar-light .navbar-toggler:focus {
  outline: none !important;
  background-color: rgba(0, 25, 50, 0.1) !important;
}
.navbar-toggler {
  transition: all 0.3s !important;
  margin: 5px;
}

#nav-collapse .nav-item {
  margin: 3px;
}

.carousel-control-prev {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
  left: 0;
}

.carousel-control-next {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.5), transparent);
  right: 0;
}

#navbar-search-button {
  color: rgba(0, 50, 150, 0.5);
  border: 1px solid rgba(0, 50, 150, 0.3);
}

#navbar-search-button:hover {
  color: #fff !important;
}
@media only screen and (max-width: 600px) {
  .pull-right-sm {
    float: right;
  }
  .w-sm-100 {
    width: 100%;
  }

  .square-image {
    width: 350px !important;
    height: 350px !important;
    display: inline-block !important;
  }
}

.text-weight-900 {
  font-weight: 900 !important;
}

.text-weight-800 {
  font-weight: 800 !important;
}

.text-weight-700 {
  font-weight: 700 !important;
}

.text-weight-500 {
  font-weight: 500 !important;
}

.text-weight-500 {
  font-weight: 500 !important;
}

.text-weight-400 {
  font-weight: 400 !important;
}

.text-weight-300 {
  font-weight: 300 !important;
}

.text-weight-200 {
  font-weight: 200 !important;
}

.text-weight-100 {
  font-weight: 100 !important;
}

.scroll-button-down {
  background: linear-gradient(0deg, #a1a8cc, #fff);
  opacity: 1;
  color: #000 !important;
  height: 50px;
  padding: 0px !important;
  width: 50px;
  border-radius: 50px;
  background-image: url("/files/scroll-button-down.svg") !important;
  background-size: contain;
  background-position: center;
  z-index: 99;
  display: inline-block;
}

.carousel-control-next:hover,
.carousel-control-prev:hover,
.carousel-control-next:focus,
.carousel-control-prev:focus {
  opacity: 1 !important;
}

.carousel-control-prev {
  background: linear-gradient(0deg, #a1a8cc, #fff);
  left: 0;
  opacity: 1;
  color: #000 !important;
  height: 75px;
  padding: 0px !important;
  width: 75px;
  border-radius: 50px;
  position: absolute;
  top: calc(50% - 40px);
  left: -35px;
  background-image: url("/files/circle-button-left.svg") !important;
  background-size: contain;
  background-position: center;
  z-index: 99;
  float: left;
}

.carousel-control-next {
  opacity: 1;
  color: #000 !important;
  height: 75px;
  padding: 0px !important;
  width: 75px;
  border-radius: 50px;
  position: absolute;
  top: calc(50% - 40px);
  right: -35px !important;
  background-image: url("/files/circle-button-right.svg") !important;
  background-size: contain;
  background-position: center;
  z-index: 99;
  float: right;
}

.carousel-inner {
  overflow: hidden !important;
  border-radius: 5px !important;
}

.carousel-control-next,
.carousel-control-prev {
  transition: transform 0.3s;
}

.carousel-control-next:hover,
.carousel-control-prev:hover {
  transform: scale(1.1);
  transition: transform 0.3s;
}
.carousel-control-prev-icon {
  background: none !important;
}
.carousel-control-next-icon {
  background: none !important;
}

.border-primary {
  border: 1px solid #007bff !important;
}

.border-primary-translucent {
  border: 1px solid #007bff55 !important;
}

.price {
  font-size: 133%;
}

.btn-buy {
  background: #007bff;
  color: #fff !important;
  border: #007bff 1px solid;
}

.btn-buy:hover {
  background: #000;
  border: #000 1px solid;
  color: #fff;
}

.snipcart-modal__container {
  z-index: 999999999999999999 !important;
}

.snip-layout .snip-layout__main-container {
  border-radius: 5px !important;
  overflow: hidden;
  box-shadow: 5px 5px 15px rgba(0, 0, 50, 0.3) !important;
}

.content img {
  max-width: 100% !important;
  border-radius: 4px;
}

.card-image-top {
  height: 220px !important;
  display: inline-block;
}

.carousel-slide img {
  opacity: 0 !important;
  float: left;
}
</style>