import axios from 'axios';
import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {globalColors} from '../../../theme/globalColors';

const EventDetails = ({route}) => {
  const dataEvent = route?.params?.eventData;

  const userRes = useSelector(state => state?.user?.data?.data?.token);

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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/mainLogo.jpg')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text>Title</Text>
        <Text style={styles.title}>{dataEvent.title}</Text>
        <Text>Description</Text>
        <Text style={styles.description}>{dataEvent.description}</Text>
        <Text>Event Date</Text>
        <Text style={styles.date}>{dataEvent.date}</Text>
        <Text>Address</Text>
        <Text style={styles.address}>{dataEvent.address}</Text>
        <Text>Location</Text>
        <Text style={styles.location}>{dataEvent.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
  },
  image: {
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    // flex: 1,
    height: 170, // Set the desired height for the image
    // resizeMode: 'cover',
    marginVertical: 23,
    borderRadius: 15,
  },
  detailsContainer: {
    paddingHorizontal: 17,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
    textTransform: 'capitalize',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'justify',
    color: globalColors.black,
  },
  infoContainer: {},
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    color: globalColors.black,
    marginVertical: 8,
  },
  address: {
    fontSize: 14,
    color: globalColors.black,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
    color: globalColors.black,
    marginVertical: 8,
  },
});

export default EventDetails;
