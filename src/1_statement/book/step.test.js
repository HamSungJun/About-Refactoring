import { statement as legacyStatement } from '../legacy'
import { statement as step1Statement } from './step1'
import { statement as step2Statement } from './step2'
import { statement as step3Statement } from './step3'
import { statement as step4Statement } from './step4'
import { statement as step5Statement } from './step5'
import { statement as step6Statement } from './step6'
import { plays, invoice } from '../variables'

/**
 * 사소한 수정후 지속적으로 테스트 결과를 확인하면서 레거시 소스코드에서 만족했던 기존의 요구사항을
 * 리팩토링 과정에서 누락되는 부분은 없는지, 기존의 실행결과와 다르지 않은지 기계적으로 검사하여 시간을 절약한다.
 */

test('기존 statement 함수의 실행결과와 리팩토링 step1Statement 함수의 실행결과는 동일하다.', () => {
  expect(step1Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step2Statement 함수의 실행결과는 동일하다.', () => {
  expect(step2Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step3Statement 함수의 실행결과는 동일하다.', () => {
  expect(step3Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step4Statement 함수의 실행결과는 동일하다.', () => {
  expect(step4Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step5Statement 함수의 실행결과는 동일하다.', () => {
  expect(step5Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})

test('기존 statement 함수의 실행결과와 리팩토링 step6Statement 함수의 실행결과는 동일하다.', () => {
  expect(step6Statement(plays, invoice)).toBe(legacyStatement(plays, invoice))
})
