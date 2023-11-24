import { accountId } from "../env.js";
import { newData, socketLib } from "../main.js";
import { getTranslationValue } from "./traduction.js";





export function verifyPassword(){
    // Retrieve the values from the input fields
    let newPassword = $("#new_password_input").val();
    let confirmPassword = $("#confirm_password_input").val();
  
    const messageElement = document.getElementById("passwordChangeMessage");
    const buttonText = document.getElementById("buttonText");
    const spinner = document.getElementById("spinner");
  
    // Verify if any of the input fields is empty
    if (!newPassword || !confirmPassword) {
      messageElement.textContent = getTranslationValue("form_password.message_error_fill");
      messageElement.style.color = "red";
      return;
    }
    
  
    // Verify if newPassword has at least 8 characters
    if (newPassword.length < 8) {
      messageElement.textContent = getTranslationValue("form_password.message_error_char");
      messageElement.style.color = "red";

      return;
    }
  
    // Verify if new password and confirm password are identical
    if (newPassword === confirmPassword) {
      // Hide the button text and show the spinner
      buttonText.classList.add("hidden");
      spinner.classList.remove("hidden");
  
      // Call the changePassword function with the data
      socketLib.changePassword({new_password: newPassword, account_id: accountId, id: newData.contact });
    } else {
      messageElement.textContent = getTranslationValue("form_password.message_error_match");;
      messageElement.style.color = "red";
    }
}


export function changePassword(data) {
    const messageElement = document.getElementById("passwordChangeMessage");
    const newPasswordInput = document.getElementById("new_password_input");
    const confirmPasswordInput = document.getElementById("confirm_password_input");
    const buttonText = document.getElementById("buttonText");
    const spinner = document.getElementById("spinner");

    // Hide the spinner
    spinner.classList.add("hidden");
buttonText.classList.remove("hidden")
    if (data.success) {
      messageElement.textContent = getTranslationValue("form_password.message_success");
      messageElement.style.color = "green";

      oldPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";

      // Show the button text
      buttonText.style.display = "inline";
    } else {
      messageElement.textContent = getTranslationValue("form_password.message_error_verify");
      messageElement.style.color = "red";

      // Show the button text
      buttonText.style.display = "inline";
    }
  }
