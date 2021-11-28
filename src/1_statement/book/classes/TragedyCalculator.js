import PerformanceCalculator from './PerformanceCalculator'

export default class TragedyCalculator extends PerformanceCalculator {
  constructor (aPerformance, aPlay) {
    super(aPerformance, aPlay)
  }

  get amount () {
    const { performance } = this
    let result = 40000
    if (performance.audience > 30) {
      result += 1000 * (performance.audience - 30)
    }
    return result
  }
}
