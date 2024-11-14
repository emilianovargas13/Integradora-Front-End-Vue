<template>
  <div>
    <section class="carousel-container text-center">
      <h2 class="carousel-title">¿Qué eventos manejamos?</h2>
      <template v-if="!isLoading">
        <template v-if="evenTypes.length > 0">
          <div :class="['carousel', { 'static-mode': evenTypes.length <= 3 }]">
            <div class="carousel-track"
              :style="{ animationDuration: evenTypes.length > 3 ? `${animationDuration}s` : '0s' }">
              <div class="carousel-slide"
                v-for="(item, index) in (evenTypes.length > 3 ? duplicatedEvenTypes : evenTypes)" :key="index">
                <div class="image-container">
                  <img :src="item.image" alt="Event type image" />
                  <div class="title-overlay">
                    <h3 class="title">{{ item.name }}</h3>
                    <p class="description">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <b-row class="p-3">
            <b-col cols="12" class="d-flex justify-content-center align-items-center flex-column">
              <img :src="require('@/assets/img/no-event-types-founded.svg')" alt="empty-state" />
              <h3 class="text-dark-secondary">Sin tipos de evento</h3>
              <p class="text-dark-secondary">No hay tipos de evento disponibles por ahora</p>
            </b-col>
          </b-row>
        </template>
      </template>
      <template v-else>
        <CarouselSkeleton />
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { findAllEventTypes } from '@/modules/event-types/boundary.module';
import { EventType } from '@/modules/event-types/entities/EventType';
import CarouselSkeleton from '@/components/Carousel-skeleton.vue';
export default Vue.extend({
  components: {
    CarouselSkeleton,
  },
  data() {
    return {
      evenTypes: [] as Array<EventType>,
      visibleSlides: 3,
      animationDuration: 25,
      isLoading: false,
    };
  },
  computed: {
    duplicatedEvenTypes(): Array<EventType> {
      return this.evenTypes.length > 3 ? [...this.evenTypes, ...this.evenTypes] : this.evenTypes;
    },
    isStaticMode(): boolean {
      return this.evenTypes.length <= 3;
    },
  },
  methods: {
    async getEventTypes() {
      try {
        this.isLoading = true;
        const { status, entities } = await findAllEventTypes();
        if (status === 200 && entities) {
          this.evenTypes = entities;
        }
      } catch (error) {}
      finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getEventTypes();
  },
});
</script>

<style scoped>

.carousel-title {
  font-size: 2em;
  font-weight: bold;
  color: #3a4a55;
  margin-bottom: 20px;
}
.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel.static-mode {
  justify-content: center;
}

.carousel-track {
  display: flex;
  animation: scroll linear infinite;
}
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel.static-mode .carousel-track {
  animation: none;
}

.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 3px;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.3s ease;
  max-height: none;
  overflow: visible;
}

.title-overlay .title, .title-overlay .description {
  margin: 0;
  padding: 5px;
  transition: opacity 0.3s ease;
}


.title-overlay .title {
  opacity: 1;
  font-size: 26px; 
  font-weight: bold;
  transition: opacity 0.3s ease, font-size 0.3s ease;
}

.title-overlay .description {
  opacity: 0;
  max-height: 0;
  font-size: 15px;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease;
}
.carousel-slide:hover .title-overlay .title {
  font-size: 23px;
  opacity: 0.8;
}

.carousel-slide:hover .title-overlay .description {
  opacity: 1;
  max-height: 100px;
}

.carousel-slide:hover .title-overlay .description {
  opacity: 1;
  max-height: 100px;
}
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 20px;

}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: calc(100% / 3); 
  display: flex;
  align-items: center; 
  justify-content: center;
  color: white;
  font-size: 2em;
  height: 220px;
  margin: 0 10px;
  border-radius: 10px;
}

.carousel-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .welcome-section h1 {
    font-size: 2.5em;
  }

  .welcome-section p {
    font-size: 1.3em;
  }

  .carousel-slide {
    min-width: calc(100% / 2);
  }
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 40px 15px;
  }

  .welcome-section h1 {
    font-size: 2em;
  }

  .welcome-section p {
    font-size: 1.2em;
  }

  .carousel-slide {
    min-width: calc(100% / 2);
    font-size: 1.5em;
  }
}

@media (max-width: 480px) {
  .carousel-track {
    display: flex;
    justify-content: center;
  }

  .carousel-slide {
    min-width: 100%;
    max-width: 100%;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>