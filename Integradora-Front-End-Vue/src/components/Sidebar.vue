<template>
  <div :class="['custom-sidebar bg-white', { open: visible, closed: !visible }]">
      <div class="sidebar-header">
          <b-avatar variant="primary" :text="getUserInfo().name.charAt(0)"/>
          <div class="user-info">
              <h2 class="user-sidebar text-dark-secondary">{{getUserInfo().name}}</h2>
              <p class="role text-dark-secondary">{{ getUserInfo().role }}</p>
          </div>
          <div>
              <b-icon icon="chevron-bar-left" class="toogle-icon text-dark-secondary" @click="toggleSidebar()"/>
          </div>
          <hr/>
      </div>
      <div class="w-100">
          <ul>
              <li class="item text-dark-secondary" v-for="(item, index) in filteredRoutes" :key="index":class="{ 'active-route': isActiveRoute(item.route)}" @click="navigate(item.route)">
                <b-icon :icon="item.icon" class="sidebar-icon" v-b-tooltip.hover.right="item.label"/> <span class="sidebar-text">{{ item.label }}</span>
              </li>
          </ul>
      </div>
      <div class="sidebar-footer">
        <hr/>
          <ul>
              <li class="log-out-item text-dark-secondary log-out-side" @click="logOut()">
                <b-icon icon="door-open" class="sidebar-icon"/> <span class="sidebar-text">Cerrar sesión</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { decrypt } from '@/config/cryptojs';
  import * as mdi from '@mdi/js';
  export default Vue.extend({
      name: 'Sidebar',
      data(){
          return {
              menuItems: [
                  { label: 'Inicio', icon: 'house-door', route: 'home', roles: ['ROLE_SUPERUSER', 'ROLE_USER']},
                  { label: 'Estadísticas', icon: 'graph-up', route: 'dashboard', roles: ['ROLE_SUPERUSER', 'ROLE_USER']},
                  { label: 'Administradores', icon: ' people', route: 'users', roles: ['ROLE_SUPERUSER']},
                  { label: 'Recursos', icon: 'box-seam', route: 'resourceTypesManagement', roles: ['ROLE_SUPERUSER', 'ROLE_USER']},
                  { label: 'Eventos', icon: 'calendar', route: 'eventTypesManagement', roles: ['ROLE_SUPERUSER', 'ROLE_USER']},
                  { label: 'Proveedores', icon: 'cart3', route: 'suppliers', roles: ['ROLE_SUPERUSER', 'ROLE_USER']},
              ],
              visible: true,
          }
      },
      computed: {
        filteredRoutes(){
          const role = decrypt(localStorage.getItem('role')!)
          return this.$data.menuItems.filter((item : any) => item.roles.includes(role))
        }
      },
      methods: {
        toggleSidebar() {
            this.visible = !this.visible;
        },
        isActiveRoute(name : string) {
          return this.$route.name === name;
        },
        navigate(route : string){
          const currentRoute = this.$route.name;
          if (route !== currentRoute) {
            this.$router.push({ name: route }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {}
            });
          }
        },
        logOut(){
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          this.$router.push({ name: 'login' });
        },
        getUserInfo(){
          const name = decrypt(localStorage.getItem('name')!)
          const role = String(decrypt(localStorage.getItem('role')!)) === 'ROLE_SUPERUSER' ? 'Superadmin' : 'Administrador'
          return {
            name,
            role
          }
        },
        getIconPath(iconName: string) {
          return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
        }
      }
  })
</script>

<style scoped lang="scss">

.active-route {
    border-left: 7px solid #577E85;
    background-color: transparent; 
    border-radius: 0; 
    padding-left: 10px; 
    .sidebar-icon, .sidebar-text {
        color: #577E85; 
    }
}

.sidebar-header {
  padding: 65px 0;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  transition: justify-content 0.3s;
  padding-bottom: 19px;
  border-bottom: 1px solid #e0e0e0;
}
.custom-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s;
  color: #333;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
      width: 100%;
      height: 100vh; 
      position: absolute;
      z-index: 1000;
      left: 0;
      transform: translateX(0);
  }

  &.closed {
      width: 80px;
      height: 100vh;
      @media (max-width: 768px) {
          transform: translateX(-100%);
      }
  }

  &.open {
      @media (max-width: 768px) {
          transform: translateX(0);
      }
  }
}

@media (maxheight: 768px) {
  .sidebar-header {
    padding-bottom: 8px;
  }

  
  
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.user-sidebar {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.role {
  margin: 0;
  font-size: 13px;
  font-weight: 130;
}

.sidebar-icon {
  font-size: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.toogle-icon {
  font-size: 17px;
  transition: transform 0.3s;
  margin-left: 20px;
  cursor: pointer;
}

.sidebar-text {
  font-size: 14px;
  font-weight: 350;
  margin-left: 15px;
  transition: opacity 0.3s;
}

ul {
  padding: 0;
  list-style-type: none;
}

.item {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 18px 15px;
  width: 100%;
  background-color: transparent;
  border-radius: 9px;
  margin-bottom: 10px;
}

.sidebar-icon {
font-size: 19px;
font-weight: 500;
}

.custom-sidebar.closed {
  width: 80px;
}

.custom-sidebar.closed .sidebar-text {
opacity: 0;
visibility: hidden;
}

.custom-sidebar.closed .item:hover .sidebar-icon {
  box-shadow: none;
}

.custom-sidebar.closed .sidebar-header {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.custom-sidebar.closed .user-info {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.custom-sidebar.closed .toogle-icon {
  transform: rotate(180deg); 
  margin-top: 15px ;
  margin-right: 26px;
}

.custom-sidebar.closed .user-sidebar,
.custom-sidebar.closed .role {
  display: none;
}

.custom-sidebar.closed .user-sidebar,
.custom-sidebar.closed .role {
display: none;
}


.custom-sidebar.closed .log-out-item {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.log-out-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border-radius: 9px;
}

.item:hover {
  background-color: #92adb1;
  transform: translateX(-18px);
  width: 110%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
  border-radius: 9px;
  color: white !important;

  .sidebar-icon, .sidebar-text {
    color: white;
    transform: translateX(18px);
  }

}
.sidebar-footer {
  margin-top: auto;
}

.custom-sidebar.closed {
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-sidebar:hover{
  cursor: pointer;
}

.sidebar-text:hover {
  text-decoration: underline;
  color: #577E85;
}

</style>
