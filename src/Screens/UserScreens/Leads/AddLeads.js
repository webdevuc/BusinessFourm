import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {globalColors} from '../../../theme/globalColors';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddLeads = props => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [estimate, setEstimate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);
  const [expectedDate, setExpectedDate] = useState('');

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorBusinessCat, setErrorBusinessCat] = useState(false);
  const [errorEstimate, setErrorEstimate] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorExpectedDate, setErrorExpectedDate] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      const selectedDate = moment(date).format('YYYY-MM-DD');

      setExpectedDate(selectedDate);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const userRes = useSelector(state => state?.user?.data?.data?.token);

  reactotron.log('TOKEN-------->', userRes);

  const [asycData, setAsycData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/business-category-registration',
    );

    reactotron.log(
      'RESPONSE->' + JSON.stringify(response.data?.business_category),
    );

    const data = response.data.business_category.map(item => ({
      label: item.business_category_name,
      value: item.id,
    }));
    reactotron.log('DAATATATAT------>' + JSON.stringify(data));
    setAsycData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeTitle = text => {
    setTitle(text);
    if (text === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
  };

  const handleChangeDescription = text => {
    setDescription(text);
    if (text === '') {
      setErrorDescription(true);
    } else {
      setErrorDescription(false);
    }
  };

  const onChangeMobile = text => {
    setMobile(text);
    if (text === '') {
      setErrorMobile(true);
    } else {
      setErrorMobile(false);
    }
  };

  const onChangeExpectedDAte = text => {
    setExpectedDate(text);
    if (text === '') {
      setErrorExpectedDate(true);
    } else {
      setErrorExpectedDate(false);
    }
  };

  const handleEstimate = text => {
    setEstimate(text);
    if (text === '') {
      setErrorEstimate(true);
    } else {
      setErrorEstimate(false);
    }
  };

  const handleChange = text => {
    setAddress(text);
    if (text === '') {
      setErrorAddress(true);
    } else {
      setErrorAddress(false);
    }
  };

  const addLeadsApi = async () => {
    const payload = {
      business_title: title,
      description:description,
      address: address,
      mobile_no: mobile,
      business_category: category,
      estimate: estimate,
      expected_date: expectedDate,
    };

    const data = await axios.post(
      'https://ibf.instantbusinesslistings.com/api/leads/store',
      payload,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userRes}`, // notice the Bearer before your token
        },
      },
    );
    reactotron.log('ADD --- SAVE' + data);
    navigateToOtherPage();
  };

  const navigateToOtherPage = () => {
    navigation.navigate('Lead list');
  };

  const createLead = () => {
    if (title && mobile && expectedDate && category && estimate && address) {
      setTitle('');
      setMobile('');
      setExpectedDate('');
      setCategory('');
      setEstimate('');
      setAddress('');

      addLeadsApi();

      Toast.show('Leads added successfully', Toast.LONG);

      // setTimeout(()=>{
      //   navigation.navigate('Lead list');
      // },1000)
    } else {
      Toast.show('All Fields are required', Toast.LONG);
    }
  };

  return (
    <>
      <ScrollView style={{backgroundColor: globalColors.white}}>
        {/* <Header title="Sign Up" navProps={props} backEnable /> */}
        <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={[styles.inputView, {marginTop: 18}]}>
            <TextInput
              style={[styles.TextInput, errorTitle && styles.redTextInput]}
              placeholder="Name of business title"
              value={title}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setTitle(text)}
              onChangeText={handleChangeTitle}
            />
            <Text style={{color: 'red'}}>
              {errorTitle ? <Text>Name is required</Text> : ''}
            </Text>
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[
                styles.TextInput,
                errorDescription && styles.redTextInput,
              ]}
              placeholder="Description"
              value={description}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setTitle(text)}
              onChangeText={handleChangeDescription}
            />
            <Text style={{color: 'red'}}>
              {errorDescription ? <Text>Description is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorAddress && styles.redTextInput]}
              placeholder="Address"
              value={address}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setAddress(text)}
              onChangeText={handleChange}
            />
            <Text style={{color: 'red'}}>
              {errorAddress ? <Text>Address is required</Text> : ''}
            </Text>
          </View>

          {/* <View><Text>{errorTitle ? <Text>name is required</Text>: ''}</Text></View> */}
          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorMobile && styles.redTextInput]}
              placeholder="Mobile Number"
              value={mobile}
              placeholderTextColor={globalColors.grey}
              // onChangeText={mobile => setMobile(mobile)}
              onChangeText={onChangeMobile}
              maxLength={10}
              keyboardType="number-pad"
            />
            <Text style={{color: 'red'}}>
              {errorMobile ? <Text>Mobile number is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputViewDropdown}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={asycData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Business category"
              searchPlaceholder="Search..."
              value={category}
              onChange={item => {
                setCategory(item.value);
              }}
            />
          </View>
          <Text style={{color: 'red'}}>
            {errorBusinessCat ? <Text>Name is required</Text> : ''}
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorEstimate && styles.redTextInput]}
              placeholder="Estimate"
              value={estimate}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setEstimate(text)}
              onChangeText={handleEstimate}
            />
            <Text style={{color: 'red'}}>
              {errorEstimate ? <Text>Estimate is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputView}>
            {/* <TextInput
              style={[styles.TextInput, errorExpectedDate && styles.redTextInput]}
              placeholder="Expected date"
              value={expectedDate}
              placeholderTextColor={globalColors.grey}
              // onChangeText={name => setBusinessName(name)}
              onChangeText={onChangeExpectedDAte}
            /> */}

            <TouchableOpacity onPress={showDateTimePicker}>
              <TextInput
                // style={styles.input}
                style={[
                  styles.TextInput,
                  {color: globalColors.grey},
                  errorExpectedDate && styles.redTextInput,
                ]}
                value={expectedDate}
                placeholder="Select Date"
                editable={false}
                placeholderTextColor={globalColors.grey}
                onChangeText={onChangeExpectedDAte}
              />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={{color: 'red'}}>
              {errorExpectedDate ? <Text>Date is required</Text> : ''}
            </Text>
          </View>

          <TouchableOpacity onPress={createLead} style={styles.registerButton}>
            <Text style={styles.registerText}>Create Lead</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
  },
  inputView: {
    borderRadius: 8,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#505050',
    marginVertical: 5,
  },

  inputViewDropdown: {
    borderRadius: 8,
    width: '90%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#505050',
    marginVertical: 5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  redTextInput: {
    borderColor: 'red',
  },
  registerButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.card,
  },
  registerText: {
    color: globalColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    borderBottomColor: globalColors.black,
    paddingLeft: 5,
  },
});

export default AddLeads;
