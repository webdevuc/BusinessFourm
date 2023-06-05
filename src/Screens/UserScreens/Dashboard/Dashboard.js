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
import Profile from 'react-native-vector-icons/Entypo';

const Dashboard = props => {
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();

  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [asycData, setAsycData] = useState([]);
  const [leadsLength, setLeadsLength] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  const CarouselCardItem = ({item, index}) => {
    return (
      <>
        <View style={styles.itemContainer} key={index}>
          <View>
            <Text style={styles.header}>{item.fullName}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View style={{width: '50%', color: 'red'}}>
              <View>
                <Text style={styles.cardText}>Business Category </Text>
                <Text style={styles.cardText}>Business Title </Text>
              </View>
            </View>
            <View style={{width: '5%'}}>
              <Text style={styles.cardText}>-</Text>
              <Text style={styles.cardText}>-</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.cardText} numberOfLines={1}>
                {item.business_category_name}
              </Text>
              <Text style={styles.cardText} numberOfLines={1}>
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
        <View style={{flex: 0.3}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 20,
              textAlign: 'center',
              color: '#264596',
            }}>
            Top 3 Leads
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
                    <Text style={{fontSize: 16,fontWeight:'bold', color: '#264596'}}>
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
                  <Text style={styles.title}>{'Converted Count'}</Text>
                  <View style={styles.insideText}>
                    <Text style={{fontSize: 16,fontWeight:'bold', color: '#264596'}}>5</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Business list')}>
              <View
                style={[
                  styles.card1,
                  {marginTop: 50, backgroundColor: globalColors.card},
                ]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Business List'}</Text>
                  <View style={styles.insideText}>
                    <Icons name="view-list" size={20} color="#264596" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View
                style={[
                  styles.card1,
                  {marginTop: 50, backgroundColor: globalColors.card},
                ]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Profile'}</Text>
                  <View style={styles.insideText}>
                    <Profile name="user" size={20} color="#264596" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
    height: 110,
    width: 155,
    backgroundColor: 'red',
    borderRadius: 8,
    position: 'relative',
  },
  card2: {
    height: 80,
    width: 122,
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
    gap: 20,
    marginTop: 40,
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
    color:'#264596'
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

export default Dashboard;
