import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ModalComponent from './src';

import Button from './Button';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 3,
  },
};

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

  renderModal() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{ color: '#000' }}>
            to save sessions to{'\n'}your schedule.
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalComponent
        ref={(modal) => { this.modal = modal; }}
        title="Title"
        showCloseButton
        content={this.renderModal()}
        leftItem={{
          title: 'CLOSE',
          layout: 'title',
          onPress: this.dismissModal,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
          <Button text="Show Modal" onPress={this.showModal} />
        </View>
      </ModalComponent>
    );
  }
}
