// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackAndroid as RNBackAndroid,
  BackHandler as RNBackHandler,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Toolbar from 'react-native-toolbar-component';

const BackHandler = RNBackHandler || RNBackAndroid;
const closeIcon = require('./img/x-white.png');

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  navigator: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigationBar: {
    backgroundColor: 'black',
  },
});

type Props = {
  onShow?: () => void;
  onDismiss?: () => void;
  dismissOnHardwareBackPress?: boolean;
  title? :any;
  show?: boolean;
  navigatorStyle?: any;
  modalStyle?: any;
  toolbarStyle?: any;
  children?: any;
  content?: any;
  showCloseButton?: boolean;
  closeButtonAlign?: 'left' | 'right';
  leftItem?: Object;
  rightItem?: Object;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
  dismissOnHardwareBackPress: true,
  title: null,
  navigatorStyle: null,
  modalStyle: null,
  toolbarStyle: null,
  show: null,
  children: null,
  foreground: 'dark',
  content: null,
  showCloseButton: false,
  closeButtonAlign: 'left',
  leftItem: null,
  rightItem: null,
};

class ModalComponent extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    this.state = {
      show: null,
    };
  }

  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.show();
    }

    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackPressHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({ show: nextProps.show });

      if (nextProps.show) {
        this.show();
        return;
      }
      this.dismiss();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
  }

  hardwareBackPressHandler = (): boolean => {
    const { dismissOnHardwareBackPress } = this.props;

    if (dismissOnHardwareBackPress && this.state.show) {
      this.dismiss();
      return true;
    }

    return false;
  }

  show = (callback?: Function = () => {}): void => {
    this.navigator.push({ show: true, routeIndex: this.state.index });
    this.setState({ show: true });
    callback();
    this.props.onShow();
  }

  dismiss = (callback?: Function = () => {}): void => {
    this.navigator.pop();
    this.setState({ show: false });
    callback();
    this.props.onDismiss();
  }

  configureScene = (): Object => {
    const { children } = this.props;

    if (children) {
      return Navigator.SceneConfigs.FloatFromBottom;
    }

    return { ...Navigator.SceneConfigs.FloatFromBottom, gestures: {} };
  }

  renderScene = ({ show }) => {
    if (show) {
      let { leftItem, rightItem } = this.props;
      const {
        showCloseButton,
        closeButtonAlign,
        modalStyle,
        toolbarStyle,
        title,
        content,
      } = this.props;

      leftItem = leftItem || (showCloseButton && closeButtonAlign === 'left') ? {
        title: 'close',
        layout: 'icon',
        icon: closeIcon,
        onPress: () => {
          this.dismiss();
        },
      } : null;

      rightItem = rightItem || (showCloseButton && closeButtonAlign === 'right') ? {
        title: 'close',
        layout: 'icon',
        icon: closeIcon,
        onPress: () => {
          this.dismiss();
        },
      } : null;

      return (
        <View style={[styles.content, modalStyle]}>
          <Toolbar
            style={[styles.header, toolbarStyle]}
            title={title}
            leftItem={leftItem}
            rightItem={rightItem}
          />

          {content}
        </View>
      );
    }

    if (this.props.children) {
      return this.props.children;
    }

    return null;
  }

  render() {
    const { navigatorStyle } = this.props;

    return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        initialRoute={{ show: null }}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        style={[styles.navigator, navigatorStyle]}
      />
    );
  }
}

export default ModalComponent;
