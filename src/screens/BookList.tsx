import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { BookApi } from '../api';
import { User } from '../api/authAPI';
import { Book } from '../api/bookAPI';
import { Input } from 'react-native-elements/dist/input/Input';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  navigation: { navigate: Function };
  route: any;
};

export const BookList = ({ navigation, route }: Props) => {
  const user: User = route.params.user.user;
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

  console.log(books);

  const search = () => {
    setisLoading(true);
    BookApi.getBooksList(user.token, filter).then((books: Book[]) => {
      setBooks(books);
      setisLoading(false);
    });
  };

  useEffect(search, []);

  const renderItem = ({ item }: { item: Book }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Book', { book: item })}>
        <View style={styles.bookItem}>
          <Image resizeMode={'contain'} style={styles.bookCover} source={{ uri: item.coverImageUrl }} />
          <View style={styles.bookInfoContainer}>
            <Text h4>{item.title}</Text>
            <Text>{item.author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.externalContainer}>
      <Spinner visible={isLoading} />
      {Platform.OS === 'android' && <View style={{ height: 24 }} />}
      <Input
        returnKeyType="search"
        enablesReturnKeyAutomatically
        onSubmitEditing={search}
        onChangeText={setFilter}
        value={filter}
        placeholder="Enter book title"
        leftIcon={<FontAwesome name="search" size={24} color="black" />}
      />
      <FlatList contentContainerStyle={styles.list} data={books} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  externalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    paddingHorizontal: 16,
  },
  bookItem: {
    flexDirection: 'row',
    padding: 4,
  },
  bookCover: {
    width: 100,
    height: 160,
  },
  bookInfoContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
});
