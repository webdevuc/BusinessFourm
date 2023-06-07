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
  TouchableOpacity,
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
import {globalColors} from '../../../theme/globalColors';
import {RFValue} from 'react-native-responsive-fontsize';
import DeleteModal from '../../../Components/Common/DeleteModal';

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
              Authorization: `Bearer ${userRes}`,
            },
          },
        );

        getData();
        setbusiness_Title('');
        setbusiness_Category('');
        RNToasty.Success({
          title: 'Category saves successfully..',
          position: 'bottom',
        });
      } else {
        RNToasty.Error({
          title: 'Please enter category name',
          position: 'bottom',
        });
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
          Authorization: `Bearer ${userRes}`,
        },
      },
    );

    getData();
    setbusiness_Title('');
    setbusiness_Category('');
    setEditing(false);
    setEditingIndex(null);

    RNToasty.Success({
      title: 'Category updates successfully.',
      position: 'bottom',
    });
  };

  const deleteUser = id => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirm = async () => {
    const res = await axios.post(
      `https://ibf.instantbusinesslistings.com/api/business_category/${deleteId}/delete`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userRes}`,
        },
      },
    );
    setDeleteModal(false);

    if (res.status == 200) {
      RNToasty.Success({
        title: res.data.message,
        position: 'bottom',
      });
    }
    await getData();
  };

  const cancel = () => {
    setDeleteModal(false);
  };

  const userData = (
    <View>
      {asycData?.map((user, i) => (
        <View style={styles.row} key={i}>
          <Text style={styles.cell}>{i + 1}</Text>
          <Text numberOfLines={2} style={styles.cell}>
            {user.business_category_name}
          </Text>
          <View
            style={[
              styles.cell,
              {flexDirection: 'row', justifyContent: 'flex-start', gap: 15},
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
              color={globalColors.card}
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
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <View style={styles.containerd}>
        <View style={styles.inputView}>
          <TextInput
            value={business_Category}
            style={styles.TextInput}
            placeholder="Enter business category name"
            placeholderTextColor={globalColors.grey}
            returnKeyType="done"
            onChangeText={text => setbusiness_Category(text)}
          />
        </View>

        <TouchableOpacity onPress={editing ? updateCategory : addCategory}>
          <View style={styles.buttons}>
            <Text style={{color: globalColors.white, fontSize: RFValue(15)}}>
              {editing ? 'Update Category' : ' + Add Category'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Sr.no</Text>
          <Text style={[styles.cell, styles.header]}>Category</Text>
          <Text style={[styles.cell, styles.header]}>Action</Text>
        </View>
        {loader && (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={globalColors.card} />
          </View>
        )}
        <ScrollView>{userData}</ScrollView>
      </View>

      <DeleteModal
        visibility={deleteModal}
        confirm={() => {
          confirm();
        }}
        cancel={() => {
          cancel();
        }}
        title={'Are you sure you want to delete category?'}
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
    paddingHorizontal: 5,
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
    // textAlign: 'center',
    paddingLeft: RFValue(15),
    fontSize: 16,
    alignContent: 'center',
    // color:'#fff'
  },
  cellButtons: {
    // flexDirection:'row',
    // justifyContent:'space-between'
  },
  header: {
    backgroundColor: globalColors.card,
    fontWeight: 'bold',
    color: '#fff',
  },
  noData: {
    textAlign: 'center',
    paddingVertical: 10,
  },

  containerd: {
    marginTop: 15,
  },

  inputView: {
    borderWidth: 1,
    borderColor: globalColors.grey,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },

  buttons: {
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: globalColors.card,
    alignItems: 'center',
    marginLeft: RFValue(10),
    padding: RFValue(10),
    // flex: 1,
  },

  TextInput: {
    flex: 1,
    padding: RFValue(8),
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
