import React from 'react'

const ColorPreview = ({color, style}) => {

  const colorPreview = {
    width: '20%',
    height: '100%',
    background: color,
    minHeight: '29px',
    boxShadow: 'none',
    margin: '0px 0px -23px',
    outline: 0,
    position: 'relative',
    height: '58px',
    border: 'var(--textFieldBorder)',
    borderRadius: 'var(--borderRadius)',
    display: 'inline-block'
  }

  return <div style={{...colorPreview, ...style}}></div>
}

export default ColorPreview