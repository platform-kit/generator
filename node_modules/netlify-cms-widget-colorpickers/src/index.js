import controlComponent from './ColorpickersControl';
import previewComponent from './ColorpickersPreview';

const Widget = (opts = {}) => ({
  name: 'colorpickers',
  controlComponent,
  previewComponent,
  ...opts,
});

export const NetlifyCmsWidgetColorpickers = { Widget, controlComponent, previewComponent };
export default NetlifyCmsWidgetColorpickers;
