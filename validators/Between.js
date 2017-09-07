import isInt from 'validator/lib/isInt'
import Rule from './Rule'

export default class Between extends Rule {

  constructor (config) {
    super(config)
    if (typeof this.option === 'string') {
      let params = this.option.split(',')
      this.min = +params[0]
      this.max = +params[1]
    }
    if (!this.min || !this.max) {
      throw new Error('Incorrect options in Between validator')
    }
  }

  check (value) {
    if (value === undefined) {
      value = ''
    }
    return isInt(value + '', {
      min: this.min,
      max: this.max
    })
  }
}
