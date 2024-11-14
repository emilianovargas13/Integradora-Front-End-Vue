<template>
    <div>
        <section class="how-we-work">
          <h2 class="how-we-work-title">¿Cómo trabajamos?</h2>
          <div class="steps-container">
            <div class="step text-secondary">
              <div class="step-number">1</div>
              <h3 class="step-title">Consultoría</h3>
              <p class="step-description">
                Nos reunimos contigo para escuchar tus ideas, conocer tus necesidades y entender lo que quieres lograr en tu evento.
              </p>
            </div>
            <div class="step">
              <div class="step-number text-dark-secondary">2</div>
              <h3 class="step-title">Planificación</h3>
              <p class="step-description">
                Diseñamos un plan detallado y personalizado, donde cuidamos cada aspecto para que todo salga tal como lo imaginaste.
              </p>
            </div>
            <div class="step">
              <div class="step-number text-primary">3</div>
              <h3 class="step-title">Ejecución</h3>
              <p class="step-description">
                El día del evento, nuestro equipo se encarga de cada detalle, asegurándose de que todo se desarrolle sin contratiempos.
              </p>
            </div>
          </div>
        </section>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        
    })
</script>

<style scoped>
.how-we-work {
  padding: 30px 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.how-we-work-title {
  font-size: 2em;
  font-weight: bold;
  color: #3a4a55;
  margin-bottom: 20px;
}

.steps-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
}
.step {
  max-width: 250px;
}

@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .step {
    max-width: 80%;
  }
}

@media (max-width: 480px) {
  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .step {
    max-width: 90%; 
  }

  .how-we-work-title {
    font-size: 1.5em; 
  }

  .step-number {
    font-size: 2em;
  }

  .step-title {
    font-size: 1.1em; 
  }

  .step-description {
    font-size: 0.9em;
  }
}

.step-number {
  font-size: 3em;
  font-weight: bold;
  color: #c4c4c4;
}

.step-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #3a4a55;
  margin-top: 10px;
  margin-bottom: 10px;
}

.step-description {
  font-size: 0.9em;
  color: #5a5a5a; 
  line-height: 1.5;
}
</style>