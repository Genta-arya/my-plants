import { View } from 'react-native';
import React from 'react';

const SkeletonLoadingList = () => (
  <View className="flex-row flex-wrap justify-between mt-4">
    {[...Array(4)].map((_, index) => (
      <View key={index} className="bg-gray-200 rounded-lg shadow-md mb-4 mx-1.5 w-44">
        <View className="bg-gray-300 w-full h-64 rounded-t-lg" />
        <View className="p-2">
          <View className="bg-gray-300 h-4 rounded" />
          <View className="bg-gray-300 h-4 rounded mt-2" />
        </View>
      </View>
    ))}
  </View>
);

export default SkeletonLoadingList;
