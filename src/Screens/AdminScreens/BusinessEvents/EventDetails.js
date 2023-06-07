
import axios from 'axios';
import React, { useEffect } from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';

const EventDetails = ({ route }) => {

    const dataEvent = route.params?.eventData;



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
        source={require('../../../assets/logo.png')} // Replace with your image source
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text>Title</Text>
        <Text style={styles.title}>{dataEvent.title}</Text>
        <Text >Description</Text>
        <Text style={styles.description}>
        {dataEvent.description}
        </Text>

        <Text>Event Date</Text>
        <Text  style={styles.date}>{dataEvent.date}</Text>
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
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200, // Set the desired height for the image
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 17,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
    textTransform:'capitalize'
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 8,
    textAlign:'justify',
    color: '#333',
  },
  infoContainer: {},
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
  },
});

export default EventDetails;
