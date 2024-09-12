import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../../Layouts/OnBoardings/OnBoarding';
import {MyTabs} from '../Bottom/BottomNavigation';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Search from '../../components/Deteksi';
import ListHistory from '../../Layouts/Home/History';
import DetailScreen from '../../components/Detail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="list"
          component={ListHistory}
          options={({navigation}) => ({
            headerShown: true,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: '#0FA588',
              elevation: 0,
              
            },
            headerTitle: '',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon
                name="camera"
                size={20}
                color="#fff"
                style={{marginRight: 15}}
                onPress={() => navigation.navigate('search')} 
              />
            ),
          })}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{headerShown: false, animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            animation: 'slide_from_bottom',
            headerStyle: {
              backgroundColor: '#0FA588',
            },
            headerTitle: '',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
