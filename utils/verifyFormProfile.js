import { showValidationError } from "./validationError.js";

export function verifyFormProfile() {
    const form = document.querySelector("#profileForm"); // Adjust the selector as needed
  
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
  
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
  
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
      // Call your form submission function here
      console.log("perfect")
    //   submitFormProfile();
    } else {
      console.log("Please fill in all fields correctly.");
    }
  }
  
 