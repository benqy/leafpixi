import { Demo, EnumDemo } from './types'
// type Demo = {
//   a: string
//   b: number
// }
export class ClassDemo {
  demo: Demo
  enumDemo: EnumDemo
  constructor() {
    this.demo = {
      a: 'a',
      b: 1,
    }

    this.enumDemo = EnumDemo.A
  }
}
