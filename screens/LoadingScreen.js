import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';

export default class LodaingScreen extends Component {

  //modalVisible, backgroundColor, indicatorSize = this.props
  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => {}}
      >
        <View style={[styles.modalContainer, {backgroundColor: this.props.backgroundColor}]}>
          <ActivityIndicator
            size='large'
            color='black'
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
