import React from 'react';
import PropTypes from 'prop-types';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

const ColorpickersPreview = ({ value }) => <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;

ColorpickersPreview.propTypes = {
  value: PropTypes.node,
};

export default ColorpickersPreview;
