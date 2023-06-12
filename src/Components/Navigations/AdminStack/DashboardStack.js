import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../../Screens/AdminScreens/Dashboard/Dashboard';
import Userlist from '../../../Screens/AdminScreens/BusinessList/BusinessList';
import LeadsList from '../../../Screens/AdminScreens/LeadsList/LeadsList';
import ConvertedLeads from '../../../Screens/AdminScreens/ConvertedLeads/ConvertedLeads';
import {TouchableOpacity, Image} from 'react-native';
import Menu from 'react-native-vector-icons/MaterialIcons';
import Report from '../../../Screens/AdminScreens/Report/Report';
import AddBusiness from '../../../Screens/AdminScreens/Categories/Categories';
import ConvertedBusiness from '../../../Screens/AdminScreens/ConvertedLeads/ConvertedLeads';
import BusinessList from '../../../Screens/AdminScreens/BusinessList/BusinessList';
// import AddCategory from '../../../Screens/AdminScreens/Categories/Categories';
import CategoryList from '../../../Screens/AdminScreens/BusinessList/BusinessList';
import UserList from '../../../Screens/AdminScreens/BusinessList/BusinessList';
import AddCat from '../../../Screens/AdminScreens/Categories/AddCat';
import Login from '../../../Screens/Authentication/Login';
import AddLeads from '../../../Screens/UserScreens/Leads/AddLeads';
import Leads from '../../../Screens/UserScreens/Leads/Leads';
import TotalEarning from '../../../Screens/AdminScreens/TotalEarning';
import AddEvents from '../../../Screens/AdminScreens/BusinessEvents/AddEvents';
// import EventDetails from '../../../Screens/AdminScreens/BusinessEvents/EventDetails';
import LeadsDetails from '../../../Screens/UserScreens/Leads/LeadsDetails';
import EventDetails from '../../../Screens/AdminScreens/BusinessEvents/EventDetails';
import UpdateLeads from '../../../Screens/UserScreens/Leads/UpdateLeads';
// import EventsList from '../../../Screens/AdminScreens/BusinessEvents/EventsList';

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
        headerShadowVisible: false,
        headerRight: () => (
          <Image
            style={{
              width: 60,
              height: 55,
              marginRight: 10,
            }}
            source={require('../../../assets/mainLogo.jpg')}
          />
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
      <Stack.Screen
        name="Business List"
        component={BusinessList}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Leads List"
        component={LeadsList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="convertedBusiness"
        component={ConvertedBusiness}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Business Report"
        component={Report}
        options={{headerShown: true}}
      />

      {/* <Stack.Screen
        name="addCategory"
        component={AddCategory}
        options={{ headerShown: true }}
      /> */}

      <Stack.Screen
        name="Add Category"
        component={AddCat}
        options={{headerShown: true}}
      />

      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="Add Leads"
        component={AddLeads}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="Update Leads" component={UpdateLeads} />

      <Stack.Screen
        name="Lead list"
        component={Leads}
        // options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Total Earning"
        component={TotalEarning}
        // options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="Events List"
        component={EventsList}
        // options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="Add Events"
        component={AddEvents}
        // options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="Event Details" component={EventDetails} /> */}

      <Stack.Screen name="Leads Details" component={LeadsDetails} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}

export {DashboardStack};
