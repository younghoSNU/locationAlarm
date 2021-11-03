import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';

export default class AbsoluteView extends Component {
  render() {
    const { left, right, bottom, top, height, width, backgroundColor } = this.props;

    return (
      <View style={[styles.container, {
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        height: height,
        width: width,
        backgroundColor: backgroundColor
      }]}/>
    );
  }
}

AbsoluteView.defaultProps = {
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 250, 250)',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
