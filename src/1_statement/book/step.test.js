import { statement as legacyStatement } from '../legacy'
import { statement as step1Statement } from './step1'
import { statement as step2Statement } from './step2'
import { statement as step3Statement } from './step3'
import { plays, invoice } from '../variables'

test('기존 statement 함수의 실행결과와 리팩토링 step1Statement 함수의 실행결과는 동일하다.', () => {
  expect(step1Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step2Statement 함수의 실행결과는 동일하다.', () => {
  expect(step2Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step3Statement 함수의 실행결과는 동일하다.', () => {
  expect(step3Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})
