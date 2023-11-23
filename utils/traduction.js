import { Countries } from "../countries.js";
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


  document.querySelectorAll("[data-country]" ).forEach((element) => {
    element.dispatchEvent(new Event('change'))

  });

let conversationTool = document.getElementById("cnvSideBarTool");
let buyTool = document.getElementById("buyMessagesTool");
let modeTool=document.getElementById("modeTool")
let toggleDrawerTool=document.getElementById("toggleDrawerButton")
// conversationTool.setAttribute('x-tooltip.placement.bottom.light', getTranslationValue("tooltips.conversationSideBar"));
if (lan.substring(0, 2).toLowerCase() === "en") {
  conversationTool.setAttribute('x-tooltip.placement.bottom.light', "'Conversation side bar'");
  buyTool.setAttribute('x-tooltip.placement.bottom.light', "'Buy messages'");
  modeTool.setAttribute('x-tooltip.placement.bottom.light', "'Dark Mode'");
  toggleDrawerTool.setAttribute('x-tooltip.placement.bottom.light', "'Expert SideBar'");
} else {
  conversationTool.setAttribute('x-tooltip.placement.bottom.light', "'Conversations Barre latérale'");
  buyTool.setAttribute('x-tooltip.placement.bottom.light', "'Acheter des messages'");
  modeTool.setAttribute('x-tooltip.placement.bottom.light', "'Mode sombre'");
  toggleDrawerTool.setAttribute('x-tooltip.placement.bottom.light', "'Barre latérale experte'");

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


