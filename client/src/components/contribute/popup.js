export function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.textContent = message;

    const okButton = document.createElement('button');
    okButton.classList.add('btn', 'waves-effect', 'waves-light', 'ok-button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        popup.remove();
    });

    popupContent.appendChild(okButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}