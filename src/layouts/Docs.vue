<template>
  <div id="app">
    <client-only>
      <Navbar></Navbar>

      <div class="container" id="content">
        <div class="row sidebar-row">
          <div class="d-none d-md-flex col-2 sidebar border-right text-center py-4">
            <slot name="sidebar"></slot>
          </div>
          <slot name="main">
            <div class="col-12 col-md-10 px-0 mx-0">
              <main class="main px-0 pt-0"></main>
            </div>
          </slot>
        </div>
      </div>

      <div id="globalFooter" v-html="themeSettings.global_footer">{{ themeSettings.global_footer }}</div>
      <SiteFooter></SiteFooter>
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
import Navbar from "~/components/Navbar.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import Docs from "~/layouts/Docs.vue";
import moment from "moment";
import menuSettings from "../../data/menus.json";
import companySettings from "../../data/company.json";
import brandSettings from "../../data/brand.json";
import themeSettings from "../../data/theme.json";
import socialSettings from "../../data/social.json";
import axios from "axios";

export default {
  data() {
    return {
      environment: null,
      cart: null,
      count: null,
      search: null,
      newContent: [],
      hasNewContent: false,
      content: null,
      thirtyDaysAgo: null,
      result: null,
      currentPage: null,
      menuSettings: menuSettings,
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
    Docs,
    Navbar,
    SiteFooter
  },
  async mounted() {
    if (process.env.GRIDSOME_APP_URL.includes("8888")) {
      this.environment = "development";
    } else {
      this.environment = "production";
    }
    var oldAuth = null;
    if (localStorage.auth != null) {
      //alert(typeof localStorage.auth);
      var oldAuth = JSON.parse(localStorage.auth);
      if (
        oldAuth != null &&
        oldAuth.token != null &&
        typeof oldAuth.user.tokens.analytics == "undefined"
      ) {
        // console.log("Old Auth:");
        // console.log(oldAuth);
        var token = oldAuth.token;
      }
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
    if (arr[4] != null) {
      this.currentPage = this.currentPage + "/" + arr[4];
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
    userHasPermission(input) {
      if (input == null) {
        return true;
      }
      //console.log(input);
      if (
        this.auth != null &&
        this.auth.user != null &&
        this.auth.user.permissions != null
      ) {
        var hasPermission = false;
        Object.values(input).forEach(function(item) {
          Object.keys(item).forEach(function(permission) {
            //required:
            //alert(permission + " - " + Object.values(item));
            var auth = JSON.parse(localStorage.auth);
            hasPermission =
              auth.user.permissions[permission] == Object.values(item);
            //return auth.user.permissions[permission] == Object.values(item);
          });
        });
        return hasPermission;
      }
    },

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
      if (event == null) {
        event = "page_view";
      }
      var token = null;
      var url = null;
      if (localStorage.auth != null) {
        var auth = JSON.parse(localStorage.auth);
        if (auth != null && auth.token != null) {
          token = auth.token;
        }
        var data = JSON.stringify({
          url: encodeURI(this.window.location.href.split("#")[0])
        });
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
          "?event=" +
          event +
          "&data=" +
          data;
      }

      console.log(url);

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
        this.authRequestStatus = "loading";
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

.docs-content table {
  box-shadow: 1px 1px 10px #dcdfef;
  border-radius: 5px !important;
  overflow: hidden;
  font-size: 80%;
  width: 100%;
}

.docs-content table th {
  text-align: center;
  background: rgb(28, 28, 53);
  color: #fff;
}
.docs-content table th:nth-child(even) {
  background: rgba(28, 28, 53, 0.9);
}

.docs-content table tr {
  border-bottom: 1px solid rgba(0, 50, 150, 0.1);
  background: rgba(224, 224, 235, 0.1);
}

.docs-content table tr:nth-child(odd) {
  background: rgba(224, 224, 255, 0.3);
}

.docs-content table td {
  border-right: 1px solid rgba(0, 50, 150, 0.1);
}

.docs-menu-header {
  opacity: 0.8;
  text-align: left !important;
  color: rgba(77, 82, 99, 1);
}
.docs-menu-header:after {
  content: "";
  background: #e4eef5;
  width: 100%;
  max-width: 125px;
  display: block !important;
  height: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
}

@media (min-width: 991px) {
  .docs-menu-container {
    margin-top: -20px;
  }
}

@media (max-width: 991px) {
  .docs-menu {
    padding-left: 15px;
    margin-top: -15px;
  }
  .docs-menu-container {
    margin-top: -50px !important;
  }
}

@media (min-width: 768px) {
  .docs-menu-container {
    /* position: fixed; */
  }
}

@media (max-width: 768px) {
  .docs-menu-container {
    position: unset;
    display: none;
  }
}

code.language-text {
  font-size: 87.5% !important;
  color: #e83e8c !important;
  word-wrap: break-word !important;
  padding: 4px 8px !important;
  background: linear-gradient(90deg, #ffeded, #fff5f5) !important;
  border-radius: 3px !important;
}

.docs-content a {
  text-decoration: none !important;
  padding: 4px 6px;
  border-radius: 3px;
}
.docs-content a:hover {
  text-decoration: none !important;
  background: rgb(228, 234, 245);
}

@media (min-width: 991px) {
  .docs-content {
    padding-right: 65px !important;
  }

  .docs-menu-col {
    border-left: 1px solid rgba(0, 50, 150, 0.1) !important;
  }
}

@media (max-width: 991px) {
  .docs-menu-col {
  }
}

.docs-content h1,
.docs-content h2,
.docs-content h3,
.docs-content h4,
.docs-content h5,
.docs-content h6 {
  font-family: "Open Sans";
  margin: 1rem 0rem 1rem -2rem !important;
  padding-left: 15px !important;
}

.docs-content h1:hover,
.docs-content h2:hover,
.docs-content h3:hover,
.docs-content h4:hover,
.docs-content h5:hover,
.docs-content h6:hover {
  border-left: 4px solid rgba(65, 105, 225, 0.2);
  margin: 1rem 0rem 1rem -2rem !important;
}

.docs-content blockquote {
  border-left: 4px solid rgba(65, 105, 225, 0.2);
  font-family: "Open Sans";
  padding: 0px 15px;
  font-size: 115%;

  color: rgba(28, 32, 49, 0.664);
}

@media (min-width: 991px) {
  .docs-content blockquote {
    margin: 1rem 0rem 1rem -2rem !important;
  }
}

.docs-content h1 {
  border-left: 4px solid transparent;
  font-size: 155%;
  font-family: "Open Sans";
  font-weight: 900;
}

.docs-content h2 {
  border-left: 4px solid rgba(65, 105, 225, 0);
  font-size: 140%;
  font-family: "Open Sans";
  font-weight: 800;
}

.docs-content h3 {
  border-left: 4px solid rgba(65, 105, 225, 0);
  font-size: 125%;
  font-family: "Open Sans";
  font-weight: 700;
}

.docs-content h4 {
  border-left: 4px solid rgba(65, 105, 225, 0);
  font-size: 110%;
  font-family: "Open Sans";
  font-weight: 600;
}

.docs-content h5 {
  border-left: 4px solid rgba(65, 105, 225, 0);
  font-size: 100%;
  font-family: "Open Sans";
  font-weight: 600;
}

.docs-content h6 {
  border-left: 4px solid rgba(65, 105, 225, 0);
  font-size: 100%;
  font-family: "Open Sans";
  font-weight: 500;
}

.docs-content h1 a,
.docs-content h2 a,
.docs-content h3 a,
.docs-content h4 a,
.docs-content h5 a,
.docs-content h6 a {
  color: rgb(19, 19, 71) !important;
  margin-left: -3px;
}

.docs-menu > * {
  display: none;
}

.docs-menu .icon {
  border-left: 4px solid royalblue;
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  margin-right: 12px;
  margin-top: 6px !important;
  float: left;
  display: none;
}
.docs-menu h1,
.docs-menu h2,
.docs-menu h3,
.docs-menu h4,
.docs-menu h5,
.docs-menu h6 {
  font-family: "Open Sans";
  display: block !important;
  font-size: 80% !important;
  text-align: left;
  font-weight: 100 !important;
  opacity: 1 !important;
  padding: 10px 15px;
  border-radius: 4px;
  /* border-top: 1px dashed rgba(0, 0, 0, 0.125) !important; */

  transition: all 0.3s;
  color: #000 !important;
  text-decoration: none;
  margin-bottom: 3px !important;
  padding: 4px 4px !important;
  text-align: left;
}
.docs-menu h1 a,
.docs-menu h2 a,
.docs-menu h3 a,
.docs-menu h4 a,
.docs-menu h5 a,
.docs-menu h6 a {
  color: rgb(24, 24, 41);
  text-decoration: none;
  text-align: left;
  transition: all 0.3s;
  font-weight: 100 !important;
}

.docs-menu h2 a {
  margin-left: 5px;
}
.docs-menu h3 a {
  margin-left: 10px;
}
.docs-menu h4 a {
  margin-left: 15px;
}
.docs-menu h5 a {
  margin-left: 20px;
}
.docs-menu h6 a {
  margin-left: 25px;
}

.docs-menu h1:hover a,
.docs-menu h2:hover a,
.docs-menu h3:hover a,
.docs-menu h4:hover a,
.docs-menu h5:hover a,
.docs-menu h6:hover a {
  color: royalblue !important;
}

.docs-menu h3,
.docs-menu h3 a,
.docs-menu h3 strong,
.docs-menu h4,
.docs-menu h4 a,
.docs-menu h4 strong,
.docs-menu h5,
.docs-menu h5 a,
.docs-menu h5 strong,
.docs-menu h6,
.docs-menu h6 a,
.docs-menu h6 strong {
  display: none !important;
  visibility: hidden;
}

.search-button {
  border-radius: 0px 5px 5px 0px !important;
  transition: all 0.5s;
  position: relative;
  right: 5px;
  top: 0px;
}

.search-button:hover {
  background: #dedeeb;
}

input[type="search"]:active,
input[type="search"]:focus,
input[type="search"]:hover {
  border-radius: 5px !important;
}

.search-button,
input[type="search"] {
  background: #f3f3f7;
  border-color: #f3f3f7;
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
.navbar li.nav-item {
  height: 100%;
  display: inline-flex;
}
.navbar .nav-item.active {
  opacity: 1 !important;
}
.navbar .nav-item {
  opacity: 0.7 !important;
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
  border: none;
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
  box-shadow: 5px 5px 20px rgba(0, 100, 150, 0.3);
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

.bg-none {
  background: none !important;
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

.raised-nav {
  border-color: rgba(0, 79, 160, 0.09) !important;
  box-shadow: 5px 5px 25px rgba(134, 195, 226, 0.15) !important;
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

.sidebar ul, .bottom-nav ul {
  list-style: none !important;
  width: 100%;
}

.sidebar li,.bottom-nav li {
  margin: 0px 0px 10px 0px;
}

.sidebar li i, .bottom-nav li i {
  color: #17367ee8;
  opacity: 0.5;
  margin-right: 11px;
  text-shadow: 1px 2px #006eff30, 0px 1px #fff;
}

.sidebar li a:hover, .bottom-nav li a:hover {
  background: #d9d7f049 !important;
  color: #000 !important;
  text-decoration: none;
}

.sidebar li a, .bottom-nav li a {
  color: #333;
  width: 100%;
  padding: 5px 10px;
  display: block;
  transition: all 0.3s;
  border-radius: 4px;
}
.sidebar li p {
  margin:0px 0px 10px 0px;
}
 .sidebar li li a {
  margin:0px !important;
}
.bottom-nav li li,
.bottom-nav li p {
  display: inline;
  margin: 0px;
}

.sidebar li li a,
.bottom-nav li li a {
  display: none;
  margin: 5px 0px;
}

.bottom-nav li li a.active,
.bottom-nav li li a.visible {
  display: block;
  margin-left: 30px;
}

.sidebar li a.active,
.sidebar li a.visible {
  display: inline-block;
}

.sidebar li a.active {
  background: #d9d7f049 !important;
}

@media (min-width: 768px) {
  .sidebar-row {
    min-height: calc(100vh - 350px);
  }
}

@media (min-width: 768px) {
  .sidebar-row {
    width: 100% !important;
  }
}

.sidebar {
  padding-top: 52px !important;
  background: linear-gradient(180deg, transparent, #fff),
    linear-gradient(-90deg, #e4ebff49, transparent);
  min-height: 100vh;

  border-right: 1px solid rgba(0, 79, 160, 0.09) !important;
}

.sidebar > div {
  /* position: fixed; */
}

@media (max-width: 1200px) {
  .sidebar,
  .docs-col {
    display: none !important;
  }
  .navbar:first-of-type {
    min-height: 83px;
  }
  #logo {
    margin-left: 10px;
  }
}

@media (min-width: 768px) {
  #content {
    max-width: 1380px !important;
  }
  #content .sidebar {
    min-width: 285px !important;
  }
  .navbar:first-of-type {
    min-height: 77px;
  }
  #logo {
    margin-left: 13px;
  }
}

.navbar .container {
  max-width: 1280px !important;
}

pre {
  border-radius: 3px;
}

pre {
  margin-bottom: 20px !important;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: linear-gradient(-45deg, #f7f9ff 50%, #ebf2f9);
  border: 1px solid rgba(170, 175, 185, 0.2);
  box-shadow: 8px 8px 8px rgba(0, 50, 150, 0.05),
    3px 3px 3px rgba(0, 50, 150, 0.1);
}

#app {
  background: linear-gradient(0deg, rgb(255, 255, 255), rgb(255, 255, 255) 50%);
}

.docs-content h1.title {
  font-size: 150%;
  padding-left: 30px !important;
  font-weight: 100 !important;
  font-family: "Open Sans";
}

@media (max-width: 991px) {
  .docs-content h1.title {
    padding-left: 8px !important;
    margin: 0px 0px 0px -12px !important;
  }
}

.menu-header {
  background: #c7d9f0;
  color: #071b52 !important;
  font-weight: 700 !important;
}
</style>