import { plays, invoice } from '../variables.js'

// [DESC] 자주 사용될 것으로 예상되는 파라미터를 기본값 매개변수로 지정하고 다양한 통화 포멧터 함수를 발급받을 수 있게 작성했다.
const getIntlFormatter = (
  locale = 'en-US',
  options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) => {
  return new Intl.NumberFormat(locale, options)
}

const toUSD = getIntlFormatter().format

// [DESC] 요구되는 형식을 갖는 청구서로 반환하는 함수를 작성했다.
const generateStatement = ({ customer = '', charges = [], pointsEarned = 0, totalCharge = 0 } = {}) => {
  const customerLine = `청구 내역 (고객명: ${customer})`
  const paymentLines = charges.map(({ playName, playCharge, audience }) => (
        `  ${playName}: ${toUSD(playCharge)} (${audience}석)`
  ))
  const metaLines = [`총액: ${toUSD(totalCharge)}`, `적립 포인트: ${pointsEarned}점`]

  return [
    customerLine,
    ...paymentLines,
    ...metaLines
  ].join('\n')
}

const calcPerformance = (performance, plays) => {
  // [DESC] 유효하지 않는 인풋에 대해서는 일찍 에러를 발생시켜 이후 로직에서 엣지 케이스를 처리하는 로직이 들어가지 않도록 작성했다.
  const { playID, audience } = performance
  const play = plays[playID]
  if (!play) throw new Error('존재하지 않는 공연입니다.')
  if (!['tragedy', 'comedy'].includes(play.type)) throw new Error('존재하지 않는 공연 종류입니다.')

  return {
    playName: play.name,
    playCharge: calcPerformanceChargeByType(play.type, audience) / 100,
    audience,
    pointsEarned: Math.max(audience - 30, 0) + (play.type === 'comedy' ? Math.floor(audience / 5) : 0)
  }
}

const calcPerformanceChargeByType = (playType, audience) => {
  // [DESC] 각 공연 장르에 따른 계산식의 유지보수에만 집중할 수 있도록 함수를 분리했다.
  const calcTragedyCharge = (audience) => {
    return 40000 + 1000 * Math.max(audience - 30, 0)
  }
  const calcComedyCharge = (audience) => {
    let charge = 30000 + audience * 300
    charge += audience > 20 ? 10000 + 500 * (audience - 20) : 0
    return charge
  }

  // [DESC] 이 함수가 실행되기전에 반드시 존재하는 공연 종류만 인풋으로 들어오므로 default 문은 사용하지 않았다.
  switch (playType) {
    case 'tragedy': return calcTragedyCharge(audience)
    case 'comedy': return calcComedyCharge(audience)
  }
}

function statement (invoice, plays) {
  const charges = []
  let totalCharge = 0
  let pointsEarned = 0

  const { customer, performances } = invoice
  performances.forEach(performance => {
    charges.push(calcPerformance(performance, plays))
    totalCharge += charges[charges.length - 1].playCharge
    pointsEarned += charges[charges.length - 1].pointsEarned
  })

  // [DESC] 최종 계산값을 통해 순수하게 출력문의 형식만 관리할 수 있도록 했다.
  return generateStatement({
    customer,
    charges,
    pointsEarned,
    totalCharge
  })
}

console.log(statement(invoice, plays))
