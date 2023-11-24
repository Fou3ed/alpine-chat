import { updatePhNValidation } from "../main.js";
import { userCountry } from "./getUserCountry.js";
import { getTranslationValue } from "./traduction.js";
import { showValidationError } from "./validationError.js";
export function phoneList(input) {
    let form = input.closest("form");
    let iti = window.intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
      initialCountry: userCountry.toLowerCase(),
      separateDialCode:true,
  
    });
    let selectedCountryData = iti.getSelectedCountryData();
    function validatePhoneNumber() {
      let phoneNumber = input.value;
      if (phoneNumber.startsWith("+")) {
        if (phoneNumber.startsWith("+" + selectedCountryData.dialCode)) {
          showValidationError(
            input,
            "container.forms.phone"
          );
          return;
        }
      } else {
        input.value = phoneNumber;
      }
      let valid = iti.isValidNumber(phoneNumber);
      updatePhNValidation(true)
      if (!valid) {
        updatePhNValidation(false)
       
        showValidationError(
          input,
          "container.forms.phone"
        );
      } else {
      }
    }
  
    input.addEventListener("input", validatePhoneNumber);
  
    input.addEventListener("blur", validatePhoneNumber);
  
    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        let valid = iti.isValidNumber(input.value);
        if (!valid) {
          showValidationError(
            input,
          "container.forms.phone"
          );
        }
      },
      false
    );
  }