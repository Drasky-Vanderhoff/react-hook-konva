import React, { useState, useEffect } from 'react'
import {
  Stage,
  Layer,
  Circle,
  Text
} from 'react-konva'
import Point from './components/Point'
import Parallelogram from './components/Parallelogram'
import {
  calculatePointPosition,
  calculateArea,
  calculateRadius
} from './helpers/parallelogramHelpers'
import configuration from './config.json'
import './App.css'

const App = () => {
  const [points, setPoints] = useState({})
  const [circlePosition, setCirclePosition] = useState({})
  const [selectedPointKey, setSelectedPointKey] = useState('');
  
  useEffect(() => {
    const length = Object.values(points).length
    if(length === 3) {
      const { point_0, point_2 } = points
      const key = `point_${length}`
      const [x, y] = calculatePointPosition(key, points)
      /* Adding the forth point */
      _setPoint(x, y, key)
      /* Setting the circle position, this won't change */
      setCirclePosition({
        x: Math.abs(point_2.x - point_0.x)/2 + (point_0.x > point_2.x ? point_2.x : point_0.x),
        y: Math.abs(point_2.y - point_0.y)/2 + (point_0.y > point_2.y ? point_2.y : point_0.y)
      })
    }
  })

  const clearPoints = () => {
    setPoints({})
    setCirclePosition({})
  }

  const _setPoint = (x, y, key) => {
    setPoints({
      ...points,
      [key]: {key, x, y}
    })
  }

  const addPoints = (x, y) => {
    const length = Object.values(points).length
    /* It only allows for 3 points to be added */
    if(length < 3)
      _setPoint(x,y, `point_${length}`)
  }

  const updatePoints = (x, y, key) => {
    const oppositeKey = `point_${(+key[key.length-1] + 2) % 4}`
    const [oppositeX, oppositeY] = calculatePointPosition(oppositeKey, points)
    
    setPoints({
      ...points,
      [oppositeKey]: {key: oppositeKey, x: oppositeX, y: oppositeY},
      [key]: {key, x, y}
    })
  }

  const renderArea = () => {
    const area = calculateArea(points);
    return (
      <>
        <Circle
          {...configuration.circleConfiguration} 
          {...circlePosition}
          radius={calculateRadius(area)}
        />
        <Text 
          {...configuration.textConfiguration} 
          {...circlePosition}
          text={`Area: ${area}`}
        />
      </>
    )
  }

  const renderPoints = () => Object.values(points).map(
    ({key, x,y}) => (
      <Point
        {...configuration.pointConfiguration}
        key={key} 
        x={x}
        y={y}
        onDragStart={() => setSelectedPointKey(key)}
        onDragEnd={() => setSelectedPointKey('')}
      />
    )
  )

  return (
    <>
      <section className="main">
        <Stage
          {...configuration.stageConfiguration}
          onClick={(e) => {
            addPoints(e.evt.x, e.evt.y)
          }} 
          onDragMove={(e) => 
            selectedPointKey !== '' && 
            points.point_3 &&
            updatePoints(e.evt.layerX,e.evt.layerY, selectedPointKey)
          }
          >
          <Layer
            {...configuration.layerConfiguration}
            >
            {renderPoints()}
            <Parallelogram
              {...configuration.parallelogramConfiguration} 
              points={Object.values(points).reduce(
                (prev, {x,y}) => [...prev, x , y],
                []
                )}
                />
            {Object.values(points).length === 4 && renderArea()}
          </Layer>
        </Stage>
      </section>
      <footer>
        <button onClick={clearPoints}>Reset</button>
        <h1>About: </h1>
        <p>
          Made by Alejandro Kondrasky as a demo for showing how to work with React Konva using React Hooks.
        </p>
        <p>
          The file call 'config.json' accepts any type of styling from React Konva, it can be extended by the user.
        </p>
        <p>
          Click 3 times in different positions inside the red square and you will get a parallelogram,
          the points are draggable.
        </p>
        <p>
          Also you can click on the reset button to start again.
        </p>
      </footer>
    </>
  )
}

export default App