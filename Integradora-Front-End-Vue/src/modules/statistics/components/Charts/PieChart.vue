<template>
<Pie
    :data="data"
    :options="chartOptions"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  </template>

<script lang="ts">
import Vue from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartOptions,
  ChartData
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default Vue.extend({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: {
        labels: ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'],
        datasets: [
          {
            backgroundColor: ['#F4E3C7', '#FBB657', '#92adb1'],
            data: [40, 30, 80]
          }
        ]
      } as ChartData<'pie'>,
      chartOptions: {
        plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
              }
            },
            tooltip: {
              enabled: true,
            },
          },
        responsive: true,
        maintainAspectRatio: false
      } as ChartOptions<'pie'>,
    }
  }
})
</script>

<style scoped>
</style>