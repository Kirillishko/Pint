import React, { FC, useMemo } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { mock } from '@/assets/mock/getMock';
import resolveAssetSource from 'expo-asset/build/resolveAssetSource';
import { ResolvedAssetSource } from 'expo-asset/build/AssetSourceResolver';
import { ThemedText } from '@/components/ThemedText';

const SETTINGS = {
  paddingHorizontal: 12
};

const PinScreen: FC = () => {
  const { id } = useLocalSearchParams();

  const mockItem = mock[Number(id)];

  const [width, height] = useMemo(() => {
    let width;
    let height;

    let image = String(mockItem.image);
    const imageSizes = resolveAssetSource(image) as ResolvedAssetSource;

    if (!imageSizes?.width || !imageSizes?.height) {
      return [100, 100];
    }

    width = Dimensions.get('window').width - SETTINGS.paddingHorizontal * 2;
    const scaleFactor = imageSizes.width / width;
    height = imageSizes.height / scaleFactor;

    return [width, height];
  }, [mockItem.image]);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Link href={'/'}>
          <ThemedText type="default">Назад</ThemedText>
        </Link>
        <Image
          source={mockItem.image}
          style={[styles.image, { width, height }]}
          resizeMode="cover"
        />
        <ThemedText type="defaultSemiBold">{mockItem.author.name}</ThemedText>
        {mockItem.title && <ThemedText type="title">{mockItem.title}</ThemedText>}
        {mockItem.description && <ThemedText type="default">{mockItem.description}</ThemedText>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SETTINGS.paddingHorizontal
  },
  image: {
    borderRadius: 20
  }
});

export default PinScreen;
