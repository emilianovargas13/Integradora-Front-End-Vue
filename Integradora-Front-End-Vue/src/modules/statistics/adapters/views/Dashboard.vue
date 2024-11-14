<template>
    <div>
        <Header :title="title" :image="require('@/assets/img/admin-dashboard-header.png')"/>
        <b-row>
            <b-col cols="12">
                <template v-if="role === 'ROLE_USER'">
                    <DashboardAdmin/> 
                </template>
                <template v-else>
                    <DashboardSuperAdmin/>
                </template>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Header from '@/components/Header.vue';
    import { decrypt } from '@/config/cryptojs';
    import DashboardAdmin from '@/modules/statistics/components/dashboards-templates/DashboardAdmin.vue';
    import DashboardSuperAdmin from '../../components/dashboards-templates/DashboardSuperAdmin.vue';
    export default Vue.extend({
        name: 'Dashboard',
        components: {
            Header,
            DashboardAdmin,
            DashboardSuperAdmin
        },
        data(){
            return {
                title: '',
                role: ''
            }
        },
        mounted(){
            this.role = String(decrypt(localStorage.getItem('role')!))
            this.title =  `Estadísticas ${this.role === 'ROLE_SUPERUSER' ? 'generales' : 'de eventos'}`
        }
    })
</script>

<style scoped></style>