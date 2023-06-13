

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import idx from 'idx';
import {globalColors} from '../../../theme/globalColors';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import user from '../../../assets/user.png';
import EmptyComponent from '../../../Components/Common/EmptyComponent';
import Toast from 'react-native-simple-toast';
import sort from '../../../assets/sort.png';
import searchIcon from '../../../assets/Search.png';
import SortModal from '../../../Components/Common/SortModal';
import {UserData} from '../../AdminScreens/BusinessList/UserData';
import Eye from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ModalView from '../../../utils/Modal';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {useSelector} from 'react-redux';
import ModalLeads from '../../../utils/ModalLeads';
import AlertModal from '../../../Components/Common/AlertModal';
import {RNToasty} from 'react-native-toasty';
import DeleteModal from '../../../Components/Common/DeleteModal';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const itemWidth = width * 0.9;

const EventsList = ({props, navigation}) => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const userID = useSelector(state => state?.user?.data?.data?.user?.id);

  const [search, setSearch] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});
  const [selectedId, setSelectedId] = useState();
  const [followers, setFollowers] = useState('');
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [asycData, setAsycData] = useState([]);
  

  const isFocused = useIsFocused();

  const getData = async () => {
    setLoader(true);
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/event/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    reactotron.log('FOLLOWERS ID-------->', resposone?.data?.leads);

    setAsycData(resposone?.data?.leads);
    setLoader(false);
  };


  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleModalVisible = data => {
    setData(data);
    setModalVisible(true);
  };

  const results = asycData?.filter(post => {
    if (search === '') {
      return post;
    } else if (post.title.toLowerCase().includes(search.toLowerCase())) {
      return post;
    }
  });

  const deleteUser = id => {
    reactotron.log('DELETE EVENT ID', id);
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirm = async () => {
    setLoader(true);
    const del = await axios.post(
      `https://ibf.instantbusinesslistings.com/api/event/delete/${deleteId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    reactotron.log('DELLELLELELELELE----------->', del);

    getData();
    setDeleteModal(false);
    RNToasty.Warn({
      title: 'Events deleted successfully..',
      position: 'top',
    });
    setLoader(false);
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const EventData = data => {
    // reactotron.log(data)
    navigation.navigate('EventDetails', {eventData: data});
  };

  const handleEditEvents = data => {
    reactotron.log("Edit event data------->",data)
    navigation.navigate('Update Events', {editEventData: data});
  };

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <Pressable onPress={() => EventData(item)}>
        <View style={[styles.item, {backgroundColor: '#ebeffa', elevation: 2}]}>
          <View style={styles.contentContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.businessTitleContainer}>
                <Text style={styles.label}>Event title</Text>
                <Text style={styles.businessTitle}>{item.title}</Text>
              </View>

              <View style={styles.categoryContainer}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.category}>{item.date}</Text>
              </View>

              <View style={styles.addButtonContainer}>
                <TouchableOpacity>
                  <Icons
                    name="edit"
                    size={20}
                    color="#264596"
                    onPress={() => handleEditEvents(item)}
                  />
                </TouchableOpacity>
                <Icons
                  name="delete"
                  size={20}
                  color="#ff3300"
                  onPress={() => deleteUser(item.id)}
                  style={{marginTop: 10}}
                />
              </View>
            </View>

            {/* {followers.map((ele) =>
            ele.id === item.id ? (
              <View style={styles.followingContainer}>
                <Text style={styles.followingText}>Following</Text>
              </View>
            ) : null
          )} */}
          </View>
        </View>
      </Pressable>
    </View>
  );
  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.searchBarView}>
          <View style={styles.centerStyles}>
            <Image source={searchIcon} style={styles.searchIcon} />
          </View>

          <TextInput
            returnKeyType="done"
            maxLength={250}
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder={'Search by event title'}
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
        {/* 
        <View
          style={{
            marginVertical: 15,
            backgroundColor: '#264596',
            alignItems:'center',
            borderRadius: 50,
          }}>
            <Pressable onPress={() => navigation.navigate('Add Events')} style={{marginTop:2}}>
              <Icons name="add" size={30} color='#fff'/>
          </Pressable>
        </View> */}

        <View
          style={{
            marginVertical: 15,
            backgroundColor: '#264596',
            alignItems: 'center',
            borderRadius: 50,
            padding: 6,
          }}>
          <Pressable onPress={() => navigation.navigate('Add Events')}>
            <Icons name="add" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>

      {loader && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={globalColors.card} />
        </View>
      )}

      <FlatList
        data={results}
        ListEmptyComponent={() => {
          return (
            <Text style={{textAlign: 'center', marginVertical: 25}}>
              {' '}
              No data Found
            </Text>
          );
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

      {modalVisible && (
        <ModalLeads
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
        />
      )}

      <SortModal
        visibility={sortModal}
        selectedSort={selectedSort}
        setSelected={value => {
          setSelectedSort(value);
          // sortList(value);
        }}
        close={() => {
          setSortModal(false);
        }}
      />

      <DeleteModal
        visibility={deleteModal}
        confirm={() => {
          confirm();
        }}
        cancel={() => {
          cancel();
        }}
        title={'Are you sure you want to delete this Event?'}
      />
    </View>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  searchBarView: {
    marginHorizontal: 5,
    width: '82%',
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

  // container: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight || 0,
  //   backgroundColor: '#fff',
  // },
  // item: {
  //   marginHorizontal: 15,
  //   marginVertical: 10,
  //   elevation: 5,
  //   borderRadius: 10,
  // },
  // userName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#606060',
  //   marginRight: 10,
  // },
  // followingCss: {
  //   backgroundColor: '#008080',
  //   alignSelf: 'flex-end',
  //   borderRadius: 15,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  // },

  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  item: {
    width: itemWidth,
    borderRadius: 10,
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
  },
  businessTitleContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#000',
    // fontWeight: 'bold',
    // textTransform: 'capitalize',
  },
  businessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#000',
    paddingVertical: 10,
    // width: 220,
  },
  categoryContainer: {
    flex: 1,

    // alignItems: 'flex-end',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#000',
    paddingVertical: 10,
  },
  addButtonContainer: {
    marginLeft: 10,
  },
  followingContainer: {
    borderRadius: 10,
    backgroundColor: globalColors.card,
    width: 80,
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  followingText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
