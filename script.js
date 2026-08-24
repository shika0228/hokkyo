const languageStorageKey = 'hokkyo-language';
const designWidth = 424;
const mobileBreakpoint = 500;

function getMobileScale() {
    return window.innerWidth <= mobileBreakpoint ? window.innerWidth / designWidth : 1;
}

function updateMobileScale() {
    if (window.innerWidth <= mobileBreakpoint) {
        document.documentElement.style.setProperty('--mobile-main-scale', String(getMobileScale()));
    } else {
        document.documentElement.style.removeProperty('--mobile-main-scale');
    }
}

updateMobileScale();
window.addEventListener('resize', updateMobileScale);

const japaneseTranslations = {
    languageToggle: '言語を切り替え',
    navReservation: '予約<br><span>Reservation</span>',
    navMenu: 'メニュー<br><span>menu</span>',
    navLocation: '店舗<br><span>Location</span>',
    introText: '喧騒を離れ、北緯45度の自然の恵みを。<br><span>北境</span>は現代料理の視点で、<br>東北大地が育んだ豊かな風土を<br>新たに表現します。<br>長白山の野生ハシバミ茸、黒トリュフ、厳選和牛を用い、伝統的な鋳鉄鍋の煮込みと現代的な低温熟成を融合。氷雪と炭火が織りなす、没入感あふれる上質な美食体験をお届けします。',
    reservationTitle: '予<br>約',
    reservationHint: '以下のプラットフォームからご予約いただけます',
    wechatHint: 'WeChatで友だち追加<br>最新のお得な情報をお届けします',
    phoneReservation: '【電話予約】<br>03-XXXX-8888<br><span>電話受付時間：15:00 - 22:00</span>',
    businessHours: '【営業時間】<br><span>ランチ：11:30 - 14:30（L.O. 14:00）<br>ディナー：17:30 - 22:30（L.O. 21:30）<br>定休日：毎週月曜日 / 年末年始</span>',
    courseTitle: '宴会におすすめのコース',
    singleTitle: 'おすすめのアラカルト',
    dishGuobao: '柚子香る琥珀風鍋包肉',
    dishWagyuSkewer: '炭火焼き霜降り和牛串',
    dishTruffleDumplings: '黒トリュフ香る酸菜和牛餃子',
    dishCrab: '延辺雪原の醤油漬け紅膏ガニ',
    dishMatsutakeChicken: '長白山松茸鶏の鉄鍋煮込み',
    dishSweetPotato: '氷晶仕立ての糸引きさつまいも',
    allMenu: 'すべてのメニューを見る',
    locationTitle: '店舗所在地',
    footerHours: '【営業時間】<br>ランチ：11:30 - 14:30（L.O. 14:00）<br>ディナー：17:30 - 22:30（L.O. 21:30）<br>定休日：毎週月曜日 / 年末年始',
    back: '戻る',
    dishDalaPi: '自家製東北大拉皮',
    dishBlueberryYam: 'ブルーベリーと山芋の氷晶仕立て',
    dishPorkMatsutake: '松茸と柚子香る豚肉のにんにく和え',
    dishBlackPork: 'ねぎ香る黒豚肩ロース炒め',
    dishFoieGras: '氷砂糖とサンザシのフォアグラ',
    dishLambChop: '黒トリュフ香る焼きラムチョップ',
    dishKungPaoWagyu: '宮保和牛とカシューナッツ',
    dishYellowCroakerTofu: '鉄鍋黄魚と豆腐の煮込み',
    dishBeefMushroom: '牛バラ肉と野生ハシバミ茸の煮込み',
    dishFishEggplant: '嘎牙子魚となすの煮込み',
    dishBeefBeans: '黒牛肉と東北いんげんの煮込み',
    dishMushroomRisotto: '鉄鍋山の幸きのこリゾット',
    dishScallionPancake: '東北黄金ねぎ油餅',
    dishRedBeanBun: '小豆もち団子 桂花蜜添え',
    dishFrozenPear: '凍り梨の雪綿かき氷',
    dishGinsengPeach: '長白山人参と白桃の特製ドリンク',
    dishSchisandraDrink: '五味子の厳選スパークリング',
};

const translatableElements = [...document.querySelectorAll('[data-i18n]')];
const chineseTranslations = Object.fromEntries(
    translatableElements.map((element) => [element.dataset.i18n, element.innerHTML]),
);
let currentLanguage = localStorage.getItem(languageStorageKey) === 'ja' ? 'ja' : 'zh';

function applyLanguage(language) {
    const translations = language === 'ja' ? japaneseTranslations : chineseTranslations;

    translatableElements.forEach((element) => {
        const translation = translations[element.dataset.i18n];
        if (translation !== undefined) {
            element.innerHTML = translation;
        }
    });

    document.documentElement.lang = language === 'ja' ? 'ja' : 'zh-CN';

    const languageButton = document.querySelector('.lang_change');
    if (languageButton) {
        languageButton.setAttribute('aria-label', language === 'ja' ? '中国語に切り替え' : '切换为日语');
    }

    const hamburgerButton = document.querySelector('.hamburger_button');
    if (hamburgerButton) {
        const isMenuOpen = hamburgerButton.getAttribute('aria-expanded') === 'true';
        hamburgerButton.setAttribute('aria-label', language === 'ja'
            ? (isMenuOpen ? 'ナビゲーションを閉じる' : 'ナビゲーションを開く')
            : (isMenuOpen ? '关闭导航菜单' : '打开导航菜单'));
    }
}

const languageButton = document.querySelector('.lang_change');
if (languageButton) {
    languageButton.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'ja' ? 'zh' : 'ja';
        localStorage.setItem(languageStorageKey, currentLanguage);
        applyLanguage(currentLanguage);
    });
}

applyLanguage(currentLanguage);

const scrollImageWrapper = document.querySelector('.scroll_img_wrapper');
if (scrollImageWrapper) {
    const scrollImageGroup = scrollImageWrapper.querySelector('.scroll_img_group');
    if (scrollImageGroup) {
        scrollImageWrapper.append(scrollImageGroup.cloneNode(true));
    }
}

const hamburgerButton = document.querySelector('.hamburger_button');
const floatingNavigationMenu = document.querySelector('.floating_nav_menu');
const introSection = document.querySelector('.intro');

if (hamburgerButton && floatingNavigationMenu && introSection) {
    let isMenuOpen = false;

    function renderHamburgerButton() {
        hamburgerButton.classList.toggle('is-open', isMenuOpen);
        hamburgerButton.setAttribute('aria-label', currentLanguage === 'ja'
            ? (isMenuOpen ? 'ナビゲーションを閉じる' : 'ナビゲーションを開く')
            : (isMenuOpen ? '关闭导航菜单' : '打开导航菜单'));
        hamburgerButton.setAttribute('aria-expanded', String(isMenuOpen));
    }

    function setMenuOpen(shouldOpen) {
        isMenuOpen = shouldOpen;
        floatingNavigationMenu.classList.toggle('is-open', isMenuOpen);
        floatingNavigationMenu.setAttribute('aria-hidden', String(!isMenuOpen));
        renderHamburgerButton();
    }

    function syncHamburgerVisibility() {
        const introHasEnteredViewport = introSection.getBoundingClientRect().top < window.innerHeight;
        const pageHasStartedScrolling = window.scrollY > 1;
        const shouldShowHamburger = introHasEnteredViewport && pageHasStartedScrolling;

        hamburgerButton.classList.toggle('is-visible', shouldShowHamburger);

        if (!shouldShowHamburger && isMenuOpen) {
            setMenuOpen(false);
        }
    }

    hamburgerButton.addEventListener('click', () => {
        setMenuOpen(!isMenuOpen);
    });

    floatingNavigationMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    window.addEventListener('scroll', syncHamburgerVisibility, { passive: true });
    window.addEventListener('resize', syncHamburgerVisibility);
    window.addEventListener('load', syncHamburgerVisibility);
    window.addEventListener('pageshow', syncHamburgerVisibility);

    renderHamburgerButton();
    syncHamburgerVisibility();
    window.requestAnimationFrame(syncHamburgerVisibility);
}
