import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants';
import Icon6 from 'react-native-vector-icons/Ionicons';
import Filter from '../screen/filter';

// ---------------------Screens-----------------------
import Job from '../screen/job';
// import Chat from '../screen/chat';
import Lab from '../screen/lab';
import Home from '../screen/home';
import Producer from '../screen/producer';
import {images} from '../constants/index';
import Chat from '../screen/chat';
import Others from '../screen/others';
import Own from '../screen/own';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {myGroup} from '../screen/apis';
import {
  account,
  explore,
  jobs,
  labs,
  otherGroups,
  search,
} from '../assets/svgs';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const MiddleStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="lab" component={Lab} options={{headerShown: false}} />
    <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
    <Stack.Screen
      name="others"
      component={Others}
      options={{headerShown: false}}
    />
    <Stack.Screen name="own" component={Own} options={{headerShown: false}} />
  </Stack.Navigator>
);
export default function Bottomtab({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: widthPercentageToDP(26),

          borderTopWidth: 0,
          // backgroundColor: Colors.gray,
          backgroundColor: '#191919',
        },
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.main_back_color : 'white',
                marginBottom: heightPercentageToDP(1),
              }}>
              Explore
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <SvgXml
              style={{top: 10}}
              width={'24'}
              height={'24'}
              color={focused ? Colors.main_back_color : 'gray'}
              xml={account}
            />

            // <Icon3
            //   name="ios-folder-open-sharp"
            //   size={20}
            //   style={{top: heightPercentageToDP(1)}}
            //   color={focused ? Colors.main_back_color : Colors.white}
            // />
          ),
        }}
      />

      <Tab.Screen
        name="labs"
        component={MiddleStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.main_back_color : 'white',

                marginBottom: heightPercentageToDP(1),
              }}>
              Lab
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <SvgXml
              style={{top: 10}}
              width={'25'}
              height={'25'}
              color={focused ? Colors.main_back_color : 'gray'}
              xml={labs}
            />
          ),
        }}
        // listeners={({navigation}) => ({
        //   blur: () => navigation.setParams({screen: 'lab'}),
        // })}
      />

      <Tab.Screen
        name="search"
        component={Filter}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={{width: 150, alignItems: 'center'}}>
              <Text
                style={{
                  color: focused ? Colors.main_back_color : 'white',
                  marginBottom: heightPercentageToDP(1),
                }}>
                Search
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) => (
            <SvgXml
              style={{top: 10}}
              width={'22'}
              height={'22'}
              color={focused ? Colors.main_back_color : 'gray'}
              xml={search}
            />
          ),
        }}
      />
      <Tab.Screen
        name="job"
        component={Job}
        options={{
          tabBarLabel: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: focused ? Colors.main_back_color : 'white',
                  marginBottom: heightPercentageToDP(1),
                }}>
                Jobs
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) => (
            <SvgXml
              style={{top: 10}}
              width={'24'}
              height={'24'}
              color={focused ? Colors.main_back_color : 'gray'}
              xml={jobs}
            />
          ),
        }}
      />
      <Tab.Screen
        name="producer"
        component={Producer}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.main_back_color : 'white',
                marginBottom: heightPercentageToDP(1),
              }}>
              Account
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <SvgXml
              style={{top: 10}}
              width={'24'}
              height={'24'}
              color={focused ? Colors.main_back_color : 'gray'}
              xml={explore}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
