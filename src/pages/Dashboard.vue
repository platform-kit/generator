
<template>
  <Admin>
    <nav class="navbar navbar-expand-lg navbar-light border-bottom px-5 py-4">
      <span class="btn btn-dark br-25 px-4 py-1 mr-3" style="cursor:default;margin-top:-5px;">
        <i class="fa fa-bar-chart text-light opacity-50 mr-3"></i>Dashboard
      </span>

      <button class="navbar-toggler" type="button" v-b-toggle.collapse-1>
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-collapse class="collapse navbar-collapse" id="collapse-1">
        <ul class="navbar-nav mr-auto w-100">
          <li class="nav-item" v-bind:class="{ active: view == null }">
            <a class="nav-link" href="#" @click="view = null">Key Metrics</a>
          </li>
          <li class="nav-item" v-bind:class="{ active: view == 'content' }">
            <a class="nav-link" href="#" @click="view = 'content'">Content</a>
          </li>
          <li class="nav-item" v-bind:class="{ active: view == 'sales' }">
            <a class="nav-link" href="#" @click="view = 'sales'">Sales</a>
          </li>
          <li class="nav-item d-none">
            <a class="nav-link" href="#">APIs</a>
          </li>

          <li class="nav-item ml-auto loginDropdown">
            <i class="fa fa-fw fa-lg fa-user-circle text-dark-blue opacity-30 mr-0"></i>
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
          </li>
        </ul>
      </b-collapse>
    </nav>

    <div
      class="container-fluid my-3 px-5 pb-0"
      v-if="userCanViewDashboard() == true && view == null"
    >
      <div class="row pt-3">
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="usersTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                class="br-5"
                title="Total Users"
                type="number"
                :loading="loading"
                :result-set="resultSet"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="verifiedUsersTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Verified Users"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="pageViewsTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Total Page Views"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
      </div>
      <div class="row mt-4" style>
        <div class="col-sm-6 mb-1">
          <query-builder :cubejs-api="cubejsApi" :query="newUsersOverTime">
            <template v-slot="{ loading, resultSet }" class="h-100">
              <Chart
                title="New Users Over Time"
                type="stackedBar"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-sm-6 mb-1">
          <query-builder :cubejs-api="cubejsApi" :query="pageViewsOverTime">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Page Views Over Time"
                type="stackedBar"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
      </div>
    </div>

    <div
      class="container-fluid my-3 px-5 pb-0"
      v-else-if="userCanViewDashboard() == true && view == 'content'"
    >
      <div class="row pt-3">
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="topicsTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Topics"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="contentItemsTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                class="br-5"
                title="Content Items"
                type="number"
                :loading="loading"
                :result-set="resultSet"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="contentItemsPublished">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Content Items Published"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
      </div>
      <div class="row mt-4" style>
        <div class="col-sm-6 mb-1">
          <query-builder :cubejs-api="cubejsApi" :query="contentViewsOverTime">
            <template v-slot="{ loading, resultSet }" class="h-100">
              <Chart
                title="Content Views by Topic"
                type="stackedBar"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-sm-6 mb-1">
          <query-builder :cubejs-api="cubejsApi" :query="contentViewsOverTimeByItem">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Content Views by Item"
                type="stackedBar"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
      </div>
    </div>

    <div
      class="container-fluid my-3 px-5 pb-0"
      v-else-if="userCanViewDashboard() == true && view == 'sales'"
    >
      <div class="row pt-3">
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="customersTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Paying Customers"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="subscriptionsTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                class="br-5"
                title="Subscriptions"
                type="number"
                :loading="loading"
                :result-set="resultSet"
              />
            </template>
          </query-builder>
        </div>
        <div class="col-4">
          <query-builder :cubejs-api="cubejsApi" :query="revenueTotal">
            <template v-slot="{ loading, resultSet }">
              <Chart
                title="Total Revenue ($)"
                type="number"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>
      </div>
      <div class="row mt-4" style>
        <div class="col-12 mb-1">
          <query-builder :cubejs-api="cubejsApi" :query="revenueOverTime">
            <template v-slot="{ loading, resultSet }" >
              <Chart
                title="Revenue / Month - Last 6 Months"
                type="stackedBar"
                :loading="loading"
                :result-set="resultSet"
                class="br-5"
              />
            </template>
          </query-builder>
        </div>        
      </div>
    </div>
  </Admin>
</template>

<script>
import cubejs from "@cubejs-client/core";
import { QueryBuilder } from "@cubejs-client/vue";
import Chart from "~/components/Chart.vue";
import Admin from "~/layouts/Admin.vue";
import Moment from "moment";
var now = new Moment();
var begin = new Moment().subtract(2, "month");
now = now.format("YYYY[-]MM[-]DD");
begin = begin.format("YYYY[-]MM[-]DD");
var sixmonths = new Moment().subtract(6, "month").format("YYYY[-]MM[-]DD");
if(typeof window != 'undefined'){
  var token = JSON.parse(localStorage.auth).user.tokens.analytics.token;
}
//alert(token);

var url = null;
if (
  process.env.GRIDSOME_CUBE_API_URL != "" &&
  process.env.GRIDSOME_CUBE_API_URL != null
) {
  url = process.env.GRIDSOME_CUBE_API_URL;
} else {
  url = "http://localhost:4000/cubejs-api/v1"; //default dev url
}

var cubejsApi = cubejs(token, {
  apiUrl: url
});

export default {
  components: {
    Admin,
    Chart,
    QueryBuilder
  },
  data() {
    return {
      auth: null,
      view: null,
      cubejsApi,
      usersTotal: { measures: ["PkUsers.count"] },
      verifiedUsersTotal: {
        measures: ["PkUsers.count"],
        filters: [
          {
            dimension: "PkUsers.verifiedAt",
            operator: "set"
          }
        ]
      },
      pageViewsTotal: {
        measures: ["PkEvents.count"],
        filters: [
          {
            dimension: "PkEvents.event",
            operator: "equals",
            values: ["page_view"]
          }
        ]
      },
      newUsersOverTime: {
        measures: ["PkUsers.count"],
        dimensions: ["PkUsers.verified"],
        timeDimensions: [
          {
            dimension: "PkUsers.createdAt",
            dateRange: [begin, now],
            granularity: "day"
          }
        ]
      },
      pageViewsOverTime: {
        measures: ["PkEvents.count"],
        //segments: ["PkEvents.users"],
        filters: [
          {
            dimension: "PkEvents.event",
            operator: "equals",
            values: ["page_view"]
          }
        ],
        timeDimensions: [
          {
            dimension: "PkEvents.createdAt",
            dateRange: [begin, now],
            granularity: "day"
          }
        ]
      },
      contentItemsTotal: {
        measures: ["PkFiles.count"],
        filters: [
          {
            dimension: "PkFiles.path",
            operator: "contains",
            values: ["content"]
          }
        ]
      },
      contentItemsPublished: {
        measures: ["PkFiles.count"],
        filters: [
          {
            dimension: "PkFiles.path",
            operator: "contains",
            values: ["content"]
          },
          {
            dimension: "PkFiles.published",
            operator: "equals",
            values: ["true"]
          }
        ]
      },
      topicsTotal: {
        measures: ["PkFiles.count"],
        filters: [
          {
            dimension: "PkFiles.path",
            operator: "contains",
            values: ["topic"]
          }
        ]
      },
      contentViewsOverTime: {
        measures: ["PkEvents.count"],
        dimensions: ["PkEvents.topics"],
        filters: [
          {
            dimension: "PkEvents.event",
            operator: "equals",
            values: ["content_view"]
          }
        ],
        timeDimensions: [
          {
            dimension: "PkEvents.createdAt",
            dateRange: [begin, now],
            granularity: "day"
          }
        ]
      },
      contentViewsOverTimeByItem: {
        measures: ["PkEvents.count"],
        dimensions: ["PkEvents.contentItem"],

        filters: [
          {
            dimension: "PkEvents.event",
            operator: "equals",
            values: ["content_view"]
          }
        ],
        timeDimensions: [
          {
            dimension: "PkEvents.createdAt",
            dateRange: [begin, now],
            granularity: "day"
          }
        ]
      },

      customersTotal: {
        measures: ["PkStripeCustomers.count"]
      },
      subscriptionsTotal: {
        measures: ["PkStripeSubscriptions.count"]
      },
      revenueTotal: {
        measures: ["PkStripeTransactions.sum"],
        dimensions: ["PkStripeTransactions.amount"],
        filters: [
          {
            dimension: "PkStripeTransactions.amount",
            operator: "gt",
            values: ["0"]
          }
        ]
      },
      revenueOverTime: {
        measures: ["PkStripeTransactions.sum"],
        timeDimensions: [
          {
            dateRange: [sixmonths, now],
            dimension: "PkStripeTransactions.transactionDate",
            granularity: "day"
          }
        ],
        dimensions: [],
        filters: [
          {
            dimension: "PkStripeTransactions.sum",
            operator: "gt",
            values: ["0"]
          }
        ]
      },
      contentViewsOverTimeByItem: {
        measures: ["PkEvents.count"],
        dimensions: ["PkEvents.contentItem"],

        filters: [
          {
            dimension: "PkEvents.event",
            operator: "equals",
            values: ["content_view"]
          }
        ],
        timeDimensions: [
          {
            dimension: "PkEvents.createdAt",
            dateRange: [begin, now],
            granularity: "day"
          }
        ]
      }
    };
  },
  created() {
    try {
      if (window != null && localStorage.auth == null) {
        window.location.assign("/");
        this.redirecting = redirecting;
      }
    } catch (error) {
      console.log(error);
    }
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
    try {
    } catch (error) {
      console.log(error);
    }
    //this.userCanViewDashboard();
  },
  metaInfo: {
    title: "Dashboard"
  },
  methods: {
    userCanViewDashboard() {
      if (this.auth != null && this.auth.user != null && this.auth.user.tokens.analytics.token != null) {
        return true;
      }
    }
  }
};
</script>

<style>
.card-title {
  margin-bottom: 25px;
  opacity: 0.4 !important;
  font-size: 80%;
  text-align: center;
  color: rgb(12, 36, 107) !important;
}

@media (min-width: 991px) {
  .loginDropdown {
    width: auto !important;
  }
}

@media (max-width: 991px) {
  .loginDropdown {
    width: 100% !important;
    text-align: center;
  }
}
</style>