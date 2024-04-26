import path from 'path'
import i18n from 'i18n'

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'ar'],

  // sets a custom cookie name to parse locale settings from
  header: 'locale',

  // sets a default value
  defaultLocale: 'en',

  // where to store json files - defaults to './locales'
  directory: path.join(__dirname, '..', 'locales'),

  // Support for nested translation objects
  objectNotation: true,
})

export default i18n
