import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import Leads from '../../Screens/UserScreens/Leads/Leads';
import Profile from '../../Screens/UserScreens/Profile/Profile';
import Dashboard from '../../Screens/UserScreens/Dashboard/Dashboard';
import Report from '../../Screens/UserScreens/Report/Report';
import DashboardIcon from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import DashboardStack from './UserStack/DashboardStack';
import {globalColors} from '../../theme/globalColors';
import AddLeads from '../../Screens/UserScreens/Leads/AddLeads';

const Drawer = createDrawerNavigator();
export default function UserNavigator(props) {
  const CustomIconComponent = ({focused, name}) => {
    return (
      <View style={{marginRight: -25}}>
        <DashboardIcon
          name={name}
          size={25}
          color={focused ? '#264596' : '#777'}
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
      })}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="UserDashboard"
        component={DashboardStack}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="dashboard" />
          ),
          headerShown: false,
          title: 'Dashboard',
        }}
      />

      {/* <Drawer.Screen
        name="Add Leads"
        component={AddLeads}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="add" />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="Lead list"
        component={Leads}
        options={{
          drawerIcon: ({focused, size}) => (
            <CustomIconComponent focused={focused} name="leaderboard" />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
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

export {UserNavigator};
