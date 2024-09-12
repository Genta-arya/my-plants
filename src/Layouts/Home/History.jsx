import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  Animated,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoadingList from '../../components/SkeletonLoadingList';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const ListHistory = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const existingData = await AsyncStorage.getItem('deteksi_results');
      const dataList = existingData ? JSON.parse(existingData) : [];

      const startIndex = (page - 1) * 10;
      const paginatedData = dataList
        .slice(startIndex, startIndex + 10)
        .reverse();

      setHistoryItems(prevItems =>
        page === 1 ? paginatedData : [...prevItems, ...paginatedData],
      );
      setHasMore(paginatedData.length > 0);
    } catch (error) {
      console.error('Failed to fetch history data', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchHistory();
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleDelete = (item, translateX) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        },
        {
          text: 'Hapus',
          onPress: async () => {
            const newItems = historyItems.filter(
              historyItem => historyItem.image !== item.image,
            );
            setHistoryItems(newItems);
            await AsyncStorage.setItem(
              'deteksi_results',
              JSON.stringify(newItems),
            );
          },
        },
      ],
    );
  };

  const swapItems = (index1, index2) => {
    const newItems = [...historyItems];
    const temp = newItems[index1];
    newItems[index1] = newItems[index2];
    newItems[index2] = temp;
    setHistoryItems(newItems);
    AsyncStorage.setItem('deteksi_results', JSON.stringify(newItems));
  };

  const renderItem = ({item, index}) => {
    const translateX = new Animated.Value(0);

    const onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: translateX}}],
      {useNativeDriver: true},
    );

    const onHandlerStateChange = ({nativeEvent}) => {
      if (nativeEvent.state === 5) {
        if (nativeEvent.translationX < -100 && index % 2 === 0) {
          handleDelete(item, translateX);
        } else if (nativeEvent.translationX > 100 && index % 2 !== 0) {
          handleDelete(item, translateX);
        } else {
          const swapDirection = nativeEvent.translationX > 0 ? 1 : -1;
          const swapIndex = index + swapDirection;

          if (swapIndex >= 0 && swapIndex < historyItems.length) {
            swapItems(index, swapIndex);
          }

          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }
    };

    let classText = '';
    let classColor = '#4b5563';

    switch (item.predicted_class) {
      case 'healthy':
        classText = 'Sehat';
        classColor = 'green';
        break;
      case 'late blight':
        classText = 'Buruk';
        classColor = 'orange';
        break;
      case 'early blight':
        classText = 'Kurang Baik';
        classColor = 'red';
        break;
      default:
        classText = 'Tidak Diketahui';
        classColor = '#4b5563';
    }

    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[styles.itemContainer, {transform: [{translateX}]}]}>
          <Pressable onPress={() => navigation.navigate('Detail', {item})}>
            <Image
              source={{uri: item.image || 'https://via.placeholder.com/150'}}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={[styles.title, {color: classColor}]} className="mt-2">
              Kondisi {classText}
            </Text>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={historyItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <SkeletonLoadingList />}
        ListEmptyComponent={
          loading ? (
            <SkeletonLoadingList />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada hasil deteksi</Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0FA588']}
            tintColor="#0FA588"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 4,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    width: '46%',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 256,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#4b5563',
    fontSize: 16,
  },
});

export default ListHistory;
