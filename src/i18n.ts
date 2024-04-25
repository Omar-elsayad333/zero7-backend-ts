import { ConfigurationOptions } from 'i18n'

const i18nConfig: ConfigurationOptions = {
  // setup some locales - other locales default to en silently
  locales: ['en', 'ar'],

  // sets a custom cookie name to parse locale settings from
  cookie: 'locale',

  // sets a default value
  defaultLocale: 'en',

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales',
}

export default i18nConfig
