import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { mock } from '@/assets/mock/getMock';
import { Link, router } from 'expo-router';

type ItemData = {
  id: string;
  image: ImageSourcePropType;
  height: number;
};

const screenWidth = Dimensions.get('window').width;
const columnWidth = (screenWidth - 16 * 2 - 8) / 2; // Ширина колонок с учетом отступов

const HomeScreen = () => {
  const data = mock.map((mockItem, index) => ({
    id: String(index),
    image: mockItem.image,
    height: Math.floor(Math.random() * 100) + 200
  }));

  const renderColumn = (columnData: ItemData[]) => {
    return columnData.map((item) => (
      <Link href={{ pathname: '/pin/[id]', params: { id: item.id } }} key={item.id} asChild>
        <Pressable>
          <Image
            source={item.image}
            style={[styles.image, { height: item.height }]}
            resizeMode="cover"
          />
        </Pressable>
      </Link>
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
};

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

export default HomeScreen;
