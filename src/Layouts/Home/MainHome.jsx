import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';

import Welcome from '../../components/Welcome';

import CustomCarousel from '../../components/Carousel';
import HistoryList from '../../components/HistoryList';


const MainHome = () => {
  return (
    <SafeAreaView className="  ">
      <StatusBar barStyle="light-content" backgroundColor="#0FA588" />
      <ScrollView className="">
        <Welcome />

        <>
          <CustomCarousel />
          <View className="pl-4">
            <View className="pt-2 pb-20">
              <HistoryList
                title={'History'}
                subTitle={'Lihat history hasil deteksi'}
              />
            </View>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHome;
