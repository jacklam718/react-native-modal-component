import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ModalComponent } from 'react-native-modal-component';

import Button from './Button';

const { width, height } = Dimensions.get('window');

export default class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  showModal = () => {
    this.modal.show();
  }

  dismissModal = () => {
    this.modal.dismiss();
  }

  renderModalContent() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <View style={{ padding: 30, backgroundColor: '#fff', height: undefined, width: undefined }}>
          <Text style={{ color: '#000' }}>
            React Native Modal Component
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalComponent ref={(modal) => { this.modal = modal; }} content={this.renderModalContent()}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
          <Button text="Show Modal" onPress={this.showModal} />
        </View>
      </ModalComponent>
    );
  }
}
