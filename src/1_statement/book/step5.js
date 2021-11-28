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
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
  }
  function playFor (aPerformance) {
    return plays[aPerformance.playID]
  }
  function amountFor (aPerformance) {
    let result = 0
    switch (aPerformance.play.type) {
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
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }
    return result
  }
  function volumeCreditsFor (aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if (aPerformance.play.type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
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
