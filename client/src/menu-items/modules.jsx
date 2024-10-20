// assets
import {
  DashboardOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import {
  BedKingOutline,
  Swim,
  CalendarMonthOutline
} from 'mdi-material-ui'

// icons
const ant_icons = {
  DashboardOutlined,
  CalendarOutlined
}

const mdi_icons = {
  BedKingOutline,
  Swim,
  CalendarMonthOutline
}

const icons = {
  ...ant_icons,
  ...mdi_icons
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const modules = [
  {
    id: 'group-dashboard',
    title: 'Dashboard',
    type: 'group',
    access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN'],
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/portal/dashboard',
        icon: icons.DashboardOutlined,
        breadcrumbs: false,
        access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN'],
      }
    ]
  },
  {
    id: 'group-calendar',
    title: 'Calendar',
    type: 'group',
    access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN'],
    children: [
      {
        id: 'appointments',
        title: 'Appointments',
        type: 'item',
        url: '/portal/appointments',
        icon: icons.CalendarOutlined,
        breadcrumbs: false,
        access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN']
      },
      {
        id: 'calendar',
        title: 'Calendar',
        type: 'item',
        url: '/portal/calendar',
        icon: icons.CalendarMonthOutline,
        breadcrumbs: false,
        access: ['POSITIONS_MASTER_ADMIN']
      }
    ]
  },
  {
    id: 'group-offers',
    title: 'Offers',
    type: 'group',
    access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN'],
    children: [
      {
        id: 'rooms-list',
        title: 'Rooms',
        type: 'item',
        url: '/portal/rooms',
        icon: icons.BedKingOutline,
        breadcrumbs: false,
        access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN']
      },
      {
        id: 'activities-list',
        title: 'Activities',
        type: 'item',
        url: '/portal/activities',
        icon: icons.Swim,
        breadcrumbs: false,
        access: ['POSITIONS_STAFF', 'POSITIONS_MASTER_ADMIN']
      },
    ]
  },

]

export default modules;
