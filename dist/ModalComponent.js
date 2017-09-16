Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/ModalComponent.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');





var _reactNativeDeprecatedCustomComponents=require('react-native-deprecated-custom-components');
var _reactNativeToolbarComponent=require('react-native-toolbar-component');var _reactNativeToolbarComponent2=_interopRequireDefault(_reactNativeToolbarComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var BackHandler=_reactNative.BackHandler||_reactNative.BackAndroid;
var closeIcon=require('./img/x-white.png');

var HARDWARE_BACK_PRESS_EVENT='hardwareBackPress';

var styles=_reactNative.StyleSheet.create({
content:{
flex:1,
backgroundColor:'black'},

title:{
color:'white',
fontSize:12,
textAlign:'center'},

navigator:{
flex:1,
backgroundColor:'black'},

navigationBar:{
backgroundColor:'black'}});




















var defaultProps={
onShow:function onShow(){},
onDismiss:function onDismiss(){},
dismissOnHardwareBackPress:true,
title:null,
navigatorStyle:null,
modalStyle:null,
toolbarStyle:null,
show:null,
children:null,
foreground:'dark',
content:null,
showCloseButton:false,
closeButtonAlign:'left',
leftItem:null,
rightItem:null};var


ModalComponent=function(_Component){_inherits(ModalComponent,_Component);




function ModalComponent(props){_classCallCheck(this,ModalComponent);var _this=_possibleConstructorReturn(this,(ModalComponent.__proto__||Object.getPrototypeOf(ModalComponent)).call(this,
props));_this.
































hardwareBackPressHandler=function(){var
dismissOnHardwareBackPress=_this.props.dismissOnHardwareBackPress;

if(dismissOnHardwareBackPress&&_this.state.show){
_this.dismiss();
return true;
}

return false;
};_this.

show=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
_this.navigator.push({show:true,routeIndex:_this.state.index});
_this.setState({show:true});
callback();
_this.props.onShow();
};_this.

dismiss=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
_this.navigator.pop();
_this.setState({show:false});
callback();
_this.props.onDismiss();
};_this.

configureScene=function(){var
children=_this.props.children;

if(children){
return _reactNativeDeprecatedCustomComponents.Navigator.SceneConfigs.FloatFromBottom;
}

return _extends({},_reactNativeDeprecatedCustomComponents.Navigator.SceneConfigs.FloatFromBottom,{gestures:{}});
};_this.

renderScene=function(_ref){var show=_ref.show;
if(show){var _this$props=
_this.props,_leftItem=_this$props.leftItem,_rightItem=_this$props.rightItem;var _this$props2=







_this.props,_showCloseButton=_this$props2.showCloseButton,_closeButtonAlign=_this$props2.closeButtonAlign,_modalStyle=_this$props2.modalStyle,_toolbarStyle=_this$props2.toolbarStyle,_title=_this$props2.title,_content=_this$props2.content;

_leftItem=_leftItem||_showCloseButton&&_closeButtonAlign==='left'?{
title:'close',
layout:'icon',
icon:closeIcon,
onPress:function onPress(){
_this.dismiss();
}}:
null;

_rightItem=_rightItem||_showCloseButton&&_closeButtonAlign==='right'?{
title:'close',
layout:'icon',
icon:closeIcon,
onPress:function onPress(){
_this.dismiss();
}}:
null;

return(
_react2.default.createElement(_reactNative.View,{style:[styles.content,_modalStyle],__source:{fileName:_jsxFileName,lineNumber:177}},
_react2.default.createElement(_reactNativeToolbarComponent2.default,{
style:[styles.header,_toolbarStyle],
title:_title,
leftItem:_leftItem,
rightItem:_rightItem,__source:{fileName:_jsxFileName,lineNumber:178}}),


_content));


}

if(_this.props.children){
return _this.props.children;
}

return null;
};_this.state={show:null};return _this;}_createClass(ModalComponent,[{key:'componentDidMount',value:function componentDidMount(){var show=this.props.show;if(show){this.show();}BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT,this.hardwareBackPressHandler);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(this.props.show!==nextProps.show){this.setState({show:nextProps.show});if(nextProps.show){this.show();return;}this.dismiss();}}},{key:'componentWillUnmount',value:function componentWillUnmount(){BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT);}},{key:'render',value:function render()

{var _this2=this;var
navigatorStyle=this.props.navigatorStyle;

return(
_react2.default.createElement(_reactNativeDeprecatedCustomComponents.Navigator,{
ref:function ref(navigator){_this2.navigator=navigator;},
initialRoute:{show:null},
configureScene:this.configureScene,
renderScene:this.renderScene,
style:[styles.navigator,navigatorStyle],__source:{fileName:_jsxFileName,lineNumber:201}}));


}}]);return ModalComponent;}(_react.Component);ModalComponent.defaultProps=defaultProps;exports.default=


ModalComponent;