import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Pressable,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {DATA} from '../../AdminScreens/Dashboard/dash';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {globalColors} from '../../../theme/globalColors';
import star from '../../../assets/star.png';
import add from '../../../assets/add.png';
import axios from 'axios';
import {useSelector} from 'react-redux';
export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
import Icons from 'react-native-vector-icons/MaterialIcons';
// import Profile from 'react-native-vector-icons/Entypo';
import Profile from 'react-native-vector-icons/Feather';
import reactotron from 'reactotron-react-native';
import Calender from 'react-native-vector-icons/MaterialIcons';

import Rupees from 'react-native-vector-icons/MaterialIcons';
import SocialIcon from 'react-native-vector-icons/Entypo';
import {fb} from '../../../utils/constan';

const Dashboard = props => {
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();

  const userRes = useSelector(state => state?.user?.data?.data?.token);
  reactotron.log('User res--', userRes);

  const [asycData, setAsycData] = useState([]);
  const [leadsLength, setLeadsLength] = useState([]);
  const [lead, setLead] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://ibf.instantbusinesslistings.com/api/event/index',
        {
          headers: {
            Authorization: `Bearer ${userRes}`,
          },
        },
      );

      setAsycData(response?.data?.leads);
      setLeadsLength(response.data?.leads.length);
    } catch (error) {
      // Handle the error here

      reactotron.log('Error occurred while fetching data:', error);
      // You can also set any error state or display an error message to the user
    }

    // const resposone = await axios.get(
    //   'https://ibf.instantbusinesslistings.com/api/event/index',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${userRes}`,
    //     },
    //   },
    // );

    // setAsycData(resposone?.data?.leads);
    // setLeadsLength(resposone.data?.leads.length);
  };

  const getTopLeads = async () => {
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/leads/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    reactotron.log('Resss', resposone);

    setLead(resposone?.data?.leads?.slice(0, 3));
  };

  // getTopLeads();

  useEffect(() => {
    getData();
    getTopLeads;
  }, []);

  const leadList = data => {
    navigation.navigate('Leads Details', {leadsData: data});
  };

  const EventData = data => {
    navigation.navigate('EventDetails', {eventData: data});
  };
  const openLink = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        reactotron.log('Cannot open the link:', url);
      }
    } catch (error) {
      reactotron.log('Error opening the link:', error);
    }
  };
  const CarouselCardItem = ({item, index}) => {
    return (
      <>
        <Pressable onPress={() => EventData(item)}>
          <View style={styles.itemContainer} key={index}>
            <View>
              <Text style={styles.header}>{item.title}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../../assets/mainLogo.jpg')} // Replace with your image source../../../assets/logo.png
                style={styles.image}
              />

              <View style={{padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Icons
                    name="location-pin"
                    size={20}
                    color={globalColors.white}
                    style={{marginTop: 3}}
                  />
                  <Text style={styles.cardTextR} numberOfLines={2}>
                    {item.address}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Calender
                    name="date-range"
                    size={18}
                    color={globalColors.white}
                    style={{marginTop: 3}}
                  />
                  <Text
                    style={[styles.cardTextR, {marginLeft: 5}]}
                    numberOfLines={2}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </>
    );
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 10,
              textAlign: 'center',
              color: '#264596',
            }}>
            Events
          </Text>
          <View>
            <Carousel
              ref={isCarousel}
              data={asycData}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              useScrollView={true}
              autoplay={true}
              loop={true}
              autoplayInterval={4000}
            />
          </View>
        </View>

        <View style={styles.roundCard}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Lead list')}>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Leads Count'}</Text>
                  <View style={styles.insideText}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#264596',
                      }}>
                      {leadsLength}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Converted Leads'}</Text>
                  <View style={styles.insideText}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#264596',
                      }}>
                      5
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Business list')}>
              <View
                style={[
                  styles.card1,
                  {marginTop: RFValue(35), backgroundColor: globalColors.card},
                ]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Business List'}</Text>
                  <View style={styles.insideText}>
                    <Icons name="view-list" size={22} color="#264596" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View
                style={[
                  styles.card1,
                  {marginTop: RFValue(35), backgroundColor: globalColors.card},
                ]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Profile '}</Text>
                  <View style={styles.insideText}>
                    <Profile name="user" size={22} color={globalColors.card} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* 
          <View style={styles.row}>
            <TouchableOpacity onPress={() => openLink(fb)}>
              <View style={[{alignItems: 'center'}]}>
                <SocialIcon name="facebook" size={30} color="#1773ea" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[{alignItems: 'center'}]}>
                <SocialIcon name="instagram" size={30} color="#d62976" />
              </View>
            </TouchableOpacity>
          </View> */}

          <View>
            <Text style={styles.leadsTitle}>Recent Leads</Text>

            <View style={styles.table}>
              <View
                style={[
                  styles.tableHeader,
                  {backgroundColor: '#b3c6ff', width: '100%'},
                ]}>
                <Text
                  style={[
                    styles.tableContent,
                    {fontWeight: '500', fontSize: RFValue(15)},
                  ]}>
                  Business Title
                </Text>
                <Text
                  style={[
                    styles.tableContent,
                    {fontWeight: '500', fontSize: RFValue(15)},
                  ]}>
                  Category
                </Text>
              </View>
              {lead.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => leadList(item)}
                  style={styles.tableHeader}>
                  <Text style={styles.tableContent} numberOfLines={1}>
                    {item?.business_title}
                  </Text>
                  <Text style={styles.tableContent} numberOfLines={1}>
                    {item?.business_category_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  roundCard: {
    backgroundColor: '#E7EBF0',
    width: '100%',
    flex: 0.7,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: globalColors.card,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: RFPercentage(25),
    marginTop: 10,
    marginBottom: 10,
  },
  cardText: {
    color: globalColors.white,
    fontSize: 15,
    padding: 2,
  },
  header: {
    color: globalColors.white,
    borderBottomColor: globalColors.white,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  card1: {
    height: 90,
    width: 135,
    backgroundColor: 'red',
    borderRadius: 8,
    position: 'relative',
  },
  card2: {
    height: 75,
    width: 100,
    borderRadius: 5,
    position: 'absolute',
    top: '55%',
    right: '10%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: 20,
    marginTop: RFValue(18),
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    color: globalColors.textGrey,
    fontWeight: '600',
  },
  insideText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 7,
    color: '#264596',
  },
  imageLogo: {
    height: RFValue(18),
    width: RFValue(18),
    borderRadius: 100,
    tintColor: globalColors.golden,
  },
  imageAdd: {
    height: RFValue(22),
    width: RFValue(22),
    tintColor: globalColors.primaryTheme,
  },

  cardTextR: {
    color: globalColors.white,
    fontSize: 15,
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  image: {
    width: '50%',
    height: 126, // Set the desired height for the image
    resizeMode: 'cover',
    borderBottomLeftRadius: 8,
  },

  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    // paddingHorizontal: 4,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableContent: {
    flex: 1,
    paddingVertical: 5,
    // textAlign: 'center',
    paddingLeft: RFValue(15),
    fontSize: 14,
    color: globalColors.black,
    // alignContent: 'center',
    // color:'#fff'
  },

  leadsTitle: {
    color: globalColors.black,
    fontWeight: '500',
    fontSize: RFValue(16),
    justifyContent: 'center',
    alignSelf: 'center',
    // marginVertical: RFValue(20),
    marginTop: RFValue(42),
    paddingBottom: RFValue(10),
  },
});

export default Dashboard;
