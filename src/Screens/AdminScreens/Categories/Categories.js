// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Categories = () => {
//   return (
//     <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
//       <Text>All the business Categories goes here.</Text>
//     </View>
//   )
// }

// export default Categories

// const styles = StyleSheet.create({})


import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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

const AddCategory = props => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');


  const [errorTitle, setErrorTitle]= useState(false);
  const [errorBusiness, setErrorBusiness]= useState(false);


const handleChangeTitle = (text) =>{
  setTitle(text)
  if(text === ''){
    setErrorTitle(true)
  }else{
    setErrorTitle(false)
  }
}



const onChangeBusiness = (text) =>{
  setBusinessName(text)
  if(text === ''){
    setErrorBusiness(true)
  }else{
    setErrorBusiness(false)
  }
}



  const createLead = () => {
    if(title && businessName ){
      
      setTitle('');
      setBusinessName('');
     

      setTimeout(()=>{
        navigation.navigate('Lead list');
      },1000)
      Toast.show('Leads added successfully', Toast.LONG);

    }else{
      Toast.show('All Fields are required', Toast.LONG);
    }
    // Toast.show('Leads added successfully', Toast.LONG);
    // setTimeout(() => {
    //   navigation.navigate('Lead list');
    // }, 1000);
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
              placeholder="Business Title"
              value={title}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setTitle(text)}
              onChangeText={handleChangeTitle}
            />
            <Text style={{color:'red'}}>{errorTitle ? <Text>Name is required</Text>: ''}</Text>
          </View>
          {/* <View><Text>{errorTitle ? <Text>name is required</Text>: ''}</Text></View> */}
  

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorBusiness && styles.redTextInput]}
              placeholder="Name of Category"
              value={businessName}
              placeholderTextColor={globalColors.grey}
              // onChangeText={name => setBusinessName(name)}
              onChangeText={onChangeBusiness}
            />
            <Text style={{color:'red'}}>{errorBusiness ? <Text>Name is required</Text>: ''}</Text>
          </View>

          

     

          

          <TouchableOpacity onPress={createLead} style={styles.registerButton}>
            <Text style={styles.registerText}>Add Categories</Text>
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
    marginTop: 30,
    backgroundColor: globalColors.primaryTheme,
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

export default AddCategory;
