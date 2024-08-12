import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

const OnBoarding = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white py-4">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="flex items-center justify-center">

          <Image
            source={{
              uri: 'https://api.hkks.shop/uploads/onBoarding-1723345183531.png',
            }}
            className="w-80 h-80 mb-6 rounded-lg shadow-lg"
            resizeMode="cover"
          />

          {/* Description */}
          <View className="p-4 bg-white rounded-lg shadow-md w-full mb-6">
            <Text className="text-lg text-gray-800 text-center">
              Selamat datang di aplikasi Deteksi Penyakit Daun. Temukan solusi
              untuk masalah kesehatan tanaman Anda, akses informasi tentang
              penyakit daun, dan manfaatkan berbagai fitur kami untuk
              meningkatkan hasil pertanian Anda.
            </Text>
          </View>

      
          <TouchableOpacity
            style={{
              backgroundColor: '#0FA588',
              borderRadius: 10, 
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Tabs')}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              Mulai Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoarding;
