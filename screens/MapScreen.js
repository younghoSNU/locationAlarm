import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions'; // * as actions is required
import LoadingScreen from './LoadingScreen';

class MapScreen extends Component {
  static navigationOptions = {
   header: null,
  };

  componentDidUpdate() {
    //done
    console.log(this.props);
    if(this.props.targetContent.setting.error[0]) {
      console.log('alert works!');
      Alert.alert(
        '에러발생' + this.props.targetContent.setting.error[1],
        '지도를 다시 움직여주세요',
        [{text: '확인', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      );
      this.props.fixError();
    }
  }

  state = {
    address: '',
    activityIndicatorVisible: false,
    region: {},
    regionSearching: false,
    regionChange: false,
    modalVisible: false,
    firstMove: false,
  };


  onSubmitEditing = () => {
    this.setState(prevState => {
      return { regionChange: false };
    }, () => {
      this.props.updateModalVisible();
      this.props.getGeocode(this.state.address);
    });
  };

  updatingLocation = () => {
    const { lat, lng, latD, lngD } = this.props.targetContent.location;
    console.log(lat + '업뎃');
    console.log('this.state.regionChange: ' + this.state.regionChange);
    const { region } = this.state;

    return (
      <MapView
        style={styles.mapContainer}
        region={(this.state.regionChange ? null : {
            latitude: lat,
            longitude: lng,
            latitudeDelta: latD,
            longitudeDelta: lngD,
          }
        )}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
      >
      </MapView>
    );
  };

  onRegionChangeComplete = (region) => {
    /*console.log('at complete, this.state.regionChange: ' + this.state.regionChange);*/
    (this.state.regionChange &&       this.props.updateModalVisible());
    (this.state.regionChange && this.props.getAddress(region));//only for drag map

  };

  onRegionChange = () => {
    this.setState(prevState => {
      return { regionChange: true };
    });
  };

  render() {
    //const { lat, lng } = this.props.location;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <LoadingScreen
          modalVisible={this.props.targetContent.setting.modalVisible} // from store content
          backgroundColor='rgba(0, 0, 0, 0.4)'
        />
        {this.updatingLocation()}
        <View style={styles.searchBar}>
          <TextInput
            placeholderTextColor='black'
            placeholder={' 검색할 위치를 입력하세요'}
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
            onSubmitEditing={this.onSubmitEditing}
          />
        </View>
        <View style={styles.showAddress}>
          <Text style={styles.addressText}>{this.props.targetContent.formatted_address}</Text>
        </View>
        <View style={styles.marker}>
          <Icon
            name='place'
            size={40}
          />
        </View>
        <View style={styles.selectLocationButton}>
          <Button
            raised
            title='선택완료'
            icon={{ name: 'done' }}
            onPress={() => {
              this.props.fixMapSize();
              this.props.navigation.navigate('Making');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps({ content }) {
  const targetContent = content[content.length - 1];
  console.log("\n\n\n\n"+JSON.stringify(content)+"\n\n\n\n");
  return { targetContent };
}



export default connect(mapStateToProps, actions)(MapScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 50,
    right: '10%',
    left: '10%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  showAddress: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    bottom: 100,
    left: '10%',
    right: '10%',
    borderRadius: 5,
  },
  addressText: {
    fontSize: 20,
    fontWeight: '300',
  },
  selectLocationButton: {
    position: 'absolute',
    bottom: 50,
    right: '10%',
    left: '10%',
  },
  marker: {
    height: 40,
     width: 40,
     position: 'absolute',
     left: '50%',
     marginLeft: -20,
     bottom: '50%',
   },
   h1: {
     fontFamily: 'Roboto',
     fontSize: 30,
     color: 'blue',
   },
});
