import { Countries } from "../countries.js";
import { API_KEY, SQL_API } from "../env.js";
import { newData } from "../main.js";
import { generateCountryOptions } from "./generateCountryOptions.js";
import { phoneList } from "./getPhoneList.js";
import { userCountry } from "./getUserCountry.js";
import { lan } from "./traduction.js";
let phoneNumber;
export async function getContactInfo() {

  const response = await axios.get(`${SQL_API}/getcontact/${newData.contact}`, {
    headers: {
      key: `${API_KEY}`,
    },
  });
  console.log("response : ",response.data.data[0])

phoneNumber=response.data.data[0].phone
  // Assuming you have the response data available


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
          name="Country" 
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
    console.log("houni",phoneNumber)
    const phoneInput = document.getElementById('floating_field_${messageId}');
  
    const inputContainer = document.createElement('div');
  
    inputContainer.innerHTML = `
      <label class="relative">
        <span></span>
        <input 
          class="form-input phoneInput  mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
          type="tel"

        />
      </label>
    `;
  
   
    phoneList(phoneInput);
  }
  
  
 