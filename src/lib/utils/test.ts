import * as test from './test'

export function foo() {
  return test.bar()
}
export function bar() {
  return 'bar'
}
