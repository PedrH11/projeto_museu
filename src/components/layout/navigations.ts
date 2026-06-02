import { NavigationType } from '../../type/type';

export const sideBarData: NavigationType[] = [
  {
    title: 'dashboards',
    iconName: 'LayoutDashboard',
    items: [
      {
        title: 'usuario',
        iconName: 'User',
        items: [
          { title: 'listagem', href: '/dashboard/usuario', iconName: 'List' },
          {
            title: 'novo',
            href: '/dashboard/usuario/novo',
            iconName: 'UserPlus',
          },
          { title: 'listagem', href: '/dashboard/contact', iconName: 'List' },
          {
            title: 'novo',
            href: '/dashboard/contact/novo',
            iconName: 'ContactRound',
          },
        ],
      },
    ],
  },
  {
    title: 'Eventos',
    href: '/dashboard/event',
    iconName: 'CalendarDays',
    items: [],
  },
];
