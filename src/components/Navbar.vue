<template>
  <header class="header">
    <b-navbar
      v-if="currentPage != 'recent'"
      sticky
      toggleable="lg"
      class="w-100 px-3 py-3 bg-white text-dark border-bottom raised-nav"
      type="light"
      variant="light"
    >
      <div class="container">
        <a
          href="/"
          class="m-0 ml-xs-2 p-0 text-decoration-none nav-link mr-0 mr-lg-4"
          v-on:click="this.search = null"
        >
          <g-image
            v-if="brandSettings != null && brandSettings.logo"
            :src="brandSettings.logo"
            id="logo"
            style="transform:scale(1.5);width:100%;max-width:90px;max-height:40px;display:inline-block;"
          />
          <span class="text-dark opacity-80" v-else>{{ companySettings.name || 'PlatformKit' }}</span>
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
            <g-link to="/docs" class="nav-link" v-on:click="this.search = null">Docs</g-link>

            <b-dropdown
              block
              right
              menu-class="my-2 border mx-2"
              v-if="auth != null"
              id="dropdown-user-account"
              variant="neutral"
              class="my-auto text-dark d-inline-block"
            >
              <template v-slot:button-content>
                <span class="d-inline-block my-1 d-md-inline">Account</span>
              </template>
              <b-dropdown-item
                href="#logout"
                :href="'/dashboard'"
                v-if="auth.user.permissions != null && auth.user.permissions.dashboard == 'all'"
              >Dashboard</b-dropdown-item>
              <b-dropdown-item href="#logout" @click="logout()">
                Sign Out
                <i class="text-danger fa fa-sign-out m-1 pull-right"></i>
              </b-dropdown-item>
            </b-dropdown>
            <span v-else class="btn-group">
              <a
                href="#login"
                v-b-modal.modal-login
                class="nav-link border-0 bg-light-blue mx-2"
                style="height:42px;"
              >
                <span
                  class="text-primary px-2 mr-2 mr-lg-1"
                  style="margin-top:0px !important;"
                >Login</span>
              </a>
              <a
                href="#register"
                v-b-modal.modal-login
                class="nav-link bg-primary mx-2"
                style="height:42px;"
              >
                <span
                  class="text-light ml-0 ml-lg-1 mr-2 mr-lg-1"
                  style="margin-top:-2px !important;"
                >Sign Up</span>
              </a>
            </span>
            <form class="form-inline my-2 my-lg-0 ml-2">
              <div class="input-group">
                <input
                  class="form-control py-2 border-0"
                  autocomplete="off"
                  style="margin-right:-30px;height:42px;width:222px;"
                  v-model="search"
                  @change="updateSearch"
                  @input="updateSearch"
                  placeholder="Search"
                  aria-label="Search"
                  type="search"
                  value="Search"
                  id="search"
                />
                <span
                  class="input-group-append search-button"
                  v-if="search == null || search == ''"
                >
                  <button class="btn border-0 opacity-30" type="button" style="margin-left:-5px;">
                    <i class="fa fa-fw fa-search"></i>
                  </button>
                </span>
                <span v-else class="input-group-append search-button" @click="search = null">
                  <button class="btn border-0 opacity-30" type="button" style="margin-left:-5px;">
                    <i class="fa fa-fw fa-close"></i>
                  </button>
                </span>
              </div>
            </form>

            <g-link
              v-if="socialSettings != null && socialSettings.github != null"
              class="btn btn-white text-dark d-none d-xl-inline-block my-auto ml-1 mr-1"
              :to="'https://github.com/' + socialSettings.github"
            >
              <i class="fa fa-github"></i>
            </g-link>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
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
        <b-input-group class="mt-1" aria-autocomplete="false">
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

    <div>
      <!-- The modal -->
      <b-modal id="search-modal" size="lg" :hide-footer="true">
        <template v-slot:modal-title>
          <i class="fa fa-fw fa-search text-dark-blue opacity-30 mr-2"></i>Search Results
        </template>
        <div id="searchResults" v-if="search != null && search != ''">
          <div class="container">
            <div class="w-100 text-center">
              <p class="w-100">
                <span class="opacity-50">You searched for</span>
                <span class="d-none d-md-inline-block">
                  "{{ search }}"
                  <span class="opacity-50">.</span>
                </span>
                <span class="opacity-50 d-inline-block d-md-none">...</span>
              </p>
              <b-form-group>
                <b-form-checkbox
                  class="d-inline"
                  id="search-content"
                  v-model="searchContent"
                  name="search-content"
                  :value="true"
                  :unchecked-value="false"
                >Content</b-form-checkbox>
                <b-form-checkbox
                  class="d-inline mx-1"
                  id="search-offerings"
                  v-model="searchOfferings"
                  name="search-offerings"
                  :value="true"
                  :unchecked-value="false"
                >Products & Services</b-form-checkbox>
                <b-form-checkbox
                  class="d-inline mx-1"
                  id="search-docs"
                  v-model="searchDocs"
                  name="search-docs"
                  :value="true"
                  :unchecked-value="false"
                >Docs</b-form-checkbox>
              </b-form-group>
              <div class="w-100 px-4 mx-1">
                <b-form-input
                  :autofocus="true"
                  class="form-control d-inline-block w-100"
                  type="search"
                  v-model="search"
                  @change="updateSearch"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
            <div id="contentResults">
              <ul class="list-group my-3 p-0">
                <li
                  class="list-group-item p-0 border-0"
                  v-for="edge, index in $static.offerings.edges"
                  v-if="containsSearch(edge.node) && searchOfferings"
                >
                  <div class="row mt-3 ml-0">
                    <span class="col-12">
                      <div class="col-12">
                        <span
                          v-if="edge.node.cover_image != null"
                          style="width:80px; height:80px; background-size:cover;background-position:center;float:left;"
                          :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                          class="br-5 search-image"
                        ></span>
                      </div>
                      <div class="col-12">
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
                  v-if="containsSearch(edge.node) && searchContent"
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
                      <div class="col-12">
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
                          >View Content →</a>
                        </span>
                      </div>
                    </span>
                  </div>
                </li>
                <li
                  class="list-group-item p-0 border-0"
                  v-for="edge, index in $static.docs.edges"
                  v-if="containsSearch(edge.node) && searchDocs"
                >
                  <div class="row mt-3 ml-0">
                    <span class="col-12">
                      <div class="col-12">
                        <a
                          class="search-link"
                          @click="clearSearch"
                          :href="'/docs/' + edge.node.slug"
                        >{{ edge.node.title }}</a>
                        <br />
                        <span class="pt-3">
                          <span
                            class="excerpt"
                            v-html="$options.filters.highlight(getExcerpt(edge.node.content), search)"
                          ></span>
                          <span class="text-dark opacity-30">...</span>
                          <br />
                          <a
                            class="btn btn-sm mt-3 btn-outline-primary text-capitalize mb-3"
                            style="float:right;"
                            @click="clearSearch"
                            :href="'/docs/' + edge.node.slug"
                          >View Doc →</a>
                        </span>
                      </div>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </header>
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
    docs: allDoc{
    edges {
      node {
        id
        title
        slug        
        description
        content               
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
import moment from "moment";
import companySettings from "../../data/company.json";
import brandSettings from "../../data/brand.json";
import menuSettings from "../../data/menus.json";
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
      searchContent: true,
      searchDocs: true,
      searchOfferings: true,
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
    Navbar,
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

    if (URL.includes("/docs")) {
      this.searchContent = false;
      this.searchOfferings = false;
    } else {
      this.searchDocs = false;
    }

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
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    highlight: function(stringToSearch, searchTerm) {
      if (searchTerm === "") return stringToSearch;
      var term = `/example/`;
      term = term.replace("/example/", searchTerm);
      var iQuery = new RegExp(term, "ig");

      return stringToSearch
        .toString()
        .replace(iQuery, function(matchedText, a, b) {
          return "<span class='highlight'>" + matchedText + "</span>";
        });
    }
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
    getExcerpt(input) {
      var result = input;

      var doc = new DOMParser().parseFromString(result, "text/html");
      result = doc.body.textContent || "";
      doc = new DOMParser().parseFromString(result, "text/html");
      result = doc.body.textContent || "";
      result = result.replace("###### ", " \n");
      result = result.replace("##### ", " \n");
      result = result.replace("#### ", " \n");
      result = result.replace("### ", " \n");
      result = result.replace("## ", " \n");
      result = result.replace("# ", " \n");

      console.log(input.indexOf(search));
      var position = input.indexOf(search);
      if (position == -1) {
        position = 0;
      }

      if (position > 25) {
        position = position - 25;
      }      
      result = result.substr(position, 300);
      return result;
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
      if (this.search != null && this.search != "") {
        this.$bvModal.show("search-modal");
      } else {
        this.$bvModal.hide("search-modal");
      }
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


<style>
.nav-link.active {
  background: #f3f3f7 !important;
}

@media (max-width: 991px) {
  .nav-link {
    margin-left: 10px;
    margin-right: 5px;
  }
}

.excerpt .highlight {
  font-weight: 800 !important;
  padding:5px 0px;
  background-color: rgb(255, 250, 227) !important;  
  border-radius: 3px;
}
</style>