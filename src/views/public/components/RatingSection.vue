<template>
  <div>
    <section class="rating-section">
      <template v-if="ratings.length > 0">
        <div class="rating-card" v-for="(item, index) in ratings" :key="index">
          <div class="image-container">
            <img :src="item.image" alt="Event image" class="event-image">
          </div>
          <div class="card-content">
            <h5 class="card-title">{{ item.title }}</h5>
            <b-rating class="border-0 " v-model="item.rating" variant="warning" readonly inline size="lg"></b-rating>
          </div>
        </div>
      </template>
      <template v-else>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-center align-items-center flex-column">
                <img
                    :src="require('@/assets/img/no-ratings-founded.svg')"
                    alt="empty-state"
                />
                <h3 class="text-dark-secondary">Sin calificaciones</h3>
                <p class="text-dark-secondary">Aún no contamos con calificaciones</p>
            </b-col>
        </b-row>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data(){
            return {
                ratings: [
                    { image: 'https://lkdevents.com/img/UniMenu22/eventos-presenciales-1551108267663.jpg', title: 'Juan & Alexa', rating: 4.5 },
                    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUZjHuPML5Ew1Ax0rAxjkmmdZa0u-1i68RgA&s', title: 'Cumpleaños', rating: 3.5 },
                    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTw_0pKgIhD8sjT_RxPssydypTd5QLEJyLEw&s', title: 'Otro..', rating: 4 },
                    { image: 'https://terrazapolanco.com.mx/wp-content/uploads/2020/06/eventos-iluminacion-led-especiales.jpg', title: 'Convención', rating: 1 }
                ],

            }
        }
    })
</script>

<style scoped>
.rating-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
}

.rating-card {
  flex: 1 1 20%; 
  max-width: 25%; 
  border-radius: 10px;
  text-align: center;
}

.rating-card:hover {
  transform: translateY(-10px);
  transition: all 0.3s;
}

.image-container {
  position: relative;
  top: 30;
  width: 85%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  background-color:transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  margin: 0 auto; 
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  margin-top: -40px;
  padding: 20px 10px;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1em;
  margin-top: 40px;
  color: #333;
}

@media (max-width: 768px) {
  .rating-card {
    flex: 1 1 50%;
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .rating-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>