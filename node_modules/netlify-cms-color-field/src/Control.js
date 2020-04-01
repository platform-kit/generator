import React from 'react';
import ColorPreview from './ColorPreview'

const Control = ({
  forID,
  value,
  onChange,
  classNameWrapper
}) => {

  const HEX_REGEX = /^#[a-f0-9]{0,6}$|^$/

  const validateChange = (input) => HEX_REGEX.test(input) ? onChange(input) : false

  return (
    <div>
    <input
      type="text"
      id={forID}
      className={classNameWrapper}
      style={{width: '80%', display: 'inline-block'}}
      value={value || ''}
      maxLength={7}
      onChange={e => validateChange(e.target.value)}
    />
    <ColorPreview color={value}/>
    </div>
  );
}

export default Control