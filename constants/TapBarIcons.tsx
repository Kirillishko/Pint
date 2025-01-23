import { TabBarRoutes, TabBarRoutesKeys } from '@/constants/TabBarRoutesArray';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ReactNode } from 'react';

type TabBarIconsProps = Record<TabBarRoutesKeys, (color: string) => ReactNode>;

const size = 30;

export const TabBarIcons: TabBarIconsProps = {
  [TabBarRoutes.index]: (color) => <IconSymbol name="house.fill" size={size} color={color} />,
  [TabBarRoutes.search]: (color) => <IconSymbol name="house.fill" size={size} color={color} />,
  [TabBarRoutes.notifications]: (color) => (
    <IconSymbol name="house.fill" size={size} color={color} />
  ),
  [TabBarRoutes.profile]: (color) => <IconSymbol name="house.fill" size={size} color={color} />
};
