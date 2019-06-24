import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  BackHandler
} from "react-native";
import PropTypes from "prop-types";

const Loader = props => {
  //console.log("Props", props);
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={loading}
      onRequestClose={() => {
        props.onClose();
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size={36} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Loader;
