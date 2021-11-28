import TragedyCalculator from './classes/TragedyCalculator'
import ComedyCalculator from './classes/ComedyCalculator'
/**
 * amountFor 함수를 추출하기
 * amountFor 함수 내부블록 변수의 이름을 좀더 명확하게 바꾸기
 * playFor 함수를 추출하여 루프를 순회하는 공연의 타입 알아내기
 * amountFor 함수의 사용하지 않는 파라미터 제거
 * 함수를 추출하는 과정을 통해 필요하지 않은 지역변수 제거
 * volumeCreditsFor 함수를 추출하기
 * totalVolumeCredits 함수를 추출하기
 * totalAmount 함수를 추출하기
 * 데이터 처리 함수와 결과 표시 함수로 분리하기
 * 조건 분기를 다형성으로 대응하기
 */

export function statement (plays, invoice) {
  return renderPlainText(createStatementData(plays, invoice))
}

function toUSD (aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format(aNumber / 100)
}

function renderPlainText (data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`
  for (const aPerformance of data.performances) {
    result += `  ${aPerformance.play.name}: ${toUSD(aPerformance.amount)} (${aPerformance.audience}석)\n`
  }

  result += `총액: ${toUSD(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`
  return result
}

function createStatementData (plays, invoice) {
  function enrichPerformance (aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
  }
  function playFor (aPerformance) {
    return plays[aPerformance.playID]
  }

  function totalVolumeCredits (data) {
    return data.performances.reduce((acc, p) => acc + p.volumeCredits, 0)
  }

  function totalAmount (data) {
    return data.performances.reduce((acc, p) => acc + p.amount, 0)
  }
  const statementData = Object.create(null)
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData
}

function createPerformanceCalculator (aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy': return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy': return new ComedyCalculator(aPerformance, aPlay)
    default: throw new Error(`알 수 없는 장르입니다: ${aPlay.type}`)
  }
}
