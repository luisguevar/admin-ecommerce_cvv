export const AsideMenuAdminGeneral = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      name: "dashboard",
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
    { section: 'Usuario' },
    {
      title: 'Usuarios',
      root: true,
      name: "users",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/users',
      submenu: [
        {
          title: 'Gestion Usuarios',
          page: '/users/list'
        }
      ]
    },

    { section: 'Productos' },
    {
      title: 'Categorias',
      root: true,
      name: "categorias",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Layout/Layout-left-panel-2.svg',
      page: '/categorias',
      submenu: [
        {
          title: 'Gestion Categorias',
          page: '/categorias/lista'
        }
      ]
    },

    {
      title: 'Productos',
      root: true,
      name: "productos",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Communication/Dial-numbers.svg',
      page: '/products',
      submenu: [
        {
          title: 'Crear Producto',
          page: '/products/add-product'
        },

        {
          title: 'Listar Productos',
          page: '/products/list-product'
        }
      ]
    },

    { section: 'Administración' },
    {
      title: 'Cotizaciones',
      root: true,
      name: "cotizaciones",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Layout/Layout-left-panel-2.svg',
      page: '/cotizaciones',
      submenu: [
        {
          title: 'Crear Cotización',
          page: '/cotizaciones/add-cotizacion'
        },

        {
          title: 'Listar Cotizaciones',
          page: '/cotizaciones/list-cotizaciones'
        }
      ]
    },



    { section: 'VISTA PRINCIPAL' },
    {
      title: 'Sliders',
      root: true,
      name: "sliders",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Design/Image.svg',
      page: '/sliders',
      submenu: [
        {
          title: 'Listar Sliders',
          page: '/sliders/lista'
        }
      ]
    },
  ]
}