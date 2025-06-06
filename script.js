// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '#2c3e50';
        }
    });
    
    // Add fade-in animation for manual items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe manual list items
    const manualItems = document.querySelectorAll('.manual-content li');
    manualItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Add toggle functionality for example content
document.addEventListener('DOMContentLoaded', function() {
    // Add toggle functionality for example content
    const toggleButtons = document.querySelectorAll('.toggle-example');
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the modal when clicking the button
            const exampleContent = button.nextElementSibling;
            if (exampleContent.style.display === 'none' || exampleContent.style.display === '') {
                exampleContent.style.display = 'block';
                button.textContent = 'Skrýt příklad';
            } else {
                exampleContent.style.display = 'none';
                button.textContent = 'Příklad';
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('detailModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const manualItems = document.querySelectorAll('.manual-content li');

    // Detailed content for each manual item
    const detailedContent = {
        'Emocionální Manipulace': {
            title: 'Emocionální Manipulace - Detailní rozbor',
            content: `
                <h4>Jak funguje emocionální manipulace:</h4>
                <ul>
                    <li><strong>Strach:</strong> vytváření pocitu ohrožení nebo nebezpečí</li>
                    <li><strong>Hněv:</strong> vyvolávání rozhořčení vůči určité skupině nebo situaci</li>
                    <li><strong>Naděje:</strong> slibování nereálných řešení složitých problémů</li>
                    <li><strong>Nostalgie:</strong> idealizace minulosti a kritika současnosti</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip viděl zprávu s titulkem "NEBEZPEČÍ! Nová hrozba ohrožuje vaše děti!" Ačkoliv se jednalo o běžnou situaci, dramatické podání ho vyděsilo natolik, že zprávu okamžitě sdílel bez ověření faktů.</p>
                <h4>Jak se bránit:</h4>
                <ul>
                    <li>Rozpoznejte emocionálně zabarvený jazyk</li>
                    <li>Počkejte, než emoce opadnou, a teprve pak jednejte</li>
                    <li>Ověřte informace z více nezávislých zdrojů</li>
                </ul>
            `
        },
        'Zkreslení Kontextu': {
            title: 'Zkreslení kontextu - detailní rozbor',
            content: `
                <h4>Techniky zkreslení kontextu:</h4>
                <ul>
                    <li><strong>Cherry picking:</strong> výběr pouze těch faktů, které podporují určitý názor</li>
                    <li><strong>Vytržení z kontextu:</strong> použití citátů nebo dat bez původního kontextu</li>
                    <li><strong>Falešná kauzalita:</strong> spojování nesouvisejících událostí</li>
                    <li><strong>Generalizace:</strong> vytváření obecných závěrů z jednotlivých případů</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip sdílel graf ukazující pokles určitého ukazatele, ale nezmiňoval, že se jednalo pouze o krátkodobý výkyv v dlouhodobě rostoucím trendu. Tím vytvořil falešný dojem krize.</p>
                <h4>Jak rozpoznat:</h4>
                <ul>
                    <li>Hledejte původní zdroj informací</li>
                    <li>Ptejte se na širší kontext</li>
                    <li>Ověřte, zda nejsou vynechány důležité informace</li>
                </ul>
            `
        },
        'Falešné Autority': {
            title: 'Falešné Autority - Detailní rozbor',
            content: `
                <h4>Typy falešných autorit:</h4>
                <ul>
                    <li><strong>Neexistující experti:</strong> vymyšlené osoby s falešnými tituly</li>
                    <li><strong>Nepříslušní experti:</strong> skuteční odborníci mimo svůj obor</li>
                    <li><strong>Falešné instituce:</strong> organizace s vědecky znějícími názvy</li>
                    <li><strong>Anonymní zdroje:</strong> "odborníci tvrdí" bez konkrétních jmen</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip uvěřil článku podepsanému "Dr. Janem Novákem, předním odborníkem na klimatologii". Při ověření se ukázalo, že tato osoba neexistuje a článek byl vytvořen dezinformační skupinou.</p>
                <h4>Jak ověřit autoritu:</h4>
                <ul>
                    <li>Vyhledejte jméno experta v odborných databázích</li>
                    <li>Zkontrolujte jeho publikace a kvalifikaci</li>
                    <li>Ověřte, zda se vyjadřuje ve svém oboru</li>
                </ul>
            `
        },
        'Manipulace s Obrázky a Videi': {
            title: 'Manipulace s Obrázky a Videi - Detailní rozbor',
            content: `
                <h4>Techniky vizuální manipulace:</h4>
                <ul>
                    <li><strong>Deepfakes:</strong> AI-generované falešné videá</li>
                    <li><strong>Staré záběry:</strong> použití archivních materiálů jako aktuálních</li>
                    <li><strong>Změna kontextu:</strong> použití skutečných záběrů v jiném kontextu</li>
                    <li><strong>Digitální úpravy:</strong> photoshop a podobné nástroje</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip sdílel video údajně z nedávných protestů, ale jednalo se o záběry z jiné země a z jiného roku. Video bylo použito k podpoře falešného narativu o současné situaci.</p>
                <h4>Jak rozpoznat manipulaci:</h4>
                <ul>
                    <li>Použijte reverzní vyhledávání obrázků</li>
                    <li>Hledejte nekonzistence v osvětlení a stínech</li>
                    <li>Ověřte datum a místo vzniku</li>
                </ul>
            `
        },
        'Zavádějící Titulky': {
            title: 'Zavádějící Titulky - Detailní rozbor',
            content: `
                <h4>Typy zavádějících titulků:</h4>
                <ul>
                    <li><strong>Clickbait:</strong> senzační titulky pro získání kliků</li>
                    <li><strong>Hyperbolizace:</strong> přehánění významu události</li>
                    <li><strong>Vytržení z kontextu:</strong> titulek neodpovídá obsahu</li>
                    <li><strong>Emocionální manipulace:</strong> využití silných emocí v titulku</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip klikl na článek s titulkem "ŠOKUJÍCÍ ODHALENÍ ZNIČÍ VLÁDU!" Obsah článku však obsahoval pouze spekulace bez důkazů a titulek byl zcela nepřiměřený skutečnému obsahu.</p>
                <h4>Jak rozpoznat:</h4>
                <ul>
                    <li>Čtěte celý článek, nejen titulek</li>
                    <li>Buďte skeptičtí k přehnaně dramatickým titulkům</li>
                    <li>Porovnejte s titulky jiných zdrojů</li>
                </ul>
            `
        },
        'Opakování a Šíření': {
            title: 'Opakování a Šíření - Detailní rozbor',
            content: `
                <h4>Strategie opakování:</h4>
                <ul>
                    <li><strong>Koordinované kampaně:</strong> synchronizované šíření přes více platforem</li>
                    <li><strong>Echo chambers:</strong> uzavřené skupiny posilující stejné názory</li>
                    <li><strong>Astroturfing:</strong> falešné grassroot kampaně</li>
                    <li><strong>Virální šíření:</strong> využití algoritmů sociálních sítí</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip často viděl stejné tvrzení na Facebooku, Twitteru i v diskuzích pod články. Opakování z různých zdrojů ho přesvědčilo o pravdivosti informace, ačkoliv všechny zdroje čerpaly ze stejného nepravdivého původního příspěvku.</p>
                <h4>Jak se bránit:</h4>
                <ul>
                    <li>Hledejte původní zdroj informace</li>
                    <li>Diverzifikujte své informační zdroje</li>
                    <li>Buďte skeptičtí k virálním obsahům</li>
                </ul>
            `
        },
        'Vytváření Falešných Narativů': {
            title: 'Vytváření Falešných Narativů - Detailní rozbor',
            content: `
                <h4>Komponenty falešných narativů:</h4>
                <ul>
                    <li><strong>Konspirace:</strong> tajné spiknutí mocných skupin</li>
                    <li><strong>Scapegoating:</strong> hledání viníka za složité problémy</li>
                    <li><strong>Alternativní historie:</strong> přepisování historických faktů</li>
                    <li><strong>Pseudověda:</strong> vědecky znějící, ale nepodložená tvrzení</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip uvěřil komplexnímu příběhu spojujícímu několik nesouvisejících událostí do jednoho "velkého plánu". Narativ byl logicky sestavený, ale založený na falešných předpokladech a nepodložených spojeních.</p>
                <h4>Jak rozpoznat:</h4>
                <ul>
                    <li>Ověřte jednotlivé komponenty narativu</li>
                    <li>Hledejte alternativní vysvětlení</li>
                    <li>Buďte skeptičtí k příliš jednoduchým řešením složitých problémů</li>
                </ul>
            `
        },
        'Využití Sociálních Skupin': {
            title: 'Využití Sociálních Skupin - Detailní rozbor',
            content: `
                <h4>Techniky cílení na skupiny:</h4>
                <ul>
                    <li><strong>Mikrocílení:</strong> přesné zacílení na specifické demografické skupiny</li>
                    <li><strong>Posilování předsudků:</strong> využití existujících stereotypů</li>
                    <li><strong>Identitní politika:</strong> rozdělování společnosti na "my vs. oni"</li>
                    <li><strong>Emocionální rezonance:</strong> obsah přizpůsobený hodnotám skupiny</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip patřil do online skupiny sdílející určité politické názory. Algoritmy mu začaly zobrazovat stále extrémější obsah, který posiloval jeho přesvědčení a postupně ho radikalizoval.</p>
                <h4>Jak se chránit:</h4>
                <ul>
                    <li>Vystavujte se různorodým názorům</li>
                    <li>Kriticky hodnoťte informace i ze "svých" zdrojů</li>
                    <li>Uvědomte si své vlastní předsudky</li>
                </ul>
            `
        },
        'Vytváření Falešných Profilů a Botů': {
            title: 'Vytváření Falešných Profilů a Botů - Detailní rozbor',
            content: `
                <h4>Typy falešných účtů:</h4>
                <ul>
                    <li><strong>Sockpuppets:</strong> falešné profily ovládané lidmi</li>
                    <li><strong>Boti:</strong> automatizované účty řízené algoritmy</li>
                    <li><strong>Cyborgi:</strong> kombinace lidského a automatizovaného řízení</li>
                    <li><strong>Trollové:</strong> účty zaměřené na vyvolávání konfliktů</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip narazil na desítky profilů sdílejících stejný obsah s drobnými obměnami. Všechny profily měly podobné charakteristiky - nové účty, málo přátel, generické fotografie. Jednalo se o koordinovanou síť falešných účtů.</p>
                <h4>Jak rozpoznat:</h4>
                <ul>
                    <li>Zkontrolujte stáří a aktivitu účtu</li>
                    <li>Hledejte neobvyklé vzorce v aktivitě</li>
                    <li>Ověřte autenticitu profilových fotografií</li>
                </ul>
            `
        },
        'Ignorování nebo Zlehčování Oponentů': {
            title: 'Ignorování nebo Zlehčování Oponentů - Detailní rozbor',
            content: `
                <h4>Taktiky diskreditace:</h4>
                <ul>
                    <li><strong>Ad hominem útoky:</strong> útok na osobu místo na argumenty</li>
                    <li><strong>Strawman argumenty:</strong> zkreslení pozice oponenta</li>
                    <li><strong>Whataboutism:</strong> odvádění pozornosti na jiné problémy</li>
                    <li><strong>Labeling:</strong> nálepkování oponentů negativními termíny</li>
                </ul>
                <h4>Příklad z praxe:</h4>
                <p>Filip viděl, jak byli kritici určité teorie označováni jako "placení agenti" nebo "užiteční idioti" bez jakýchkoliv důkazů. Tato strategie měla za cíl diskreditovat jejich argumenty bez nutnosti se s nimi věcně vypořádat.</p>
                <h4>Jak rozpoznat:</h4>
                <ul>
                    <li>Zaměřte se na argumenty, ne na osobní útoky</li>
                    <li>Hledejte věcné odpovědi na kritiku</li>
                    <li>Buďte skeptičtí k nálepkování a generalizacím</li>
                </ul>
            `
        }
    };

    // Function to open modal with content
    function openModal(title, content) {
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.content;
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Add click event to manual items
    manualItems.forEach(item => {
        // Click handler for the entire item
        item.addEventListener('click', function(e) {
            // Don't open modal if clicking on buttons or example content
            if (e.target.classList.contains('toggle-example') || 
                e.target.classList.contains('more-info-btn') ||
                e.target.closest('.example-content')) {
                return;
            }
            
            const title = item.querySelector('h4').textContent;
            const content = detailedContent[title];
            
            if (content) {
                openModal(title, content);
            }
        });

        // Click handler for "Více informací zde" button
        const moreInfoBtn = item.querySelector('.more-info-btn');
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the item click
                
                const title = item.querySelector('h4').textContent;
                const content = detailedContent[title];
                
                if (content) {
                    openModal(title, content);
                }
            });
        }
    });

    // Close modal functionality
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 300);
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
