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
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {globalColors} from '../../../theme/globalColors';
import {TextInput} from 'react-native-gesture-handler';
import searchIcon from '../../../assets/Search.png';
import filter from '../../../assets/filter.png';
import sort from '../../../assets/sort.png';
import {RFValue} from 'react-native-responsive-fontsize';
import SortModal from '../../../Components/Common/SortModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Platform, PermissionsAndroid} from 'react-native';
import reactotron from 'reactotron-react-native';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import {useSelector} from 'react-redux';
import DatePickerComponent from './DatePicker';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {isEmpty} from '../../../utils/isEmpty';
import {RNToasty} from 'react-native-toasty';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyComponent from '../../../Components/Common/EmptyComponent';

// export default class Report extends Component {
const Report = () => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [search, setSearch] = useState('');

  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState(1);

  const [fromDate, setFromDate] = useState(
    new Date(moment().format('YYYY-MM-DD')),
  );
  const [toDate, setToDate] = useState(new Date(moment().format('YYYY-MM-DD')));

  const [loader, setLoader] = useState(false);
  const [asycData, setAsycData] = useState([]);

  const [markedDates, setMarkedDates] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    setLoader(true);
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/leads/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );
    reactotron.log('resposone?.data', resposone?.data?.leads);
    setAsycData(resposone?.data?.leads);
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const [filteredData, setFilteredData] = useState(asycData);

  const handleFilter = () => {
    const filtered = asycData.filter(obj => {
      const date1 = new Date(fromDate);
      const date2 = new Date(toDate);
      const checkDate = new Date(obj.date);
      if (checkDate >= date1 && checkDate <= date2) {
        return obj;
      }
    });

    setFilteredData(filtered);
    reactotron.log('filteres', filtered);
  };

  const convertArrayToHTML = asycData => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica';
            font-size: 12px;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
        </style>
      </head>
      <body>
        <h1>Business Report</h1>
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Business Title</th>
            <th>Category Name</th>
          </tr>
          ${asycData
            .map(
              (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.name}</td>    
              <td>${item.name_of_business}</td>
              <td>${item.business_category_name}</td>
            </tr>
          `,
            )
            .join('')}
        </table>
        <footer>
          <p>Thank you for your business!</p>
        </footer>
      </body>
    </html>
  `;
    return htmlContent;
  };

  const generateAndDownloadPDF = async data => {
    const htmlContent = convertArrayToHTML(data);

    reactotron.log('-------->' + htmlContent);

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
      fileName: 'BussinessReport',
      directory: 'Documents',
    };

    // try {
    //   const file = await RNHTMLtoPDF.convert(options);
    //   reactotron.log("file----------"+JSON.stringify(file))
    //   reactotron.log('PDF generated and saved:', file.filePath);
    // } catch (error) {
    //   reactotron.error('Failed to generate PDF:', error);
    // }

    let file = await RNHTMLtoPDF.convert(options);
    reactotron.log(file.filePath);
    Alert.alert(
      'Successfully Exported',
      'Path:' + file.filePath,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open', onPress: () => openFile(file.filePath)},
      ],
      {cancelable: true},
    );
  };

  const showLoader = () => {
    if (loader) {
      return (
        <ActivityIndicator
          style={{flex: 1}}
          size="large"
          color={globalColors.card}
        />
      );
    }
  };

  const openFile = filepath => {
    const path = filepath;
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  // _alertIndex(index) {
  //   Alert.alert(`This is row ${index + 1}`);
  // }

  const dateFilter = () => {
    // setIsDateOpen(true);
    setModalVisible(true);
  };
  const handleDateFilter = async () => {
    if (isEmpty(selectedStartDate)) {
      RNToasty.Error({
        title: 'Please Start Date',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    // https://ibf.instantbusinesslistings.com/api/leads/from-date?from_date=2023-05-01&to_date=2023-05-23
    const endDate = selectedEndDate ? selectedEndDate : selectedStartDate;
    reactotron.log('ENDDate--', endDate);

    const resposone = await axios.get(
      `https://ibf.instantbusinesslistings.com/api/leads/from-date?from_date=${selectedStartDate}&to_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );
    setAsycData(resposone?.data?.leads);

    setModalVisible(false);
    setMarkedDates({});
    setSelectedStartDate('');
  };

  const closeModal = () => {
    setModalVisible(false);
    // setMarkedDates({});
    // setSelectedStartDate('');
  };
  const handleDayPress = day => {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
      setMarkedDates({[day.dateString]: {startingDay: true, color: 'green'}});
    } else {
      setSelectedEndDate(day.dateString);

      const startDate = new Date(selectedStartDate);
      const endDate = new Date(day.dateString);
      const rangeDates = generateRangeDates(startDate, endDate);

      // Mark the selected dates in the calendar
      const marked = {};
      rangeDates.forEach((date, index) => {
        marked[date] = {
          color: index === 0 ? 'green' : 'green',
          textColor: 'white',
          startingDay: index === 0,
          endingDay: index === rangeDates.length - 1,
        };
      });
      setMarkedDates(marked);
      // setIsDateOpen(false);
    }
  };

  const generateRangeDates = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const filterTableData = () => {
    if (search === '') {
      return asycData;
    }
    return asycData.filter(
      data =>
        data.name?.toLowerCase().includes(search?.toLowerCase()) ||
        data.business_title?.toLowerCase().includes(search?.toLowerCase()) ||
        data.business_category_name
          .toLowerCase()
          .includes(search?.toLowerCase()),
      // data.name_of_business.toString().includes(search)
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 5,
          backgroundColor: '#fff',
        }}>
        <View style={styles.searchBarView}>
          <View style={[styles.centerStyles]}>
            <Image source={searchIcon} style={styles.searchIcon} />

            <TextInput
              returnKeyType="done"
              maxLength={300}
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder={'Search'}
              placeholderTextColor={globalColors.grey}
              style={styles.searchInput}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={dateFilter}>
          <Image
            source={filter}
            style={[
              styles.searchIcon,
              {height: RFValue(22), width: RFValue(28)},
            ]}
          />
          {/* <MaterialIcons
            name="filter-list"
            size={25}
            color={globalColors.grey}
          /> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => generateAndDownloadPDF(asycData)}>
          <View
            style={{
              marginTop: 10,
              height: RFValue(40),
              padding: RFValue(10),
              borderRadius: 5,
              backgroundColor: globalColors.card,
            }}>
            <Text style={{color: globalColors.white}}>Export PDF</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 0}}>
          <Row
            data={['Sr.no', 'Date', 'Business Title', 'Category']}
            style={styles.head}
            textStyle={[styles.text, {color: '#fff'}]}
          />
          {loader ? (
            showLoader()
          ) : filterTableData().length ? (
            filterTableData().map((rowData, index) => (
              <TableWrapper
                key={index}
                style={[
                  styles.row,
                  index % 2 === 0
                    ? {backgroundColor: globalColors.white}
                    : {backgroundColor: '#ebeffa'},
                ]}>
                <Cell data={index + 1} textStyle={styles.text} />
                <Cell data={rowData.expected_date} textStyle={styles.text} />
                <Cell data={rowData.business_title} textStyle={styles.text} />
                <Cell
                  data={rowData.business_category_name}
                  textStyle={styles.text}
                />
              </TableWrapper>
            ))
          ) : (
            <EmptyComponent title={'No data found.'} />
          )}
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

      <View style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Calendar
                markedDates={markedDates}
                markingType={'period'}
                onDayPress={handleDayPress}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignContent: 'center',
                  width: '62%',
                  // backgroundColor: 'red',
                  gap: 25,
                }}>
                <TouchableOpacity
                  style={[styles.cancleButton]}
                  onPress={closeModal}>
                  <Text style={[styles.textStyle, {color: globalColors.card}]}>
                    Cancle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: globalColors.card}]}
                  onPress={handleDateFilter}>
                  <Text style={styles.textStyle}>Filter </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  head: {height: 40, backgroundColor: globalColors.card, marginHorizontal: 0},
  text: {marginHorizontal: 4, marginVertical: 11},
  headText: {
    marginHorizontal: 4,
    marginVertical: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row', marginHorizontal: 5, width: '100%'},
  btn: {
    marginLeft: 8,
  },
  btnText: {textAlign: 'center', color: '#fff'},

  searchBarView: {
    width: '60%',
    height: RFValue(40),
    borderWidth: 1,
    paddingHorizontal: RFValue(8),
    borderColor: globalColors.grey,
    borderRadius: 5,
    marginVertical: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  searchInput: {
    color: globalColors.black,
    // width: '85%',
    fontSize: RFValue(14),
    borderWidth: 0,
    marginLeft: RFValue(8),
    height: RFValue(40),
  },
  centerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    height: RFValue(14),
    tintColor: globalColors.grey,
    width: RFValue(14),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0009',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: RFValue(100),
    backgroundColor: globalColors.grey,
    marginTop: 10,
  },
  cancleButton: {
    borderRadius: 5,
    padding: 10,
    width: RFValue(100),
    borderWidth: 1,
    borderColor: globalColors.card,

    marginTop: 10,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Report;
