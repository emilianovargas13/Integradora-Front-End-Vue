import { decrypt } from '@/config/cryptojs';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const title = "BaluEvents";
const roles = {
  admin: "ROLE_USER",
  superAdmin: "ROLE_SUPERUSER"
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: {
      render(c: any) { return c('router-view') }
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/modules/auth/adapters/views/LoginView.vue'),
        meta: {
          title: "Inicio de sesión",
          hideNavigation: true,
          isAuthView: true
        }
      },
      {
        path: '/password-recovery',
        name: 'passwordRecovery',
        component: () => import('@/modules/auth/adapters/views/PasswordRecoveryView.vue'),
        meta: {
          title: "Recuperación de contraseña",
          hideNavigation: true,
          isAuthView: true
        }
      },
      {
        path: '/password-recovery-code',
        name: 'passwordRecoveryCode',
        component: () => import('@/modules/auth/adapters/views/CodeView.vue'),
        meta: {
          title: "Recuperación de contraseña",
          hideNavigation: true,
          isAuthView: true
        }
      },
      {
        path: '/new-password',
        name: 'newPassword',
        component: () => import('@/modules/auth/adapters/views/NewPasswordView.vue'),
        meta: {
          title: "Recuperación de contraseña",
          hideNavigation: true,
          isAuthView: true
        }
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: "Inicio",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/modules/users/adapters/views/UsersView.vue'),
        meta: {
          title: "Administradores",
          requiresAuth: true,
          roles: [roles.superAdmin]
        }
      },
      {
        path: '/resource-types-management',
        name: 'resourceTypesManagement',
        component: () => import('@/modules/resource-types/adapters/views/ResourceTypes.vue'),
        meta: {
          title: "Tipos de recursos",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/event-types-management',
        name: 'eventTypesManagement',
        component: () => import('@/modules/event-types/adapters/views/EventTypes.vue'),
        meta:{
          title: "Tipos de eventos",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/resources',
        name: 'resources',
        component:() => import('@/modules/resources/adapters/views/ResourceView.vue'),
        meta:{
          title:"Recursos",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/suppliers',
        name: 'suppliers',
        component: () => import('@/modules/suppliers/adapters/views/SuppliersView.vue'),
        meta: {
          title: "Proveedores",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/supplier-details',
        name: 'supplierDetails',
        component: () => import('@/modules/suppliers/adapters/views/SupplierDetailsView.vue'),
        meta: {
          title: "Detalles del proveedor",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/save-supplier',
        name: 'saveSupplier',
        component: () => import('@/modules/suppliers/adapters/views/SaveSupplierView.vue'),
        meta: {
          title: "Registrar proveedor",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/update-supplier',
        name: 'updateSupplier',
        component: () => import('@/modules/suppliers/adapters/views/UpdateSupplierView.vue'),
        meta: {
          title: "Modificar proveedor",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/public/LandingPage.vue'),
        meta: {
          title: "Balu Events",
          showNav: true,
          requiresAuth: false
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/modules/statistics/adapters/views/Dashboard.vue'),
        meta: {
          title: "Estadísticas",
          requiresAuth: true,
          roles: [roles.admin, roles.superAdmin]
        }
      },
      // rutas de paginas de error
      {
        path: '*',
        name: '404',
        component: () => import('@/views/errors/404.vue'),
        meta: {
          title: "Página no encontrada",
          hideNavigation: true
        }
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@/views/errors/403.vue'),
        meta: {
          title: "Acceso denegado",
          hideNavigation: true
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role") ? decrypt(localStorage.getItem("role")!) : null;

  if (to.meta?.isAuthView && isAuthenticated) { next({ name: 'home' }) }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) { next({ name: 'login' }) }
    else if (to.meta?.roles && !to.meta.roles.includes(userRole)) { next({ name: '403' }) }
    else next()
  } else {
    next()
  }
})

router.afterEach((to, __) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || title;
  })
})

export default router
