document.addEventListener('DOMContentLoaded', function () {
    const termsPopup = document.getElementById('terms-popup');
    const acceptButton = document.getElementById('accept-terms');
    const contentContainer = document.getElementById('content-container');
    const searchInput = document.getElementById('search-input');
    const clearSearchButton = document.getElementById('clear-search');
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
    if (shouldShowPopup('terms')) {
        termsPopup.style.display = 'flex';
    }

    acceptButton.addEventListener('click', function () {
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

    closeWelcomeButton.addEventListener('click', function () {
        welcomePopup.style.display = 'none';
        markPopupAsShown('welcome');
    });

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|iOS|iPadOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const termsLink = document.createElement('span');
    termsLink.textContent = "Termini d'Uso";
    termsLink.classList.add('terms-link');
    termsLink.style.cursor = 'pointer';
    termsLink.addEventListener('click', function () {
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

    function loadStylesheet(href, id) {
        const existing = document.getElementById(id);
        if (!existing) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.id = id;
            document.head.appendChild(link);
        }
    }

    function removeStylesheet(id) {
        const stylesheet = document.getElementById(id);
        if (stylesheet) {
            stylesheet.remove();
        }
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function applyStylesheets() {
        const isAccessibility = localStorage.getItem('accessibilityMode') === 'true';
        const version = getCookie('version') || 'desktop';

        removeStylesheet('mobile-style');
        removeStylesheet('accessible-style');
        removeStylesheet('main-style');

        loadStylesheet('style.css', 'main-style');

        if (version === 'mobile') {
            loadStylesheet('style-mobile.css', 'mobile-style');
            toggleVersionButton.textContent = 'Passa a versione desktop';
            if (searchInput) searchInput.placeholder = 'Cerca...';
        } else {
            toggleVersionButton.textContent = 'Passa a versione mobile';
            if (searchInput) searchInput.placeholder = 'Cerca con [CTRL] + S';
        }

        if (isAccessibility) {
            loadStylesheet('style-accessible.css', 'accessible-style');
            accessibilityToggle.checked = true;
        } else {
            accessibilityToggle.checked = false;
        }
    }

    accessibilityToggle.addEventListener('change', function () {
        localStorage.setItem('accessibilityMode', this.checked);
        applyStylesheets();
    });

    const toggleVersionButton = document.getElementById('toggle-version');
    toggleVersionButton.addEventListener('click', function () {
        const currentVersion = getCookie('version') || 'desktop';
        const newVersion = currentVersion === 'desktop' ? 'mobile' : 'desktop';
        setCookie('version', newVersion, 7);
        applyStylesheets();
    });

    applyStylesheets();

    function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = cardData.id;

    if (cardData.style) {
        for (const property in cardData.style) {
            card.style[property] = cardData.style[property];
        }
    }

    const isDesktop = !isMobileDevice();
    if (cardData.class && isDesktop) {
        card.classList.add(cardData.class);
    }

    const title = document.createElement('h3');
    title.textContent = cardData.title;
    card.appendChild(title);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    textContainer.innerHTML = marked.parse(cardData.text);

    const image = textContainer.querySelector('img');
    if (image && card.classList.contains('side-by-side')) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(image);

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');
        contentContainer.innerHTML = textContainer.innerHTML;

        textContainer.innerHTML = '';
        textContainer.appendChild(imageContainer);
        textContainer.appendChild(contentContainer);
    }

    contentWrapper.appendChild(textContainer);
    card.appendChild(contentWrapper);

    if (cardData.linkText && cardData.linkUrl) {
        const linkButton = document.createElement('a');
        linkButton.href = cardData.linkUrl;
        linkButton.textContent = cardData.linkText;
        linkButton.classList.add('card-link-button');
        card.appendChild(linkButton);
    }

    if (cardData.tags && cardData.tags.length > 0) {
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        cardData.tags.forEach(tagText => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.textContent = `#${tagText}`;
            tagsContainer.appendChild(tag);
        });
        card.appendChild(tagsContainer);
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

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();
            const tagsContainer = card.querySelector('.tags-container');
            let tagText = '';
            if (tagsContainer) {
                tagText = Array.from(tagsContainer.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase())
                    .join(' ');
            }

            const shouldShow = title.includes(searchTerm) || text.includes(searchTerm) || tagText.includes(searchTerm);

            if (shouldShow) {
                card.classList.remove('hidden', 'removed');
            } else {
                if (!card.classList.contains('hidden')) {
                    card.classList.add('hidden');
                    card.addEventListener('transitionend', function onTransitionEnd() {
                        card.classList.add('removed');
                        card.removeEventListener('transitionend', onTransitionEnd);
                    });
                }
            }
        });

        if (searchInput.value.length > 0) {
            clearSearchButton.classList.add('visible');
        } else {
            clearSearchButton.classList.remove('visible');
        }
    });

    clearSearchButton.addEventListener('click', function () {
        searchInput.value = '';
        const inputEvent = new Event('input');
        searchInput.dispatchEvent(inputEvent);
        clearSearchButton.classList.remove('visible');
    });

    function handleAnchor() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetCard = document.getElementById(hash);
            if (targetCard) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                window.scrollTo({
                    top: targetCard.offsetTop - headerHeight -5,
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

    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            searchInput.value = '';
            const inputEvent = new Event('input');
            searchInput.dispatchEvent(inputEvent);
            clearSearchButton.classList.remove('visible');
        }
    });

    function showDeviceRedirectPopup(message, switchToVersion, currentViewVersion, stayPreference) {
        const deviceRedirectPopup = document.createElement('div');
        deviceRedirectPopup.id = 'device-redirect-popup';
        deviceRedirectPopup.classList.add('popup');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const popupMessage = document.createElement('p');
        popupMessage.textContent = message;

        const switchButton = document.createElement('button');
        switchButton.textContent = `Passa alla versione ${switchToVersion}`;
        switchButton.addEventListener('click', function () {
            setCookie('version', switchToVersion, 7);
            applyStylesheets();
            deviceRedirectPopup.style.display = 'none';
        });

        const stayButton = document.createElement('button');
        stayButton.textContent = `Rimani sulla versione ${currentViewVersion}`;
        stayButton.addEventListener('click', function () {
            setCookie(stayPreference, 'true', 7);
            deviceRedirectPopup.style.display = 'none';
        });

        popupContent.appendChild(popupMessage);
        popupContent.appendChild(switchButton);
        popupContent.appendChild(stayButton);
        deviceRedirectPopup.appendChild(popupContent);
        document.body.appendChild(deviceRedirectPopup);

        deviceRedirectPopup.style.display = 'flex';
    }

    function handleDeviceVersionMismatch() {
        const isMobile = isMobileDevice();
        const version = getCookie('version') || 'desktop';
        const stayOnDesktop = getCookie('stayOnDesktop') === 'true';
        const stayOnMobile = getCookie('stayOnMobile') === 'true';

        if (isMobile && version === 'desktop' && !stayOnDesktop) {
            showDeviceRedirectPopup(
                'Abbiamo rilevato che stai utilizzando un dispositivo mobile. Vuoi passare alla versione ottimizzata per dispositivi mobili?',
                'mobile',
                'desktop',
                'stayOnDesktop'
            );
        } else if (!isMobile && version === 'mobile' && !stayOnMobile) {
            showDeviceRedirectPopup(
                'Abbiamo rilevato che stai utilizzando un dispositivo desktop. Vuoi passare alla versione ottimizzata per desktop?',
                'desktop',
                'mobile',
                'stayOnMobile'
            );
        }
    }

    handleDeviceVersionMismatch();
});
