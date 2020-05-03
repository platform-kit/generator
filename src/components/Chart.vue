<template>
  <div class="card border-0 raised mb-1" v-if="values != null">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <div class="card-text" >
        <div class="d-flex justify-content-center text-dark" style="">
          <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h1 class="text-center"
          v-if="!loading && type === 'number'"
          height="300"
        >{{ parseFloat(values[0][metrics[0]]).toLocaleString() }}</h1>
        <line-chart  v-if="!loading && type === 'line'" :values="values" :metrics="metrics"/>
        <bar-chart  v-if="!loading && type === 'stackedBar'" :values="values" :metrics="metrics"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default {
  components: {
    LineChart,
    BarChart
  },
  name: "Chart",
  props: {
    resultSet: Object,
    loading: Boolean,
    title: String,
    type: String
  },
  methods: {
    dateFormatter: function(value) {
      return moment(value).format("M YY");
    }
  },
  computed: {
    values: function() {
      if (this.loading) { return [];}
      if(this.resultSet != null && this.resultSet.chartPivot() != null) {
        return this.resultSet.chartPivot();
      }
    },
    metrics: function() {
      if (this.loading){  return [""];}      
      if(this.resultSet != null && this.resultSet.seriesNames() != null) {        
        return this.resultSet.seriesNames().map(x => x.key);
      }
    }
  },
  data() {
    return {
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

<style scoped>
@media(max-width: 768px) {
  h1 {
    font-size:100%;
    position:absolute;
    top:calc(75px);
    left:0px;
    width:100%;
    text-align:center;
  }
  .card {
    min-height:140px;    
  }
}
</style>
