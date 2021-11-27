/**
 * amountFor 함수를 추출하기
 * amountFor 함수 내부블록 변수의 이름을 좀더 명확하게 바꾸기
 * playFor 함수를 추출하여 루프를 순회하는 공연의 타입 알아내기
 * amountFor 함수의 사용하지 않는 파라미터 제거
 * 함수를 추출하는 과정을 통해 필요하지 않은 지역변수 제거
 */

export function statement (plays, invoice) {
  function amountFor (aPerformance) {
    let result = 0
    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }

  function playFor (aPerformance) {
    return plays[aPerformance.playID]
  }

  let totalAmount = 0
  let volumeCredits = 0
  let result = `청구 내역 (고객명: ${invoice.customer})\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format

  for (const aPerformance of invoice.performances) {
    volumeCredits += Math.max(aPerformance.audience - 30, 0)
    if (playFor(aPerformance).type === 'comedy') {
      volumeCredits += Math.floor(aPerformance.audience / 5)
    }

    result += `  ${playFor(aPerformance).name}: ${format(amountFor(aPerformance) / 100)} (${aPerformance.audience}석)\n`
    totalAmount += amountFor(aPerformance)
  }
  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`
  return result
}
