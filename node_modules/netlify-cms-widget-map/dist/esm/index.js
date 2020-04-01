"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetMap = void 0;

var _withMapControl = _interopRequireDefault(require("./withMapControl"));

var _MapPreview = _interopRequireDefault(require("./MapPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const controlComponent = (0, _withMapControl.default)();

const Widget = function Widget() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    name: 'map',
    controlComponent,
    previewComponent: _MapPreview.default
  }, opts);
};

const NetlifyCmsWidgetMap = {
  Widget,
  controlComponent,
  previewComponent: _MapPreview.default
};
exports.NetlifyCmsWidgetMap = NetlifyCmsWidgetMap;
var _default = NetlifyCmsWidgetMap;
exports.default = _default;