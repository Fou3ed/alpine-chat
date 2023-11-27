import { getTranslationValue } from "../utils/traduction.js";

export const accountExist = (data) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    // loader.style.display = "none";

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const alertText = document.createElement('p');
    alertText.classList.add('alert-text');
    alertText.textContent = 'account Exist. Press reload to try again.';

    const reloadButton = document.createElement('button');
    reloadButton.classList.add('reload-button');
    reloadButton.textContent = 'Reload';

    reloadButton.addEventListener('click', () => {
      location.reload();
    });

    // Assemble the modal content
    modalContent.appendChild(alertText);
    modalContent.appendChild(reloadButton);

    // Assemble the modal overlay
    modalOverlay.appendChild(modalContent);

    // Append the modal overlay to the body
    document.body.appendChild(modalOverlay);
 
}
