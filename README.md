# React Native Modal Component
React Native Modal Component for iOS & Android.

Pull request are welcomed. Please follow the Airbnb style guide [Airbnb JavaScript](https://github.com/airbnb/javascript)

[Try it with Exponent](https://exp.host/@jacklam718/modal-example)

<!-- <img src="https://raw.githubusercontent.com/jacklam718/react-native-modal-component/master/.github/modal-demo.png" width="250"> -->

<img src="https://raw.githubusercontent.com/jacklam718/react-native-modal-component/master/.github/modal-demo.gif" width="250">

## Installation
##### yarn
`yarn add react-native-modal-component`
##### npm
`npm install --save react-native-modal-component`

## peerDependencies
* react-native-deprecated-custom-components >= ^0.1.1

## Usage with ModalComponent
```javascript
import { View, Text, TouchableOpacity } from 'react-native';
import ModalComponent from 'react-native-modal-component';
```

##### Modal content
```javascript
const content = (
  <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <View style={{ padding: 30, backgroundColor: '#fff', height: undefined, width: undefined }}>
      <Text style={{ color: '#000' }}>
        React Native Modal Component{'\n'}
      </Text>
    </View>
  </View>
);
```

```javascript
<ModalComponent
  ref={(modal) => { this.modal = modal; }}
  content={content}
  dismissOnHardwareBackPress
  showCloseButton={false}
  leftItem={{
    title: 'CLOSE',
    layout: 'title',
    onPress: () => {
      this.modal.dismiss(() => {
        console.log('callback');
      });
    },
  }}
>
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <TouchableOpacity onPress={() => { this.modal.show(); }} >
      <Text>Show Modal</Text>
    </TouchableOpacity>
  </View>
</ModalComponent>
```
