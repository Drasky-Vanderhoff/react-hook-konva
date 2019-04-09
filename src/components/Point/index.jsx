import React from 'react'
import {Circle, Text} from 'react-konva'

const Point = (
  props
) => {
  return (
    <>
      <Circle 
        {...props}
        draggable
        onClick={(e) => e.cancelBubble = true}
      />
      <Text 
        {...props} 
        text={`${props.x} , ${props.y}`}
      />
    </>
  )
}

export default Point