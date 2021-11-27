import { statement as legacyStatement } from '../legacy'
import { statement as myStatement } from '.'
import { plays, invoice } from '../variables'

test('기존 statement 함수의 실행결과와 리팩토링 statement 함수의 실행결과는 동일하다.', () => {
  expect(myStatement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})
