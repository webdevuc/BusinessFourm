// // import React from 'react';
// // import {
// //   Dimensions,
// //   Image,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import Carousel, {Pagination} from 'react-native-snap-carousel';
// // import {DATA} from './dash';
// // import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// // import {useNavigation} from '@react-navigation/native';
// // export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
// // export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
// // import IonIcon from 'react-native-vector-icons/Ionicons';
// // const Dashboard = props => {
// //   const isCarousel = React.useRef(null);
// //   const navigation = useNavigation();
// //   const CarouselCardItem = ({item, index}) => {
// //     return (
// //       <>
// //         <View style={styles.itemContainer} key={index}>
// //           <View>
// //             <Text style={styles.header}>{item.fullName}</Text>
// //           </View>
// //           <View
// //             style={{
// //               borderBottomColor: 'black',
// //               borderBottomWidth: StyleSheet.hairlineWidth,
// //             }}
// //           />
// //           <View
// //             style={{
// //               flexDirection: 'row',
// //               paddingHorizontal: 10,
// //               marginTop: 10,
// //             }}>
// //             <View style={{width: '45%'}}>
// //               <Text>Name </Text>
// //               <Text>Business Category </Text>
// //               <Text>Business Name </Text>
// //               <Text>Converted </Text>
// //             </View>
// //             <View style={{width: '5%'}}>
// //               <Text>-</Text>
// //               <Text>-</Text>
// //               <Text>-</Text>
// //               <Text>-</Text>
// //             </View>
// //             <View style={{width: '50%'}}>
// //               <Text numberOfLines={1}> {item.fullName}</Text>
// //               <Text numberOfLines={1}> {item.BusinessCategory}</Text>
// //               <Text numberOfLines={1}> {item.BusinessName}</Text>
// //               <Text numberOfLines={1}> {item.converted}</Text>
// //             </View>
// //           </View>
// //         </View>
// //       </>
// //     );
// //   };
// //   return (
// //     <ScrollView contentContainerStyle={{flexGrow: 1}}>
// //       <View style={styles.container}>
// //         <View style={{flex: 0.05}}>
// //           <Text
// //             style={{
// //               fontSize: 18,
// //               fontWeight: 'bold',
// //               marginTop: 20,
// //               textAlign: 'center',
// //             }}>
// //             Top 3 Leads
// //           </Text>
// //           <View>
// //             <Carousel
// //               ref={isCarousel}
// //               data={DATA}
// //               renderItem={CarouselCardItem}
// //               sliderWidth={SLIDER_WIDTH}
// //               itemWidth={ITEM_WIDTH}
// //               useScrollView={true}
// //               autoplay={true}
// //               loop={true}
// //               autoplayInterval={4000}
// //             />
// //           </View>
// //         </View>

// //         <View
// //           style={{
// //             backgroundColor: '#fff',
// //             width: '100%',
// //             flex: 1,
// //             paddingBottom: 40,
// //             justifyContent: 'center',
// //             borderTopLeftRadius: 25,
// //             borderTopRightRadius: 25,

// //             // al: 'center',

// //             marginTop: 10,
// //             paddingTop: 15,
// //           }}>
// //           <View style={styles.row}>
// //             <TouchableOpacity
// //               style={[styles.card, {backgroundColor: '#9be3c1'}]}
// //               onPress={() => navigation.navigate('Category List')}>
// //               <Text style={styles.title}>{'Category List'}</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[styles.card, {backgroundColor: '#dc82a5'}]}
// //               onPress={() => navigation.navigate('addCategory')}>
// //               <Text style={styles.title}>{'Add Category'}</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <View style={styles.row}>
// //             <TouchableOpacity
// //               style={[styles.card, {backgroundColor: '#c8baeb'}]}
// //               onPress={() => navigation.navigate('convertedBusiness')}>
// //               <Text style={styles.title}>{'Converted business'}</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[styles.card, {backgroundColor: '#eacb94'}]}
// //               onPress={() => navigation.navigate('businessReport')}
// //               >
// //               <Text style={styles.title}>{'Report'}</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <View style={styles.row}>
// //             <Image
// //               style={styles.logo}
// //               source={require('../../../assets/cardImage.jpg')}
// //             />
// //           </View>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     // paddingHorizontal: 20,
// //     // paddingVertical: 10,
// //   },
// //   itemContainer: {
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     // width: ITEM_WIDTH,
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3,
// //     },
// //     shadowOpacity: 0.29,
// //     shadowRadius: 4.65,
// //     elevation: 7,
// //     height: RFPercentage(25),
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   header: {
// //     color: '#fff',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     paddingHorizontal: 10,
// //     paddingVertical: 10,
// //     backgroundColor: '#006666',
// //   },
// //   row: {
// //     // flexDirection: 'row',
// //     // justifyContent: 'space-between',
// //     // marginBottom: 12,
// //     // height: '22%',
// //     // width: 100,

// //     flexDirection: 'row',
// //     height: 100,
// //     // gap: 10,
// //     justifyContent: 'space-evenly',
// //     alignContent: 'center',
// //     // paddingTop: 15,

// //     // marginHorizontal: 10,

// //     // width: ITEM_WIDTH + 5,

// //     // width: RFPercentage(40.5),

// //     marginTop: 10,
// //     width: '100%',
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     borderRadius: 10,
// //     shadowColor: '#006666',
// //     shadowOffset: {
// //       width: 0,
// //       height: 4,
// //     },
// //     width: '45%',
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 8,
// //     // flex: 0.48,
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   cardView: {
// //     backgroundColor: '#fff',
// //     // height: '70%',

// //     marginTop: RFValue(15),
// //     // padding: 20,
// //     borderTopLeftRadius: 25,
// //     borderTopRightRadius: 25,
// //   },
// //   logo: {
// //     width: RFPercentage(49),
// //     height: RFPercentage(18),
// //   },
// // });
// // export default Dashboard;

// import React, {useEffect, useState} from 'react';
// import {
//   Dimensions,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {DATA} from '../../AdminScreens/Dashboard/dash';
// import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import {useNavigation} from '@react-navigation/native';
// import {globalColors} from '../../../theme/globalColors';
// import star from '../../../assets/star.png';
// import add from '../../../assets/add.png';
// import axios from 'axios';
// import {useSelector} from 'react-redux';
// import reactotron from 'reactotron-react-native';
// import Icons from 'react-native-vector-icons/MaterialIcons';

// export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
// const DashboardAdmin = props => {
//   const userRes = useSelector(state => state?.user?.data?.data?.token);

//   const [asycData, setAsycData] = useState([]);
//   const[leadsLength,setLeadsLength] = useState([])
//   const [userLength , serUserLength] = useState([])

//   const getData = async () => {
//     const resposone = await axios.get(
//       'https://ibf.instantbusinesslistings.com/api/leads/index',
//       {
//         headers: {
//           Authorization: `Bearer ${userRes}`,
//         },
//       },
//     );

//     setAsycData(resposone?.data?.leads);
//     setLeadsLength(resposone.data?.leads.length)
//   };

//   const UserLength = async () =>{
//     const response = await axios.get(
//       'https://ibf.instantbusinesslistings.com/api/users',
//       {
//         headers: {
//           Authorization: `Bearer ${userRes}`,
//         },
//       },
//     );
//     serUserLength(response.data?.Users?.length);
//   }

//   useEffect(() => {
//     UserLength()
//     getData();
//   }, []);

//   const gotoBusinessList = () => {
//     navigation.navigate('Business List');
//   };

//   const isCarousel = React.useRef(null);
//   const navigation = useNavigation();
//   const CarouselCardItem = ({item, index}) => {
//     return (
//       <>
//         <View style={styles.itemContainer} key={index}>
//           <View>
//             <Text style={styles.header}>{item.business_title}</Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               paddingHorizontal: 10,
//               marginTop: 10,
//             }}>

//               <View>
//                 <Text style={styles.cardText}>Business Category </Text>
//                 <Text style={styles.cardText}>Business Title </Text>
//               </View>

//             <View style={{width: '5%'}}>
//               <Text style={styles.cardText}>-</Text>
//               <Text style={styles.cardText}>-</Text>
//             </View>
//             <View style={{width: '50%'}}>
//               <Text style={styles.cardTextR} numberOfLines={2}>
//                 {item.business_category}
//               </Text>
//               <Text style={styles.cardTextR} numberOfLines={2}>
//                 {item.business_title}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </>
//     );
//   };
//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1}}>
//       <View style={styles.container}>
//         <View style={{flex: 1}}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: 'bold',
//               textAlign: 'center',
//               color: globalColors.primaryTheme,
//             }}>
//             Recent 3 Leads
//           </Text>
//           <View>
//             <Carousel
//               ref={isCarousel}
//               data={asycData}
//               renderItem={CarouselCardItem}
//               sliderWidth={SLIDER_WIDTH}
//               itemWidth={ITEM_WIDTH}
//               useScrollView={true}
//               autoplay={true}
//               loop={true}
//               autoplayInterval={4000}
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             backgroundColor: '#d0f0fb',
//             width: '100%',
//             flex: 1,
//             justifyContent: 'center',
//             borderTopLeftRadius: 25,
//             borderTopRightRadius: 25,
//           }}>
//           <View style={styles.row}>

//           <View style={[styles.showCards,{marginTop:15}]}>
//               <Text style={styles.showText}>Total Business Revenue</Text>
//               <Text style={styles.showText}>2000</Text>
//             </View>

//             <View style={styles.showCards}>
//               <Text style={styles.showText}>Converted Leads</Text>
//               <Text style={styles.showText}>22</Text>
//             </View>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('Business List')}>
//               {/* <TouchableOpacity> */}
//               <View
//                 style={[
//                   styles.card1,
//                   {backgroundColor: '#59caf3'},
//                 ]}>
//                 <View style={[styles.card2, {backgroundColor: '#fff'}]}>
//                   <Text style={styles.title}>{'Business list'}</Text>
//                   <View style={styles.insideText}>
//                     <Text style={styles.showText}>{userLength}</Text>
//                     {/* <Image
//                       style={styles.imageAdd}
//                       source={add}
//                       resizeMode={'contain'}
//                     /> */}
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => navigation.navigate('Lead list')}>
//               <View
//                 style={[
//                   styles.card1,
//                   {backgroundColor: '#59caf3'},
//                 ]}>
//                 <View style={[styles.card2, {backgroundColor: '#fff'}]}>
//                   <Text style={styles.title}>{'Leads list'}</Text>
//                   <View style={styles.insideText}>
//                     <Text style={styles.showText}>{leadsLength}</Text>
//                     {/* <Image
//                       style={styles.imageLogo}
//                       source={star}
//                       resizeMode={'contain'}
//                     /> */}
//                     {/* <Icons name="view-list" size={20} color="#12B0E8" /> */}
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* <TouchableOpacity onPress={gotoBusinessList}>
//               <View
//                 style={[
//                   styles.card1,
//                   {backgroundColor: globalColors.primaryTheme},
//                 ]}>
//                 <View style={[styles.card2, {backgroundColor: '#fff'}]}>
//                   <Text style={styles.title}>{'Business List'}</Text>
//                   <View style={styles.insideText}>
//                     <Text>3 items</Text>
//                      <Icons name="view-list" size={20} color="#12B0E8" />
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity> */}

//             <TouchableOpacity
//               onPress={() => navigation.navigate('Business Report')}>
//               <View
//                 style={[
//                   styles.card1,
//                   {backgroundColor: '#59caf3'},
//                 ]}>
//                 <View style={[styles.card2, {backgroundColor: '#fff'}]}>
//                   <Text style={styles.title}>{'Report'}</Text>
//                   <View style={styles.insideText}>
//                     <Icons name="view-list" size={20} color="#088395" />
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('Add Category')}>
//               <View
//                 style={[
//                   styles.card1,
//                   {backgroundColor: '#59caf3'},
//                 ]}>
//                 <View style={[styles.card2, {backgroundColor: '#fff'}]}>
//                   <Text style={styles.title}>{'Add Category'}</Text>
//                   <View style={styles.insideText}>
//                     <Image
//                       style={styles.imageAdd}
//                       source={add}
//                       resizeMode={'contain'}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   showText:{
//       fontSize:16,
//       fontWeight:'bold',
//       color:globalColors.textGrey
//   },
//   showCards:{
//     backgroundColor: '#fff',
//     width: '75%',
//     height: 50,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     flexDirection:'row',
//     justifyContent:'space-between',
//   },
//   container: {
//     paddingTop: 15,
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   itemContainer: {
//     backgroundColor: '#59caf3',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7,
//     height: RFPercentage(20),
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   cardText: {
//     color: '#fff',
//     fontSize: 15,
//     padding: 2,
//   },
//   cardTextR: {
//     color: '#fff',
//     fontSize: 15,
//     padding: 2,
//     flexDirection: 'row',
//     width: '100%',
//     flexWrap: 'wrap',
//   },
//   header: {
//     color: "#fff",
//     borderBottomColor: '#fff',
//     borderBottomWidth: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },

//   card1: {
//     marginVertical: 15,
//     height: 90,
//     width: 135,

//     borderRadius: 8,
//     position: 'relative',
//   },
//   card2: {
//     height: 60,
//     width: 100,
//     borderRadius: 5,
//     position: 'absolute',
//     top: '63%',
//     right: '10%',
//   },
//   row: {
//     display: 'flex',
//     flexDirection: 'row',
//     flex: 1,
//     flexWrap: 'wrap',
//     gap: 20,
//     justifyContent: 'center',
//   },

//   title: {
//     fontSize: 15,
//     textAlign: 'center',
//     marginTop: 10,
//     fontWeight: '600',
//     color: globalColors.textGrey,
//   },
//   insideText: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     // marginVertical: 7,
//   },
//   imageLogo: {
//     height: RFValue(18),
//     width: RFValue(18),
//     borderRadius: 100,
//     tintColor: globalColors.golden,
//   },
//   imageAdd: {
//     height: RFValue(22),
//     width: RFValue(22),
//     tintColor: globalColors.primaryTheme,
//   },

// });

// export default DashboardAdmin;

// import React from 'react';
// import {
//   Dimensions,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {DATA} from './dash';
// import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import {useNavigation} from '@react-navigation/native';
// export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74);
// import IonIcon from 'react-native-vector-icons/Ionicons';
// const Dashboard = props => {
//   const isCarousel = React.useRef(null);
//   const navigation = useNavigation();
//   const CarouselCardItem = ({item, index}) => {
//     return (
//       <>
//         <View style={styles.itemContainer} key={index}>
//           <View>
//             <Text style={styles.header}>{item.fullName}</Text>
//           </View>
//           <View
//             style={{
//               borderBottomColor: 'black',
//               borderBottomWidth: StyleSheet.hairlineWidth,
//             }}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               paddingHorizontal: 10,
//               marginTop: 10,
//             }}>
//             <View style={{width: '45%'}}>
//               <Text>Name </Text>
//               <Text>Business Category </Text>
//               <Text>Business Name </Text>
//               <Text>Converted </Text>
//             </View>
//             <View style={{width: '5%'}}>
//               <Text>-</Text>
//               <Text>-</Text>
//               <Text>-</Text>
//               <Text>-</Text>
//             </View>
//             <View style={{width: '50%'}}>
//               <Text numberOfLines={1}> {item.fullName}</Text>
//               <Text numberOfLines={1}> {item.BusinessCategory}</Text>
//               <Text numberOfLines={1}> {item.BusinessName}</Text>
//               <Text numberOfLines={1}> {item.converted}</Text>
//             </View>
//           </View>
//         </View>
//       </>
//     );
//   };
//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1}}>
//       <View style={styles.container}>
//         <View style={{flex: 0.05}}>
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: 'bold',
//               marginTop: 20,
//               textAlign: 'center',
//             }}>
//             Top 3 Leads
//           </Text>
//           <View>
//             <Carousel
//               ref={isCarousel}
//               data={DATA}
//               renderItem={CarouselCardItem}
//               sliderWidth={SLIDER_WIDTH}
//               itemWidth={ITEM_WIDTH}
//               useScrollView={true}
//               autoplay={true}
//               loop={true}
//               autoplayInterval={4000}
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             backgroundColor: '#fff',
//             width: '100%',
//             flex: 1,
//             paddingBottom: 40,
//             justifyContent: 'center',
//             borderTopLeftRadius: 25,
//             borderTopRightRadius: 25,

//             // al: 'center',

//             marginTop: 10,
//             paddingTop: 15,
//           }}>
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={[styles.card, {backgroundColor: '#9be3c1'}]}
//               onPress={() => navigation.navigate('Category List')}>
//               <Text style={styles.title}>{'Category List'}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.card, {backgroundColor: '#dc82a5'}]}
//               onPress={() => navigation.navigate('addCategory')}>
//               <Text style={styles.title}>{'Add Category'}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={[styles.card, {backgroundColor: '#c8baeb'}]}
//               onPress={() => navigation.navigate('convertedBusiness')}>
//               <Text style={styles.title}>{'Converted business'}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.card, {backgroundColor: '#eacb94'}]}
//               onPress={() => navigation.navigate('businessReport')}
//               >
//               <Text style={styles.title}>{'Report'}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.row}>
//             <Image
//               style={styles.logo}
//               source={require('../../../assets/cardImage.jpg')}
//             />
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     // paddingHorizontal: 20,
//     // paddingVertical: 10,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     // width: ITEM_WIDTH,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7,
//     height: RFPercentage(25),
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   header: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: '#006666',
//   },
//   row: {
//     // flexDirection: 'row',
//     // justifyContent: 'space-between',
//     // marginBottom: 12,
//     // height: '22%',
//     // width: 100,

//     flexDirection: 'row',
//     height: 100,
//     // gap: 10,
//     justifyContent: 'space-evenly',
//     alignContent: 'center',
//     // paddingTop: 15,

//     // marginHorizontal: 10,

//     // width: ITEM_WIDTH + 5,

//     // width: RFPercentage(40.5),

//     marginTop: 10,
//     width: '100%',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#006666',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     width: '45%',
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 8,
//     // flex: 0.48,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cardView: {
//     backgroundColor: '#fff',
//     // height: '70%',

//     marginTop: RFValue(15),
//     // padding: 20,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   logo: {
//     width: RFPercentage(49),
//     height: RFPercentage(18),
//   },
// });
// export default Dashboard;

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
                {item.business_category}
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
              color: '#00bfff',
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
            backgroundColor: '#d0f0fb',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <View style={styles.row}>
            <View style={[styles.showCards, {marginTop: 15}]}>
              <Text style={styles.showText}>Total Business Revenue</Text>
              <Text style={styles.showText}>2000</Text>
            </View>

            <View style={styles.showCards}>
              <Text style={styles.showText}>Converted Leads</Text>
              <Text style={styles.showText}>22</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Business List')}>
              {/* <TouchableOpacity> */}
              <View style={[styles.card1, {backgroundColor: '#0086b3'}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Business list'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{userLength}</Text>
                    {/* <Image
                      style={styles.imageAdd}
                      source={add}
                      resizeMode={'contain'}
                    /> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Lead list')}>
              <View style={[styles.card1, {backgroundColor: '#0086b3'}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Leads list'}</Text>
                  <View style={styles.insideText}>
                    <Text style={styles.showText}>{leadsLength}</Text>
                    {/* <Image
                      style={styles.imageLogo}
                      source={star}
                      resizeMode={'contain'}
                    /> */}
                    {/* <Icons name="view-list" size={20} color="#12B0E8" /> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={gotoBusinessList}>
              <View
                style={[
                  styles.card1,
                  {backgroundColor: globalColors.primaryTheme},
                ]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Business List'}</Text>
                  <View style={styles.insideText}>
                    <Text>3 items</Text>
                     <Icons name="view-list" size={20} color="#12B0E8" />
                  </View>
                </View>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => navigation.navigate('Business Report')}>
              <View style={[styles.card1, {backgroundColor: '#0086b3'}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Report'}</Text>
                  <View style={styles.insideText}>
                    {/* <Text>10 items</Text> */}
                    <Icons name="view-list" size={20} color="#088395" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Add Category')}>
              <View style={[styles.card1, {backgroundColor: '#0086b3'}]}>
                <View style={[styles.card2, {backgroundColor: '#fff'}]}>
                  <Text style={styles.title}>{'Add Category'}</Text>
                  <View style={styles.insideText}>
                    {/* <Text>2 items</Text> */}
                    <Image
                      style={styles.imageAdd}
                      source={add}
                      resizeMode={'contain'}
                    />
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
  showText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.textGrey,
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
    backgroundColor: '#0086b3',
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
    color: '#fff',
    fontSize: 15,
    padding: 2,
  },
  cardTextR: {
    color: '#fff',
    fontSize: 15,
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  header: {
    color: '#fff',
    borderBottomColor: '#fff',
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
    height: 60,
    width: 100,
    // backgroundColor: 'green',
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
    // marginHorizontal: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    color: globalColors.textGrey,
  },
  insideText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginVertical: 7,
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
    // borderRadius: 100,
    tintColor: globalColors.primaryTheme,
  },
  // card: {
  //   backgroundColor: '#e6ffff',
  //   backgroundColor: globalColors.white,
  //   padding: 20,
  //   borderRadius: 10,
  //   shadowColor: '#006666',
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   width: '45%',
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 8,
  //   // flex: 0.48,
  // },

  // cardView: {
  //   backgroundColor: '#fff',
  //   // height: '70%',

  //   // marginTop: RFValue(15),
  //   // padding: 20,
  //   borderTopLeftRadius: 25,
  //   borderTopRightRadius: 25,
  // },
  // logo: {
  //   width: RFPercentage(49),
  //   height: RFPercentage(18),
  // },
});

export default DashboardAdmin;
