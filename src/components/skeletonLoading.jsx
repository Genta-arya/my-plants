import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NativeWind from 'nativewind';

const SkeletonLoading = () => {
  const shineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shineAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shineAnim]);

  const shineStyle = {
    opacity: shineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-200 pb-4">
      <View className="relative w-40 h-52 bg-gray-300 rounded-lg mb-2 overflow-hidden">
        <Animated.View style={[{ ...shineStyle, flex: 1 }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute left-0 top-0 w-full h-full"
          />
        </Animated.View>
      </View>
      <View className="relative bg-gray-300 h-4 w-24 mt-2 rounded overflow-hidden">
        <Animated.View style={[{ ...shineStyle, flex: 1 }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute left-0 top-0 w-full h-full"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SkeletonLoading;
