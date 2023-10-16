import { Countries } from "../countries.js";
import { API_KEY, SQL_API } from "../env.js";
import { Languages } from "../languages.js";
import { getTranslationValue } from "../utils/traduction.js";
export const getAgentPresentation = async (id, online) => {
    try {
      const response = await axios.post(
        `${SQL_API}/presentationUser`,
        JSON.stringify({ id: id }),
        {
          headers: {
            key: `${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response",response)
      if (response?.status === 200) {
        const agentData = response.data.data[0];
        // Update skills
        const skillsContainer = document.querySelector(".skills");
        skillsContainer.innerHTML = "";
        if (Array.isArray(agentData?.skills)) {
          agentData?.skills.forEach((skill) => {
            const skillTag = `<span class="tag rounded-full bg-slate-150 text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">${skill ? skill : ""}</span>`;
            skillsContainer.insertAdjacentHTML("beforeend", skillTag);
          });
        } else if (typeof agentData?.skills === "string") {
          const skillTag = `<span class="tag rounded-full bg-slate-150 text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">${agentData?.skills ? agentData.skills : ""} </span>`;
          skillsContainer.insertAdjacentHTML("beforeend", skillTag);
        }
        if (online) {
          document.querySelector(".active-agent-bull").classList.remove("hidden");
        } else {
          document.querySelector(".active-agent-bull").classList.add("hidden");
        }
  
        // Update presentation
        // Make sure the DOM is ready before manipulating elements
        const presentationElement = document.querySelector(".presentation");
  
        if (presentationElement) {
          presentationElement.textContent = agentData?.presentation ? agentData.presentation : "";
        } else {
          console.error("Presentation element not found.");
        }
        
        // Update country
        const countryElement = document.querySelector(".country");
        let img = countryElement.parentElement.querySelector(".flag");
  
        if (!img) {
          img = document.createElement("img");
          img.classList.add("flag", "rounded-full", "h-4", "w-4");
          img.alt = "flag";
          countryElement.parentElement.insertBefore(img, countryElement);
        }
        if (agentData?.country) {
          countryElement.textContent = Countries.getName(
            agentData.country.toUpperCase()
          );
  
          const flagElement = document.querySelector(".flag");
          flagElement.src = `images/flags/${agentData.country.toLowerCase()}.svg`;
        } else {
          if (img) {
            img.remove();
          }
          countryElement.textContent = "";
        }
  
        // Update languages
        const languagesElement = document.querySelector(".languages");
        languagesElement.textContent = Languages.getName(
         agentData?.languages ? agentData.languages.toLowerCase() : ""
        );
  
        // Update contact phone
        const phoneElement = document.querySelector(".phone");
        phoneElement.textContent = agentData?.contact_phone;
  
        // Update contact email
        const emailElement = document.querySelector(".email");
        emailElement.href = `mailto:${agentData?.contact_mail}`;
        emailElement.textContent = agentData?.contact_mail ? agentData.contact_mail :"";
  
        // Update website
        const websiteElement = document.querySelector(".website");
        websiteElement.href = agentData?.website;
        websiteElement.textContent = agentData?.website;

     
        const phoneButton = document.querySelector('.btnPhone');
        const emailButton = document.querySelector('.btnemail');
        const websiteButton = document.querySelector('.btnwebsite');
        if (agentData?.contact_phone?.length > 0) {
          phoneButton.removeAttribute('disabled');
        } else {
          phoneElement.innerHTML = '<img src="../images/empty-folder.png" alt="Phone Icon">';
        }
      
        if (agentData?.contact_mail?.length > 0) {
          emailButton.removeAttribute('disabled');
        } else {
          emailElement.innerHTML = '<img src="../images/empty-folder.png" alt="Email Icon">';
        }
        if (agentData?.website?.length > 0) {
          websiteButton.removeAttribute('disabled');
        } else {
          websiteElement.innerHTML = '<img src="../images/empty-folder.png" alt="Website Icon">';
        }
        
        
        // if (!clicked) {
        //   let toggleButton = document.getElementById("toggleDrawerButton");
        //   if (toggleButton) {
        //     toggleButton.click();
        //     clicked = true;
        //   }
        // }
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      throw new Error("Error retrieving user information: " + error.message);
    }
  };
  