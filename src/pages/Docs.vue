<template>
  <Docs>
    <template v-slot:sidebar>
      <v-runtime-template
        v-for="edge in $page.sidebar.edges"
        v-if="edge.node.id == getNavId()"
        :template="template(edge.node.content)"
      ></v-runtime-template>
    </template>
    <template v-slot:main>
      <div class="row col-lg-9 m-0 bg-white">
        <div class="col-lg-9 px-3 pl-lg-5 pr-lg-0 pb-3 pb-lg-5 pull-right docs-content">
          <h1 class="pt-4 title text-center pb-4">{{ $page.docsIndex.title }}</h1>
          <div
            v-if="docsSettings != null && docsSettings.index != null"
            v-html="$page.docsIndex.content"
          >{{ $page.docsIndex.content }}</div>
        </div>
        <div
          v-if="docsSettings != null && docsSettings.index != null"
          class="col-12 col-lg-3 px-3 px-lg-0 pt-0 docs-menu-col"
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
            <div class="docs-menu" v-html="menuHtml">{{ menuHtml }}</div>
          </div>
          <div class="docs-menu-mobile mt-4 text-left raised br-5 card border-0 d-block d-lg-none mb-5">
            
            <div class="card-body bottom-nav">
              <v-runtime-template
                v-for="edge in $page.sidebar.edges"
                v-if="edge.node.id == getNavId()"
                :template="template(edge.node.content)"
              ></v-runtime-template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Docs>
</template>

<page-query>
query docsIndex  {
    docsIndex: doc( id: "doc-index") {
     
          id
          slug
          content
          title
          nav
      
    }  
  sidebar: allNav{
    edges {
      node {
        id
        slug
        content
      }
    }    
  }  
}
</page-query>

<script>
import docsSettings from "../../data/docs.json";
import Docs from "~/layouts/Docs.vue";
import VRuntimeTemplate from "v-runtime-template";

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
    this.generatePageMenuLinks();
  },
  metaInfo: {
    title: "Documentation"
  },
  methods: {
    generatePageMenuLinks() {
      var html = this.$page.docsIndex.content;
      var newHtml = html;
      this.menuHtml = newHtml;
    },
    getNavId() {
      var id = null;
      if (
        typeof this.$page.docsIndex.nav == "undefined" ||
        this.$page.docsIndex.nav == null ||
        this.$page.docsIndex.nav == ""
      ) {
        id = "doc-sidebar";
      } else {
        id = this.$page.docsIndex.nav;
      }

      console.log(id);

      return id;
    },
    template(input) {
      return (
        "<div style='width:100%;max-width:100%;height:100%;text-align:left;'>" +
        this.$options.filters.markdown(input) +
        "</div>"
      );
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
