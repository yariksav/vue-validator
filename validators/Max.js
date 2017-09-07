import isLength from 'validator/lib/isLength'
import Rule from './Rule'

export default class Max extends Rule {

  constructor (config) {
    super(config)
    this.option = +this.option
  }

  check (value) {
    if (!value) {
      value = ''
    }
    return this.checkRequired(value) || isLength(value, {
      min: undefined, max: this.option
    })
  }
}
