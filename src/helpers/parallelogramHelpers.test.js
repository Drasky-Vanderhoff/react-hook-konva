import {
  calculatePointPosition,
} from './parallelogramHelpers'

describe('Parallelogram Helper', () => {
  describe('calculatePointPosition', () => {
    let points
    beforeEach(() => {
      points = {
        point_0: {
          x:Math.random() * 100,
          y:Math.random() * 100
        },
        point_1: {
          x:Math.random() * 100,
          y:Math.random() * 100
        },
        point_2: {
          x:Math.random() * 100,
          y:Math.random() * 100
        },
      }
    })
    it('should both opossite sides have the same length', () => {
      const [x, y] = calculatePointPosition('point_3', points)

      points.point_3 = {x, y}
      const {
        point_0,
        point_1,
        point_2,
        point_3,
      } = points
      expect(
        Math.floor(Math.abs(point_0.x - point_1.x)) === Math.floor(Math.abs(point_2.x - point_3.x))
      ).toBeTruthy()
      expect(
        Math.floor(Math.abs(point_0.y - point_3.y)) === Math.floor(Math.abs(point_1.y - point_2.y))
      ).toBeTruthy()
    })
  })
})