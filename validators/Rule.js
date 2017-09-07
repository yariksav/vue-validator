export default class Rule {
  constructor (config) {
    Object.assign(this, config || {})
  }

  check (value) {
    return true
  }

  checkRequired (value) {
    return !value && this.required === false
  }
}
