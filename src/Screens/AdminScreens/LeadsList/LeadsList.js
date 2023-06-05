import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
import {UserData} from './UserData';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Eye from 'react-native-vector-icons/EvilIcons';

const LeadsList = ({navigation}) => {
  // React.useLayoutEffect(() => {
  //   navigation.getParent().setOptions({ headerShown: false })
  // })
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.userName}>{item.fullName}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '45%'}}>
          <Text style={styles.title}>Business Category 2224- </Text>
          <Text style={styles.title}>Business Name - </Text>
        </View>
        <View>
          <Text numberOfLines={1}> {item.BusinessCategory}</Text>
          <Text>{item.BusinessName}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={UserData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    flexWrap: 'wrap',
    height: RFPercentage(15),
    width: '90%',
    borderRadius: RFValue(10),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingLeft: RFValue(10),
    paddingRight: RFValue(10),
    paddingTop: RFValue(10),
    marginBottom: RFValue(10),
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#606060',
  },
  button: {
    elevation: 10,
    borderRadius: 5,
    width: '25%',
    height: '80%',
    backgroundColor: '#006666',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default LeadsList;
