import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

const { width, height } = Dimensions.get('window');

class MakingScreen extends Component {
  state = {
    todo: '',
    address: '',
  }

  onSubmitTodo = () => {
    this.props.updateTodo(this.state.todo);
  };

  onSubmitLocation = () => {
    this.props.updateFormattedAddress(this.state.address);
  }



  render() {
    const { location, setting } = this.props.targetContent;


    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <MapView
          scrollEnabled={false}
          style={{ flex: 0.5 }}
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: location.latD,
            longitudeDelta: location.lngD,
          }}
          cacheEnabled={Platform.OS === 'android' ? true : false}
        >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
        <Circle
          center={{
            latitude: location.lat,
            longitude: location.lng,
          }}
          radius={setting.radius}
          strokeColor='#01579B'
          fillColor='#01579B66'
        />
        </MapView>
        <ScrollView style={styles.formContainer}>
            <View>
            <FormLabel>위치</FormLabel>
            <FormInput
              placeholder={this.props.targetContent.formatted_address}
              underlineColorAndroid='gray'
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
              onSubmitEditing={this.onSubmitLocation}
            />
          </View>
          <View>
            <FormLabel>할 일, 약속, 도착장소...</FormLabel>
            <FormInput
              underlineColorAndroid='gray'
              placeholder='할일을 입력하세요'
              onChangeText={(todo) => this.setState({ todo })}
              value={this.state.todo}
              onSubmitEditing={this.onSubmitTodo}
            />
          </View>
        </ScrollView>
        <Button
          raised
          title='생성하기'
          icon={{ name: 'done' }}
          onPress={() => {
            this.props.contentCreated();
            this.props.navigation.navigate('MainRoute')}}
          containerViewStyle={styles.updateButton}
        />
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps({ content }) {
  const targetContent = content[content.length - 1];
  return { targetContent };
}

export default connect(mapStateToProps, actions)(MakingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapMarker: {
    position: 'absolute',
    right: '10%',
    left: '10%',
    bottom: 0.65 * height,
  },
  formContainer: {
    flex: 0.5,
  },
  updateButton: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    left: '5%',
  },
});
