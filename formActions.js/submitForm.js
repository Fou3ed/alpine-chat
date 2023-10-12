import { newData, socketLib,conversationId, updateNewData } from "../main.js";
import { lan } from "../utils/traduction.js";

export let formElement = "";

export function submitForm(element) {
  formElement = element;
  let messageContent = element.closest('[id^="message-content-"]');
  let messageId = messageContent?.id?.replace("message-content-", "");
  const form = JSON.parse(element._form_data);
  let forms = [];
  const formContact = element.closest("form");
  const formContent = formContact.parentNode;

  const formInputs = formContact.querySelectorAll("input, select,textarea");
  const successMessage = formContact.querySelector("#text_capture");

  element.innerHTML = `<div class="d-flex align-items-center" style="height: 20px;" ><span class="loader2"></span></div>`;

  for (let i = 0; i < formInputs.length; i++) {
    forms.push({
      fieldId: formInputs[i].dataset.fieldId,
      value: formInputs[i].classList.contains('phoneInput') ? intlTelInputGlobals.getInstance(formInputs[i]).getNumber(intlTelInputUtils.numberFormat.E164) : formInputs[i].value,
    });
  }

  forms = [...formContact.querySelectorAll("input, select,textarea")].map(
    (field) => {
      let formField = form.fields.find(
        (fField) => fField.field_id == field.dataset.fieldId
      );
      if (formField) {
        formField.field_value = field.value;
      }
      return {
        fieldId: field.dataset.fieldId,
        value: field.value,
      };
    }
  );

  form.fields = form.fields.map((field) => {
    let fieldValue = forms.find((fild) => fild.fieldId == field.field_id);
    if (fieldValue) {
      field.field_value = fieldValue.value;
    }
    return field;
  });

  form.status = 1;
  form.messageId = messageId;

  socketLib.saveFormData(
    JSON.stringify({
      contact: newData.contact,
      forms,
      messageId,
      form,
      conversationId,
      language:lan,
    })
  );

  element.disabled = true;
  formInputs.forEach((input) => {
    input.disabled = true;
  });

  successMessage?.classList.remove("hidden");

  setTimeout(() => {
    successMessage?.classList.add("hidden");
  }, 3000);
}


export function submitFormStatus(status, text_capture) {
  
    const formContact = formElement.parentNode;
  
    const formContent = formContact.parentNode;
  
    let statusMessage = formContent.querySelector("p");
  
    if (!statusMessage) {
      statusMessage = document.createElement("p");
      formContent.appendChild(statusMessage);
    }
  
    const formInputs = formContact.querySelectorAll("input");
  
    if (status) {
      if (newData.status == "0") {
        updateStatusInCookie();
      }
  
      formContent.style.opacity = 0.7;
  
      // Update the status message for success
      statusMessage.textContent = "";
      statusMessage.innerText = text_capture;
      statusMessage.style.color = "#22A699";
      // Open modal for success submit form
      formElement.remove();
      formContent.dataset.submitted = "true";
    } else {
      formElement.disabled = false;
      formInputs.forEach((input) => {
        input.disabled = false;
      });
      formElement.innerHTML = "";
      formElement.innerHTML = "Try again";
      // Update the status message for failure
      statusMessage.dataset.translation = "container.forms.error";
      statusMessage.innerText = getTranslationValue("container.forms.error");
      statusMessage.style.color = "#F24C3D";
      // Open modal for fail submit form
    }
  }

  export function updateStatusInCookie() {
    const existingCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("myData="));
    if (existingCookie) {
      const cookieData = JSON.parse(existingCookie.split("=")[1]);
      cookieData.status = 1;
      document.cookie =
        "myData=" +
        JSON.stringify(cookieData) +
        "; expires=Tue, 31 Dec 9999 23:59:59 GMT; path=/";
        updateNewData(cookieData)
    } else {
      console.log("Cookie  not found.");
    }
  }
  