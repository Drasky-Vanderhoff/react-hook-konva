

// Calculates point position based on the other points
export const calculatePointPosition = (key, points) => {
  const { point_0, point_1, point_2, point_3 } = points

  switch (key) {
    case 'point_0':
      return [
        point_1.x + (point_3.x - point_2.x),
        point_1.y + (point_3.y - point_2.y)
      ]
    case 'point_1':
      return [
        point_0.x + (point_2.x - point_3.x),
        point_0.y + (point_2.y - point_3.y)
      ]
    case 'point_2':
      return [
        point_1.x + (point_3.x - point_0.x),
        point_1.y + (point_3.y - point_0.y)
      ]
    case 'point_3':
      return [
        point_0.x + (point_2.x - point_1.x),
        point_0.y + (point_2.y - point_1.y)
      ]
    default:
      return [0, 0]
  }
}

/* Calculates AREA = |AB x AC|
 * Being A=point_0 , B=point_1 and C=point_3
 */
export const calculateArea = (points) => {
  const { point_0, point_1, point_2 } = points
  return Math.abs(
    ((point_1.x - point_0.x) *
    (point_2.y - point_0.y)) -
    ((point_2.x - point_0.x) *
    (point_1.y - point_0.y))  
  );
} 

/* Calculates radius a circle based on an area */
export const calculateRadius = (area) => Math.sqrt(area/Math.PI);