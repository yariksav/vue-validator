import Rule from './Rule'

export default class Required extends Rule {

  check (value) {
    return !!value
  }

}
