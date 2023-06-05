import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, Text } from 'react-native'
import Menu from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../../../Screens/UserScreens/Dashboard/Dashboard';
import Login from '../../../Screens/Authentication/Login';
import AddLeads from '../../../Screens/UserScreens/Leads/AddLeads';
import Leads from '../../../Screens/UserScreens/Leads/Leads';
import Report from '../../../Screens/UserScreens/Report/Report';
import Profile from '../../../Screens/UserScreens/Profile/Profile';
import BusinessList from '../../../Screens/AdminScreens/BusinessList/BusinessList';
const Stack = createNativeStackNavigator();

export default function DashboardStack(props) {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#264596',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: '#fff',
    }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Menu name='menu' color="#fff" size={30} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Add Leads"
        component={AddLeads}
      />

      <Stack.Screen
        name="Lead list"
        component={Leads}
      />  

      <Stack.Screen
        name="Report"
        component={Report}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
      />


      <Stack.Screen
        name="Business list"
        component={BusinessList}
      />   



      
    </Stack.Navigator>
  );
}

export { DashboardStack };
