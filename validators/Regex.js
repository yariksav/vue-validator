import Rule from './Rule'

export default class Regex extends Rule {

  constructor (config) {
    super(config)
    this.expression = this.expression || this.option
    if (typeof this.expression === 'string') {
      this.expression = new RegExp(this.expression)
    }
  }

  check (value) {
    if (!this.expression) {
      return true
    }

    if (!value) {
      value = ''
    }
    console.log(value.match(this.expression), this.expression, value)
    console.log(this.expression.test(value))
    return value.match(this.expression)
  }
}
