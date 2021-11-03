import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';

import IntroduceSlides from '../components/IntroduceSlides';

const INTRODUCE_CONTENTS = [
  {text: '만든이유why: 시간에 따른 일, 장소에 따른 일들도 많아', color: 'crimson'},
  {text: '지도에 표시', color: 'green'},
  {text: '환경설정', color: 'yellow'},
  {text: '사용중 불편한 사항은 최대한 빨리 수정하겠다', color: 'crimson'},
];

class IntroduceScreen extends Component {
  enterMainScreen = () => {
    const { navigation } = this.props;

    if (this.props.updateGlobalSetting.introduce_screen_checkbox) {
      this.props.off_introduction_screen();
    }
    navigation.navigate('Main');
  };

  render() {
    return (
      <View style={styles.container}>
        <IntroduceSlides
          data={INTRODUCE_CONTENTS}
          renderMainScreen={this.enterMainScreen}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state.userSetting;
}

export default connect(mapStateToProps, actions)(IntroduceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
