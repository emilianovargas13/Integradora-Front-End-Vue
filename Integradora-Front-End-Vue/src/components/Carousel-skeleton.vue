<template>
    <div>
      <section class="carousel-container text-center">
        <div class="skeleton-carousel">
          <div class="skeleton-slide" v-for="n in 3" :key="n">
            <div class="skeleton-image blink"></div>
            <div class="skeleton-title blink"></div>
            <div class="skeleton-description blink"></div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <style scoped>
  .carousel-title {
    font-size: 2em;
    font-weight: bold;
    color: #3a4a55;
    margin-bottom: 20px;
  }
  
  .skeleton-carousel {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .skeleton-slide {
    width: calc(100% / 3 - 20px);
    background: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .skeleton-image,
  .skeleton-title,
  .skeleton-description {
    background: #e0e0e0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  
  .skeleton-image {
    width: 100%;
    height: 150px;
    border-radius: 8px;
  }
  
  .skeleton-title {
    width: 60%;
    height: 25px;
    margin-top: 10px;
  }
  
  .skeleton-description {
    width: 70%;
    height: 20px;
    margin-top: 10px;
  }
  
  .blink {
    animation: blink 1.5s ease-in-out infinite;
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
  
  @media (max-width: 480px) {
    .skeleton-carousel {
      flex-direction: column;
      gap: 15px;
    }
  
    .skeleton-slide {
      width: 100%;
    }
  }
  </style>