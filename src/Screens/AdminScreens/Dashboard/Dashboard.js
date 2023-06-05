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


export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
const DashboardAdmin = props => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [asycData, setAsycData] = useState([]);
  const [leadsLength, setLeadsLength] = useState([]);
  const [userLength, serUserLength] = useState([]);

  const getData = async () => {
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/leads/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    setAsycData(resposone?.data?.leads);
    setLeadsLength(resposone.data?.leads.length);
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

  useEffect(() => {
    UserLength();
    getData();
  }, []);

  const gotoBusinessList = () => {
    navigation.navigate('Business List');
  };

  const isCarousel = React.useRef(null);
  const navigation = useNavigation();
  const CarouselCardItem = ({item, index}) => {
    return (
      <>
        <View style={styles.itemContainer} key={index}>
          <View>
            <Text style={styles.header}>{item.business_title}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View>
              <Text style={styles.cardText}>Business Category </Text>
              <Text style={styles.cardText}>Business Title </Text>
            </View>

            <View style={{width: '5%'}}>
              <Text style={styles.cardText}>-</Text>
              <Text style={styles.cardText}>-</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.cardTextR} numberOfLines={2}>
                {item.business_category_name}
              </Text>
              <Text style={styles.cardTextR} numberOfLines={2}>
                {item.business_title}
              </Text>
            </View>
          </View>
        </View>
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
            Recent 3 Leads
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

        <View
          style={{
            backgroundColor: '#ebeffa',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <View style={styles.row}>

          <TouchableOpacity onPress={() => navigation.navigate('Lead list')}>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                  <View style={{alignSelf:'center',paddingVertical:10}}>
                    <Icons name='list' size={40} color='#fff'/>
                  </View>
                <View style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={styles.title}>{'Leads list'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{leadsLength}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>


           

            <TouchableOpacity
              onPress={() => navigation.navigate('Business List')}>
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                  <View style={{alignSelf:'center',paddingVertical:10}}>
                    <Ionicons name='document-text-sharp' size={40} color='#fff'/>
                  </View>
                <View style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={styles.title}>{'Business list'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{userLength}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>



              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                  <View style={{alignSelf:'center',paddingVertical:10}}>
                    <Icons name='list' size={40} color='#fff'/>
                  </View>
                <View style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={[styles.title]}>{'Converted leads'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{userLength}</Text>
                  </View>
                </View>
              </View>
      

    
              <View
                style={[styles.card1, {backgroundColor: globalColors.card}]}>
                  <View style={{alignSelf:'center',paddingVertical:10}}>
                    <Icons name='list' size={40} color='#fff'/>
                  </View>
                <View style={[styles.card2, {backgroundColor: globalColors.card2}]}>
                  <Text style={styles.title}>{'Business Revenue'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>50000</Text>
                  </View>
                </View>
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
    color:'#000'
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
    elevation: 7,
    height: RFPercentage(20),
    marginTop: 10,
    marginBottom: 10,
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
    color:'#000'
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
});

export default DashboardAdmin;
