import PropTypes from 'prop-types';
import React from 'react';
import ColorPreview from './ColorPreview'

const Preview = ({ value }) => 
  <div>
    <ColorPreview color={value} style={{margin: 0, display: 'block'}}/>
    <div>{ value }</div>
  </div>

Preview.propTypes = {
  value: PropTypes.node,
};

export default Preview
