export default class PerformanceCalculator {
  constructor (aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount () {
    throw new Error('이 Getter Property는 서브클래스에서 계산됩니다.')
  }

  get volumeCredits () {
    const { performance } = this
    return Math.max(performance.audience - 30, 0)
  }
}
