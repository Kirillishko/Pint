import { createObjectFromArray } from '@/constants/helpers';

const TabBarRoutesArray = ['index', 'search', 'notifications', 'profile'] as const;

export const TabBarRoutes = createObjectFromArray(TabBarRoutesArray);
export type TabBarRoutesKeys = keyof typeof TabBarRoutes;
