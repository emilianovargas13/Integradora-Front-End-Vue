<template>
  <div id="app">
    <Navbar v-if="!hideNavigation || hideNavar"/>
    <div :class="{ 'd-flex': !hideNavigation }">
      <Sidebar :visible="true" v-if="!hideNavigation && !hideNavar"/>
      <div :class="{ 'content': !hideNavigation }">
        <router-view/>
      </div>
    </div>
</div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Navbar from './components/Navbar.vue';
    import Sidebar from './components/Sidebar.vue';
    export default Vue.extend({
        name: 'App',
        components: {
            Navbar,
            Sidebar
        },
        computed: {
          hideNavigation() {
            return this.$route.meta?.hideNavigation || false
          },
          hideNavar(){
            return this.$route.meta?.showNav || false
          }
        }
    })
</script>
<style scoped>
.content{
  width: 100%;
  overflow: auto;
  max-width: 100%;
  overflow-x: hidden;
  margin-top: 60px;
  height: calc(100vh - 65px);
}
</style>
