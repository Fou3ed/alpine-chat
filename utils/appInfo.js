import { applicationName,logo } from "../env.js";

export function loadChatInformation() {
    // Update the title
    document.title = `${applicationName}`;
  
    // Update the favicon (assuming you have a favicon link in the HTML)
    const linkElement = document.getElementById('iconLink');
    if (linkElement) {
      linkElement.href = `images/${logo}`;
      linkElement.type = 'image/png';
    }



    const h1Element = document.getElementById('applicationName');
    if (h1Element) {
      h1Element.textContent = applicationName;
    }
  
    // Update the src attribute of the <img> tag
    const imgElement = document.getElementById('applicationLogo');
    if (imgElement) {
      imgElement.src = `images/${logo}`;
      imgElement.alt = `Logo ${applicationName}`;
    }

    const sideBaLogo = document.getElementById('sidebarLogo');
    if (sideBaLogo) {
        sideBaLogo.src = `images/${logo}`;
        sideBaLogo.alt = `Logo ${applicationName}`;
    }
  }