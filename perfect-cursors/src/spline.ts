import { dist, type Point2D } from './point'

export class Spline {
  points: Point2D[] = []

  lengths: number[] = []

  totalLength = 0

  private prev?: Point2D

  constructor(points: Point2D[] = []) {
    this.points = points
    this.lengths = points.map((point, i, arr) => (i === 0 ? 0 : dist(point, arr[i - 1])))
    this.totalLength = this.lengths.reduce((acc, cur) => acc + cur, 0)
  }

  addPoint = (point: Point2D) => {
    if (this.prev) {
      const length = dist(this.prev, point)
      this.lengths.push(length)
      this.totalLength += length
      this.points.push(point)
    }
    this.prev = point
  }

  clear = () => {
    this.points = this.prev ? [this.prev] : []
    this.totalLength = 0
  }

  getSplinePoint = (rt: number): Point2D => {
    const { points } = this
    const l = points.length - 1,
      d = Math.trunc(rt),
      p1 = Math.min(d + 1, l),
      p2 = Math.min(p1 + 1, l),
      p3 = Math.min(p2 + 1, l),
      p0 = p1 - 1,
      t = rt - d
    const tt = t * t,
      ttt = tt * t,
      q1 = -ttt + 2 * tt - t,
      q2 = 3 * ttt - 5 * tt + 2,
      q3 = -3 * ttt + 4 * tt + t,
      q4 = ttt - tt
    const [p0x, p0y] = points[p0],
      [p1x, p1y] = points[p1],
      [p2x, p2y] = points[p2],
      [p3x, p3y] = points[p3]
    return [
      (p0x * q1 + p1x * q2 + p2x * q3 + p3x * q4) / 2,
      (p0y * q1 + p1y * q2 + p2y * q3 + p3y * q4) / 2,
    ]
  }
}
