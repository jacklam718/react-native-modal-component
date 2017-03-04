// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ModalComponent from './ModalComponent';

class ModalManager {
  constructor() {
    this.modals = [];
  }

  get currentModal() {
    return this.modals[this.modals.length - 1];
  }

  add(props, callback): void {
    const modal = new RootSiblings(
      <ModalComponent
        {...props}
      />,
      callback,
    );

    this.modals.push(modal);
  }

  update = (props: Object, callback?: Function = () => {}): void => {
    this.currentModal.update(
      <ModalComponent
        {...props}
      />,
      callback,
    );
  }


  show = (props: Object, callback?: Function = () => {}) : void => {
    this.add({ ...props, show: true }, callback);
  }

  dismiss = (callback?: Function = () => {}): void => {
    this.update({ show: false }, callback);
  }
}

export default ModalManager;
