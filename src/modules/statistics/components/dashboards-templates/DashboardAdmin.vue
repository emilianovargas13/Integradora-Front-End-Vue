<template>
    <div>
        <div class="dashboard-content">
            <div class="dashboard-header">
                <span class="welcome-text d-none d-lg-inline">
                    Bienvenido, {{ getUserName() }}
                </span>
                <h1 class="title-dashboard">Actividad de Marzo</h1>
                <div>
                    <b-button
                        variant="secondary"
                        class="mr-2 button-actions"
                        v-b-tooltip.hover.bottom="'Filtrar'"
                    >
                        <svg-icon 
                            type="mdi" 
                            class="text-white icon-customized"  
                            :path="$icons.mdiCalendarRangeOutline"
                        />
                    </b-button>
                    <b-button
                        variant="danger"
                        class="button-actions"
                        v-b-tooltip.hover.bottom="'Exportar'"
                    >
                        <svg-icon 
                            type="mdi" 
                            class="text-white icon-customized"  
                            :path="$icons.mdiFilePdfBox"
                        />
                    </b-button>
                </div>
            </div>
            <b-row gutter="1">
                <b-col cols="12" lg="8">
                    <b-row>
                        <b-col cols="12" lg="4" md="6">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary">Publicados</h5>
                                <div class="content">
                                    <svg-icon 
                                        type="mdi"
                                        class="icon-large text-secondary"
                                        size="50"
                                        :path="$icons.mdiCalendarClock"
                                    /> 
                                </div>
                                <p class="value text-dark-secondary text-right">3</p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="4" md="6">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary">Total</h5>
                                <div class="content">
                                    <svg-icon 
                                        type="mdi"
                                        class="icon-large text-warning"
                                        size="50"
                                        :path="$icons.mdiCalendarText"
                                    />
                                </div>
                                <p class="value text-dark-secondary text-right">15</p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="4">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary">Finalizado</h5>
                                <div class="content">
                                    <svg-icon 
                                        type="mdi"
                                        class="icon-large text-success"
                                        size="50"
                                        :path="$icons.mdiCalendarCheck"
                                    />
                                </div>
                                <p class="value text-dark-secondary text-right">15</p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="6" md="6">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary">Invertido</h5>
                                <div class="content">
                                    <svg-icon 
                                        type="mdi"
                                        class="icon-large text-danger"
                                        size="50"
                                        :path="$icons.mdiCalendarSync"
                                    />
                                </div>
                                <p class="value text-dark-secondary text-right">$32,000 MXN</p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="6" md="6">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary">Ganancia</h5>
                                <div class="content">
                                    <svg-icon 
                                        type="mdi"
                                        class="icon-large dark-blue"
                                        size="50"
                                        :path="$icons.mdiCalendarSync"
                                    />
                                </div>
                                <p class="value text-dark-secondary text-right">$32,000 MXN</p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="4" md="4">
                            <div class="dashboard-card">
                                <h5 class="text-dark-secondary text-center">Promedio general</h5>
                                <div class="content">
                                    <p class="grade text-dark-secondary text-center">4.5</p>
                                </div>
                                <p class="value text-dark-secondary text-center">
                                    <b-rating class="border-0 bg-transparent" v-model="rating" variant="warning" readonly inline size="md"></b-rating>
                                </p>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="8" md="8">
                            <b-row>
                                <b-col cols="12">
                                    <div class="rating-card">
                                        <div class="rating-user">
                                            <b-avatar size="35" variant="secondary">
                                                <span>
                                                    <svg-icon 
                                                        type="mdi"
                                                        class="icon-large text-dark-secondary"
                                                        size="21"
                                                        :path="$icons.mdiAccount"
                                                    />
                                                </span>
                                            </b-avatar>
                                            <div>
                                                <p class="user-name">Usuario</p>
                                                <p class="user-comment">Bien, no está mal</p>
                                            </div>
                                            <b-rating 
                                                class="border-0 bg-transparent user-rating" 
                                                v-model="rating" 
                                                variant="warning" 
                                                readonly 
                                                inline 
                                                size="sm"
                                            ></b-rating>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col cols="12">
                                    <div class="rating-card">
                                        <div class="rating-user">
                                            <b-avatar size="35" variant="secondary">
                                                <span>
                                                    <svg-icon 
                                                        type="mdi"
                                                        class="icon-large text-dark-secondary"
                                                        size="21"
                                                        :path="$icons.mdiAccount"
                                                    />
                                                </span>
                                            </b-avatar>
                                            <div>
                                                <p class="user-name">Usuario</p>
                                                <p class="user-comment">Mejor nada...</p>
                                            </div>
                                            <b-rating 
                                                class="border-0 bg-transparent user-rating" 
                                                v-model="rating" 
                                                variant="warning" 
                                                readonly 
                                                inline 
                                                size="sm"
                                            ></b-rating>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col> 
                <b-col cols="12" lg="4">
                    <b-row>
                        <b-col cols="12" >
                            <div class="table-card">
                                <h5 class="text-dark-secondary">Tipos de recurso populares  </h5>
                                <div class="content">
                                    <Chart />
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="12">
                            <div class="table-card">
                                <h5 class="text-dark-secondary">Recursos</h5>
                                <div class="content-pie-chart">
                                    <PieChart />
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="ts">
    import { decrypt } from '@/config/cryptojs';
    import Vue from 'vue'   
    import Chart from '../Charts/Chart.vue';
    import PieChart from '../Charts/PieChart.vue';
    export default Vue.extend({
        name: 'DashboardSuperAdmin',
        data() {
            return {
                rating: 4.5
            }
        },
        components: {
            Chart, PieChart
        },
        methods: {
            getUserName() {
                return String(decrypt(localStorage.getItem('name')!)).split(' ')[0];
            }
        },
        mounted() {
        }
    })
</script>

<style scoped>
.dashboard-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 9px;
}

.table-card{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-height: 310px;
    min-height: 200px;
    overflow: hidden;
    margin-bottom: 1.6rem;
}

.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-top: 3px;
    margin-bottom: 10px;
}

.welcome-text {
    font-size: 1.5rem;
    font-weight: 250;
    color: #757575;
}

.title-dashboard{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    font-weight: 500;
    color: #757575;
    padding-top: 5px;
}


@media (max-width: 992px) {
    .dashboard-header {
        flex-direction: start;
        align-items: center;
    }
    .title-dashboard {
        position: static;
        transform: none;
        margin-bottom: 10px;
    }
}

.dashboard-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin-bottom: 1.6rem;
}
.rating-card{
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 43px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-bottom: 1.4rem;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.value{
    font-size: 1.0rem;
    font-weight: 600;
    margin-bottom: 0; 
}


.grade{
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0; 
}

.rating-user{
    display: flex;
    align-items: center;
    gap: 1rem;
}
.user-name {
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0;
}

.user-comment {
    font-size: 0.85rem;
    color: #757575;
    margin: 0;
}

.user-rating {
    margin-left: auto;
}

.content-pie-chart {
    height: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
}
</style>