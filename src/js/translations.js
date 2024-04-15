/**
 * Loading translations and applying to page using `i18next`
 */

import i18next from 'i18next';
import i18nBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initializeI18N = async () => {
  const fallbackLng = 'en';
  const allowedLocales = ['de', 'en', 'es', 'fr', 'ja', 'pt'];
  
  // get language from URL params or browser settings
  const params = new URLSearchParams(window.location.search);
  const currentLocale = params.get('lang') || new LanguageDetector().detect();
  
  // if no search queries doesn't contain lang parameter or contain restricted value - redirect
  if (!currentLocale || !allowedLocales.includes(currentLocale)) {
    params.set('lang', fallbackLng);
    history.pushState({ lang: fallbackLng }, 'title', `/?${params.toString()}`);
  }
  
  i18next
    .use(i18nBackend)
    .init({
      lng: currentLocale,
      fallbackLng: currentLocale,
      backend: {
        loadPath: `${process.env.SITE_URL}/assets/locales/{{lng}}.json`,
      },
    });

  await i18next.loadLanguages(currentLocale);
  document.body.classList.add(currentLocale)
};

const generateOptionKey = (datasetKey) => datasetKey.replace(/^langOption/g, '').toLowerCase();

const applyLocalization = async () => {
  [...document.querySelectorAll('[data-lang-key]')].forEach((element) => {
    const dataset = element.dataset;
    const key = dataset.langKey;
    const options = Object.keys(dataset)
      .filter(key => key.startsWith('langOption')) // select only options
      .reduce((values, key) => ({
        ...values,
        [generateOptionKey(key)]: dataset[key]
      }), {});

    element.innerHTML = i18next.t(key, options);
  });
};

await initializeI18N();
applyLocalization();
