import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utils/theme";

/**
 * create the loading dialog for activities/components.
 * @param {loading} props
 */
const LoadingDialog = ({ loading, message }) => {
  return (
    <Modal
      transparent={true}
      animationType={"fade"}
      visible={loading}
      onRequestClose={() => {
        //console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="small"
            color={COLORS.blue}
          />
        </View>
        <Text style={{ marginTop: 15, color: COLORS.white, fontSize: 12 }}>
          {message}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //justifyContent: "space-around",
    backgroundColor: COLORS.modalBg,
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.white,
    height: 65,
    width: 65,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoadingDialog;
