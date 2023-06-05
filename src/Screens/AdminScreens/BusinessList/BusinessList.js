import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {UserData} from './UserData';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Eye from 'react-native-vector-icons/EvilIcons';
import ModalView from '../../../utils/Modal';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../../../theme/globalColors';
import searchIcon from '../../../assets/Search.png';
import {useSelector} from 'react-redux';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {Pressable} from 'react-native';

const BusinessList = ({navigation}) => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [search, setSearch] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});

  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleModalVisible = data => {
    setData(data);
    setModalVisible(true);
  };

  const results = UserData?.filter(post => {
    if (search === '') {
      return post;
    } else if (
      post.BusinessName.toLowerCase().includes(search.toLowerCase()) ||
      post.BusinessCategory.toLowerCase().includes(search.toLowerCase())
    ) {
      return post;
    }
  });

  const [asycData, setAsycData] = useState([]);

  const getData = async () => {
    setLoader(true);
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/users',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    reactotron.log('USER ------------->' + JSON.stringify(resposone.data));

    setAsycData(resposone.data.Users);
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <View style={[styles.item, {backgroundColor: '#ebeffa'}]}>
      <Pressable onPress={() => handleModalVisible(item)}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri: 'https://downloader.la/temp/[Downloader.la]-646793a659c14.jpg',
            }}
            style={{width: 70, height: 70, borderRadius: 5}}
          />
          <View
            style={{
              marginHorizontal: 20,
              // flexDirection: 'row',
              // justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.title}>{item.name} </Text>
              <Text>{item.business_category_name}</Text>
            </View>
            <View>
              {item.approval == 1 ? (
                <Icons name="check" size={20} color="#008080" />
              ) : (
                <Icons name="watch-later" size={20} color="#D98B39" />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarView}>
        <View style={styles.centerStyles}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </View>
        <TextInput
          returnKeyType="done"
          maxLength={300}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder={'Search by category/Name'}
          placeholderTextColor={globalColors.grey}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.centerStyles}
          onPress={() => {
            setSortModal(true);
          }}>
          {/* <Image source={sort} style={styles.searchIcon} /> */}
        </TouchableOpacity>
      </View>

      {loader && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#008080" />
        </View>
      )}

      <FlatList
        ListEmptyComponent={() => {
          return (
            <Text style={{textAlign: 'center', marginVertical: 25}}>
              {' '}
              No data Found
            </Text>
          );
        }}
        contentContainerStyle={styles.listContentContainer}
        data={asycData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* </View> */}
      {modalVisible && (
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarView: {
    marginHorizontal: 18,
    width: '90%',
    height: RFValue(40),
    borderWidth: 1,
    paddingHorizontal: RFValue(8),
    borderColor: globalColors.grey,
    borderRadius: 5,
    marginVertical: RFValue(10),
    flexDirection: 'row',
  },
  searchInput: {
    color: globalColors.black,
    width: '85%',
    fontSize: RFValue(14),
    borderWidth: 0,
    marginLeft: RFValue(8),
    height: RFValue(40),
  },
  centerStyles: {justifyContent: 'center', alignItems: 'center'},
  searchIcon: {
    height: RFValue(14),
    tintColor: globalColors.grey,
    width: RFValue(14),
  },

  cardText: {
    color: 'black',

    padding: 4,
  },
  title: {
    fontSize: 20,
    paddingVertical: 5,
    fontWeight: 'bold',
    width: 230,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  item: {
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#606060',
    marginRight: 10,
  },
});

export default BusinessList;
