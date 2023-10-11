import { traduction,newData } from "../main.js";
export function getTranslationValue(key) {
  const translationValue = eval(`traduction.${key}`);
  
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

  // document.querySelector("#clientId").textContent =
  //   getTranslationValue("traduction.header.profile_id") + " " + `#${newData?.contact}`;
}