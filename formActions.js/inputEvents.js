import { PhoneNumberValidation } from "../main.js";
import { addLogs } from "../utils/addLogs.js";
import { getTranslationValue } from "../utils/traduction.js";
import { showValidationError } from "../utils/validationError.js";
import { submitForm } from "./submitForm.js";

const conversationContainer = document.getElementById("conversation-container");
let userHasTyped = "";

export function sendTypingNotification(input) {
    if (input.closest("form[data-submitted]")) {
      return;
    }
  
    if (userHasTyped !== input.dataset.fieldId) {
      addLogs({
        action: "fill",
        element: "22",
        element_id: +input.dataset.fieldId,
        messageId: input.id.replace("floating_field_", ""),
      });
      userHasTyped = input.dataset.fieldId;
    }
  }
  let focused;
  export function sendFocusNotification(input) {
    if (input.closest("form[data-submitted]")) {
      return;
    }
    if (focused !== input.dataset.fieldId) {
      addLogs({
        action: "focus",
        element: "22",
        element_id: +input.dataset.fieldId,
        messageId: input.id.replace("floating_field_", ""),
      });
    }
    focused = input.dataset.fieldId;
  }

  conversationContainer.oninput = (event) => {
    let target = event.target.closest(".form-input");
    if (target) {
      sendTypingNotification(target);
    }
  };
  export const { data: countries } = await axios.get("countries.json");
  conversationContainer.addEventListener("focusin", (event) => {
    let target = event.target.closest(".form-input");
    if (target) {
      sendFocusNotification(target);
    }
  });

  






  conversationContainer.addEventListener("click", (event) => {
    let target = event.target.closest("button.btn1");
    if (target) {
      const form = event.target.closest("form");
  
      const inputs = form.querySelectorAll('input, select, textarea');
      // Iterate over the input fields and validate them
      let isValid = true;
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (!input.value) {
          isValid = false;
          showValidationError(
            input,
           "container.forms.required"
          );
          break;
        }
        if (input.type == "number" && isNaN(Number(input.value))) {
          isValid = false;
          showValidationError(
            input,
            "container.forms.phone"
          );
          break;
        }
        if (input.type === "date" && !isValidDate(input.value)) {
          isValid = false;
          showValidationError(input, "container.forms.date");
          break;
        }
        if (input.type == "country" && !isValidCountry(input.value)) {
          isValid = false;
          showValidationError(
            input,
            "container.forms.country"
          );
          break;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
        if (input.type == "email" && !emailRegex.test(input.value)) {
          isValid = false;
          showValidationError(
            input,
          "container.forms.email"
          );
          break;
        }
  
        if (input.type == "tel" && !PhoneNumberValidation) {
          isValid = false;
          showValidationError(
            input,
            "container.forms.phone"
          );
          break;
        }
      }
      if (isValid) {
        submitForm(target);
      }
    }
  });

  
conversationContainer.oninput = (event) => {
    let target = event.target.closest(".form-input");
    if (target) {
      sendTypingNotification(target);
    }
  };
  conversationContainer.addEventListener("focusin", (event) => {
    let target = event.target.closest(".form-input");
    if (target) {
      sendFocusNotification(target);
    }
  });

  
conversationContainer.addEventListener("focusin", (event) => {
  let target = event.target.closest(".form-input");
  if (target) {
    sendFocusNotification(target);
  }
});
// 
conversationContainer.oninput = (event) => {
  let target = event.target.closest(".form-input");
  if (target) {
    sendTypingNotification(target);
  }
};