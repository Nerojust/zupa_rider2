import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/theme";

/**
 * create the loading dialog for activities/components.
 * @param {loading} props
 */
const LoadingDialog = (props) => {
  const { loading } = props;

  return (
    <Modal
      transparent={true}
      animationType={"slide"}
      visible={loading}
      onRequestClose={() => {
        //console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={COLORS.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.modalBg,
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.lightGray,
    height: 70,
    width: 70,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoadingDialog;
