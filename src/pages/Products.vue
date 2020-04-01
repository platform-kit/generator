<template>
  <Layout :show-logo="false">
    <div class="container">
      <div class="row w-100 text-center mx-auto">
        <h2
          class="justify-content-center text-center w-100 text-weight-200 mb-3 mt-3 pt-3 mr-3"
        >Products</h2>
      </div>
    </div>

    <!-- Recent posts -->
    <div class="posts" style="min-height:400px;">
      <div class="container px-3">
        <b-card-group
          deck
          class="mb-3 mt-2 justify-content-center"
          v-for="collection, index in $page.collections.edges"
          v-bind:key="collection.node.id"
          v-if="collection.node.featured == true  && collection.node.offerings.length > 0 && collectionHasProducts(collection)"
        >
          <h3
            class="w-100 opacity-70 text-center text-primary mb-5 mt-2 mr-3"
          >{{ collection.node.title }}</h3>
          <div
            v-for="edge, index in $page.products.edges"
            v-bind:key="edge.node.id"
            v-if="collectionHasProducts(collection) && collection.node.offerings.includes(edge.node.id) && edge.node.featured == true && displayOrHide(edge.node.id) === true"
            class="col-md-3 px-0 pr-md-2 mb-4"
          >
            <div
              class="card raised border-0 mb-1 pull-left mx-0 px-0 h-100 mr-md-3 px-0 pb-3 m-0"
              :key="edge.node.id"
              :post="edge.node"
              v-if="displayOrHide(edge.node.slug) === true"
            >
              <div
                class="card-header"
                style="height:250px;background:none !important; border-radius:5px !important; overflow:hidden !important;"
              >
                <div
                  style="width:100%;height:250px;                              
                    position: absolute;
                    top: 0px;
                    right: 0px;                
                    background-size:cover;
                    background-position:center center;
                    border-radius:5px 5px 0px 0px "
                  :style="{ backgroundImage: `url('${edge.node.cover_image}')` }"
                ></div>
              </div>
              <div class="card-body p-0">
                <b-card-text class="pt-3 px-3" style="line-height:25px;">
                  <h5>{{ edge.node.title }}</h5>
                </b-card-text>
                <b-card-text class="pb-3 px-3 mb-4" style="line-height:28px;">
                  {{ edge.node.description.substr(0, 120) }}
                  <span style="opacity:.5;">...</span>
                </b-card-text>
                <b-button
                  :href="'/buy/' + edge.node.slug"
                  class="d-block"
                  variant="outline-primary"
                  style="position:absolute !important;bottom:15px;left:15px;width:calc(100% - 30px);"
                >
                  More Info
                  <span style="opacity:0.5;">→</span>
                </b-button>
              </div>
            </div>
          </div>
        </b-card-group>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  products: allOffering(sort: [{ by: "price",  }, { by: "boost" }] order: DESC, filter: { featured: { eq: true }, type: { eq: "product"} }) {
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
        tags {
          id
          title
          path
        }
      }
    }
  }
  collections: allCollection( sortBy: "boost", order: DESC, filter: { published: { eq: true }} ) {
    edges {
      node {
        id
        title
        slug
        boost
        date (format: "D. MMMM YYYY")
        timeToRead
        featured
        published
        description
        cover_image
        path
        tags {
          id
          title
          path
        }
        offerings
      }
    }
  }
}
</page-query>

<script>
import { fetch } from 'gridsome';

export default {
  data() {
    return {
      collection: null,
      offerings: null,
      productsPage: null
    };
  },
  metaInfo: {
    title: "All Products"
  },
  async mounted() {
    try {
      this.productsPage = await this.$fetch('/products');
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    collectionHasProducts(collection){ 
      
      //console.log(collection.node.offerings);
      if(this.productsPage != null){
      
      var allProducts = this.productsPage.data.products.edges;
        
      var results = allProducts.filter(product => product.node.type == 'product' && collection.node.offerings.includes(product.node.id));
      
      

      if(results.length > 0 ){        
        return true;
        console.log (collection.id);
        console.log(true);
      } else {
      return false;
        console.log(false);
       }
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