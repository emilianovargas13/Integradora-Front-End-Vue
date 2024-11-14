<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script lang="ts" >
  import Vue from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { ChartData, ChartOptions } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default Vue.extend({
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: ['Evaluación General'],
          datasets: [
            {
              label: 'Evento 1',
              backgroundColor: '#4A6650',
              data: [10]
            },
            {
              label: 'Evento 2',
              backgroundColor: '#FBB657',
              data: [20]
            },
            {
              label: 'Evento 3',
              backgroundColor: '#BE3E3F',
              data: [15]
            }
          ],
        } as ChartData<'bar'>,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
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
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
            },
          },
        } as ChartOptions<'bar'>,
      }
    }
  })
  </script>