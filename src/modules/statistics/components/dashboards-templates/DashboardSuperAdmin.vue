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
                <b-col cols="12" lg="4">
                    <div class="dashboard-card p-3">
                        <h5 class="text-dark-secondary">Eventos en curso</h5>
                        <div class="content">
                            <svg-icon 
                                type="mdi"
                                class="icon-large text-primary"
                                size="50"
                                :path="$icons.mdiUpdate"
                            />
                        </div>
                        <p class="amount text-dark-secondary font-weight-bold text-right">20</p>
                    </div>
                </b-col>
                <b-col cols="12" lg="4" md="6">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Inversiones</h5>
                        <div class="content text-center">
                            <svg-icon 
                                type="mdi"
                                class="icon-large text-warning"
                                size="50"
                                :path="$icons.mdiCashLock"
                            />                            
                        </div>
                        <p class="amount text-dark-secondary text-right">$32,000 MXN</p>
                    </div>
                </b-col>
                <b-col cols="12" lg="4" md="6">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Ganancias</h5>
                        <div class="content">
                            <svg-icon 
                                type="mdi"
                                class="icon-large text-green"
                                size="50"
                                :path="$icons.mdiCashLockOpen"
                            />
                        </div>
                        <p class="amount text-dark-secondary text-right">$45,000 MXN</p>
                    </div>
                </b-col>
                <b-col cols="12" lg="8">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Administradores mejor evaluados</h5>
                        <div class="evaluated-admins">
                            <div class="admin-rating">
                                <span class="rating-score bg-success">92 pts</span> 
                                <div class="progress-bar-style">
                                    <b-progress height="1.5rem"  variant="success"  :striped="false" style="width: 100%;">
                                        <b-progress-bar :value="92">
                                            <span class="admin-rating-name">José Miguel Aguario Díaz</span>
                                        </b-progress-bar>
                                    </b-progress>
                                </div>
                            </div>
                            <div class="admin-rating">
                                <span class="rating-score bg-dark-secondary">75 pts</span> 
                                <div class="progress-bar-style">
                                    <b-progress height="1.5rem"  variant="dark-secondary"  :striped="false" style="width: 100%;">
                                        <b-progress-bar :value="75">
                                            <span class="admin-rating-name">Marianne Santos Perez</span>
                                        </b-progress-bar>
                                    </b-progress>
                                </div>
                            </div>
                            <div class="admin-rating">
                                <span class="rating-score bg-dark-blue">60 pts</span> 
                                <div class="progress-bar-style">
                                    <b-progress height="1.5rem"  variant="dark-blue"  :striped="false" >
                                        <b-progress-bar :value="60">
                                            <span class="admin-rating-name">Darianna Belén Vences</span>
                                        </b-progress-bar>
                                    </b-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" lg="4">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Mejor administrador</h5>
                        <div class="card-content">
                            <b-avatar size="50" variant="primary">
                                <span>R</span>
                            </b-avatar>
                            <div class="admin-info">
                                <p class="admin-name text-dark-secondary">Raúl Domínguez Bravo</p>
                            </div>
                        </div>
                        <p class="event-count font-weight-bold">Eventos 20</p>
                    </div>
                </b-col>
                <b-col cols="12" lg="8" md="6">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Evaluación de eventos</h5>
                        <div class="chart-placeholder">
                            <Chart/>
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" lg="4" md="6">
                    <div class="dashboard-card">
                        <h5 class="text-dark-secondary">Proveedores populares</h5>
                        <div class="chart-placeholder">
                            <PieChart/>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="ts">
    import { decrypt } from '@/config/cryptojs';
    import Vue from 'vue';
    import Chart from '@/modules/statistics/components/Charts/Chart.vue';
    import PieChart from '@/modules/statistics/components/Charts/PieChart.vue';
    export default Vue.extend({
        name: 'DashboardAdmin',
        components: {
            Chart,
            PieChart
        },
        data() {
            return {};
        },
        methods: {
            getUserName() {
                return String(decrypt(localStorage.getItem('name')!)).split(' ')[0];
            }
        }
    });
</script>

<style scoped>

.title-dashboard{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    font-weight: 500;
    color: #757575;
    padding-top: 5px;
}
.admin-rating-name {
    font-size: 1rem;
    font-weight: 500;
    color: white
}
.progress-bar-style {
    flex-grow: 1;
}
.welcome-text {
    font-size: 1.5rem;
    font-weight: 250;
    color: #757575;
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
.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-top: 3px;
    margin-bottom: 10px;
}

.dashboard-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 9px;
}

.card-content {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
    justify-content: left;
    position: relative;
    margin-top: 0.2rem;
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

.card-content {
    display: flex;
    align-items: center;
    gap: 0;
}

.admin-info {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
}

.admin-name {
    font-size: 1.1rem;
    font-weight: 300;
    margin: 0;
}

.admin-events {
    color: #757575;
    margin: 0;
}

.event-count {
    color: #757575;
    text-align: right;
    font-size: 1rem;
    margin: 0;
    padding-top: 0.5rem;

}

.b-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.icon-large { 
    margin-bottom: -10px;
}

.amount{
    font-size: 1.0rem;
    font-weight: 600;
    margin-bottom: 0; 
}

.evaluated-admins {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.admin-rating {
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.rating-score {
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    margin-right: 0.5rem;
}


.chart-placeholder {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
}
</style>