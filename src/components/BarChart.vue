<template>
  <div>
    <la-cartesian
      autoresize
      narrow
      stacked
      :data="values"
      :colors="colors"
      :padding="[0, 0, 5, 0]"
      class="pk-chart"
      :height="getHeight()"
    >
      <template v-for="metric in metrics">
        <la-bar :prop="metric" v-bind:key="metric" :width="6" :label="metric.split(',')[0]"></la-bar>
      </template> 
      <la-y-axis :nbTicks="2" :format="v => parseFloat(v).toLocaleString()"></la-y-axis>
      <la-x-axis prop="x" :format="dateFormatter" :interval="31"></la-x-axis>
      <la-tooltip />
    </la-cartesian>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "LineChart",
  props: {
    values: Array,
    metrics: Array
  },
  mounted() {
    if (typeof window != "undefined") {
      this.updateWindowSize(window.innerHeight, window.innerWidth);
      window.addEventListener("resize", () => {
        this.updateWindowSize(window.innerHeight, window.innerWidth);
      });
    }
  },
  methods: {
    updateWindowSize(height, width) {
      this.windowHeight = height;
      this.windowWidth = width;
      //alert(input);
    },
    getHeight() {
      if (this.windowHeight > 500 && this.windowWidth > 768) {
        return this.windowHeight - 410;
      } else {
        return 150;
      }
    },
    dateFormatter: function(value) {
      return moment(value).format("M/YY");
    }
  },
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
      txt: "",
      colors: [
        "#7DB3FF",
        "#49457B",
        "#FF7C78",
        "#FED3D0",
        "#6F76D9",
        "#9ADFB4",
        "#2E7987"
      ]
    };
  }
};
</script>
