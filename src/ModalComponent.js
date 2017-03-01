// @flow

import React, { Component, type ReactElement } from 'react';
import { View, Navigator, StyleSheet, Dimensions, BackAndroid } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Modal from './components/Modal';

const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

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
  navigatorStyle: null,
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

  configureScene = (route, routeStack): Object => {
    const { children } = this.props;

    if (children) {
      return Navigator.SceneConfigs.FloatFromBottom;
    }

    return { ...Navigator.SceneConfigs.FloatFromBottom, gestures: {} };
  }

  renderScene = ({ show }) => {
    if (show) {
      let { leftItem, rightItem } = this.props;
      const { showCloseButton, closeButtonAlign } = this.props;

      leftItem = leftItem || (showCloseButton && closeButtonAlign === 'left') && {
        title: 'close',
        layout: 'icon',
        icon: require('./img/x-white.png'),
        onPress: () => {
          this.dismiss();
        },
      };


      rightItem = rightItem || (showCloseButton && closeButtonAlign === 'right') && {
        title: 'close',
        layout: 'icon',
        icon: require('./img/x-white.png'),
        onPress: () => {
          this.dismiss();
        },
      };

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

    let containerStyleForNoChildren = null;
    let navigatorForNoChildren = null;
    let animatedOverlay = null;

    // const pointerEvents = this.state.show && children ? 'auto' : 'none';

    const pointerEvents = this.state.show || children ? 'auto' : 'none';

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
