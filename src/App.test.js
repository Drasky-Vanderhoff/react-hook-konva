import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import {
  calculatePointPosition,
} from 'helpers/parallelogramHelpers'

describe('App', () => {
  let points
  beforeEach(() => {
    points = {
      point_0: {
        key: 'point_0',
        x:Math.random() * 100,
        y:Math.random() * 100
      },
      point_1: {
        key: 'point_1',
        x:Math.random() * 100,
        y:Math.random() * 100
      },
      point_2: {
        key: 'point_2',
        x:Math.random() * 100,
        y:Math.random() * 100
      },
    }
  })

  it('renders without crashing', () => {
    shallow(<App />)
  })
  
  it('should create the points when clicked', () => {
    const wrapper = shallow(<App />)
    const [x, y] = calculatePointPosition('point_3', points)

    points.point_3 = {
      key: 'point_3',
      x, 
      y
    }
    // Adding point_0
    wrapper.find('ForwardRef').simulate('click', {
      evt: points.point_0
    })

    // Adding point_1
    wrapper.find('ForwardRef').simulate('click', {
      evt: points.point_1
    })

    // Adding point_2
    wrapper.find('ForwardRef').simulate('click', {
      evt: points.point_2
    })    
    
    // Checking that there is 3 points
    expect(wrapper.find('Point').length).toEqual(3)

    // Checking that the points have the correct coordinates
    wrapper.find('Point').forEach(
      point => {
        expect(point.prop('x')).toEqual(points[point.key()].x)
        expect(point.prop('y')).toEqual(points[point.key()].y)
      }
    ) 
    // NOTE: Enzyme doesn't support useEffect yet so the forth point can't be tested
    // This code should work once there is support for useEffect
    /*     
      expect(wrapper.find('Point').length).toEqual(4)
      wrapper.find('Point').forEach(
        point => expect(point.props).toContain(points[point.key])
      ) 
    */ 
  })

  it('should clear the points when reset is clicked', () => {
    const wrapper = shallow(<App />)
    // Adding point_0
    wrapper.find('ForwardRef').simulate('click', {
      evt: points.point_0
    })
    expect(wrapper.find('Point').length).toEqual(1)
    
    wrapper.find('button').simulate('click');
    
    expect(wrapper.find('Point').length).toEqual(0)
  });

})
