import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../../Screens/AdminScreens/Categories/Categories';
import Profile from '../../Screens/AdminScreens/Profile/Profile';
import CustomSidebarMenu from './CustomSidebarMenu';
import Report from '../../Screens/AdminScreens/Report/Report';
import DashboardIcon from 'react-native-vector-icons/MaterialIcons'
import { View } from 'react-native';
import DashboardStack from './AdminStack/DashboardStack';
import Pdf from '../../Screens/UserScreens/Report/Pdf';
import AddCat from '../../Screens/AdminScreens/Categories/AddCat';
import AddLeads from '../../Screens/UserScreens/Leads/AddLeads';
import Leads from '../../Screens/UserScreens/Leads/Leads';
import BusinessList from '../../Screens/AdminScreens/BusinessList/BusinessList';

const Drawer = createDrawerNavigator();

export default function AdminNavigator() {
  const CustomIconComponent = ({ focused, name }) => {
    return <View style={{ marginRight: -25 }}>
      <DashboardIcon name={name} size={25} color={focused ? "#108484" : "#777"} />
    </View>
  }
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveTintColor: '#108484',
        itemStyle: { marginVertical: 5 },
        headerStyle: {
          backgroundColor: '#006666',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      })}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="AdminDashboard" component={DashboardStack}
        options={{
          drawerIcon: ({ focused, size }) => (
            <CustomIconComponent focused={focused} name='dashboard' />
          ),
          title: 'Dashboard',
          headerShown:false
        }} />

      <Drawer.Screen name="Leads list" component={Leads} options={{
        drawerIcon: ({ focused, size }) => (
          <CustomIconComponent focused={focused} name='category' />
        ),
      }} />

      <Drawer.Screen name="Business list" component={BusinessList} options={{
        drawerIcon: ({ focused, size }) => (
          <CustomIconComponent focused={focused} name='category' />
        ),
      }} />

      <Drawer.Screen name="Categories list" component={AddCat} options={{
        drawerIcon: ({ focused, size }) => (
          <CustomIconComponent focused={focused} name='category' />
        ),
      }} />
      <Drawer.Screen name="Business Report" component={Report} options={{
        drawerIcon: ({ focused, size }) => (
          <CustomIconComponent focused={focused} name='list-alt' />
        ),
      }} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        drawerIcon: ({ focused, size }) => (
          <CustomIconComponent focused={focused} name='person' />
        ),
      }} />
    </Drawer.Navigator>
  );
}

export { AdminNavigator };
