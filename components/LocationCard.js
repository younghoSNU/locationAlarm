import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import MapView, { Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';

class LocationCard extends Component {
  render() {
    // console.log(`\n\n\nlocationCard${JSON.stringify(this.props,null,4)}\n\n\n\n`)

    const targetContent = this.props.contentsList.find(content => content.id === this.props.id);
    const {lat, lng, latD, lngD} = targetContent.location;
    const {title, radius, formatted_address} = targetContent;

    return (
      <Card containerStyle={styles.card}>
        <View style={{ height: 200 }}>
          <MapView
            showUserLocation
            followUserLocation
            zoomEnabled={false}
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: latD,
              longitudeDelta: lngD,
            }}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lng,
              }}
            />
            <Circle
              center={{
                latitude: lat,
                longitude: lng,
              }}
              radius={radius}
              strokeColor='#01579B'
              fillColor='#01579B66'
            />
          </MapView>
        </View>
        <View style={{flexDirection: 'row', height: 100}}>
          <View style={{flex: 0.9, justifyContent: 'space-around', marginHorizontal: '5%'}}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>{title}</Text>
            <Text style={{fontSize: 8, fontStyle: 'italic'}}>{formatted_address}</Text>
          </View>
          <View style={{borderWidth: 0.3, marginVertical: '1%', borderColor: '#BDBDBD'}}/>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <Icon
              name='settings'
              containerStyle={{marginVertical: 10}}
              onPress={this.props.onPressSetting}
            />
          </View>
        </View>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  // console.log({...state, ...props});
  return state;
}

export default connect(mapStateToProps)(LocationCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
