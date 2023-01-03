import Vue from 'vue'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  confirmed,
  digits,
  email,
  integer,
  max,
  min,
  min_value as minValue,
  required,
  size,
} from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// Locales
localize({ en })

// Default
extend('confirmed', confirmed)
extend('digits', digits)
extend('email', email)
extend('integer', integer)
extend('max', max)
extend('min', min)
extend('min_value', minValue)
extend('required', required)
extend('size', size)

extend(
  'w_strong_password',
  (value) =>
    (value &&
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)) ||
    'Password does not meet all of the requirements'
)
