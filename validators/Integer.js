import isInt from 'validator/lib/isInt'
import Rule from './Rule'

export default class Integer extends Rule {

  check (value) {
    this.checkRequired(value) || isInt(value)
  }
}
