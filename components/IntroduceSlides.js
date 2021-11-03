import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import {connect} from 'react-redux';

import * as actions from '../actions';

const { width, height } = Dimensions.get('window');

class IntroduceSlides extends Component {

  constructor(props) {
    super(props);
    this.ScrollView = React.createRef();
  }

  // componentDidMount() {
  //   if (this.props.onRef != null) {
  //       this.props.onRef(this)
  //   }
  // }

  renderMainScreen = (i = null) => {
    const { renderMainScreen } = this.props;

    renderMainScreen();
  };

  renderSlides = () => {
    const { data } = this.props;

    // console.log(`\n\n\n\n\n\n\n\n${JSON.stringify(this.props,null,4)}\n\n\n\n\n\n\n`);

    if (this.props.updateGlobalSetting.introduce_screen_checkbox)
      console.log('scrollview', this.ScrollView);
      // this.ScrollView.ScrollToEnd({animated: true});

    return data.map((slide, index) => {
      return (
        <View
          key={index}
          style={[styles.slideContainer, {backgroundColor: slide.color}]}
        >
          <View style={styles.slideCotent}>
            <Text >{slide.text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {index === 3 && (
              <Button
                raised
                icon={{name: 'rocket', type: 'material-community'}}
                title='시작하기'
                borderRadius={15}
                borderWidth={3}
                borderColor={'yellow'}
                backgroundColor={'blue'}
                onPress={this.renderMainScreen}
              />
            )}
          </View>
          <View>
            {index == 3 && <CheckBox
              title="튜토리얼 다시 보지 않기!"
              checked={this.props.updateGlobalSetting.introduce_screen_checkbox}
              onIconPress={() => {
                this.props.on_click_introduce_screen_checkbox();
              }}
            />}
          </View>
          <View style={{flex:0.15}}>
            <View style={styles.stonesContainer}>
              <View style={[styles.stone, (index === 0) && {backgroundColor: 'black'}]}/>
              <View style={[styles.stone, (index === 1) && {backgroundColor: 'black'}]}/>
              <View style={[styles.stone, (index === 2) && {backgroundColor: 'black'}]}/>
              <View style={[styles.stone, (index === 3) && {backgroundColor: 'black'}]}/>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {

    return (
      <View style={{flex: 1}}>
        <ScrollView
          ref={ref => {
            console.log(this.ScrollView);
            this.ScrollView = ref}}
          style={styles.container}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {this.renderSlides()}
          {console.log('scrollview1111', this.ScrollView)}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state.userSetting;
}

export default connect(mapStateToProps, actions)(IntroduceSlides);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  slideContainer: {
    width: width,
  },
  slideCotent: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 30,
    marginHorizontal: 70
  },
  stonesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stone: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderRadius: 2,
    margin: 5,
  },
});
