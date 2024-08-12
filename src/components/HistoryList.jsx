import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import SkeletonLoading from './skeletonLoading';
import Indicator from './Indicator';
import useImageLoadingStore from '../Zustand/ImageLoading';
import useDataTypeStore from '../Zustand/DataTypeFetch';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const HistoryList = props => {
  const { type, title, subTitle } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataCount, setDataCount] = useState(0); // Tambahkan state untuk jumlah data
  const [refreshing, setRefreshing] = useState(false); // State untuk refresh
  const navigation = useNavigation();
  const imageLoading = useImageLoadingStore(state => state.imageLoading);
  const handleImageLoadStart = useImageLoadingStore(state => state.handleImageLoadStart);
  const handleImageLoadEnd = useImageLoadingStore(state => state.handleImageLoadEnd);

  const { setDataType } = useDataTypeStore(state => ({
    setDataType: state.setDataType,
  }));

  const getCountOfData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('deteksi_results');
      const dataList = existingData ? JSON.parse(existingData) : []; 
      const count = dataList.length;
      setDataCount(count);
    } catch (error) {
      console.error('Failed to get data count', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const historyData = await AsyncStorage.getItem('deteksi_results'); 
      if (historyData) {
        const parsedData = JSON.parse(historyData);
        setData(parsedData.reverse()); 
      }
    } catch (error) {
      console.error('Failed to fetch history data', error);
    } finally {
      setLoading(false);
      setRefreshing(false); 
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCountOfData(); 
      fetchData();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing ke true
    fetchData(); // Panggil fetchData untuk memuat ulang data
  };

  const placeholderImage = 'https://via.placeholder.com/150'; // Gambar placeholder

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { item })} // Navigasi ke DetailScreen dengan item
      className="pt-4 mr-2"
    >
      {imageLoading && <Indicator />}
      <Image
        source={{ uri: item.image ? item.image : placeholderImage }} // Gunakan gambar placeholder jika item.image null
        className="w-40 h-52 rounded-lg mb-2"
        resizeMode="cover"
        onLoadStart={handleImageLoadStart}
        onLoadEnd={handleImageLoadEnd}
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 ">
      {loading ? (
        <>
          <View className="pb-4 pt-4">
            <Text className="text-lg font-bold">{title}</Text>
            <Text className="text-xs text-gray-600">{subTitle}</Text>
          </View>
          <FlatList
            className="pb-4 pr-2 mr-2"
            data={[...Array(5).keys()]}
            renderItem={() => <SkeletonLoading />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
          />
        </>
      ) : (
        <>
          <View className="py-4 pt-4 flex flex-row justify-between pr-4">
            <View>
              <Text className="text-lg font-bold text-black " style={{ fontWeight: 'bold' }}>{title}</Text>
              <Text className="text-xs text-gray-600">{subTitle}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setDataType(type === 'book' ? 'isBuku' : 'isEBook');
                navigation.navigate('detail');
              }}
              className="justify-center">
              <Text className="text-hijau-muda font-bold">Lihat semua</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())} // Gunakan id jika ada, jika tidak gunakan index
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default HistoryList;
