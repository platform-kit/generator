<template>
  <Layout>
 
  </Layout>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on ContentItem {
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>


export default {

  metaInfo: {
    title: ''
  }
}
</script>

<style lang="scss">

</style>

