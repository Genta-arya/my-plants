import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainHome from '../../Layouts/Home/MainHome';

import * as Animatable from 'react-native-animatable';
import Search from '../../components/Deteksi';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({name, size, color}) => (
  <Animatable.View
    animation="fadeIn"
    duration={1000}
    style={{justifyContent: 'center', alignItems: 'center'}}>
    <Icon name={name} size={size} color={color} />
  </Animatable.View>
);

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'searchs') {
            iconName = 'camera';
          } else if (route.name === 'info') {
            iconName = 'info';
          } else if (route.name === 'setting') {
            iconName = 'gear';
          }

          return <TabBarIcon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null, // Hides the tab label

        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 2,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.25,
          shadowRadius: 10,
          height: 60,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderWidth:2,
          borderColor:"#CAFFFB",
          borderRadius: 15,
        },
        tabBarActiveTintColor: '#0FA588',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="home"
        component={MainHome}
        options={{tabBarLabel: () => null }}
    
      />
      <Tab.Screen
        name="searchs"
        
        component={Search}
        options={{tabBarLabel: () => null}}
      />
      <Tab.Screen
        name="info"
        component={MainHome}
        options={{tabBarLabel: () => null}}
      />
    
    </Tab.Navigator>
  );
}
