import React, {useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {globalColors} from '../../../theme/globalColors';

const Certificate = () => {
  const viewRef = useRef(null);

  const REMOTE_IMAGE_PATH =
    'https://homepages.cae.wisc.edu/~ece533/images/cat.png';

  // reactotron.log('View reaf', viewRef);

  const user = useSelector(state => state?.user?.data?.data?.user);

  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      captureAndDownload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          captureAndDownload();
        } else {
          // If permission denied then show alert
          // alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  // const captureAndDownload = async () => {
  //   try {
  //     const uri = await captureRef(viewRef, {
  //       format: 'jpg',
  //       quality: 1,
  //     });

  //     const {config, fs} = RNFetchBlob;
  //     let PictureDir = fs.dirs.PictureDir;
  //     let fileName = 'certificate.jpg';
  //     let path = `${PictureDir}/${fileName}`;

  //     await fs.writeFile(path, uri, 'base64');
  //     await fs.scanFile([{path: path, mime: 'image/jpeg'}]);

  //     if (Platform.OS === 'android') {
  //       let options = {
  //         fileCache: true,
  //         addAndroidDownloads: {
  //           useDownloadManager: true,
  //           notification: true,
  //           path: path,
  //           description: 'Image',
  //         },
  //       };

  //       config(options)
  //         .fetch('GET', uri)
  //         .then(res => {
  //           console.log('res -> ', JSON.stringify(res));
  //           Alert.alert('Image Downloaded Successfully:', path);
  //         })
  //         .catch(error => {
  //           console.log('Failed to download image:', error);
  //         });
  //     } else {
  //       Alert.alert('Image downloaded successfully:', path);
  //     }
  //   } catch (error) {
  //     console.log('Failed to capture and download image:', error);
  //   }
  // };

  const captureAndDownload = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 1,
      });

      const timestamp = Date.now();
      let PictureDir = RNFetchBlob.fs.dirs.PictureDir;
      let fileName = `certificate_${timestamp}.jpg`;
      let path = `${PictureDir}/${fileName}`;

      await RNFetchBlob.fs.cp(uri, path);
      await RNFetchBlob.fs.scanFile([{path: path, mime: 'image/jpeg'}]);

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Image downloaded successfully:', path);
        } else {
          Alert.alert('Permission denied. Unable to download image.');
        }
      } else {
        Alert.alert('Image downloaded successfully:', path);
      }
    } catch (error) {
      reactotron.log('Failed to capture and download image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={viewRef} style={styles.imageContainer}>
        <Image
          source={require('../../../assets/MyCertificate.png')}
          style={styles.image}
        />
        <Text style={styles.text}>{user?.name}</Text>
        <Text style={styles.text1}>
          {moment(user.created_at).format('DD-MM-YYYY')}
        </Text>
      </View>
      <TouchableOpacity onPress={checkPermission} style={styles.button}>
        <Text style={styles.buttonText}>Download Certificate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20),
  },
  imageContainer: {
    // flex: 1,
  },
  image: {
    height: 300,
    width: 400,
  },
  text: {
    position: 'absolute',
    top: 170,
    color: '#264596',
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 25,
    fontStyle: 'italic',
    fontFamily: 'cursive', // Replace with the name of your cursive font
  },
  text1: {
    position: 'absolute',
    bottom: 55,
    color: '#264596',
    alignSelf: 'center',
    left: RFValue(117),
    // marginLeft: 20,
    fontSize: 10,
    fontStyle: 'italic',
    fontFamily: 'cursive', // Replace with the name of your cursive font
  },
  button: {
    marginVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: globalColors.card,
    width: '80%',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default Certificate;
