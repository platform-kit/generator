<template>
	<div class="w-100 d-block border-top p-3 pt-4" id="siteFooter">
		<div class="container container-footer">
			<div class="row">				
				<div class="col-md-3">
					<ul class="list-group mr-0 list-group-flush">
						<li class="list-group-item border-0"><a href="/" class="w-100 text-dark px-0  btn text-left ">Featured Content</a></li>
						<li class="list-group-item border-0 text-weight-200" v-for="edge, index in $static.featuredContent.edges"><a :href="'/content/' + edge.node.slug" class="text-dark">{{ edge.node.title }}</a></li>																	
					</ul>
				</div>
				<div class="col-md-2">
					<ul class="list-group mr-0 list-group-flush">
						<li class="list-group-item border-0"><a href="/products" class="w-100 text-dark px-0  btn text-left">Products</a></li>
						<li class="list-group-item border-0 text-weight-200" v-for="edge, index in $static.featuredProducts.edges"><a :href="'/buy/' + edge.node.slug" class="text-dark">{{ edge.node.title }}</a></li>																	
					</ul>
				</div>
				<div class="col-md-2">
					<ul class="list-group mr-0 list-group-flush">
						<li class="list-group-item border-0"><a href="/services" class="w-100 text-dark px-0  btn text-left">Services</a></li>
						<li class="list-group-item border-0 text-weight-200" v-for="edge, index in $static.featuredServices.edges"><a :href="'/buy/' + edge.node.slug" class="text-dark">{{ edge.node.title }}</a></li>																	
					</ul>
				</div>
				<div class="col-md-2">
					<ul class="list-group mr-0 list-group-flush">
						<li class="list-group-item border-0 text-dark text-weight-200"><div  class="w-100 text-dark px-0 btn text-left">About</div></li>					      																
						<li class="list-group-item border-0 text-weight-200" v-if="legalSettings != null && legalSettings.copyright != null"><span class="footer__links"><span  style="white-space: pre;">{{ legalSettings.copyright }}</span></span></li>
            <li class="list-group-item border-0 text-weight-200" v-if="legalSettings.terms != null && legalSettings.terms != ''"><span class="footer__links"><a href="/terms" class="text-dark">Terms of Service</a></span></li>
						<li class="list-group-item border-0 text-weight-200">Built with <a href="https://www.platformkit.com" target="_blank">PlatformKit</a></li>            
					</ul>
				</div>
        <div class="col-md-3">
          <ul class="list-group mr-0 list-group-flush">
            <li class="list-group-item border-0 text-weight-200">
              <g-link
                  v-if="socialSettings != null && socialSettings.facebok != null"
                  class="mb-1 btn btn-white  btn-block"
                  :to="'https://facebook.com/' + socialSettings.facebook"
                >
                  <i class="fa fa-facebook"></i> Facebook
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.instagram != null"
                  class="mb-1 btn btn-white btn-block"
                  :to="'https://instagram.com/' + socialSettings.instagram"
                >
                  <i class="fa fa-instagram"></i> Instagram
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.twitter != null"
                  class="mb-1 btn btn-white btn-block"
                  :to="'https://twitter.com/' + socialSettings.twitter"
                >
                  <i class="fa fa-twitter"></i> Twitter
                </g-link>
                <g-link
                  v-if="socialSettings != null && socialSettings.github != null"
                  class="btn btn-white btn-block"
                  :to="'https://github.com/' + socialSettings.github"
                >
                  <i class="fa fa-github"></i> Github
                </g-link>
                <a href="/docs"
                  v-if="$static.docs.edges.length > 1"             
                  class="btn btn-white btn-block"
                  @click="window.location.assign('/docs')"                  
                >
                  <i class="fa fa-book"></i> Documentation
                </a>
            </li>
          </ul>
        </div>
			</div>
		</div>
	</div>
</template>

<static-query>
query {
  featuredContent: allContentItem(limit: 3, filter: { published: { eq: true }, featured: { eq: true} }) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        featured      
        description
        cover_image
        path      
      }
    }
  }
  featuredServices: allOffering(limit: 3, filter: { published: { eq: true }, type: { eq: "service"}, featured: { eq: true} }) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        featured
        type
        description
        cover_image
        path        
      }
    }
  }
  featuredProducts: allOffering(limit: 3, filter: { published: { eq: true }, type: { eq: "product"}, featured: { eq: true} }) {
    edges {
      node {
        id
        title
        slug
        date (format: "D. MMMM YYYY")
        timeToRead
        featured
        type
        description
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
        content               
      }
    }
  }
}
</static-query>

<script>
import socialSettings from "../../data/social.json";
import legalSettings from '../../data/legal.json'

export default {  
  data () {
    return {
      legalSettings: legalSettings,
      socialSettings: socialSettings,
      window: null      
    }
  },
  async mounted() {          
    try {
      this.window = window          
    } catch (error) {
      console.log(error)
    }
  }, 
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
.container-footer {
  width:100% !important;
  max-width: 1380px !important;
}
</style>