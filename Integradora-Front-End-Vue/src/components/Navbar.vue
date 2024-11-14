<template>
    <div>
        <b-navbar class="custom-navbar bg-white" fixed="top">
            <div class="navbar-left">
                <b-navbar-brand>
                    <img @click="toLandingView()" :src="require('@/assets/img/logoBaluEvents.png')" class="img-navbar">
                </b-navbar-brand>
            </div>
            <div class="icon-container d-lg-none d-sm-inline" @click="toggleSidebar()">
                <b-icon icon="list" class="text-dark-secondary"/>
            </div>
        </b-navbar>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'Navbar',
        methods: {
            toggleSidebar() {
                this.$root.$emit('test');
            },
            toLandingView(){
                const currentRoute = this.$route.name;
                if (currentRoute !== 'welcome') {
                    this.$router.push({ name: 'welcome' }).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {}
                    });
                }
            }
        }
    })
</script>

<style scoped>
.custom-navbar {
    width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10vw;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem; 
}

.img-navbar{
    width: auto;
    height: 50px;
}

</style>