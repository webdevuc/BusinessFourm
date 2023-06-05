import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import back from '../../assets/backArrow.png';
import {globalColors} from '../../theme/globalColors';

export function Header(props) {
  const {
    title,
    toggle,
    backEnable,
    navProps,
    searchEnabled,
    searchedTerm,
    tabChanged,
  } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    navProps &&
      navProps.navigation.addListener('focus', () => {
        setSelectedTab(0);
      });
  }, []);

  return (
    <View
      style={{
        height: toggle || searchEnabled ? RFPercentage(18) : RFPercentage(10),
        backgroundColor: globalColors.card,
        borderBottomRightRadius: RFValue(15),
        borderBottomLeftRadius: RFValue(15),
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      {backEnable && (
        <Pressable
          onPress={() => {
            navProps && navProps.navigation && navProps.navigation.goBack();
          }}
          style={styles.backButton}>
          <Image
            style={styles.backImage}
            source={back}
            resizeMode={'contain'}
          />
        </Pressable>
      )}
      <Text
        style={[
          styles.title,
          {
            paddingBottom: toggle ? RFValue(10) : 0,
          },
        ]}>
        {title}
      </Text>

      {toggle && (
        <View
          style={{
            height: RFPercentage(6),
            width: '90%',
            alignSelf: 'center',
            borderRadius: RFValue(10),
            backgroundColor: globalColors.shadedPrimary,
            flexDirection: 'row',
          }}>
          <Pressable
            onPress={() => {
              setSelectedTab(0);
              tabChanged(0);
            }}
            style={{
              flex: 0.5,
              borderRadius: RFValue(10),
              backgroundColor:
                selectedTab == 0
                  ? globalColors.white
                  : globalColors.shadedPrimary,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: RFValue(3),
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                // fontFamily: globalFonts.regular,
                color:
                  selectedTab == 0
                    ? globalColors.primaryTheme
                    : globalColors.white,
              }}>
              Requested
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTab(1);
              tabChanged(1);
            }}
            style={{
              flex: 0.5,
              borderRadius: RFValue(10),
              backgroundColor:
                selectedTab == 1
                  ? globalColors.white
                  : globalColors.shadedPrimary,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: RFValue(3),
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                // fontFamily: globalFonts.regular,
                color:
                  selectedTab == 1
                    ? globalColors.primaryTheme
                    : globalColors.white,
              }}>
              Completed
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: RFValue(30),
    width: RFValue(30),
    borderRadius: RFValue(10),
    // backgroundColor: globalColors.shadedPrimary,
    borderWidth: 0,
    // borderColor: 'white',
    margin: RFValue(20),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {height: RFValue(30), width: RFValue(30)},
  title: {
    // fontFamily: globalFonts.semibold,
    fontSize: RFValue(20),
    color: globalColors.white,
  },
});
