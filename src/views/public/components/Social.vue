<template>
    <div class="social-icons">
      <div 
        v-b-popover.hover.bottom="media.value"
        v-for="media in socialMedia" 
        :key="media.name" 
        :class="`icon-container ${media.class}`"
      >
        <svg-icon 
            type="mdi" 
            class="text-white icon-customized"  
            :path="getIconPath(media.icon)"
        />
      </div>
    </div>
  </template>

<script lang="ts">
    import Vue from 'vue'
    import * as mdi from '@mdi/js';
    export default Vue.extend({
        data() {
            return {
            socialMedia: [
                { name: 'Teléfono', icon: 'mdiPhoneOutline', class:'phone-icon', value: '7775673712'},
                { name: 'Correo', icon: 'mdiEmailOutline', class: 'email-icon', value: 'baluevents24@gmail.com'},
                {name: 'Instagram', icon: 'mdiInstagram', class: 'instagram-icon', value: '@baluevents' },
            ]
            };
        },
        methods: {
            getIconPath(iconName: string) {
                return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
            }
        }
    })
</script>

<style scoped>
.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.icon-container {
  position: relative;
  width: 45px;
  height: 45px;
  background-color: #f8f9fa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.icon-container:hover {
  transform: scale(1.1);
}

.icon-container i {
  font-size: 24px;
  color: #333;
}

.tooltip {
  position: absolute;
  top: -40px;
  padding: 0.5rem 1rem;
  background-color: #e63946;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

.phone-icon{
    color: white;
    background-color: #577E85;
}

.email-icon{
    color: white;
    background-color: #BE3E3F;
}
.instagram-icon{
    color: white;
    background-color: #E1306C;
}
</style>