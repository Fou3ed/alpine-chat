import { API_KEY, SQL_API, TOKEN } from "../env.js";
import { newData, socketLib } from "../main.js";
import { getTranslationValue } from "./traduction.js";
import { showValidationError } from "./validationError.js";

export async function verifyFormProfile() {
    const form = document.querySelector("#profileForm"); // Adjust the selector as needed
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
  
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      formData[input.name] = input.value;

      if (!input.value) {
        isValid = false;
        showValidationError(input, "container.forms.valid"); // Customize the error message
        break;
      }
  
      // You can add more validation conditions based on input type if needed
  
      if (input.type == "country" && !isValidCountry(input.value)) {
        isValid = false;
        showValidationError(
          input,
          "container.forms.country"
        );
        break;
      }

      if (input.type === "date" && !isValidDate(input.value)) {
        isValid = false;
        showValidationError(input, "container.forms.date");
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

    
    }
  
    if (isValid) {
      const spinner = document.getElementById("spinnerForm");
      const buttonText = document.getElementById("buttonTextProfile");

      buttonText.classList.add("hidden");
      spinner.classList.remove("hidden");
        socketLib.saveFormProfile({
          contact:newData.contact,
          firstname: formData?.first_name,
        lastname: formData?.last_name,
        email: formData?.email,
        country: formData?.country,
        phone: formData?.phone,
        gender:formData.gender,
        name:formData?.first_name + " " +  formData?.last_name,
        date_birth:formData.date_birth
        })
      
  }
  
}

export function formProfileResult(response){
  const messageElement = document.getElementById("ProfileSideBarForm");
  const spinner = document.getElementById("spinnerForm");
  const buttonText = document.getElementById("buttonTextProfile");

      if(response.success){
        const usernameLink = document.getElementById("userName");
        usernameLink.textContent = response.data.name;

         buttonText.classList.remove("hidden")
         spinner.classList.add("hidden");
         messageElement.textContent = getTranslationValue("form.success");
         messageElement.style.color = "green";

      }else {
        spinner.classList.add("hidden");
        buttonText.classList.remove("hidden")
        messageElement.textContent = getTranslationValue("container.forms.error");
        messageElement.style.color = "red";
       
      }
}