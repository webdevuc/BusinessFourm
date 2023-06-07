import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Image, Text} from 'react-native';
import Menu from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../../../Screens/UserScreens/Dashboard/Dashboard';
import Login from '../../../Screens/Authentication/Login';
import AddLeads from '../../../Screens/UserScreens/Leads/AddLeads';
import Leads from '../../../Screens/UserScreens/Leads/Leads';
import Report from '../../../Screens/UserScreens/Report/Report';
import Profile from '../../../Screens/UserScreens/Profile/Profile';
import BusinessList from '../../../Screens/AdminScreens/BusinessList/BusinessList';
import Icons from 'react-native-vector-icons/MaterialIcons';
// import EventDetails from '../../../Screens/AdminScreens/BusinessEvents/EventDetails';
import LeadsDetails from '../../../Screens/UserScreens/Leads/LeadsDetails';
import EventDetails from '../../../Screens/AdminScreens/BusinessEvents/EventDetails';

const Stack = createNativeStackNavigator();

export default function DashboardStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#264596',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log('Icon pressed')}>
            <Image
              style={{
                width: 60,
                height: 60,
              }}
              source={require('../../../assets/mainLogo.jpg')}
            />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Menu
                name="menu"
                color="#fff"
                size={30}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="Add Leads" component={AddLeads} />

      <Stack.Screen name="Lead list" component={Leads} />

      <Stack.Screen name="Report" component={Report} />

      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="Business list" component={BusinessList} />

      <Stack.Screen name="EventDetails" component={EventDetails} />

      <Stack.Screen name="Leads Details" component={LeadsDetails} />
    </Stack.Navigator>
  );
}

export {DashboardStack};
