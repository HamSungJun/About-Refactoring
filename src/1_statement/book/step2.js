/**
 * amountFor 함수를 추출하기
 * amountFor 함수 내부블록 변수의 이름을 좀더 명확하게 바꾸기
 */

function amountFor (aPerformance, play) {
  let result = 0
  switch (play.type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result
}

export function statement (plays, invoice) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구 내역 (고객명: ${invoice.customer})\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format

  for (const perf of invoice.performances) {
    const play = plays[perf.playID]
    const thisAmount = amountFor(perf, play)

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
