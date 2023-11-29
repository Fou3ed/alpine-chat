import { initialFormData, newData, socketLib, updateFormData } from "../main.js";
import { validatePhoneNumber } from "./sideBarFrom.js";
import { getTranslationValue } from "./traduction.js";
import { showValidationError } from "./validationError.js";

export async function verifyFormProfile() {
  const form = document.querySelector("#profileForm"); 
  const formData = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  let isValid = true;
let isChanged=false
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    formData[input.name] = input.value || null;
        console.log(initialFormData[input.name] ," and ", formData[input.name])
    if (initialFormData[input.name] === formData[input.name] || 
      (initialFormData[input.name] && initialFormData[input.name]?.trim() === formData[input.name]?.trim())) {
    continue;
  }
  
    isChanged=true
    const messageElement = document.getElementById("ProfileSideBarForm");

    messageElement.textContent=""  
      if (input.value.trim() !== "") {
        if (input.type === "country" && !isValidCountry(input.value)) {
          isValid = false;
          showValidationError(input, "container.forms.country");
        }
  
        if (input.type === "date" && !isValidDate(input.value)) {
          isValid = false;
          showValidationError(input, "container.forms.date");
        }
  
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (input.type === "email" && !emailRegex.test(input.value)) {
          isValid = false;
          showValidationError(input, "container.forms.email");
        }
      }
      if(input.type=="tel" && input.value.length>0 ){
          isValid = validatePhoneNumber(input)     
       }  
  
    
  
  }
  if (initialFormData.country  && isValid && isChanged) {
    const spinner = document.getElementById("spinnerForm");
    const buttonText = document.getElementById("buttonTextProfile");
    buttonText.classList.add("hidden");
    spinner.classList.remove("hidden");

    socketLib.saveFormProfile({
      contact: newData.contact,
      firstname: formData?.first_name || null,
      lastname: formData?.last_name || null,
      email: formData?.email || null,
      country: formData?.country || null,
      phone: formData?.phone || null,
      gender: formData.gender || null ,
      name: formData?.first_name + " " + formData?.last_name || null,
      date_birth: formData?.date_birth || null
    });
  }else {
        const messageElement = document.getElementById("ProfileSideBarForm");
        messageElement.textContent = getTranslationValue("form.error_change");
        messageElement.style.color = "red";
        
  }
}


export function formProfileResult(response){
  const messageElement = document.getElementById("ProfileSideBarForm");
  const spinner = document.getElementById("spinnerForm");
  const buttonText = document.getElementById("buttonTextProfile");
      if(response.success){
        const usernameLink = document.getElementById("userName");
        if(response.data.firstname !==null){
          usernameLink.textContent = response.data.firstname + " " + response.data.lastname;
        }
         buttonText.classList.remove("hidden")
         spinner.classList.add("hidden");
         messageElement.textContent = getTranslationValue("form.success");
         messageElement.style.color = "green";
         updateFormData(response.data)
      }else {
        spinner.classList.add("hidden");
        buttonText.classList.remove("hidden")
        messageElement.textContent = getTranslationValue("container.forms.error");
        messageElement.style.color = "red";
      }
}