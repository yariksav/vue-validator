import isFloat from 'validator/lib/isFloat'
import Rule from './Rule'

export default class Numeric extends Rule {
  check (value) {
    isFloat(value)
  }
}
