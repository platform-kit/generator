# Templates

PlatformKit builds your website by combining the data found in the static files in your `data` directory with the templates found in the `src` directory. 

Each template is a Vue component contains HTML and Javascript, like so: 

```vue
<template>
  <div>
    <h1>Hello, world!</h1>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!',
    meta: [
      { name: 'author', content: 'John Doe' }
    ]
  }
}
</script>
```

In addition to the HTML and Javascript, a component can also contain GraphQL queries, the results of which are available to Vue.

```vue
<template>
  <div>
    <div v-for="edge in $page.content.edges" :key="edge.node.id">
      <h2>{{ edge.node.title }}</h2>
    </div>
  </div>
</template>

<page-query>
query {
  content: allContentItem {
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>
```

For more on how these templates work, see the [Gridsome Docs.](https://gridsome.org/docs/directory-structure/)