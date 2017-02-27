// @flow

import React, { Component, type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Toolbar from 'react-native-toolbar-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

type Props = {
  style?: any;
  header?: ReactElement;
  headerContentStyle?: any;
  title?: string;
  titleStyle?: any;
  titleContentStyle?: any;
  subTitle?: string,
  subTitleStyle?: any;
  leftItem?: Object;
  rightItem?: Object;
  children?: any,
}

const defaultProps = {
  style: null,
  header: null,
  headerContentStyle: null,
  title: null,
  titleStyle: null,
  titleContentStyle: null,
  subTitle: null,
  subTitleStyle: null,
  leftItem: null,
  rightItem: null,
  children: null,
};

class Modal extends Component {
  static defaultProps = defaultProps

  props: Props

  renderHeader() {
    if (this.props.header) {
      return this.props.header;
    }

    const {
      leftItem,
      rightItem,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      headerContentStyle,
      titleContentStyle,
    } = this.props;

    return (
      <Toolbar
        style={styles.header}
        leftItem={leftItem}
        rightItem={rightItem}
      >
        <View style={[styles.headerContent, headerContentStyle]}>
          <Text style={[styles.title, titleContentStyle]}>
            <Text style={[styles.title, titleStyle]}>
              {title}
            </Text>
            {'\n'}
            <Text style={[styles.subTitle, subTitleStyle]}>
              {subTitle}
            </Text>
          </Text>
        </View>
      </Toolbar>
    );
  }


  render() {
    const { children, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderHeader()}

        {children}
      </View>
    );
  }
}

export default Modal;
