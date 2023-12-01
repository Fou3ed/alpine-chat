import { loadNewData } from "../main.js";
import { getTime } from "./getTime.js";

const newData = loadNewData();


export let traduction = {};

export let lan;
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
  
    lan=locale
    traduction = lang;
    traduc();
}

const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    lan=locale
    setSelectedLocale(locale);
  }
}


export function getTranslationValue(key) {
  const translationValue = eval(`traduction.${key}`);
  if(Array.isArray(translationValue)){
    return translationValue
  }
  if (translationValue) {
    const firstLetter = translationValue.charAt(0).toUpperCase();
    const restOfString = translationValue.slice(1);
    return firstLetter + restOfString;
  } else {
    return key;
  }
}

export function traduc() {

  document.querySelectorAll("[data-translation]").forEach((element) => {
    element.textContent = getTranslationValue(element.dataset.translation);
  });
  document.querySelector("#message-input").placeholder = getTranslationValue(
    "container.write_message"
  );
  document.querySelector("#search-chat").placeholder = getTranslationValue(
    "left_side.tab_1.search"
  );

  const birth_date_input=  document.getElementById("birth_date_input")

  if(birth_date_input){
    birth_date_input.placeholder=getTranslationValue("date_format.date_form")

  }

  document.querySelectorAll("[data-country]" ).forEach((element) => {
    element.dispatchEvent(new Event('change'))

  });


// conversationTool.setAttribute('x-tooltip.placement.bottom.light', getTranslationValue("tooltips.conversationSideBar"));
if (lan.substring(0, 2).toLowerCase() === "en") {
  document.getElementById("cnvSideBarTool").setAttribute('x-tooltip.placement.bottom.light', "'Conversation side bar'");
  document.getElementById("buyMessagesTool").setAttribute('x-tooltip.placement.bottom.light', "'Buy messages'");
  document.getElementById("modeTool").setAttribute('x-tooltip.placement.bottom.light', "'Dark Mode'");
  document.getElementById("toggleDrawerButton").setAttribute('x-tooltip.placement.bottom.light', "'Expert SideBar'");
  document.getElementById("profile_header").setAttribute('x-tooltip.placement.bottom.light', "'Settings'")
} else {
  document.getElementById("cnvSideBarTool").setAttribute('x-tooltip.placement.bottom.light', "'Conversations Barre latérale'");
  document.getElementById("buyMessagesTool").setAttribute('x-tooltip.placement.bottom.light', "'Acheter des messages'");
  document.getElementById("modeTool").setAttribute('x-tooltip.placement.bottom.light', "'Mode sombre'");
  document.getElementById("toggleDrawerButton").setAttribute('x-tooltip.placement.bottom.light', "'Barre latérale experte'");
  document.getElementById("profile_header").setAttribute('x-tooltip.placement.bottom.light', "'paramètres'")

}

document.querySelectorAll("[data-time]").forEach((element) => {
  element.textContent = getTime(element.dataset.time);
});

// Select the button element by its ID

// Update the x-tooltip attribute to change the content
if(newData){
  document.querySelector("#clientId").textContent =
    getTranslationValue("header.profile_id") + " " + `#${newData?.contact}`;
}

}

window.translateValue = getTranslationValue;


