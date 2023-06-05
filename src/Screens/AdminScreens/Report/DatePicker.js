import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';


const DatePickerComponent = ({setFromDate, setToDate, handleFilter, fromDate, toDate}) => {
  // const [fromDate, setFromDate] = useState(new Date());
  // const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);


  const showFromDatePickerModal = () => {
    setShowFromDatePicker(true);

  };

  const showToDatePickerModal = () => {
    setShowToDatePicker(true);
  };

  const handleFromDatePicker = (event, selectedDate) => {

    const currentDate = new Date(moment(selectedDate).format('YYYY-MM-DD')) ;

    if(currentDate > toDate){
      setFromDate(currentDate);
      setShowFromDatePicker(true);
      setShowFromDatePicker(Platform.OS === 'ios');
      Alert.alert("Start Date Should not be grater than End Date")
    }
    else{
      setFromDate(currentDate);
      handleFilter()
      setShowFromDatePicker(Platform.OS === 'ios');
    }
   
    
  };

  const handleToDatePicker = (event, selectedDate) => {
    const currentDate = new Date(moment(selectedDate).format('YYYY-MM-DD')) ;
    setToDate(currentDate);
    handleFilter()
    setShowToDatePicker(Platform.OS === 'ios');

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Text style={[styles.dateText]}>
           Start :&nbsp;
          <Icon
            name="calendar"
            size={25}
            color="#ff9900"
            onPress={showFromDatePickerModal}
          />
            &nbsp;
            <Text>{moment(fromDate).format('YYYY-MM-DD')}</Text>
        </Text>
      </TouchableOpacity>
      {showFromDatePicker && (
        // <DateTimePicker
        //   testID="fromDatePicker"
        //   value={fromDate}
        //   mode="date"
        //   is24Hour={true}
        //   display="default"
        //   onChange={handleFromDatePicker}
        // />



          <DateTimePicker
            testID="fromDatePicker"
            value={fromDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleFromDatePicker}
          />
      
      )}
    
      <TouchableOpacity>
        <Text style={styles.dateText}>
         End : &nbsp;
        <Icon
            name="calendar"
            size={25}
            color="#ff9900"
            onPress={showToDatePickerModal}
          />
          &nbsp;
          <Text>{moment(toDate).format('YYYY-MM-DD')}</Text>
        </Text>
      </TouchableOpacity>
      {showToDatePicker && (
        <DateTimePicker
          testID="toDatePicker"
          value={toDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleToDatePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default DatePickerComponent;
