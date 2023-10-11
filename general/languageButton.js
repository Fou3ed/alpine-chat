import { traduction } from "../main.js";
import { traduc } from "../utils/traduction.js";

const locales = ["en-GB", "fr-FR"];

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
    ? `./images/flags/${countryCode.toLowerCase()}.svg`
    : "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

async function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const langName = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(intlLocale.language);

  dropdownContent.innerHTML = "";

  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    const otherLangName = new Intl.DisplayNames([otherLocale], {
      type: "language",
    }).of(otherIntlLocale.language);

    const listEl = document.createElement("li");
    listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
      otherIntlLocale.region
    )}" />`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });120
    dropdownContent.appendChild(listEl);
  });

  dropdownBtn.innerHTML = `<img src="${getFlagSrc(intlLocale.region)}" />`;

  const { data: lang } = await axios.get(
    "./lang/" + locale.substring(0, 2).toLowerCase()
  );
  traduction = lang;
  traduc();
}

const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    setSelectedLocale(locale);
  }
}