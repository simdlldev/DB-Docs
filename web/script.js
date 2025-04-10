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
    if (/*!termsAccepted && */shouldShowPopup('terms')) {
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

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        const deviceRedirectPopup = document.createElement('div');
        deviceRedirectPopup.id = 'device-redirect-popup';
        deviceRedirectPopup.classList.add('popup');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const message = document.createElement('p');
        message.textContent = 'Sembra che tu stia utilizzando un dispositivo mobile. Vuoi visualizzare la versione mobile del sito?';

        const goToMobileButton = document.createElement('button');
        goToMobileButton.textContent = 'Vai alla versione mobile';
        goToMobileButton.addEventListener('click', function() {
            window.location.href = 'https://simdlldev.github.io/DB-Docs/mobile/main.html';
        });

        const stayHereButton = document.createElement('button');
        stayHereButton.textContent = 'Rimani qui';
        stayHereButton.addEventListener('click', function() {
            deviceRedirectPopup.style.display = 'none';
        });

        popupContent.appendChild(message);
        popupContent.appendChild(goToMobileButton);
        popupContent.appendChild(stayHereButton);
        deviceRedirectPopup.appendChild(popupContent);
        document.body.appendChild(deviceRedirectPopup);

        deviceRedirectPopup.style.display = 'flex';
    }

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
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                window.scrollTo({
                    top: targetCard.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
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
});
