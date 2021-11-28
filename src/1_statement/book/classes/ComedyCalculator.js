import PerformanceCalculator from './PerformanceCalculator'

export default class ComedyCalculator extends PerformanceCalculator {
  constructor (aPerformance, aPlay) {
    super(aPerformance, aPlay)
  }

  get amount () {
    const { performance } = this
    let result = 30000
    if (performance.audience > 20) {
      result += 10000 + 500 * (performance.audience - 20)
    }
    result += 300 * performance.audience
    return result
  }

  get volumeCredits () {
    const { performance } = this
    return super.volumeCredits + Math.floor(performance.audience / 5)
  }
}
