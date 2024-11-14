<template>
    <div class="welcome-container">
        <WelcomeSection/>
        <CarrouselComponent/>
        <section class="about-us">
          <h2 class="about-us-title">¿Quiénes somos?</h2>
          <div class="about-us-paragraph">
            <p>
              En Balu Events, somos apasionados por crear experiencias inolvidables. Nos especializamos       en la organización de eventos que destacan por su originalidad y atención a cada detalle. 
                Desde celebraciones corporativas hasta eventos sociales, nuestro equipo profesional está comprometido en hacer realidad tus ideas y convertir cada ocasión en un éxito memorable. 
            </p>
            <Social/>
          </div>
        </section>
        <HowWeWork />
        <h2 class="rating-title text-center">Calificaciones</h2>
        <RatingSection /> 
    </div>
</template>

<script lang="ts">

import HowWeWork from './components/HowWeWork.vue';
import CarrouselComponent from './components/CarrouselComponent.vue';
import WelcomeSection from './components/WelcomeSection.vue';
import Vue from 'vue'
import RatingSection from './components/RatingSection.vue';
import Social from './components/Social.vue';
export default Vue.extend({
  name: 'LandingPage',
  components: {
    HowWeWork,
    CarrouselComponent,
    WelcomeSection,
    RatingSection,
    Social
  }
})
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  box-sizing: border-box;
}

.rating-title{
  font-size: 2em;
  font-weight: bold;
  color: #3a4a55;
  margin-top: 20px;
  margin-bottom: 20px;
}
.about-us-title {
  font-size: 2em;
  font-weight: bold;
  color: #3a4a55;
  margin-bottom: 20px;
}
.about-us {
  padding: 20px;
  text-align: center;
}

.about-us-paragraph {
  max-width: 800px;
  margin: 0 auto;
}
</style>