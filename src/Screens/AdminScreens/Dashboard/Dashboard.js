import React, {useEffect, useState} from 'react';
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
import reactotron from 'reactotron-react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rupees from 'react-native-vector-icons/MaterialIcons';
import SocialIcon from 'react-native-vector-icons/Entypo';
// import Calender from 'react-native-vector-icons/FontAwesome5'
import Calender from 'react-native-vector-icons/FontAwesome';
import {fb} from '../../../utils/constan';

export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
const DashboardAdmin = props => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [asycData, setAsycData] = useState([]);
  const [userLength, serUserLength] = useState([]);
  const [lead, setLead] = useState([]);

  const getData = async () => {
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/event/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    setAsycData(resposone?.data?.leads);
    // setLeadsLength(resposone.data?.leads.length);
  };

  const UserLength = async () => {
    const response = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/users',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );
    serUserLength(response.data?.Users?.length);
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

    //  setLentresposone.data.leads.length

    setLead(resposone?.data?.leads);
  };

  useEffect(() => {
    UserLength();
    getData();
    getTopLeads();
  }, []);

  // reactotron.log('Leads----', lead);
  const gotoBusinessList = () => {
    navigation.navigate('Business List');
  };

  const isCarousel = React.useRef(null);
  const isCarouselLead = React.useRef(null);
  const navigation = useNavigation();

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

  const leadList = data => {
    navigation.navigate('Leads Details', {leadsData: data});
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
                source={require('../../../assets/mainLogo.jpg')} // Replace with your image source
                style={styles.image}
              />

              <View style={{padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Icons
                    name="location-pin"
                    size={20}
                    color="#fff"
                    style={{marginTop: 3}}
                  />
                  <Text style={styles.cardTextR} numberOfLines={2}>
                    {item.address}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Calender
                    name="calendar-o"
                    size={17}
                    color="#fff"
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
              textAlign: 'center',
              color: '#000',
            }}>
            Events
          </Text>
          <View>
            {/* <TouchableOpacity onPress={EventData}> */}
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
            {/* </TouchableOpacity> */}
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#ebeffa',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            marginBottom: RFValue(5),
          }}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Lead list')}>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                <View style={{alignSelf: 'center', paddingVertical: 10}}>
                  <Icons name="list" size={30} color="#fff" />
                </View>
                <View
                  style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={styles.title}>{'Leads List'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{lead?.length}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Business List')}>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                <View style={{alignSelf: 'center', paddingVertical: 10}}>
                  <Ionicons name="document-text-sharp" size={30} color="#fff" />
                </View>
                <View
                  style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={styles.title}>{'Business List'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{userLength}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={[styles.card1, {backgroundColor: globalColors.card}]}>
              <View style={{alignSelf: 'center', paddingVertical: 10}}>
                <Icons name="list" size={30} color="#fff" />
              </View>
              <View
                style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                <Text style={[styles.title]}>{'Converted Leads'}</Text>
                <View style={styles.insideText}>
                  <Text style={styles.showText}>{userLength}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.card1, {backgroundColor: globalColors.card}]}>
              <View style={{alignSelf: 'center', paddingVertical: 10}}>
                <Rupees name="business-center" size={30} color="#fff" />
              </View>
              <View
                style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                <Text style={styles.title}>{'Business Revenue'}</Text>
                <View style={styles.insideText}>
                  <Text style={styles.showText}>50000</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.row}>
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
              {lead.slice(0, 3).map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => leadList(item)}
                  style={styles.tableHeader}>
                  <Text style={styles.tableContent} numberOfLines={1}>
                    {item?.business_title}
                  </Text>
                  <Text style={styles.tableContent} numberOfLines={1}>
                    {item?.business_category_name}{' '}
                    <Text style={styles.boldSymbol}>{' > '}</Text>
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
  showText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  showCards: {
    backgroundColor: '#fff',
    width: '75%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    paddingTop: 15,
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
    elevation: 4,
    height: RFPercentage(20),
    marginTop: 10,
    marginBottom: 10,
  },
  leadContainer: {
    flexDirection: 'row',
    backgroundColor: globalColors.card,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
    // justifyContent: 'space-between',
    // paddingHorizontal: 20,
    paddingLeft: RFValue(20),
    gap: RFValue(30),
    height: RFValue(85),
  },
  leadHeader: {
    color: globalColors.white,
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginVertical: RFValue(5),
  },
  leadContent: {
    color: globalColors.white,
  },
  cardText: {
    color: globalColors.white,
    fontSize: 15,
    padding: 2,
  },
  cardTextR: {
    color: globalColors.white,
    fontSize: 15,
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
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
    marginVertical: 15,
    height: 90,
    width: 135,

    borderRadius: 8,
    position: 'relative',
  },
  card2: {
    height: 70,
    width: 100,
    borderRadius: 5,
    position: 'absolute',
    top: '63%',
    right: '10%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: 30,
    marginVertical: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    color: '#000',
  },
  insideText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  image: {
    width: '50%',
    height: 91, // Set the desired height for the image
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
  boldSymbol: {
    fontWeight: 'bold',
    fontSize: RFValue(17),
  },

  leadsTitle: {
    color: globalColors.black,
    fontWeight: '500',
    fontSize: RFValue(16),
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
});

export default DashboardAdmin;
