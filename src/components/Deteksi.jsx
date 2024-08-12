import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import image from '../Assets/deteksi.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Deteksi = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const [bottomSheetAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getAddressFromCoordinates(latitude, longitude); // Ambil alamat dari koordinat
      },
      error => {
       
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        setAddress(address); 
      } else {
        console.log('Alamat tidak ditemukan');
      }
    } catch (error) {
  
    }
  };

  const handleBack = () => {
    setSelectedImage(null);
    setLoading(false);
    navigation.navigate('home');
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
        cropping: true,
      });
      console.log('Image URI: ', image.path);
      setSelectedImage(image.path);
      await AsyncStorage.setItem('selected_image', image.path); 
    } catch (error) {
      console.log('Camera Error: ', error);
    }
  };

  const openPicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
        cropping: true,
      });
      console.log('Image URI: ', image.path);
      setSelectedImage(image.path);
      await AsyncStorage.setItem('selected_image', image.path); 
    } catch (error) {
      console.log('Picker Error: ', error);
    }
  };

  const handleScan = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    if (location) {
      formData.append('location', JSON.stringify(location));
    }

    try {
      const response = await axios.post(
        'http://192.168.0.2:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setLoading(false);

      if (response.data && !response.data.error) {
        const { predicted_class, location, info, solution } = response.data;
        const detectionResult = {
          predicted_class,
          solution,
          info,
          image: selectedImage,
          address,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        };
        setResult(detectionResult);
        await saveDataToStorage(detectionResult); 
        showBottomSheet(); 
      } else {
        setResult({ error: response.data.error || 'Terjadi kesalahan' });
      }
    } catch (error) {
      setLoading(false);

      setResult({ error: 'Terjadi kesalahan saat melakukan pemindaian.' });
    }
  };

  const saveDataToStorage = async (result) => {
    try {
  
      const existingData = await AsyncStorage.getItem('deteksi_results');
      const dataList = existingData ? JSON.parse(existingData) : []; 

    
      dataList.push(result);

     
      await AsyncStorage.setItem('deteksi_results', JSON.stringify(dataList));
     
    } catch (error) {
    
    }
  };

  const showBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setResult(null);
      setSelectedImage(null);
    });
  };

  const bottomSheetHeight = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  return (
    <View style={{ flex: 1 }}>
      <View className="pb-8 pt-2 p-4 bg-hijau-muda flex flex-row items-center gap-4">
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" color={'white'} size={15} />
        </TouchableOpacity>
        <Text className="font-bold text-white text-base">Ayo Deteksi</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={openCamera} style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image source={image} style={styles.image} resizeMode="cover" />
          )}
        </TouchableOpacity>

        {!selectedImage && (
          <TouchableOpacity
            onPress={openPicker}
            style={styles.imagePickerButton}>
            <Text style={styles.pickButtonText}>Pilih Gambar dari Galeri</Text>
          </TouchableOpacity>
        )}
        {selectedImage && !loading && (
          <TouchableOpacity onPress={handleScan} style={styles.scanButton}>
            <Text style={styles.scanButtonText}>Mulai Scan Gambar</Text>
          </TouchableOpacity>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0FA588" />
            <Text style={styles.loadingText}>Memindai gambar...</Text>
          </View>
        )}
      </View>

      {/* Bottom Sheet dengan Animasi */}
      <Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
        <View style={styles.bottomSheetContainer}>
          {result && result.error ? (
            <Text style={styles.errorText}>{result.error}</Text>
          ) : (
            <>
              <Text style={styles.resultText}>🧪 Hasil Deteksi</Text>
              <View className="mt-4">
                <Text>Status: {result?.predicted_class}</Text>
                <Text>Kondisi: {result?.solution}</Text>
                <Text>Saran: {result?.info}</Text>
                <Text>Lokasi: {result?.address}</Text>
              </View>
            </>
          )}
          <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    width: '80%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scanButton: {
    backgroundColor: '#0FA588',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePickerButton: {
    marginTop: 10,
  },
  pickButtonText: {
    color: '#0FA588',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#0FA588',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  bottomSheetContainer: {
    padding: 20,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#0FA588',
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Deteksi;
