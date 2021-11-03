import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Button, Icon, Card, Divider } from 'react-native-elements';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import * as actions from '../actions'; // * as actions is required
import LocationCard from '../components/LocationCard';
import store from '../store';
import { persistStore } from 'redux-persist';

const BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const {height, width} = Dimensions.get('window');
const persistor = persistStore(store);

class MainScreen extends Component {
  state = {
    errorMessage: '',
    text: '',
    location: {},
  }

  componentDidMount() {
    this.getLocationAsync();
    setTestDeviceIDAsync('EMULATOR');
  }

  //handle location update and fail
  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if( status !== 'granted') {
        this.setState({
          errorMessage: '위치 정보가 허용되지 않았습니다.'
        });
        Alert.alert(
          '위치 정보 사용이 거부되습니다. 앱을 사용하기 위해서는 위치 정보 사용이 필요합니다.',
          null,
          [
            { text: '확인'}
          ]
        );
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });

      this.setState({ location });
      console.log('location of getLocationAsync');
      console.log(location);
    } catch(e) {
      /*Alert.alert(
        '위치 정보 사용을 켜주세요',
        null,
        [
          { text: '확인'}
        ]
      );*/
    }

    /*if (await Location.hasServicesEnabledAsync()) {
      console.log('success');
    }*/
    //only react when gps on before app on


  };

  mappingCard = () => {
    // console.log("\n\n\n\nthis props");
    // console.log(this.props);
    // console.log(this.props.contentsList)
    const contentsList = this.props.contentsList;

    return contentsList.map(content => {
      const {id} = content;
      console.log('LocationCard component in MainScreen', id);
      return (
        <LocationCard
          key={id}
          id={id}
          onPressSetting={() => {
              this.props.selectSettingId(id);
              this.props.navigation.navigate(
              'Setting',
              { key: id }
            );
          }}
        />
      );
    });
  };


  onPressAdd = () => {
    // this.props.createContent(() => {
    //   this.props.navigation.navigate('Map')
    // });
    persistor.purge();
  };

  render() {
    //dispatch가 꼭 있어야 하
    // const dispatch = this.props.dispatch;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
          {this.mappingCard()}
        </ScrollView>
        <View style={{height: 60, justifyContent: 'flex-end', backgroundColor: 'yellow'}}>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={BANNER_ID} // Test ID, Replace with your-admob-unit-id and replace it with AdMob.js component
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        </View>
        <Icon
          name='add'
          raised
          size={30}
          containerStyle={styles.plusButton}
          backgroundColor='crimson'
          iconStyle={{color: 'white'}}
          onPress={this.onPressAdd}
        />
      </View>
    );
  }
}

function mapStateToProps(content) {
  return content;
}

export default connect(mapStateToProps, actions)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 50,
    backgroundColor: 'crimson',
    borderRadius: 100,
  },
  card: {
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
