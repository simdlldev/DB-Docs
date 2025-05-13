const cardData = [
    {
        section: "Introduzione",
        id: "welcome",
        title: "Benvenuti",
        text: "**DB Docs** è appena stato trasferito su `GitHub` per continuare a proporti contenuti di qualità e offrire un'esperienza migliore",
        tags: ["annuncio", "novità"],
        style: { backgroundColor: 'rgba(255, 150, 150, 0.5)' },
        //linkUrl: "https://goo.gle",
        //linkText: "Google"
    },
    {
        section: "Informazioni Generali",
        id: "info",
        title: "Info",
        text: "Questa pagina contiene tutta la documentazione utile a comprendere la logica della progettazione dei database (DB) con il modello E-R. La documentazione inizia dalla sezione Le basi 1: Cos'è un DB?. È possibile trovare il significato e la spiegazione di alcuni termini (indicati così: [Dizionario<sup>{cos'è?}</sup>](#sezione-dizionario)) nel Dizionario.<br>È possibile accedere alla documentazione a questo link: [**bit.ly/db_docs-web**](https://bit.ly/db_docs-web) **|** Fallback link: [t.ly/0yDmY](https://t.ly/0yDmY)",
        tags: ["info"],
        style: { backgroundColor: 'rgba(150, 255, 150, 0.5)' },
    },
    {
        section: "Le Basi 1 - Cos'è un DB?",
        id: "basi-1.1",
        title: "A cosa servono i DB?",
        text: "I **DB** sono usati prevalentemente in ambito aziendale, quindi sono poco conosciuti agli utenti comuni. Lo scopo principale dei DB è quello di archiviare dei dati. Tuttavia, questi dati devono essere salvati in modo da permetterne un accesso facile e veloce. La figura del **DB Admin** si occupa proprio di questo: progettare, creare e mantenere uno o più DB. Per la progettazione di un DB, è fondamentale assicurarsi che i dati salvati in un DB siano **indipendenti** dalle applicazioni collegate al DB. Questo significa che una modifica nella struttura del DB non richieda una modifica al codice del <a href='#frontend' target='_blank'>frontend<sup>{cos'è?}</sup></a>. Nei DB, la definizione dei dati e i dati stessi sono salvati all’interno dello stesso database. Inoltre, è importante che i dati salvati nel DB *non* siano **ridondanti**, ovvero che non ci siano duplicati (inutili) dei dati. I dati salvati nei DB devono essere anche **coerenti**, **consistenti** e deve essere possibile un **accesso e modifica simultanea** da più utenze.",
        tags: ["DB", "DB Admin"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' },
    },
    {
        section: "Le Basi 1 - Cos'è un DB?",
        id: "basi-1.2",
        title: "Progettazione di un DB",
        text: "La gestione complessiva di un DB è affidata a un **DBMS** (*DataBase Managment System*, *Sistema di Gestione DataBase*), un software apposito che si occupa della gestione dei dati e della loro *memorizzazione fisica* (su un supporto di archiviazione).<br>I passi principali per progettare un database si possono così schematizzare:<br>1. Analisi del problema;<br>2. Progettazione concettuale del database (*modello E-R*);<br>3. Progettazione logica del database (*schema logico*);<br>4. Progettazione fisica e implementazione;<br>5. Realizzazione delle applicazioni. Per la progettazione concettuale il modello più diffuso è L'**E-R** (*Entità-Relazione*)",
        tags: ["DBMS", "DB", "progettazione DB"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le Basi 1 - Cos'è un DB?",
        id: "basi-1.3",
        title: "Modellazione logica di un DB",
        text: "Esistono diversi tipi di modelli logici:<br>• gerarchico, rappresentabile tramite un albero (anni ‘60);<br>• reticolare, rappresentabile tramite un grafo (anni ‘60);<br>• **relazionale**, attualmente il più diffuso, rappresentabile mediante tabelle e relazioni tra esse (anni ‘70);<br>• a oggetti, che è una estensione alle basi di dati del paradigma “Object-Oriented”, tipico della programmazione a oggetti (anni ‘80);<br>• XML, molto utilizzato come strumento per l’esportazione di dati tra diverse applicazioni (anni‘90).",
        tags: ["modello logico", "modello relazionale"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le Basi 2 - Componenti di un DB",
        id: "basi-2.4",
        title: "Quali sono le caratteristiche del modello E-R? - Entità",
        text: "Le **entità** sono gli oggetti principali su cui vengono raccolte le informazioni. Ogni *entità* del **modello E-R** serve a rappresentare graficamente un concetto, concreto o astratto, del mondo reale. Un’*entità* può essere una persona, una macchina, un posto o un evento al quale sono associati dei dati. Le *entità* sono “le candidate” a diventare le tabelle del DB relazionale. Le entità si dividono in **forti** e **deboli**. Un'*entità* si definisce forte se non ha bisogno di altre entità per essere definita, al contrario delle entità deboli, che necessitano di altre entità per essere definite.<br>&nbsp; Esempio: *Dipendente* e *Stipendio*<br>&nbsp; L'entità *Dipendente* non ha bisogno di altre entità per essere definita, mentre l'entità *Stipendio* dipende dall'entità *Dipendente* per poter essere definita.",
        tags: ["entità"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le Basi 2 - Componenti di un DB",
        id: "basi-2.1",
        title: "Da cosa sono composte le entità? - Istanze ed attributi",
        text: "Un'entità (paragonabile a una tabella) è formata da una o più istanze, che a loro volta sono formate dagli attributi.<br>Esempio: L'entità Dipendente è formata da diversi attributi (nome, cognome, età, ecc). Invece, un'istanza dell'entità è formata da un insieme degli attributi. Se si pensa al DB come a una tabella, si può dire che l'entità è la tabella, gli attributi sono i nomi delle colonne e le istanze sono le righe.<br>Esistono anche le **entità associative**, che mettono in relazione due o più entità distinte per poterle identificare correttamente (rapporto *molti-a-molti*).",
        tags: ["istanze", "attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le Basi 2 - Componenti di un DB",
        id: "basi-2.2",
        title: "Classificazione degli attributi - 1",
        text: "Gli **attributi** si possono dividere inizialmente in: **identificatori** (**chiavi**) o **descrittori** e **scalari** o **multipli**. Gli attributi *identificatori*, anche detti *chiavi*, permettono di identificare univocamente un'istanza di un'entità (una riga di una tabella), per esempio un ID o il CF<sup>{cos'è}/Wikipedia</sup>. Invece i *descrittori* descrivono una caratteristica non unica di un'istanza, per esempio nome e cognome. Gli *attributi scalari* possono avere un solo valore nell'istanza (per esempio: luogo di nascita), mentre i *multipli* possono avere più valori nell'istanza (per esempio: lingue_parlate).",
        tags: ["attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le Basi 2 - Componenti di un DB",
        id: "basi-2.3",
        title: "Classificazione degli attributi - 2",
        text: "Gli attributi possono anche essere classificati in base alla loro natura.<br>&nbsp; **Semplice** (*atomico*): Non è ulteriormente scomponibile, elementare.<br>&nbsp; **Composto**: È costituito da un insieme di componenti.<br>&nbsp; **Opzionale** (*parziale*): È possibile la sua assenza, cioè potrebbe non esistere in qualche istanza.<br>&nbsp; **Obbligatorio** (*totale*): È l’opposto di opzionale, deve sempre essere presente un suo valore in ogni istanza.<br>&nbsp; **Costante** (*statico*): I valori non possono essere cambiati per tutto il “ciclo di vita” dell’attributo.<br>&nbsp; **Modificabile** (dinamico): È l’opposto di costante, cioè i suoi valori possono venire modificati.<br>&nbsp; **Calcolato**: Il valore è calcolato con un algoritmo.<br>&nbsp; **Esplicito**: È l’opposto di calcolato.<br>&nbsp; **Unico** (*univoco*): Tutte le istanze della classe hanno valore diverso.<br>&nbsp; **Generico** (*multivalore*): È l’opposto di unico.<br>&nbsp; **Temporale**: Alcuni attributi hanno una validità temporale, cioè dopo un certo tempo non hanno più significatività se non per l’archivio storico.",
        tags: ["attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 3: Tipologia dei dati",
        id: "basi-3.1",
        title: "Dominio degli attributi",
        text: "Gli **attributi** devono avere un **dominio**, ovvero un *insieme di valori* che ogni componente dell'*istanza* può assumere. Il dominio può essere scomposto in: tipo di dato, lunghezza, intervallo e valore di default. Se un attributo è opzionale, il campo valorizzato dell'istanza dovrà essere impostato su [null<sup>{cos'è?}</sup>](#man-valore-null).",
        tags: ["dominio", "attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 3: Tipologia dei dati",
        id: "basi-3.2",
        title: "I vincoli degli attributi",
        text: "I **vincoli** servono a controllare i valori inseriti nel DB. Non hanno una rappresentazione grafica nel modello E-R, ma sono descritti a parte. Si possono dividere in due tipi: **statici** e **dinamici**. I *vincoli statici* vengono verificati solo all'inserimento nel DB (per esempio dei codici composti calcolabili a partire da altri dati). Invece i *vincoli dinamici* vengono controllati periodicamente (per esempio la scadenza di un prodotto). Gli attributi possono essere validati (controllati) sia in fase di caricamento dei dati che in fase di aggiornamento; in fase di interrogazione; periodicamente per quegli attributi che hanno vincoli dinamici.",
        tags: ["vincoli", "attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 3: Tipologia dei dati",
        id: "basi-3.3",
        title: "Inclusione degli attributi nel diagramma E-R",
        text: "Per ogni attributo bisogna quindi individuare:<br>• il formato, che indica il tipo di valori che assume;<br>• la dimensione, che è un numero che indica la quantità massima di caratteri o cifre inseribili, e il suo dominio;<br>• l’opzionalità, che indica la possibilità di non essere sempre valorizzato:<br><span style='white-space: pre;'>     </span>- l’attributo è obbligatorio se deve avere un valore non nullo (per esempio il nome di una persona);<br><span style='white-space: pre;'>     </span>  - l’attributo è facoltativo se sono accettabili valori nulli (per esempio il titolo di studio di una persona)",
        tags: ["attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 3: Tipologia dei dati",
        id: "basi-3.4",
        title: "Cardinalità e obbligatorietà degli attributi",
        text: "È importante anche definire la <markblue>cardinalità</markblue> degli attributi di un'entità. La *cardinalità minima* può essere **0** o **1**: **0** se è opzionale e **1** se l'attributo è obbligatorio. Invece la *cardinalità massima* è un numero compreso tra **1** ed ***n***: **1** se l'attributo è *monovalore* e ***n*** se è *multivalore*.",
        tags: ["cardinalità", "attributi"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 4: Le chiavi",
        id: "basi-4.1",
        title: "Cos'è un attributo chiave? - Chiavi primarie",
        text: "Un attributo può essere definito **attributo chiave** (o semplicemente **chiave**) solo se soddisfa le seguenti caratteristiche:<br>• è obbligatorio, unico ed esplicito;<br>• non è ammesso il valore [null<sup>{cos'è}</sup>](#man-valore-null);<br>• non è modificabile.<br>In un'entità possono anche essere presenti più attributi con caratteristiche tali da renderli possibili campi chiave: ogni chiave potenziale prende il nome di *chiave candidata*.<br>La chiave che viene scelta come riferimento è detta **chiave primaria**, indicata con ***(pk)*** (*primary key*)",
        tags: ["chiavi", "chiave primaria"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 4: Le chiavi",
        id: "basi-4.2",
        title: "Altri tipi di chiavi - Artificiali",
        text: "Nel caso in cui non sia possibile individuare una chiave primaria si può ricorrere a una **chiave artificiale** (o *seriale*), per esempio nei seguenti casi:<br>• nessun attributo ha tutte le proprietà di una chiave primaria;<br>• le chiavi candidate possono creare problemi nel tempo;<br>• la chiave primaria è grande e complessa;<br>• ci sono problemi di identificazione.<br>Una *chiave artificiale* non è altro che un ID, un identificativo progressivo assegnato artificialmente ad ogni istanza dell'entità. Normalmente il loro nome è preceduto dal suffisso *ID_*.",
        tags: ["chiavi", "chiave artificiale"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 4: Le chiavi",
        id: "basi-4.3",
        title: "Altri tipi di chiavi - Composte",
        text: "Nel caso in cui la scelta di una chiave artificiale non sia ottimale, si può ricorrere alle **chiavi composte**. Una chiave composta è formata da due o più attributi che, messi insieme, abbiano le caratteristiche di una chiave primaria.<br>Se si ha un'entità detta debole (ovvero che dipende da un'altra entità per esistere) si può avere una migrazione della chiave primaria dall'entità forte a quella debole. In questo modo l'entità debole avrà una chiave composta con la chiave primaria migrata dall'entità forte.",
        tags: ["chiavi", "chiave composta"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 4: Le chiavi",
        id: "basi-4.4",
        title: "Altri tipi di chiavi - Esterne",
        text: "Sempre nel caso in cui un attributo di un'entità padre migri verso un'entità figlio, ma non sia parte di una chiave composta, possiamo trovare le **chiavi esterne**. Vengono indicate con ***(fk)*** (*foreign key*) e servono a creare una relazione tra due entità. Nel caso in cui la *chiave esterna* sia una *chiave artificiale* nella sua entità originale, il prefisso *ID_* diventa *id_*.",
        tags: ["chiavi", "chiave esterna"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le basi 4: Le chiavi",
        id: "basi-4.5",
        title: "Lo schema relazionale",
        text: "Lo **schema relazionale** è un modo sintetico per rappresentare un'entità.<br>Lo schema relazionale può essere scritto in più forme:<br>> **Utente** (Nome , Cognome, COD_Fiscale (pk), Nazionalità (fk))<br>Oppure:<br>> **Utente** (Nome, Cognome, **COD_Fiscale**, Nazionalità *)<br>Oppure:<br>> **Utente** (Nome {string(30)}, Cognome {string(30)}, **COD_Fiscale** {string(16)}, *Nazionalità * {string(2)}*<br>È importante sottolineare la differenza tra **modello concettuale** e **logico**. Il *modello concettuale* consiste nella rappresentazione del DB attraverso il modello E-R, quindi a livello di idea. Invece il *modello logico* è l'implementazione del progetto E-R in tabelle.",
        tags: ["schema relazionale"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.1",
        title: "Cos'è una relazione?",
        text: "Nel modello E-R una **relazione** (o *associazione*) mette in comunicazione due o più entità. Viene spesso indicata con un verbo. Ogni relazione ha due versi con significati diversi:<br>• un'entità di partenza<br>• un'entità di arrivo<br>• una descrizione<br><span style='white-space: pre;'>     </span> Per esempio:<br><span style='white-space: pre;'>     </span>`[Persona] --- <abita> --- [indirizzo]`<br><span style='white-space: pre;'>     </span> Una persona abita a un indirizzo<br><span style='white-space: pre;'>     </span> Un indirizzo è abitato da una persona<br>Le relazioni, come le entità, possono avere degli attributi.",
        tags: ["relazioni", "associazioni"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.2",
        title: "Classificazione delle relazioni - Grado",
        text: "Le relazioni possono essere divise in base a diversi criteri:<br>• **grado**<br>• **cardinalità**<br>• direzione<br>• **gerarchia**<br><br>Il **grado** di una relazione indica il *numero di entità associate alla relazione*. In generale una relazione di grado *n* si definisce *n-aria* (una relazione di grado 2 si definisce binaria, ecc.). Una relazione che coinvolge una sola entità è detta **relazione ricorsiva** (per esempio *il capo ufficio e i dipendenti dell'ufficio*)",
        tags: ["relazioni", "grado"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.3",
        title: "Classificazione delle relazioni - Cardinalità",
        text: "Per ogni entità che partecipa a un’associazione bisogna indicare il numero minimo e massimo di istanze della relazione a cui un’istanza dell’entità può partecipare. L’indicazione del numero delle istanze delle entità associate a una relazione prende il nome di **cardinalità**. Le cardinalità massime sono riconducibili a questi tre casi:<br>• relazioni **1-a-1** prevedono che ogni istanza di un'entità sia associata al massimo a un'istanza della seconda entità messa in relazione (**1, 1**)<br>• relazioni **1-a-molti** prevedono che ogni istanza di un'entità sia associata a zero, una o più istanze della seconda entità messa in relazione, ma ogni istanza della seconda entità sia messa in relazione al massimo con un'istanza della prima entità (**1, n**)<br>• relazioni **molti-a-molti** prevedono che ogni istanza di un'entità possa essere associata a zero, una o più istanze della seconda entità messa in relazione e viceversa (**1, 1**)",
        tags: ["relazioni", "cardinalità"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.4",
        title: "Classificazione delle relazioni - Vincoli di cardinalità",
        text: "Inoltre è importante specificare i vincoli di cardinalità, ovvero una coppia di numeri interi, che indica il numero minimo e massimo di istanze della relazione a cui un'istanza dell'entità può partecipare. La cardinalità minima e massima viene indicata con (n, m) dove n indica l'esistenza (può essere 0: opzionale o 1: obbligatoria) e m indica la molteplicità, ovvero il numero massimo di istanze che partecipano a una relazione (può essere 1: una istanza, VALORE_INTERO (> 1): numero massimo di istanze o n: senza limiti).",
        tags: ["relazioni", "vincoli", "cardinalità"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.5",
        title: "Relazione gerarchica - 1",
        text: "Considera:<br><span style='white-space: pre;'>     </span> **ALFA** - padre (superclasse)<br><span style='white-space: pre;'>        </span> ↑<br><span style='white-space: pre;'>     </span> **beta** - figlio (sottoclasse)<br>• Beta è detta sottoclasse o specializzazione di Alfa.<br>• Alfa è detta superclasse o generalizzazione di Beta.<br>Nelle gerarchie sono presenti due vincoli (o proprietà).<br>• Vincolo di struttura: se Beta è sottoclasse di Alfa, Beta ha tutti gli attributi di Alfa e partecipa a tutte le associazioni cui partecipa Alfa (ereditarietà); questo non esclude che Beta possa avere altri attributi e partecipare ad altre associazioni.<br>• Vincolo di insieme: se Beta è specializzazione di Alfa, ogni oggetto di Beta è anche un oggetto di Alfa (cioè Beta è un sottoinsieme di Alfa).",
        tags: ["relazione gerarchica"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Le relazioni nel modello E-R",
        id: "basi-5.6",
        title: "Relazione gerarchica - 2",
        text: "Le generalizzazioni si caratterizzano quindi per “due dimensioni indipendenti”:<br>1. Confronto fra unione delle specializzazioni e classe generalizzata:<br><span style='white-space: pre;'>     </span>- totale, se la classe generalizzata è l’unione delle specializzazioni;<br><span style='white-space: pre;'>     </span>- parziale, se la classe generalizzata contiene l’unione delle specializzazioni;<br>2. Confronto fra le classi specializzate:<br><span style='white-space: pre;'>     </span>- esclusiva, se le specializzazioni sono fra loro disgiunte;<br><span style='white-space: pre;'>     </span>- sovrapposta (overlapped), se può esistere una intersezione non vuota fra le specializzazioni.",
        tags: ["relazione gerarchica"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Lo schema E-R",
        id: "basi-6.1",
        title: "Creare lo schema E-R",
        text: "Prima di creare lo schema (o diagramma) E-R di un DB è necessario:<br>1. Definire le entità e i loro attributi;<br>2. Definire le relazioni tra le entità e i loro attributi;<br>3. Definire le cardinalità delle relazioni;<br>4. Definire le chiavi primarie e le chiavi esterne;<br>5. Definire eventuali annotazioni utili a chiarire lo schema E-R.",
        tags: ["schema E-R", "diagramma E-R"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Lo schema E-R",
        id: "basi-6.2",
        title: "Esempio di schema E-R - Esercizio 1",
        text: "Crea uno schema E-R per un DB per la gestione dei pazienti in un ospedale. Ogni paziente ha un nome, un cognome, una data di nascita e un codice fiscale. Ogni paziente può essere associato a più medici e ogni medico può essere associato a più pazienti. Ogni medico ha un nome, un cognome, una matricola e una specializzazione. Ogni paziente può avere più esami e ogni esame è associato a un solo paziente. Ogni esame ha una data e un risultato. Inoltre i pazienti possono seguire una terapia a casa o in ospedale. Ogni terapia ha un nome e una descrizione. Se la terapia è svolta in ospedale si vuole sapere quale farmaco viene usato.<br>*[Soluzione nella sezione dedicata](#soluzione_esercizio_1).*",
        tags: ["schema E-R", "diagramma E-R", "esercizio"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Soluzioni esercizi",
        id: "basi-6.3",
        title: "Soluzione esercizio 1",
        text: "**Schema E-R:**<br><big-img>![Schema E-R](es-1.png)<big-img><br>**Schema relazionale**<br>**Paziente** (Nome, Cognome, Data_di_nascita, **CF (pk)**)<br>**Medico** (Nome, Cognome, **Matricola (pk)**, Specializzazione)<br>**Esame** (**ID_Esame (pk)**, Data, Risultato, *CF (fk)*)<br>**Terapia** (**Nome (pk)**, Descrizione)<br><span style='white-space: pre;'>     </span>**Ospedale** (Farmaco)",
        tags: ["schema E-R", "diagramma E-R", "soluzione"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' },
        class: "side-by-side"
    },
    {
        section: "Dizionario",
        id: "man-frontend-backend",
        title: "Frontend e backend",
        text: "In informatica il **frontend** è quella componente software che è *visibile all'utente* e con la quale interagisce. Al *frontend* è associato il **backend**, che consiste nella parte di un'infrastruttura software *invisibile all'utente*, ma che opera nel background permettendo il funzionamento di tutto il sistema.<br><span style='white-space: pre;'>     </span> Maggiori info su [Wikipedia](https://it.wikipedia.org/wiki/Front-end_e_back-end).",
        tags: ["dizionario", "frontend", "backend"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Dizionario",
        id: "man-valore-null",
        title: "Valore NULL",
        text: "In informatica una variabile o valore non inizializzato si dice che ha valore ***null***. È importante notare che ***null*** è diverso da **zero**, che è una *quantità definita*.<br><span style='white-space: pre;'>     </span> Maggiori info su [Wikipedia](https://it.wikipedia.org/wiki/NULL)",
        tags: ["dizionario", "null"],
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Copyright e Termini d'uso",
        id: "termini-uso",
        title: "Termini d'uso",
        text: "**Consultando il blog si accettano i termini di utilizzo.**<br>Contatto: *[sim.dll@null.net](mailto:sim.dll@null.net)*",
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Copyright e Termini d'uso",
        id: "copyright-generale",
        title: "Copyright",
        text: "© simdll - Tutti i diritti riservati. Consultare i termini di utilizzo per conoscere gli usi consentiti.",
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
    {
        section: "Copyright e Termini d'uso",
        id: "versione",
        title: "Versione",
        text: "Versione 0.1.34 - Beta release",
        style: { backgroundColor: 'rgba(150, 150, 255, 0.5)' }
    },
];
