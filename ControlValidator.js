import Rules from './rules'
import { isEqual } from 'lodash'

export default {
  name: 'control-validator',
  props: {
    value: {
      required: true
    },
    text: String,
    rules: {
      type: [Object, String]
    },
    delay: {
      type: Number,
      default: 300
    }
  },
  created () {
    this._rules = new Rules(this.rules, {text: this.text})
    this.$emit('update:isValid', !!this._rules.isValid(this.value))
  },
  watch: {
    value (value, old) {
      if (this.delay > 0) {
        if (this._timer) {
          clearTimeout(this._timer)
        }
        this._timer = setTimeout(() => this.check(value), this.delay)
      } else {
        this.check(value)
      }
    }
  },
  methods: {
    check (value) {
      // if (value === undefined) {
      //   value = this.value
      // }

      let validation = this._rules.check(value)
      // check is same arrays
      if (!(isEqual(validation, this.lastValidation))) {
        this.lastValidation = validation || null
        this.child.componentInstance.$emit('validation', validation)
        this.$emit('update:isValid', !validation)
      }
      return validation
    }
  },
  render (h) {
    this.child = this.$options._renderChildren[0]
    return this.$options._renderChildren[0]
  }
}
