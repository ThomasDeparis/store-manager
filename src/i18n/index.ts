import frFR from './fr-FR';
import { createI18n } from 'vue-i18n';

const messages = {
  'fr-FR': frFR,
};

const i18n = createI18n({
  locale: 'fr-FR',
  legacy: false,
  messages,
});
const t = i18n.global.t;

export { messages, i18n, t };
