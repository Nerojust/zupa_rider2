import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Animated,
  CheckBox,
  Image,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';

export const BackViewHeader = ({
    onClose,
    backText,
    shouldDisplayLogoutIcon,
    handleLogout,
    style
  }) => {
    return (
      <View style={[styles.exitView]}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{ flex: 0.2, paddingLeft: 15 }}
        >
          <Image
            source={require('../assets/images/arrowleft1.png')}
            resizeMode={'contain'}
            style={{ width: 25, height: 18 }}
          />
        </TouchableOpacity>
        <ProductSansBold
          style={{ fontSize: 19, flex: 1.3, color: COLOURS.gray2 }}
          numberOfLines={1}
        >
          {backText}
        </ProductSansBold>
  
        <View
          style={{
            flexDirection: 'row',
            flex: 0.2,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {shouldDisplayLogoutIcon ? (
            <TouchableOpacity
              activeOpacity={0.4}
              style={style}
              onPress={handleLogout}
            >
              <Image
                source={require('../assets/images/logout.png')}
                resizeMode={'contain'}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };