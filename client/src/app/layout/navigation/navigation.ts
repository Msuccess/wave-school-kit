import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'dashboard',
        title: 'Applications',
        translate: 'NAV.DASHBOARD',
        type: 'group',
        icon: 'apps'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'NAV.DASHBOARD',
        type: 'item',
        icon: 'dashboard',
        url: '/admin/dashboard'
    },
    {
        id: 'class',
        title: 'Class',
        translate: 'NAV.CLASS',
        type: 'item',
        icon: 'class',
        url: '/admin/class'
    },
    {
        id: 'subject',
        title: 'Subject',
        translate: 'NAV.SUBJECT',
        type: 'item',
        icon: 'subject',
        url: '/admin/subject'
    },
    {
        id: 'student',
        title: 'Student',
        translate: 'NAV.STUDENT',
        type: 'item',
        icon: 'group',
        url: '/admin/student'
    },
    {
        id: 'teacher',
        title: 'Teacher',
        translate: 'NAV.TEACHER',
        type: 'item',
        icon: 'work',
        url: '/admin/teacher'
    },
    {
        id: 'events',
        title: 'Events',
        translate: 'NAV.EVENTS',
        type: 'item',
        icon: 'today',
        url: '/admin/events'
    }
];
