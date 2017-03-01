// @flow

import React, { Component, type ReactElement } from 'react';
import { View, Navigator, StyleSheet, Dimensions, BackAndroid } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Modal from './components/Modal';

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const backIcon = require('./img/back.png');
const backIconWhite = require('./img/back_white.png');

const forwardIcon = require('./img/forward.png');
const forwardIconWhite = require('./img/forward_white.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForNoChildren: {
    flex: 1,
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  navigatorForNoChildren: {
    backgroundColor: 'transparent',
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
  show?: boolean;
  navigatorStyle?: any;
  children?: any;
  foreground?: string;
  content?: any;
  showPageControl?: boolean;
  leftItem?: Object;
  rightItem?: Object;
}

const defaultProps = {
  onShow: () => {},
  onDismiss: () => {},
  dismissOnHardwareBackPress: true,
  navigatorStyle: null,
  show: null,
  children: null,
  foreground: 'dark',
  content: null,
  showPageControl: true,
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

    BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackPressHandler);
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
    BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
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
      const { showPageControl, foreground } = this.props;

      leftItem = (showPageControl && !leftItem) ? {
        title: 'title',
        icon: foreground === 'dark' ? backIconWhite : backIcon,
        layout: 'icon',
        onPress: () => {
          this.previous();
        },
      } : leftItem;

      rightItem = (showPageControl && !rightItem) ? {
        title: 'title',
        icon: foreground === 'dark' ? forwardIconWhite : forwardIcon,
        layout: 'icon',
        onPress: () => {
          this.next();
        },
      } : rightItem;


      return (
        <Modal
          {...this.props}
          leftItem={leftItem}
          rightItem={rightItem}
        >
          {this.props.content}
        </Modal>
      );
    }

    if (this.props.children) {
      return this.props.children;
    }

    return (
      <AnimatedOverlay
        overlayShow={this.state.show}
        pointerEvents="auto"
        opacity={0.5}
        duration={500}
      />
    );
  }

  render() {
    const { navigatorStyle, children } = this.props;
    const pointerEvents = this.state.show ? 'auto' : 'none';

    let containerStyleForNoChildren = null;
    let navigatorForNoChildren = null;
    let animatedOverlay = null;

    if (!children) {
      containerStyleForNoChildren = styles.containerForNoChildren;
      navigatorForNoChildren = styles.navigatorForNoChildren;
      animatedOverlay = (
        <AnimatedOverlay
          overlayShow={this.state.show}
          opacity={1}
          duration={500}
          pointerEvents="auto"
        />
      );
    }

    return (
      <View style={[styles.container, containerStyleForNoChildren]} pointerEvents={pointerEvents}>
        {animatedOverlay}
        <Navigator
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{ show: null }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          style={[styles.navigator, navigatorForNoChildren, navigatorStyle]}
        />
      </View>
    );
  }
}

export default ModalComponent;
