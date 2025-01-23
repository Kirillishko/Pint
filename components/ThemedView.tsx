import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeOrCustomColor } from '@/hooks/useThemeOrCustomColor';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeOrCustomColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1
  }
});
