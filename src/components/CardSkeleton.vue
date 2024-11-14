<template>
    <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-button"></div>
    </div>
</template>

<style scoped>
.skeleton-card {
    width: 100%;
    max-width: 280px;
    height: 280px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    animation: pulsate 1.5s infinite ease-in-out;
    margin-bottom: 16px;
}

.skeleton-image {
    width: 100%;
    height: 150px;
    background-color: #e0e0e0;
    border-radius: 5px;
}

.skeleton-title {
    width: 60%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
}

.skeleton-description {
    width: 80%;
    height: 15px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
}

.skeleton-button {
    width: 50%;
    height: 35px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 15px;
}

@keyframes pulsate {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

.skeleton-image,
.skeleton-title,
.skeleton-description,
.skeleton-button {
    animation: pulsate 1.5s infinite ease-in-out;
}
</style>
