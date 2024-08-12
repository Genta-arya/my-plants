import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const MainSetting = () => {
  const navigation = useNavigation(); // Dapatkan objek navigasi menggunakan hook

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-4">MainSetting</Text>

        {/* Tombol Back */}
        <Button
          title="Back"
          onPress={() => navigation.goBack()} // Kembali ke layar sebelumnya
        />
      </View>
    </SafeAreaView>
  );
};

export default MainSetting;
