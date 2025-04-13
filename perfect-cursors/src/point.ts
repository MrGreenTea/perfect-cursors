export type Point2D = [number, number];

export function dist(a: Point2D, b: Point2D): number {
    return Math.hypot(a[1] - b[1], a[0] - b[0]);
}