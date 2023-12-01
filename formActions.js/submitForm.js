import { applicationName, loginLink } from "../env.js";
import {
  newData,
  socketLib,
  conversationId,
  updateNewData,
  updateCodeLimit,
  limitCode,
} from "../main.js";
import { getTranslationValue, lan } from "../utils/traduction.js";
let emailValue;

export let formData = {};
export function submitForm(element) {
  let messageContent = element.closest('[id^="message-content-"]');
  let messageId = messageContent?.id?.replace("message-content-", "");
  const form = JSON.parse(element._form_data);
  let forms = [];
  const formContact = element.closest("form");
  const formContent = formContact.parentNode;

  const formInputs = formContact.querySelectorAll("input, select,textarea");
  const successMessage = formContact.querySelector("#text_capture");

  for (let i = 0; i < formInputs.length; i++) {
    forms.push({
      fieldId: formInputs[i].dataset.fieldId,
      value: formInputs[i].classList.contains("phoneInput")
        ? intlTelInputGlobals
            .getInstance(formInputs[i])
            .getNumber(intlTelInputUtils.numberFormat.E164)
        : formInputs[i].value,
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
        value: field.classList.contains("phoneInput")
          ? intlTelInputGlobals
              .getInstance(field)
              .getNumber(intlTelInputUtils.numberFormat.E164)
          : field.value,
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

  formData = JSON.stringify({
    contact: newData.contact,
    forms,
    messageId,
    form,
    conversationId,
    language: lan,
    messageId: messageId,
    formElement: element,
  });

  if (form.form_type == 1) {
    const emailField = form.fields.find((field) => field.field_type == 6);

if (emailField) {

  element.innerHTML = `<div class="form-spinner d-flex align-items-center" style="height: 20px; width:40px" ><span class="loader2"></span></div>`;

  emailValue = emailField.field_value;

  socketLib.verifyEmail({
    contact: newData.contact,
    forms,
    messageId,
    form,
    conversationId,
    language: lan,
    messageId: messageId,
    formElement: element,
    email: emailValue
  });

}



  


  } else {
    // element.innerHTML = `<div class="form-spinner d-flex align-items-center" style="height: 20px;" ><span class="loader2"></span></div>`;

    socketLib.saveFormData(
      JSON.stringify({
        contact: newData.contact,
        forms,
        messageId,
        form,
        conversationId,
        language: lan,
        messageId: messageId,
        formElement: element,
        email: emailValue,
        applicationName:applicationName,
        language:lan

      })
    );
  }
  // element.disabled = true;
  // formInputs.forEach((input) => {
  //   input.disabled = true;
  // });

  setTimeout(() => {
    successMessage?.classList.add("hidden");
  }, 3000);
}


export function openModalActivation(data){


   document.querySelector(".form-spinner").remove()
   const oldSubmitButton = document.getElementById(`submit-form-${data.messageId}`);
          oldSubmitButton.textContent=data.form.button
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
      <div class="modal-activation absolute  inset-0 bg-blue-500 transition-opacity duration-300"></div>
      <div class="modal-activation-relative relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
      <div class="absolute top-4 right-4 cursor-pointer" id="close-modal" style="right: 3px; top: 5px;">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700 dark:text-navy-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
  </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 crc-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="mt-3">
              <h2 class="text-2xl  text-blue-700 dark:text-navy-100">
                  ${getTranslationValue("modal.verification_code_title")}
              </h2>
              <p class="text-1xl  mt-1 mb-1 text-blue-700 dark:text-navy-100">
                  ${getTranslationValue("modal.verification_code_description")}
              </p>
              <span>${getTranslationValue("modal.verification_code_advise")}</span>
              <div class="mt-2">
                  <input type="text" id="verification-code-input" class="rounded-md px-3 py-2 border input-maxW" placeholder="${getTranslationValue("modal.verification_code_input")}">
              </div>
              <div class="mt-2">
              <a href="javascript:" id="re-send" class="text-sm font-light text-gray-500">
                  ${getTranslationValue("modal.verification_code_resend")}
              </a>
          </div>
              <button id="submit-button" class="btn mt-4 modal-activation font-medium text-white hover-bg-error-focus focus-bg-error-focus active-bg-error-focus/90">
                 ${getTranslationValue("modal.verification_code_save_button")}
              </button>
          </div>
          
      </div>
    </div>
  `;
  
      
      // Add an event listener to the close icon
      const closeModalIcon = modalDiv.querySelector("#close-modal");
      closeModalIcon.addEventListener("click", () => {
        modalDiv.remove();
  
      });
      
      
  
      const submitButton = modalDiv.querySelector("#submit-button");
      const verificationCodeInput = modalDiv.querySelector(
        "#verification-code-input"
      );
      const reSend = modalDiv.querySelector("#re-send");

      submitButton.addEventListener("click", () => {
        const formElement=data.element

        const verificationCode = verificationCodeInput.value;

  
        if (verificationCode.length > 0) {
          submitButton.innerHTML = `<div class="form-spinner d-flex align-items-center" style="height: 20px; width:40px" ><span class="loader2"></span></div>`;
  
        const  forms=data.forms
        const form=data.form
        const messageId=data.messageId

          socketLib.saveFormData(
            JSON.stringify({
              contact: newData.contact,
              forms,
              messageId,
              form,
              conversationId,
              language: lan,
              messageId: data.messageId,
              formElement: data.element,
              verificationCode: verificationCode,
              email: data.email,
              limitCode: limitCode,
              applicationName: applicationName,
              language:lan
            })
          );
      
          updateCodeLimit(limitCode);
          verificationCodeInput.value = ''; 
        }
      });
  
     
      let canClick=true;
      reSend.addEventListener("click", () => {
        if(canClick){     
          canClick=false
        const errorMessage = document.getElementById("code-verification-error");
        if(errorMessage){
          errorMessage.remove();
        }
        updateCodeLimit(4);
        socketLib.verifyEmail(emailValue);
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `<div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
          <div class="modal-activation absolute  inset-0 bg-blue-500 transition-opacity duration-300"></div>
          <div class="modal-activation-relative relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
              <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 crc-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="mt-4">
                  <h2 class="text-2xl text-blue-700 dark:text-navy-100">
                  ${getTranslationValue("mail_modal.mail_sent")}
                  </h2>
                  <p class="text-1xl text-blue-700 dark:text-navy-100">
                  Check your email for the verification code 
                  </p>
                 
                  <button id="close-button" class="btn mt-4 modal-activation font-medium text-white hover-bg-error-focus focus-bg-error-focus active-bg-error-focus/90">
                  ${getTranslationValue("mail_modal.confirm")}
  
                  </button>
              </div>
          </div>
      </div>`;
  
        document.body.appendChild(modalDiv);
  
        // Automatically close the modal after 5 seconds
        setTimeout(() => {
          modalDiv.remove();
        }, 5000);
        const verificationCodeInput = document.querySelector(
          "#verification-code-input"
        );
      
        verificationCodeInput.value = ''; 
  
        // Add event listener for the "confirm" button
        const confirmButton = modalDiv.querySelector("#close-button");
        confirmButton.addEventListener("click", () => {
          modalDiv.remove();
        });



        setTimeout(() => {
          canClick = true;
      }, 60000); // 1 minute in milliseconds
    }
      });
      document.body.appendChild(modalDiv);


      
}


export function submitFormStatus(status, text_capture, messageId, element) {
  const formElement = document.getElementById(`submit-form-${messageId}`);
  const formContact = formElement.parentNode;

  const formContent = formContact.parentNode;

  let statusMessage = formContent.querySelector("p");

  if (!statusMessage) {
    statusMessage = document.createElement("p");
    formContent.appendChild(statusMessage);
  }

  if (status) {
    if (newData.status == "0") {
      updateStatusInCookie();
    }

    const formContact = formElement.closest("form");
    const formContent = formContact.parentNode;
    const formInputs = formContact.querySelectorAll("input, select,textarea");

    formElement.innerHTML = `<div class="form-spinner d-flex align-items-center" style="height: 20px;" ><span class="loader2"></span></div>`;
    formInputs.forEach((inp) => {
      const formInput = element.forms.find(
        (a) => a.fieldId == inp.dataset.fieldId
      );
      if (formInput) {
        inp.value = formInput.value;
      }
    });

    formContent.style.opacity = 0.7;
    // Update the status message for success
    statusMessage.textContent = "";
    statusMessage.innerText = text_capture;
    statusMessage.style.color = "#22A699";
    // Open modal for success submit form
    formElement.remove();
    formContent.dataset.submitted = "true";
  } else {
    // formElement.disabled = false;
    // formInputs.forEach((input) => {
    //   input.disabled = false;
    // });
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
    updateNewData(cookieData);
  } else {
    console.log("Cookie  not found.");
  }
}
