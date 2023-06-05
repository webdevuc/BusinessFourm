import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
import {RNToasty} from 'react-native-toasty';
import reactotron from 'reactotron-react-native';
import Edit from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AlertModal from '../../../Components/Common/AlertModal';
import {useDispatch, useSelector} from 'react-redux';
import {saveToken} from '../../../actions/UserActions';

export default function AddCat({navigation}) {
  const dispatch = useDispatch();

  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const [business_Title, setbusiness_Title] = useState('');
  const [business_Category, setbusiness_Category] = useState('');

  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [asycData, setAsycData] = useState([]);

  const getData = async () => {
    setLoader(true);
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/business_category/index',
      {
        headers: {
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    setAsycData(resposone?.data?.business_category);
    setLoader(false);
  };

  const addCategory = async () => {
    const payload = {
      business_category_name: business_Category,
    };
    try {
      if (business_Title || business_Category) {
        const data = await axios.post(
          'https://ibf.instantbusinesslistings.com/api/business_category/store',
          payload,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userRes}`, // notice the Bearer before your token
            },
          },
        );

        getData();
        setbusiness_Title('');
        setbusiness_Category('');
        RNToasty.Success({
          title: 'Category saves successfully..',
          position: 'top',
        });
      } else {
        Alert.alert('Please enter category name');
      }
    } catch (e) {
      reactotron.log('Failed to store data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateCategory = async () => {
    const payload = {
      business_category_name: business_Category,
    };

    const resposone = await axios.post(
      `https://ibf.instantbusinesslistings.com/api/business_category/${editingIndex}/update`,
      payload,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userRes}`, // notice the Bearer before your token
        },
      },
    );

    getData();
    setbusiness_Title('');
    setbusiness_Category('');
    setEditing(false);
    setEditingIndex(null);

    RNToasty.Success({
      title: 'Category updates successfully..',
      position: 'top',
    });
  };

  const deleteUser = id => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirm = async () => {
    const del = await axios.delete(
      `http://192.168.1.60:3000/addCategory/${deleteId}`,
    );
    getData();
    setDeleteModal(false);
    RNToasty.Warn({
      title: 'Category deleted successfully..',
      position: 'top',
    });
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const userData = (
    <View>
      {asycData?.map((user, i) => (
        <View style={styles.row} key={i}>
          <Text style={styles.cell}>{i + 1}</Text>
          <Text style={styles.cell}>{user.business_category_name}</Text>
          <View
            style={[
              styles.cell,
              {flexDirection: 'row', justifyContent: 'center'},
            ]}>
            <Edit
              onPress={() => {
                setbusiness_Title(user.business_Title);
                setbusiness_Category(user.business_category_name);
                setEditing(true);
                setEditingIndex(user.id);
              }}
              name="edit"
              size={20}
              style={{marginVertical: 7}}
              color="#008080"
            />

            <Delete
              onPress={() => deleteUser(user.id)}
              name="delete"
              size={20}
              style={{marginVertical: 7}}
              color="#e60000"
            />
          </View>
        </View>
      ))}
    </View>
  );

  let date = moment().format('MMMM Do YYYY');
  return (
    <View style={{height: '100%'}}>
      <View style={styles.containerd}>

        <View style={styles.inputView}>
          <TextInput
            value={business_Category}
            style={styles.TextInput}
            placeholder="Enter business category name"
            placeholderTextColor="#003f5c"
            returnKeyType="done"
            keyboardType="numeric"
            onChangeText={text => setbusiness_Category(text)}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title={editing ? 'Update Category' : 'Add Category'}
            onPress={editing ? updateCategory : addCategory}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Sr.no</Text>
          <Text style={[styles.cell, styles.header]}>Business Category</Text>
          <Text style={[styles.cell, styles.header]}>Action</Text>
        </View>
        {loader && (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#008080" />
          </View>
        )}
        <ScrollView>{userData}</ScrollView>
      </View>

      <AlertModal
        visibility={deleteModal}
        confirm={() => {
          confirm();
        }}
        cancel={() => {
          cancel();
        }}
        title={'Are you sure you want to delete this address?'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff5e6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    alignContent: 'center',
    // color:'#fff'
  },
  cellButtons: {
    // flexDirection:'row',
    // justifyContent:'space-between'
  },
  header: {
    backgroundColor: '#c2d6d6',
    fontWeight: 'bold',
    height: 60,
  },
  noData: {
    textAlign: 'center',
    paddingVertical: 10,
  },

  containerd: {
    marginTop: 15,
  },

  inputView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  buttons: {
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  TextInput: {
    flex: 1,
  },

  saveRate: {
    width: '45%',
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007fc0',
    alignSelf: 'center',
  },

  viewRate: {
    width: '45%',
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aaff',
    alignSelf: 'center',
  },

  loginText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  box: {
    marginTop: 10,
    backgroundColor: '#ff9900',
    padding: 10,
    marginHorizontal: 20,
    elevation: 1,
    // borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
  },
});
