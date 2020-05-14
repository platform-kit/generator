<template>
  <Docs class="docs">
    <template v-slot:sidebar>
      <v-runtime-template :template="template()" class="text-left"></v-runtime-template>
    </template>
    <template v-slot:main>
      <div class="row col-lg-9 m-0 bg-white">
        <div class="col-lg-9 px-3 pl-lg-5 pr-lg-0 pb-3 pb-lg-5 pull-right docs-content">
          <h1 class="pt-4 title text-center pb-4">{{ $page.docsIndex.title }}</h1>
          <div
            class="border-0 p-0 pb-4 mb-3 d-block d-lg-none w-100 px-3"
            v-if="$page.docsIndex.content.includes('h1')"
          >
            <strong
              class="d-block pt-3 pb-2 docs-menu-header text-center"
              style="letter-spacing:1px;font-size:75%;font-weight:900;"
            >
              <i
                class="fa fa-fw fa-book mr-2 opacity-50"
                style="color: #17367ee8;text-shadow: 1px 2px #006eff30, 0px 1px #fff;"
              ></i>ON THIS PAGE
            </strong>
            <div class="docs-menu" v-html="$page.docsIndex.content">{{ $page.docsIndex.content }}</div>
          </div>
          <div
            v-if="docsSettings != null && docsSettings.index != null"
            v-html="$page.docsIndex.content"
          >{{ $page.docsIndex.content }}</div>
          <br />
          <hr />
          <div class="border-0 text-center mt-4">
            <small class="mb-3">
              <strong>Was this page helpful?</strong>
            </small>
            <div class="btn-group">
              <div class="btn btn-light border-secondary px-3 ml-3">
                <i class="fa fa-thumbs-up text-success"></i>
              </div>
              <div class="btn btn-light border-secondary px-3">
                <i class="fa fa-thumbs-down text-danger"></i>
              </div>
            </div>
            <div
              class="docs-menu-mobile mt-4 text-left raised br-5 card border-0 d-block d-lg-none"
            >
              <div class="card-header text-center text-dark-blue opacity-50 bg-light-blue">Menu</div>
              <div class="card-body" v-html="$page.sidebar.content">{{ $page.sidebar.content }}</div>
            </div>
          </div>
        </div>
        <div
          v-if="docsSettings != null && docsSettings.index != null"
          class="col-12 col-lg-3 px-3 px-lg-0 py-3 docs-menu-col"
        >
          <div
            class="border-0 p-0 p-lg-3 pb-4 mb-3 docs-menu-container"
            v-if="$page.docsIndex.content.includes('h1')"
          >
            <strong
              class="d-block pt-3 pb-2 docs-menu-header text-center"
              style="letter-spacing:1px;font-size:75%;font-weight:900;"
            >
              <i
                class="fa fa-fw fa-book mr-2 opacity-50"
                style="color: #17367ee8;text-shadow: 1px 2px #006eff30, 0px 1px #fff;"
              ></i>ON THIS PAGE
            </strong>
            <div class="docs-menu" v-html="$page.docsIndex.content">{{ $page.docsIndex.content }}</div>
          </div>
        </div>
      </div>
    </template>
  </Docs>
</template>

<page-query>
query docsIndex ($id: ID!) {
  docsIndex: doc(id: $id) {  
        id
        slug
        content
        title
      }  
  sidebar: doc(id: "doc-sidebar"){          
        id
        slug
        content
      }      
}
</page-query>

<script>
import docsSettings from "../../data/docs.json";
import Docs from "~/layouts/Docs.vue";
import VRuntimeTemplate from "v-runtime-template";

var test = "index";

export default {
  components: {
    Docs,
    VRuntimeTemplate
  },
  data() {
    return {
      docsSettings: docsSettings,
      window: null,
      pageMenu: null,
      menuHtml: null
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
    title: "Documentation"
  },
  methods: {
    template() {
      return "<div style='width:250px;height:100%;'>" + this.$options.filters.markdown(this.$page.sidebar.content) + "</div>";
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

<style >
.docs-menu-mobile ul,
.docs-menu-mobile li {
  list-style: none !important;
  text-align: left;
}
.docs-menu-mobile ul {
  padding-left: 0px !important;
}
.docs-menu-mobile a {
  color: #0a1c46e8;
}

.docs-menu-mobile li i {
  color: #17367ee8;
  opacity: 0.5;
  margin-right: 11px;
  text-shadow: 1px 2px #006eff30, 0px 1px #fff;
}
</style>