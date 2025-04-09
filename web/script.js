document.addEventListener('DOMContentLoaded', function() {
    const termsPopup = document.getElementById('terms-popup');
    const acceptButton = document.getElementById('accept-terms');
    const contentContainer = document.getElementById('content-container');
    const searchInput = document.getElementById('search-input');
    const siteFooter = document.querySelector('.site-footer');

    // Popup di benvenuto
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

    // Funzione per caricare e visualizzare il Markdown
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

    // Carica i termini d'uso dal file Markdown
    loadMarkdown('terms.md', 'terms-text');
    loadMarkdown('welcome.md', 'welcome-text');

    // Funzioni per gestire la visualizzazione dei popup una volta al giorno
    function shouldShowPopup(popupName) {
        const lastShown = localStorage.getItem(`${popupName}_lastShown`);
        const today = new Date().toDateString();
        return lastShown !== today;
    }

    function markPopupAsShown(popupName) {
        localStorage.setItem(`${popupName}_lastShown`, new Date().toDateString());
    }

    // Mostra il pop-up dei termini se non accettato e se non mostrato oggi
    const termsAccepted = localStorage.getItem('termsAccepted') === 'true';
    if (!termsAccepted && shouldShowPopup('terms')) {
        termsPopup.style.display = 'flex';
    }

    // Gestisci il click sul pulsante "Accetta" dei termini
    acceptButton.addEventListener('click', function() {
        termsPopup.style.display = 'none';
        localStorage.setItem('termsAccepted', 'true');
        markPopupAsShown('terms');
        if (shouldShowPopup('welcome')) {
            welcomePopup.style.display = 'flex';
            markPopupAsShown('welcome');
        }
    });

    // Mostra il pop-up di benvenuto all'apertura se i termini sono accettati e non è stato mostrato oggi
    if (termsAccepted && shouldShowPopup('welcome')) {
        welcomePopup.style.display = 'flex';
        markPopupAsShown('welcome');
    }

    // Gestisci il click sul pulsante "Inizia a Esplorare" del popup di benvenuto
    closeWelcomeButton.addEventListener('click', function() {
        welcomePopup.style.display = 'none';
        markPopupAsShown('welcome');
    });

    // Aggiungi il link ai termini d'uso nel footer
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

    // Gestione switch accessibilità
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    let mainStylesheet;
    let accessibilityStylesheet;

    // Funzione per caricare il foglio di stile
    function loadStylesheet(href, id) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        stylesheet.id = id;
        document.head.appendChild(stylesheet);
        return stylesheet;
    }

    // Funzione per rimuovere il foglio di stile
    function removeStylesheet(id) {
        const stylesheet = document.getElementById(id);
        if (stylesheet) {
            stylesheet.remove();
        }
    }

    // Verifica se la modalità accessibilità era attiva nell'ultima sessione
    const isAccessibilityModeActive = localStorage.getItem('accessibilityMode') === 'true';
    if (isAccessibilityModeActive) {
        removeStylesheet('main-style');
        accessibilityStylesheet = loadStylesheet('style-accessible.css', 'accessible-style');
        accessibilityToggle.checked = true;
    } else {
        mainStylesheet = loadStylesheet('style.css', 'main-style');
    }

    // Gestisci il cambiamento dello switch di accessibilità
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

    // Funzione per creare una card HTML (invariata)
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

    // Funzione per popolare le sezioni con le card (invariata)
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

    // Carica i dati e popola le sezioni (invariata)
    if (typeof cardData !== 'undefined') {
        populateSections(cardData);
    }

    // Funzione per la ricerca (invariata)
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

    // Gestione degli ID per gli URL (invariata)
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

    // Esegui handleAnchor all'apertura della pagina e quando cambia l'hash nell'URL (invariata)
    window.addEventListener('load', handleAnchor);
    window.addEventListener('hashchange', handleAnchor);

    // Scorciatoia da tastiera per la ricerca (invariata)
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            searchInput.focus();
        }
    });

    // Scorciatoia da tastiera per cancellare la ricerca (invariata)
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
