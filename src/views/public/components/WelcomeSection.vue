<template>
    <div>
        <section class="welcome-section">
            <h1 class="typing-animation">Balu Events</h1>
            <p>Transformamos tus ideas en experiencias únicas, diseñadas para sorprender y emocionar a cada invitado.</p>
            <div class="button-groups">
                <b-button 
                    variant="white"
                    type="button"
                    class="button-landing mr-2 text-dark-secondary"
                >
                    Ver eventos
                </b-button>
                <b-button
                    variant="white"
                    type="button"
                    class="button-landing text-dark-secondary"
                    @click="toLogin"
                >
                    Iniciar sesión
                </b-button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        methods: {
           toLogin(){
              const isAuthenticated = localStorage.getItem("token");
              if (!isAuthenticated) { 
                this.$router.push({ name: 'login' }) 
              }else{
                this.$router.push({ name: 'home' }) 
              }
           }
        }
    })
</script>

<style scoped>
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url('/src/assets/img/landing-page-balu.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 60px 20px;
  background-color: rgba(138, 138, 138, 0.5);
  background-blend-mode: darken;  
}


.welcome-section p {
  font-size: 1.5em;
  margin-bottom: 30px;
}

.typing-animation {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 8s steps(30, end) 1s infinite, blink-caret 0.2s step-end infinite;
  font-size: 3em;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(26, 26, 26, 0.5);
}

@keyframes typing {
  0% { width: 0; }
  50% { width: 100%; }
  75% { width: 100%; }
  100% { width: 0; }
}

@keyframes blink-caret {
  0%, 100% { border-color: transparent; }
  50% { border-color: white; }
}


.button-landing{
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-landing:hover{
  transform: translateY(-4px);
  background-color: #dfdfdf
}

.button-landing:focus,
.button-landing:active {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: white;
}

</style>