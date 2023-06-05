// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Report = ({navigation}) => {

//   return (
//     <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
//       <Text>Admin Report goes here</Text>
//     </View>
//   )
// }

// export default Report

// const styles = StyleSheet.create({})



import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {globalColors} from '../../../theme/globalColors';
import {TextInput} from 'react-native-gesture-handler';
import searchIcon from '../../../assets/Search.png';
import sort from '../../../assets/sort.png';
import {RFValue} from 'react-native-responsive-fontsize';
import SortModal from '../../../Components/Common/SortModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform, PermissionsAndroid } from 'react-native';
import reactotron from 'reactotron-react-native';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import { useSelector } from 'react-redux';



// export default class Report extends Component {
const Report = () => {

  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [tableHead, setTableHead] = useState([
    'S No',
    'Name',
    'Mobile',
    'Category',
  ]);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', mobile: 8745856699 , business:'hotel' },
    { id: 2, name: 'Jane Doe', mobile: 8966332211 , business:'shop'},
    { id: 3, name: 'Bob Smith', mobile: 7788552211 , business:'comapny' },
    { id: 4, name: 'Akshay Buchade', mobile: 8745856699 , business:'hotel' },
    { id: 5, name: 'Salim', mobile: 8966332211 , business:'shop'},
    { id: 6, name: 'Nikita ', mobile: 7788552211 , business:'comapny' },
    { id: 7, name: 'Sana ', mobile: 7788552211 , business:'comapny' },
    { id: 8, name: 'John Doe', mobile: 8745856699 , business:'hotel' },
    { id: 9, name: 'Jane Doe', mobile: 8966332211 , business:'shop'},
    { id: 10, name: 'Bob Smith', mobile: 7788552211 , business:'comapny' },
    { id: 11, name: 'Akshay Buchade', mobile: 8745856699 , business:'hotel' },
    { id: 12, name: 'Salim', mobile: 8966332211 , business:'shop'},
    { id: 13, name: 'Nikita ', mobile: 7788552211 , business:'comapny' },
    { id: 14, name: 'Sana ', mobile: 7788552211 , business:'comapny' },
  ]);

  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);





  const [asycData, setAsycData] = useState([]);

  const getData = async () => {

    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/users',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    setAsycData(resposone?.data?.Users);
   
  };

  useEffect(() => {
    getData();
  }, []);





  const convertArrayToHTML = (asycData) => {
    let htmlContent = '<html><body><table>';
  
    // Generate HTML table rows from the array of objects
    asycData.map((item,index) => {
      htmlContent += '<tr>';
      htmlContent += `<td>${index+1}</td>`;
      htmlContent += `<td>${item.name}</td>`;
      htmlContent += `<td>${item.name_of_business}</td>`;
      htmlContent += `<td>${item.business_category_name}</td>`;
      htmlContent += '</tr>';
    });
  
    htmlContent += '</table></body></html>';
    return htmlContent;
  };


  const generateAndDownloadPDF = async (data) => {
    const htmlContent = convertArrayToHTML(data);

    reactotron.log("-------->"+htmlContent)
  
    // Request write external storage permission (Android specific)
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download PDF.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        reactotron.log('Permission denied.');
        return;
      }
    }
  
    const options = {
      html: htmlContent,
      fileName: 'Report',
      directory: 'Documents',
    };
  


    // try {
    //   const file = await RNHTMLtoPDF.convert(options);
    //   reactotron.log("file----------"+JSON.stringify(file))
    //   reactotron.log('PDF generated and saved:', file.filePath);
    // } catch (error) {
    //   reactotron.error('Failed to generate PDF:', error);
    // }


    let file = await RNHTMLtoPDF.convert(options)
    reactotron.log(file.filePath);
    Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });


  };



  const openFile = (filepath) => {
        const path = filepath;// absolute-path-to-my-local-file.
        FileViewer.open(path)
          .then(() => {
            // success
          })
          .catch(error => {
            // error
          });
      }

  // _alertIndex(index) {
  //   Alert.alert(`This is row ${index + 1}`);
  // }

  const filterTableData = () => {
    if (search === '') {
      return asycData;
    }
    return asycData.filter(
      (data) =>
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.name_of_business.toLowerCase().includes(search.toLowerCase()) ||
        data.business_category_name.toLowerCase().includes(search.toLowerCase()) 
        // data.name_of_business.toString().includes(search)
    );
  };


  return (
    <ScrollView>
      <View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:10}}>
      <View style={styles.searchBarView}>
        <View style={styles.centerStyles}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </View>
        <TextInput
          returnKeyType="done"
          maxLength={300}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder={'Search'}
          placeholderTextColor={globalColors.grey}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.centerStyles}
          // onPress={() => {
          //   setSortModal(true);
          // }}
          >
          {/* <Image source={sort} style={styles.searchIcon} /> */}
        </TouchableOpacity>
      
      </View>

      <TouchableOpacity onPress={() => generateAndDownloadPDF(asycData)}>
          <View
            style={{
              marginTop:10,
              height: RFValue(40),
              padding: RFValue(10),
              borderRadius: 5,
              backgroundColor: globalColors.primaryTheme,
            }}>
            <Text style={{color: globalColors.white}}>Export PDF</Text>
          </View>
      </TouchableOpacity>

      </View>

      <View style={styles.container}>
        {/* <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          {tableData.map((rowData, index) => (
            <TableWrapper
              key={index}
              style={[
                styles.row,
                index % 2 === 0
                  ? {backgroundColor: globalColors.white}
                  : {backgroundColor: '#f2f2f2'},
              ]}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 4 ? element(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table> */}

<Table borderStyle={{ borderWidth: 0 }}>
    <Row data={['Sr.no', 'Name', 'Title', 'Category']} style={styles.head} textStyle={styles.text} />
    {filterTableData().map((rowData, index) => (
      <TableWrapper key={index} style={[
        styles.row,
        index % 2 === 0
          ? {backgroundColor: globalColors.white}
          : {backgroundColor: '#c2d6d6'},
      ]}>
        <Cell data={index+1} textStyle={styles.text} />
        <Cell data={rowData.name} textStyle={styles.text} />
        <Cell data={rowData.name_of_business} textStyle={styles.text} />
        <Cell data={rowData.business_category_name} textStyle={styles.text} />
      </TableWrapper>
    ))}
  </Table>


      </View>
      <SortModal
        visibility={sortModal}
        selectedSort={selectedSort}
        setSelected={value => {
          setSelectedSort(value);
          // sortList(value);
        }}
        close={() => {
          setSortModal(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingTop: 2,
    backgroundColor: globalColors.white,
  },
  head: {height: 40, backgroundColor: "#c2d6d6"},
  text: {marginHorizontal: 4, marginVertical: 11},
  row: {flexDirection: 'row'},
  btn: {
    marginLeft: 8,
  },
  btnText: {textAlign: 'center', color: '#fff'},

  searchBarView: {
    width: '70%',
    height: RFValue(40),
    borderWidth: 1,
    paddingHorizontal: RFValue(8),
    borderColor: globalColors.grey,
    borderRadius: 5,
    marginVertical: RFValue(10),
    flexDirection: 'row',
  },
  searchInput: {
    color: globalColors.black,
    // width: '85%',
    fontSize: RFValue(14),
    borderWidth: 0,
    marginLeft: RFValue(8),
    height: RFValue(40),
  },
  centerStyles: {justifyContent: 'center', alignItems: 'center'},
  searchIcon: {
    height: RFValue(14),
    tintColor: globalColors.grey,
    width: RFValue(14),
  },
});


export default Report;
