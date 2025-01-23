import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

type TabBarButtonProps = {
  key: string;
  style: StyleProp<ViewStyle>;
  activeColor: string;
  inactiveColor: string;
  getIcon: (color: string) => ReactNode;
  isFocused: boolean;
  onPress: () => void;
};

const TabBarButton: FC<TabBarButtonProps> = (props) => {
  const { isFocused, activeColor, inactiveColor, getIcon } = props;

  const [isHolding, setIsHolding] = useState(false);

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isHolding ? 1 : 0, { duration: 300 });
  }, [scale, isHolding]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);

    return {
      transform: [{ scale: scaleValue }]
    };
  });

  const onPressIn = () => {
    setIsHolding(true);
  };

  const onPressOut = () => {
    setIsHolding(false);
  };

  const color = isHolding || isFocused ? activeColor : inactiveColor;

  return (
    <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut} style={styles.container}>
      <Animated.View style={animatedIconStyle}>{getIcon(color)}</Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  }
});

export default TabBarButton;
