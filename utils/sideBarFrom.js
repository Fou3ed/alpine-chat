import { Countries } from "../countries.js";
import { API_KEY, SQL_API } from "../env.js";
import { initialFormData, newData, updatePhNValidation } from "../main.js";
import { generateCountryOptions } from "./generateCountryOptions.js";
import { userCountry } from "./getUserCountry.js";
import { getTranslationValue, lan } from "./traduction.js";
import { showValidationError } from "./validationError.js";
let phoneNumber;
let iti;


export async function getContactInfo() {

  const response = await axios.get(`${SQL_API}/getcontact/${newData.contact}`, {
    headers: {
      key: `${API_KEY}`,
    },
  });

phoneNumber=response.data.data[0].phone

 // Store initial values
 initialFormData.first_name = response.data.data[0].firstname || null;
 initialFormData.last_name = response.data.data[0].lastname || null;
 initialFormData.email = response.data.data[0].email || null;
 initialFormData.country = response.data.data[0].country || null;
 initialFormData.phone = response.data.data[0].phone || null;
 initialFormData.gender = response.data.data[0].gender || null;
 initialFormData.date_birth = response.data.data[0].date_birth || null ;

// Update the input values based on the response data
if (response.data.data[0].firstname) {
  document.getElementById('first_name_input').value = response.data.data[0].firstname;
}

if (response.data.data[0].lastname) {
  document.getElementById('last_name_input').value = response.data.data[0].lastname;
}

if (response.data.data[0].email) {
  document.getElementById('email_input').value = response.data.data[0].email;
}

if (response.data.data[0].country) {
  document.getElementById('country_input').value = response.data.data[0].country;
}

if (response.data.data[0].phone) {
  document.getElementById('floating_field_${messageId}').value = response.data.data[0].phone;
}
if(response.data.data[0].gender){
  document.getElementById('gender_input').value=response.data.data[0].gender
}
if(response.data.data[0].date_birth){
  document.getElementById('birth_date_input').value=response.data.data[0].date_birth
}

document.getElementById("birth_date_input").placeholder=getTranslationValue("date_format.date_form")

}



export function replaceCountryInput() {
    const countryInput = document.getElementById('country_input');
  
    const selectContainer = document.createElement('div');
  
    const countryOptions = generateCountryOptions(
      Countries.list()[lan.substring(0, 2).toLowerCase()],
       userCountry
    );
  
    selectContainer.innerHTML = `
      <label class="relative">
        <span></span>
        <select 
          id="country_input"
          data-country
          class="form-input  mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
          name="country" 
          required
          
        >
          <option value="">Select a country</option>
          ${countryOptions}
        </select>
      </label>
    `;
  
    countryInput.parentNode.replaceChild(selectContainer.firstElementChild, countryInput);
  }
  

  export function replacePhoneInput( ) {
    const phoneInput = document.getElementById('floating_field_${messageId}');
  
    const inputContainer = document.createElement('div');
  
    inputContainer.innerHTML = `
      <label class="relative">
        <span></span>
        <input 
          class="form-input phoneInput  mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
          type="tel",
          name="phone"

        />
      </label>
    `;
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
     iti = window.intlTelInput(phoneInput, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
      initialCountry: userCountry.toLowerCase(),
      separateDialCode:true,
  
    });
    
  }


  export function validatePhoneNumber(input) {
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
      return false
    } else {
      return true
    }
  }

  