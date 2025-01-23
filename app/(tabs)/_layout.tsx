import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBar from '@/components/TabBar';
import { TabBarRoutes } from '@/constants/TabBarRoutesArray';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabBarActive,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabBarInactive,
        tabBarBackground: TabBarBackground,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
      }}
    >
      <Tabs.Screen name={TabBarRoutes.index} />
      <Tabs.Screen name={TabBarRoutes.search} />
      <Tabs.Screen name={TabBarRoutes.notifications} />
      <Tabs.Screen name={TabBarRoutes.profile} />
    </Tabs>
  );
}
