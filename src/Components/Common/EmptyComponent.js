import React from 'react';
import {Text, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {globalColors} from '../../theme/globalColors';

const EmptyComponent = ({title}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        paddingTop: RFPercentage(20),
      }}>
      <Text
        style={{
          fontSize: RFValue(16),
          // fontFamily: globalFonts.semibold,
          textAlign: 'center',
          color: globalColors.card,
          paddingTop: RFPercentage(2),
        }}>
        {title}
      </Text>
    </View>
  );
};
export default EmptyComponent;
