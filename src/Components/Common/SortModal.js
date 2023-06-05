// import {colors, fonts, moderateScale} from 'constants/common/theme';
import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {globalColors} from '../../theme/globalColors';
const SortModal = props => {
  const {visibility, close, selectedSort, setSelected} = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}>
      <View style={styles.body}>
        <View style={styles.whiteBody}>
          <Text
            onPress={() => {
              setSelected(0), close();
            }}
            style={{
              // fontFamily: selectedSort == 0 ? globalFonts.bold : globalFonts.regular,
              fontSize: RFValue(14),
              color:
                selectedSort == 0
                  ? globalColors.primaryTheme
                  : globalColors.grey,
            }}>
            Ascending
          </Text>
          <Text
            onPress={() => {
              setSelected(1), close();
            }}
            style={{
              // fontFamily: selectedSort == 1 ? globalFonts.bold : globalFonts.regular,
              fontSize: RFValue(14),
              color:
                selectedSort == 1
                  ? globalColors.primaryTheme
                  : globalColors.grey,
            }}>
            Descending
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#0009',
  },
  modal: {
    height: 180,
    width: 300,
    borderRadius: 10,
    backgroundColor: globalColors.white,
    borderWidth: 2,
    borderColor: 'white',
  },
  whiteBody: {
    height: RFValue(80),
    width: RFValue(120),
    borderTopLeftRadius: RFValue(15),
    borderBottomLeftRadius: RFValue(15),
    borderBottomRightRadius: RFValue(15),

    backgroundColor: globalColors.white,
    top: RFValue(105),
    right: RFValue(25),

    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default SortModal;
