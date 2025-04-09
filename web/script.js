document.addEventListener('DOMContentLoaded', function() {
    const termsPopup = document.getElementById('terms-popup');
    const acceptButton = document.getElementById('accept-terms');
    const contentContainer = document.getElementById('content-container');
    const searchInput = document.getElementById('search-input');
    const siteFooter = document.querySelector('.site-footer');

    const welcomePopup = document.createElement('div');
    welcomePopup.id = 'welcome-popup';
    welcomePopup.classList.add('popup');
    const welcomeContent = document.createElement('div');
    welcomeContent.classList.add('popup-content');
    const welcomeTitle = document.createElement('h2');
    welcomeTitle.textContent = 'Benvenuto nella Documentazione DB!';
    const welcomeTextDiv = document.createElement('div');
    welcomeTextDiv.id = 'welcome-text';
    const closeWelcomeButton = document.createElement('button');
    closeWelcomeButton.id = 'close-welcome';
    closeWelcomeButton.textContent = 'Inizia a Esplorare';

    welcomeContent.appendChild(welcomeTitle);
    welcomeContent.appendChild(welcomeTextDiv);
    welcomeContent.appendChild(closeWelcomeButton);
    welcomePopup.appendChild(welcomeContent);
    document.body.appendChild(welcomePopup);

    const devicePopup = document.getElementById('device-redirect-popup') || document.createElement('div');
    if (!devicePopup.id) {
        devicePopup.id = 'device-redirect-popup';
        devicePopup.classList.add('popup');
        const deviceContent = document.createElement('div');
        deviceContent.classList.add('popup-content');
        const deviceTitle = document.createElement('h2');
        const deviceMessage = document.createElement('p');
        const acceptDeviceButton = document.createElement('button');
        const rejectDeviceButton = document.createElement('button');

        deviceContent.appendChild(deviceTitle);
        deviceContent.appendChild(deviceMessage);
        deviceContent.appendChild(acceptDeviceButton);
        deviceContent.appendChild(rejectDeviceButton);
        devicePopup.appendChild(deviceContent);
        document.body.appendChild(devicePopup);
    }

    function loadMarkdown(filePath, elementId) {
        fetch(filePath)
            .then(response => response.text())
            .then(markdown => {
                document.getElementById(elementId).innerHTML = marked.parse(markdown);
            })
            .catch(error => {
                console.error('Errore nel caricamento del file Markdown:', error);
                document.getElementById(elementId).textContent = 'Impossibile caricare il contenuto.';
            });
    }

    loadMarkdown('terms.md', 'terms-text');
    loadMarkdown('welcome.md', 'welcome-text');

    function shouldShowPopup(popupName) {
        const lastShown = localStorage.getItem(`${popupName}_lastShown`);
        const today = new Date().toDateString();
        return lastShown !== today;
    }

    function markPopupAsShown(popupName) {
        localStorage.setItem(`${popupName}_lastShown`, new Date().toDateString());
    }

    const termsAccepted = localStorage.getItem('termsAccepted') === 'true';
    if (!termsAccepted && shouldShowPopup('terms')) {
        termsPopup.style.display = 'flex';
    }

    acceptButton.addEventListener('click', function() {
        termsPopup.style.display = 'none';
        localStorage.setItem('termsAccepted', 'true');
        markPopupAsShown('terms');
        if (shouldShowPopup('welcome')) {
            welcomePopup.style.display = 'flex';
            markPopupAsShown('welcome');
        }
    });

    if (termsAccepted && shouldShowPopup('welcome')) {
        welcomePopup.style.display = 'flex';
        markPopupAsShown('welcome');
    }

    closeWelcomeButton.addEventListener('click', function() {
        welcomePopup.style.display = 'none';
        markPopupAsShown('welcome');
    });

    const termsLink = document.createElement('span');
    termsLink.textContent = 'Termini d\'Uso';
    termsLink.classList.add('terms-link');
    termsLink.style.cursor = 'pointer';
    termsLink.addEventListener('click', function() {
        termsPopup.style.display = 'flex';
    });

    const contactInfo = siteFooter.querySelector('p');
    const existingTermsLinks = contactInfo.querySelectorAll('.terms-link');
    existingTermsLinks.forEach(link => link.remove());
    const separator = document.createTextNode(' | ');
    contactInfo.appendChild(separator);
    contactInfo.appendChild(termsLink);
    contactInfo.appendChild(separator);

    const accessibilityToggle = document.getElementById('accessibility-toggle');
    let mainStylesheet;
    let accessibilityStylesheet;

    function loadStylesheet(href, id) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        stylesheet.id = id;
        document.head.appendChild(stylesheet);
        return stylesheet;
    }

    function removeStylesheet(id) {
        const stylesheet = document.getElementById(id);
        if (stylesheet) {
            stylesheet.remove();
        }
    }

    const isAccessibilityModeActive = localStorage.getItem('accessibilityMode') === 'true';
    if (isAccessibilityModeActive) {
        removeStylesheet('main-style');
        accessibilityStylesheet = loadStylesheet('style-accessible.css', 'accessible-style');
        accessibilityToggle.checked = true;
    } else {
        mainStylesheet = loadStylesheet('style.css', 'main-style');
    }

    accessibilityToggle.addEventListener('change', function() {
        if (this.checked) {
            removeStylesheet('main-style');
            accessibilityStylesheet = loadStylesheet('style-accessible.css', 'accessible-style');
        } else {
            removeStylesheet('accessible-style');
            mainStylesheet = loadStylesheet('style.css', 'main-style');
        }
        localStorage.setItem('accessibilityMode', this.checked);
    });

    function createCard(cardData) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = cardData.id;

        if (cardData.style) {
            for (const property in cardData.style) {
                card.style[property] = cardData.style[property];
            }
        }

        const title = document.createElement('h3');
        title.textContent = cardData.title;

        const text = document.createElement('p');
        text.innerHTML = marked.parse(cardData.text);

        card.appendChild(title);
        card.appendChild(text);

        if (cardData.linkText && cardData.linkUrl) {
            const linkButton = document.createElement('a');
            linkButton.href = cardData.linkUrl;
            linkButton.textContent = cardData.linkText;
            linkButton.classList.add('card-link-button');
            card.appendChild(linkButton);
        }

        return card;
    }

    function populateSections(data) {
        const sections = {};
        data.forEach(item => {
            if (!sections[item.section]) {
                const section = document.createElement('section');
                section.id = `sezione-${item.section.toLowerCase().replace(/ /g, '-')}`;
                const titles = document.createElement('h2');
                titles.innerHTML = item.section;
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('card-container');
                section.appendChild(titles);
                section.appendChild(cardContainer);
                contentContainer.appendChild(section);
                sections[item.section] = cardContainer;
            }
            const card = createCard(item);
            sections[item.section].appendChild(card);
        });
    }

    if (typeof cardData !== 'undefined') {
        populateSections(cardData);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    function handleAnchor() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetCard = document.getElementById(hash);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const targetSection = document.getElementById(hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    window.addEventListener('load', handleAnchor);
    window.addEventListener('hashchange', handleAnchor);

    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            searchInput.value = '';
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });

    function isMobileOrTablet() {
        const userAgent = navigator.userAgent.toLowerCase();
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|mobi|tablet|ipad|playbook|silk/i.test(userAgent);
    }

    function isTablet() {
        const userAgent = navigator.userAgent.toLowerCase();
        return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(?!.*mobile))|kindle|playbook|silk)/i.test(userAgent);
    }

    const mobileUrl = 'https://simdlldev.github.io/DB-Docs/mobile/main.html';
    const desktopUrl = 'https://simdlldev.github.io/DB-Docs/web/main.html';

    const isMobileDevice = isMobileOrTablet();
    const isTabletDevice = isTablet();
    const isDesktopDevice = !isMobileDevice && !isTabletDevice;
    const isOnMobileUrl = window.location.href.includes('/mobile/');
    const isOnDesktopUrl = window.location.href.includes('/web/');

    if (isMobileDevice || isTabletDevice) {
        if (isOnDesktopUrl) {
            deviceTitle.textContent = 'Versione Mobile Ottimizzata Disponibile';
            deviceMessage.textContent = 'Sembra che tu stia utilizzando un dispositivo mobile. Vuoi passare alla versione ottimizzata per mobile?';
            acceptDeviceButton.textContent = 'Vai alla Versione Mobile';
            rejectDeviceButton.textContent = 'Rimani qui';
            devicePopup.style.display = 'flex';

            acceptDeviceButton.addEventListener('click', function() {
                window.location.href = mobileUrl;
            });

            rejectDeviceButton.addEventListener('click', function() {
                devicePopup.style.display = 'none';
            });
        }
    } else if (isDesktopDevice) {
        if (isOnMobileUrl) {
            deviceTitle.textContent = 'Versione Desktop Disponibile';
            deviceMessage.textContent = 'Stai visualizzando la versione mobile su un dispositivo desktop. Vuoi passare alla versione desktop?';
            acceptDeviceButton.textContent = 'Vai alla Versione Desktop';
            rejectDeviceButton.textContent = 'Rimani qui';
            devicePopup.style.display = 'flex';

            acceptDeviceButton.addEventListener('click', function() {
                window.location.href = desktopUrl;
            });

            rejectDeviceButton.addEventListener('click', function() {
                devicePopup.style.display = 'none';
            });
        }
    }
});
