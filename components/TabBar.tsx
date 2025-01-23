import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from '@/components/TapBarButton';
import { TabBarIcons } from '@/constants/TapBarIcons';
import { TabBarRoutesKeys } from '@/constants/TabBarRoutesArray';
import { useThemeColor } from '@/hooks/useThemeColor';

type TabBarProps = BottomTabBarProps;

const TabBar: FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const activeColor = useThemeColor('tabBarActive');
  const inactiveColor = useThemeColor('tabBarInactive');

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const name = route.name as TabBarRoutesKeys;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabBarItem}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            getIcon={TabBarIcons[name]}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'fixed',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    height: 60
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  }
});

export default TabBar;
