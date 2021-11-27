import { plays, invoice } from './variables.js'

// [DESC] 공연 가격표와 고객이 선택한 공연과 청중수를 확인하여 청구 내역을 출력해주는 프로그램
export function statement (plays, invoice) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구 내역 (고객명: ${invoice.customer})\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format

  for (const perf of invoice.performances) {
    const play = plays[perf.playID]
    let thisAmount = 0

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30)
        }
        break
      case 'comedy':
        thisAmount = 30000
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20)
        }
        thisAmount += 300 * perf.audience
        break
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`)
    }

    volumeCredits += Math.max(perf.audience - 30, 0)
    if (play.type === 'comedy') {
      volumeCredits += Math.floor(perf.audience / 5)
    }

    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
    totalAmount += thisAmount
  }
  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`
  return result
}
