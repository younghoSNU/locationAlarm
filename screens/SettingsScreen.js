import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import MapView, { Circle, Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import * as actions from '../actions';
import LocationCard from '../components/LocationCard';

class Border extends Component {
  render() {
    return (
      <View style={{ borderWidth: 1 }}/>
    );
  }
}

class HaveSwitchList extends Component {
  render() {
    const { text } = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <Text>{text}</Text>
        <Switch/>
      </View>
    );
  }
}

class SelectedShowList extends Component {
  render() {
    const { onPress, text, selected } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
      >
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <Text>{text}</Text>
          <Text>{selected}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class SettingsScreen extends Component {
  state = {
    expandAlarmSettings: false,
    modalVisible: false,
  }

  render() {
    // console.log(`\n\n\n\n\n\n target contents ${JSON.stringify(this.props, null, 4)}\n\n\n\n\n\n\n`)
    const targetContent = this.props.contentsList.find(content => content.id === this.props.temporaryClicked.setting_id);

    const { lat, lng, latD, lngD } = targetContent.location;
    const  { radius } = targetContent;
    const  { formatted_address, title, id } = targetContent;

    return (
    <View style={styles.container}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({
                modalVisible: false,
              });
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}
            >
              <View
                style={{
                  width: '90%',
                  height: '90%',
                  backgroundColor: 'crimson',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 50}}>Hello World!</Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        <LocationCard
          id={id}
        />
        {/*<Card
          containerStyle={styles.card}
        >
          <View style={{ height: 150 }}>
            <MapView
              showUserLocation
              followUserLocation
              zoomEnabled={false}
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android' ? true : false}
              region={{
                latitude: 36.7897823,
                longitude: 127.015206,
                latitudeDelta: 0.009,
                longitudeDelta: 0.008,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 36.7897823,
                  longitude: 127.015206,
                }}
              />
              <Circle
                center={{
                  latitude: 36.7897823,
                  longitude: 127.015206,
                }}
                radius={400}
                strokeColor='#01579B'
                fillColor='#01579B66'
              />
            </MapView>
          </View>
          <View style={{flexDirection: 'row', height: 80}}>
            <View style={{flex: 1, justifyContent: 'space-around', marginHorizontal: '5%'}}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>카페 리베에서 연유아이스크림 사가기</Text>
              <Text style={{fontSize: 8, fontStyle: 'italic'}}>충청남도 아산시 1656...</Text>
            </View>
          </View>
        </Card>*/}
        <ScrollView
          style={{marginVertical: 20}}
          contentContainerStyle={{marginVertical: 20, marginHorizontal: '3%', paddingBottom: 20}}
        >
          <View style={{ height: 20, borderWidth: 1}}>
            <Text>알림범위</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 20, marginVertical: 15, marginHorizontal: 10}}>
            <Button
              raised
              title='100M'
              buttonStyle={{height: 30, width: 70}}
            />
            <Button
              raised
              title='500M'
              buttonStyle={{height: 30, width: 70}}
            />
            <Button
              raised
              title='1000M'
              buttonStyle={{height: 30, width: 70}}
            />
            <Button
              raised
              title='2000M'
              buttonStyle={{height: 30, width: 70}}
            />
          </View>
          <Border/>
          <HaveSwitchList text='반복'/>
          <Border/>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 5
          }}>
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='월'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='화'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='수'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='목'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='금'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='토'
            />
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              title='일'
            />
          </View>
          <Border/>
          <TouchableOpacity
            onPress={() => this.setState({ expandAlarmSettings: !this.state.expandAlarmSettings })}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                backgroundColor: '#01579B66',
              }}
            >
              <Text>알림</Text>
              <Icon
                name='expand-more'
              />
            </View>
          </TouchableOpacity>
          <Border/>
          { this.state.expandAlarmSettings && (
            <View>
              <HaveSwitchList text='소리'/>
              <Border/>
              <SelectedShowList
                text='알림음'
                selected='반짝반짝'
                onPress={() => this.setState({ modalVisible: true })}
              />
              <Border/>
              <HaveSwitchList text='벨소리알림'/>
              <Border/>
              <SelectedShowList
                text='알림음'
                selected='반짝반짝'
                onPress={() => this.setState({ modalVisible: true })}
              />
              <Border/>
              <HaveSwitchList text='진동'/>
              <Border/>
              <HaveSwitchList text='진동반복'/>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps, actions)(SettingsScreen);

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
