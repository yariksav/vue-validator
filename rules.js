import validators from './validators'
import locales from './locale/en'
import format from './utils/format'

export default class Rules {

  constructor (rules, options = {}) {
    this.options = options
    this.locales = Object.assign({}, locales, options.messages)
    this.rules = this.parse(rules)
  }

  isValid (value) {
    let result = true
    this.rules.some(rule => {
      if (!rule.check(value)) {
        result = false
        return true
      }
    })
    return result
  }

  check (value) {
    let errors = []
    this.rules.forEach(rule => {
      if (!rule.check(value)) {
        errors.push(this.makeReplacements(rule))
      }
    })
    return errors.length ? errors : null
  }

  makeReplacements (rule) {
    let message = rule.message || this.locales[rule.name] || this.locales['default']
    // rule.attribute = this.names[attribute] ? this.names[attribute] : attribute
    return format(message, Object.assign({attribute: this.options.text}, rule))
  }

  // getMessage (attribute, rule) {
  //   let message = this.locales[rule]
  //   if (rule && rule.message === 'function') {
  //     // let prettyName = this.names[attribute] || attribute
  //     // message = rule.message.call(rule, attribute, this) ??
  //     message = rule.message(attribute, this)
  //   }
  //
  //   if (typeof message === 'function') {
  //     message = message.call(this, attribute, rule)
  //   }
  //   return message
  // }
  // all () {
  //   return this.rules
  // }
  //
  // getRule (name) {
  //   if (!this.rules[name]) {
  //     return
  //   }
  //   if (typeof this.rules[name] === 'string') {
  //     this.rules[name] = this.parse(name, this.rules[name])
  //   }
  //   return this.rules[name]
  // }
  //
  // parseRuleOptionsFromString (options, params = {}) {
  //   if (typeof options === 'string') {
  //     options = options.split(',')
  //   }
  //   if (!options) {
  //     options = []
  //   }
  //   return {
  //     params: options,
  //     ...params,
  //     ...this.options
  //   }
  // }

  ucfist (str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
  }
  //
  // parseFromString (rulesStr) {
  //   let rulesObj = []
  //   let rulesArr = ('' + rulesStr).split('|')
  //   let required = rulesStr.indexOf('required') >= 0
  //
  //   rulesArr.forEach(rule => {
  //     let ruleArr = rule.split(':')
  //     let className = this.ucfist(ruleArr[0])
  //     let validator = this.createValidator(className, {required, name: ruleName, optionsRaw: ruleArr[1]})
  //     if (validator) {
  //       rulesObj.push(validator)
  //     }
  //   })
  //   return rulesObj
  // }

  parseFromString (rulesStr) {
    let rulesObj = {}
    let rulesArr = ('' + rulesStr).split('|')
    rulesArr.forEach(rule => {
      let ruleArr = rule.split(':')
      rulesObj[ruleArr[0]] = ruleArr[1] || true
      // let className = this.ucfist(ruleArr[0])
      // let validator = this.createValidator(className, {required, name: ruleName, optionsRaw: ruleArr[1]})
      // if (validator) {
      //   rulesObj.push(validator)
      // }
    })
    return this.parseFromObject(rulesObj)
  }

  parseFromObject (rulesObj) {
    let rules = []
    let required = !!rulesObj.required
    Object.keys(rulesObj).forEach(key => {
      let params = rulesObj[key]
      if (!params) {
        params = {}
      }
      if (typeof params !== 'object') {
        params = {option: params}
      }

      let validator = this.createValidator(this.ucfist(key), {required, name: key, ...params})
      if (validator) {
        rules.push(validator)
      }
    })
    return rules
  }

  createValidator (name, config) {
    let Validator = validators[name]
    if (!Validator) {
      console.warn('Validator "' + name + '" not assigned!')
      return
    }
    return new Validator(config)
  }

  parse (rules) {
    if (!rules) {
      rules = []
    }
    if (typeof rules === 'string') {
      rules = this.parseFromString(rules)
    } else {
      rules = this.parseFromObject(rules)
    }
    console.log(rules)
    return rules
  }
}
