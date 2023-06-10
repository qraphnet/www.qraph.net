type Tuple3 = [number, number, number];
export class Vec3 {
  private vector: Tuple3;
  constructor(x: number, y: number, z: number) {
    this.vector = [x, y, z];
  }
  normalize() {
    const abs = Math.sqrt(this.vector.reduce((a, c) => a + c * c, 0));
    return new Vec3(...this.vector.map(r => r / abs) as Tuple3);
  }
  scale(scalar: number) {
    return new Vec3(...this.vector.map(r => r * scalar) as Tuple3);
  }
  get x() {
    return this.vector[0];
  }
  get y() {
    return this.vector[1];
  }
  get z() {
    return this.vector[2];
  }
}

type Tuple2 = [number, number];
export class Vec2 {
  private vector: Tuple2;
  constructor(x: number, y: number) {
    this.vector = [x, y];
  }
  get x() {
    return this.vector[0];
  }
  get y() {
    return this.vector[1];
  }

  sub(rhs: Vec2): Vec2 {
    return new Vec2(this.x - rhs.x, this.y - rhs.y);
  }

  static division(a: Vec2, b: Vec2, t: number) {
    return new Vec2(a.x * t + b.x * (1-t), a.y * t + b.y * (1-t));
  }
}
