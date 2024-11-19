// assets
import {
  DashboardOutlined,
  CalendarOutlined,
  ContactsOutlined,
  BookOutlined,
} from '@ant-design/icons';
import {
  BedKingOutline,
  Swim,
  CalendarMonthOutline,
  AccountGroup,
  TicketOutline
} from 'mdi-material-ui'

// constants
import { POSITIONS } from '../constants/constants'

// icons
const ant_icons = {
  DashboardOutlined,
  CalendarOutlined,
  ContactsOutlined,
  BookOutlined
}

const mdi_icons = {
  BedKingOutline,
  Swim,
  CalendarMonthOutline,
  AccountGroup,
  TicketOutline
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
    access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN],
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/portal/dashboard',
        icon: icons.DashboardOutlined,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN],
      }
    ]
  },
  {
    id: 'human-resource',
    title: 'Human Resource',
    type: 'group',
    access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN],
    children: [
      {
        id: 'human-resource-list',
        title: 'Staffs',
        type: 'item',
        url: '/portal/staffs',
        icon: icons.AccountGroup,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
    ]
  },
  {
    id: 'group-services',
    title: 'Services',
    type: 'group',
    access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN],
    children: [
      {
        id: 'rooms-list',
        title: 'Rooms',
        type: 'item',
        url: '/portal/rooms',
        icon: icons.BedKingOutline,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
      {
        id: 'activities-list',
        title: 'Activities',
        type: 'item',
        url: '/portal/activities',
        icon: icons.Swim,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
    ]
  },
  {
    id: 'group-content-hub',
    title: 'Content Hub',
    type: 'group',
    access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN],
    children: [
      {
        id: 'press-release-list',
        title: 'Press Release',
        type: 'item',
        url: '/portal/press-release',
        icon: icons.BookOutlined,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
    ]
  },
  {
    id: 'group-calendar',
    title: 'Calendar',
    type: 'group',
    access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN],
    children: [
      {
        id: 'appointments',
        title: 'Appointments',
        type: 'item',
        url: '/portal/appointments',
        icon: icons.CalendarOutlined,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_STAFF, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
      {
        id: 'calendar',
        title: 'Calendar',
        type: 'item',
        url: '/portal/calendar',
        icon: icons.CalendarMonthOutline,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_MASTER_ADMIN]
      }
    ]
  },
  {
    id: 'group-resources',
    title: 'Resources',
    type: 'group',
    access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN, POSITIONS.POSITIONS_STAFF],
    children: [
      {
        id: 'contacts-list',
        title: 'Contacts',
        type: 'item',
        url: '/portal/contacts',
        icon: icons.ContactsOutlined,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN]
      },
    ]
  },
  {
    id: 'web-tickets',
    title: 'Maintenance',
    type: 'group',
    access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN, POSITIONS.POSITIONS_STAFF],
    children: [
      {
        id: 'website-tickets',
        title: 'Website Tickets',
        type: 'item',
        url: '/portal/website-tickets',
        icon: icons.TicketOutline,
        breadcrumbs: false,
        access: [POSITIONS.POSITIONS_HUMAN_RESOURCE, POSITIONS.POSITIONS_MASTER_ADMIN, POSITIONS.POSITIONS_STAFF]
      },
    ]
  },
]

export default modules;
