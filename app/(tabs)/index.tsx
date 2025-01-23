import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { getImages } from '@/assets/mock/getImages';
import { router } from 'expo-router';

type ItemData = {
  id: string;
  image: ImageSourcePropType;
  height: number;
};

const screenWidth = Dimensions.get('window').width;
const columnWidth = (screenWidth - 16 * 2 - 8) / 2; // Ширина колонок с учетом отступов

export default function HomeScreen() {
  const images = getImages();

  const data = images.map((image, index) => ({
    id: String(index),
    image,
    height: Math.floor(Math.random() * 100) + 200 // Разная высота для Pinterest-эффекта
  }));

  const handlePress = (image: ImageSourcePropType) => {
    router.navigate('/(tabs)/notifications');
  };

  const renderColumn = (columnData: ItemData[]) => {
    return columnData.map((item) => (
      <TouchableOpacity key={item.id} onPress={() => handlePress(item.image)} activeOpacity={1}>
        <Image
          source={item.image}
          style={[styles.image, { height: item.height }]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ));
  };

  const columns = [[], []] as ItemData[][];
  data.forEach((item, index) => {
    columns[index % 2].push(item);
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {columns.map((columnData, index) => (
          <View key={index} style={styles.column}>
            {renderColumn(columnData)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8
  },
  column: {
    flex: 1
  },
  image: {
    width: columnWidth,
    borderRadius: 8,
    marginBottom: 8
  }
});
