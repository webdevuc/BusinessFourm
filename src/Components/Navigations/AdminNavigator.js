import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Categories from '../../Screens/AdminScreens/Categories/Categories';
import Profile from '../../Screens/AdminScreens/Profile/Profile';
import CustomSidebarMenu from './CustomSidebarMenu';
import Report from '../../Screens/AdminScreens/Report/Report';
import DashboardIcon from 'react-native-vector-icons/MaterialIcons';
import {View, Image} from 'react-native';
import DashboardStack from './AdminStack/DashboardStack';
import Pdf from '../../Screens/UserScreens/Report/Pdf';
import AddCat from '../../Screens/AdminScreens/Categories/AddCat';
import AddLeads from '../../Screens/UserScreens/Leads/AddLeads';
import Leads from '../../Screens/UserScreens/Leads/Leads';
import BusinessList from '../../Screens/AdminScreens/BusinessList/BusinessList';
import {globalColors} from '../../theme/globalColors';
import EventsList from '../../Screens/AdminScreens/BusinessEvents/EventsList';
// import EventsList from '../../Screens/AdminScreens/BusinessEvents/EventsList';

const Drawer = createDrawerNavigator();

export default function AdminNavigator() {
  const CustomIconComponent = ({focused, name}) => {
    return (
      <View style={{marginRight: -25}}>
        <DashboardIcon
          name={name}
          size={25}
          color={focused ? globalColors.card : '#777'}
        />
      </View>
    );
  };
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerActiveTintColor: globalColors.card,
        itemStyle: {marginVertical: 5},
        headerStyle: {
          backgroundColor: globalColors.card,
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: '#fff',
        headerShadowVisible: false,
        headerRight: () => (
          <Image
            style={{
              width: 60,
              height: 55,
              marginRight: 10,
            }}
            source={require('../../assets/mainLogo.jpg')}
          />
        ),
      })}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="AdminDashboard"
        component={DashboardStack}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="dashboard" />
          ),
          title: 'Dashboard',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Leads list"
        component={Leads}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="category" />
          ),
        }}
      />

      <Drawer.Screen
        name="Business list"
        component={BusinessList}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="category" />
          ),
        }}
      />

      <Drawer.Screen
        name="Categories list"
        component={AddCat}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="category" />
          ),
        }}
      />

      <Drawer.Screen
        name="Events list"
        component={EventsList}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="list-alt" />
          ),
        }}
      />

      <Drawer.Screen
        name="Business Report"
        component={Report}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="list-alt" />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="person" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export {AdminNavigator};
