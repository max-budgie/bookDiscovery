import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Image } from 'react-native';
import { Text } from 'react-native-elements';

import { Book as BookType } from '../api/bookAPI';

type Props = {
  route: any;
};

export const Book = ({ route }: Props) => {
  const book: BookType = route.params.book;

  return (
    <SafeAreaView style={styles.externalContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text h2Style={styles.title} h2>
            {book.title}
          </Text>

          <Image resizeMode={'contain'} style={styles.cover} source={{ uri: book.coverImageUrl }} />
          <Text h3Style={styles.title} h3>
            {book.author}
          </Text>
          <Text h4>{book.synopsis}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  externalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    paddingVertical: 8,
    textAlign: 'center',
  },
  cover: {
    height: 300,
    width: '100%',
  },
});
