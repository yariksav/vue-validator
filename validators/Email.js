import isEmail from 'validator/lib/isEmail'
import Rule from './Rule'

export default class Email extends Rule {

  check (value) {
    return this.checkRequired(value) || isEmail(value + '')
  }
}
