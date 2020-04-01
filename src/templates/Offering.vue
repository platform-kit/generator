<template>
  <Layout>
    <div class="container mt-3 mt-lg-5">
      <div class="row pb-4 text-center mb-3 mt-2">
        <div class="col-md-12 col-lg-6 br-5 justify-content-center">
          <div :style="{ backgroundImage: `url('${$page.offering.cover_image}')` }" class="br-5 raised square-image d-inline-block" style="background-position:center;background-size:cover;height:500px;width:500px;">
          </div>        
        </div>
        <div class="col-md-12 col-lg-6 br-5 text-left pl-3 pl-sm-3 pl-md-5 py-0 py-lg-5">
          <div class="badge badge-pill bg-very-light-blue border-primary-translucent px-3 py-2 text-primary text-capitalize mt-3">{{ $page.offering.type }}</div><br>
          <h4 class="my-3">{{ $page.offering.title}}</h4>
          <p class="text-dark my-3 pb-3">
            {{ $page.offering.description }}
            <hr></hr>
            <div class="btn btn-lg text-left pr-0 pl-0 ml-0 mb-3 price mr-4"><span><span class=" text-dark-blue opacity-30">$</span><span class="">{{ $page.offering.price }}</span></span></div><br>
            <div class="d-inline-block" v-if="($page.offering.buy_button_html == null || $page.offering.buy_button_html != '' ) || ($page.offering.buy_button_url == null || $page.offering.buy_button_url == '')">
              <div class="btn btn-lg btn-light btn-buy raised px-4 btn-buy snipcart-add-item"
                  :data-item-id="$page.offering.id"
                  :data-item-price="$page.offering.price"
                  :data-item-url="$page.offering.path"
                  :data-item-description="$page.offering.description"
                  :data-item-image="$page.offering.cover_image"
                  :data-item-name="$page.offering.title"
                  v-bind="buyButtonData"
                  >
                <font-awesome :icon="['fa', 'shopping-cart']" class="mr-4"/>Buy Now
              </div>              
            </div>
            <div v-else-if="$page.offering.buy_button_url != null " class="d-inline-block">   
              <a class="btn btn-lg btn-light btn-buy raised px-4 btn-buy m"
                  :href="$page.offering.buy_button_url"
                  target="_blank"
                  >
                <font-awesome :icon="['fa', 'shopping-cart']" class="mr-4"/>Buy Now
              </a>                           
            </div>
            <div v-else-if="$page.offering.buy_button_html != null" class="d-inline-block" v-html="$page.offering.buy_button_html">              
              {{ $page.offering.buy_button_html }}
            </div>
          </p>
        </div>
      </div>      
    </div>  
  </Layout>
</template>

<script>

export default {
  data () {
    return {
      buyButtonData: null    
    }
  },
  async mounted() {          
    try {
      this.generateDataAttributes()
      
      
    } catch (error) {
      console.log(error)
    }
  },  
  methods: {   
    getThumbnailImage(){
      if(this.$page.offering.thumbnail_image != null){
        return 'https://www.dharmaworks.com' + this.$page.offering.thumbnail_image
      }
      if(this.$page.offering.cover_image != null){
        return 'https://www.dharmaworks.com' + this.$page.offering.cover_image
      }
      else {
        return ''
      }
    },
    addToCart(input) {   
      try {
           Snipcart.api.cart.items.add({
              id: input.id,
              name: input.name,
              price: 1.11,
              url: '/',
              quantity: 1,
          });
      } catch (error) {
          console.log(error)
      }
    },
    generateDataAttributes(){
      var data = this.$page.offering.buy_button_data
      
      if(data == null){ 
        data = {}
      }
      
      data = data.replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f")
      var ob = JSON.parse(data)
      //var ob = Object.assign({}, data)      
      console.log('test')
      console.log(ob)
      this.buyButtonData = ob
      return ob
      
    
    }
  },
  metaInfo () {
    return {
      title: this.$page.offering.title,
      meta: [
      {
          name: 'description',
          content: this.$page.offering.description
        },
        {
          name: 'keywords',
          content: this.$page.offering.keywords
        },
        {
          property: "og:title",
          content: this.$page.offering.title
        },
        {
          name: "twitter:card",
          content: this.getThumbnailImage() ? "summary_large_image" : "summary",
        },
        {
          name: "twitter:creator",
          content: "@DharmaWorksLLC"
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
    }
  }
}
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
      boost
      description
      cover_image
      path
      buy_button_html
      buy_button_data
      buy_button_url
      tags {
        id
        title
        path
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
