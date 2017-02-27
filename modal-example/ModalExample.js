import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import Modal from './src/ModalComponent';
import Button from './Button';

const { width, height } = Dimensions.get('window');

export default class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.modal.show();
  }

  dismissModal = () => {
    this.modal.dismiss();
  }

  renderModals() {
    const modals = [];
    for (let i = 0; i < 5; i += 1) {
      modals.push(
        <View index={i} style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ padding: 30, backgroundColor: '#fff', height: undefined, width: undefined }}>
            <Text style={{ color: '#000' }}>
              to save sessions to{'\n'}your schedule. index - {i}
            </Text>
          </View>
        </View>,
      );
    }
    return modals;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          ref={(modal) => { this.modal = modal; }}
          modals={this.renderModals()}
          index={0}
          leftItem={{
            title: 'CLOSE',
            layout: 'title',
            onPress: this.dismissModal,
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', padding: 20 }}>
            <Button text="Show Modal" onPress={this.showModal} />
          </View>
        </Modal>
      </View>
    );
  }
}
