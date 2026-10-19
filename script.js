document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splashScreen");
    const home = document.getElementById("homeScreen");
    const bar = document.getElementById("loadingBar");
    const percent = document.getElementById("loadingPercent");

    let progress = 0;

    // تحميل لمدة 3 ثوانٍ
    const loading = setInterval(function () {
        progress++;

        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(loading);

            setTimeout(function () {
                // إظهار الشاشة الرئيسية
                home.hidden = false;

                // إخفاء شاشة البداية
                splash.classList.add("hide");

                setTimeout(function () {
                    splash.remove();
                }, 450);
            }, 250);
        }
    }, 30);

    // البحث عن الأقسام
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const categoryCards = [
        ...document.querySelectorAll(".category-card[data-category]")
    ];
    const searchMessage = document.getElementById("searchMessage");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();
        let matches = 0;

        categoryCards.forEach(function (card) {
            const name = card.dataset.category.toLowerCase();
            const found = !query || name.includes(query);

            card.hidden = !found;
            if (found) matches++;
        });

        searchMessage.hidden = false;

        if (!query) {
            searchMessage.hidden = true;
        } else if (matches > 0) {
            searchMessage.textContent =
                "الأقسام المطابقة لبحثك: " + matches;
        } else {
            searchMessage.textContent =
                "ما لقينا قسم مطابق. جرّب كلمة تانية.";
        }

        document.getElementById("categoriesSection")
            .scrollIntoView({ behavior: "smooth" });
    });

    // اختيار قسم
    categoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const category = card.dataset.category;

            searchInput.value = category;
            searchForm.requestSubmit();
        });
    });

    // عرض كل الأقسام
    document.getElementById("showAllButton")
        .addEventListener("click", function () {
            categoryCards.forEach(function (card) {
                card.hidden = false;
            });

            searchInput.value = "";
            searchMessage.hidden = true;
        });

    // أزرار البانر
    document.getElementById("shopNowButton")
        .addEventListener("click", function () {
            document.getElementById("categoriesSection")
                .scrollIntoView({ behavior: "smooth" });
        });

    document.getElementById("moreCategoriesButton")
        .addEventListener("click", function () {
            alert("رح نضيف أقسام جديدة قريباً!");
        });

    // القائمة السفلية
    document.querySelectorAll(".nav-item").forEach(function (item) {
        item.addEventListener("click", function () {
            document.querySelectorAll(".nav-item").forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            const page = item.dataset.page;

            if (page === "الرئيسية") {
                document.querySelector(".home-content")
                    .scrollTo({ top: 0, behavior: "smooth" });
            } else if (page === "السلة") {
                alert("سلّتك فارغة حالياً.");
            } else {
                alert("صفحة " + page + " قيد التجهيز.");
            }
        });
    });

    // الإشعارات
    document.getElementById("notificationButton")
        .addEventListener("click", function () {
            alert("ما عندك إشعارات جديدة.");
        });

    // منتجات مميزة: مكان جاهز لإضافة المنتجات لاحقاً
    document.getElementById("productsButton")
        .addEventListener("click", function () {
            document.getElementById("productsSection")
                .scrollIntoView({ behavior: "smooth" });
        });

        // تغيير اللغة
    const languageSelect = document.getElementById("languageSelect");
    const currencySelect = document.getElementById("currencySelect");

    const translations = {
        ar: {
            search: "ابحث عن منتج أو قسم...",
            hero: "كل احتياجاتك",
            hero2: "في مكان واحد",
            subtitle: "تسوّق كل ما تحتاجه بسهولة",
            shop: "تسوّق الآن",
            categories: "الأقسام الرئيسية",
            showAll: "عرض الكل",
            products: "منتجات مميزة",
            soon: "اكتشف منتجاتنا قريباً",
            supermarket: "سوبر ماركت",
            stationery: "مكتبة",
            fruits: "خضرة وفواكه",
            restaurants: "مطاعم",
            butcher: "ملحمة",
            sweets: "حلويات",
            cleaning: "منظفات",
            more: "المزيد من الأقسام",
            home: "الرئيسية",
            favorite: "المفضلة",
            cart: "السلة",
            orders: "طلباتي",
            account: "حسابي",
            language: "اللغة",
            currency: "العملة"
        },
        en: {
            search: "Search for a product or category...",
            hero: "Everything You Need",
            hero2: "In One Place",
            subtitle: "Shop everything you need easily",
            shop: "Shop Now",
            categories: "Main Categories",
            showAll: "View All",
            products: "Featured Products",
            soon: "Discover our products soon",
            supermarket: "Supermarket",
            stationery: "Stationery",
            fruits: "Fruits & Vegetables",
            restaurants: "Restaurants",
            butcher: "Butcher",
            sweets: "Sweets",
            cleaning: "Cleaning",
            more: "More Categories",
            home: "Home",
            favorite: "Favorites",
            cart: "Cart",
            orders: "My Orders",
            account: "Account",
            language: "Language",
            currency: "Currency"
        }
    };

    function changeLanguage(lang) {
        const t = translations[lang] || translations.ar;

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

        searchInput.placeholder = t.search;

        document.querySelector(".hero-copy h1").innerHTML =
            lang === "ar"
                ? `${t.hero}<br>${t.hero2}`
                : `${t.hero}<br>${t.hero2}`;

        document.querySelector(".hero-copy p").textContent = t.subtitle;
        document.getElementById("shopNowButton").innerHTML =
          `${t.shop} <span>→</span>`;

        document.querySelector(".categories-section h2").textContent =
            t.categories;
        document.getElementById("showAllButton").textContent = t.showAll;
        document.querySelector(".products-section h2").textContent = t.products;
        document.querySelector(".empty-products p").textContent = t.soon;

        const categoryKeys = [
            "supermarket", "stationery", "fruits",
            "restaurants", "butcher", "sweets", "cleaning"
        ];

        categoryCards.forEach(function (card, index) {
            const key = categoryKeys[index];
            if (key) {
                card.querySelector("span").textContent = t[key];
            }
        });

        document.getElementById("moreCategoriesButton")
            .querySelector("span").textContent = t.more;

const navKeys = ["home", "cart", "account"];
        document.querySelectorAll(".nav-item").forEach(function (item, index) {
            item.lastElementChild.textContent = t[navKeys[index]];
        });

      const settingTitles = document.querySelectorAll(".setting-info strong");

settingTitles[0].textContent = t.language;
settingTitles[1].textContent = t.currency;
    }

    languageSelect.addEventListener("change", function () {
        changeLanguage(languageSelect.value);
    });

    // اختيار العملة
    currencySelect.addEventListener("change", function () {
        const currency = currencySelect.value;

        if (currency === "USD") {
            alert("تم اختيار الدولار الأمريكي ($).");
        } else {
            alert("تم اختيار الليرة اللبنانية (ل.ل).");
        }
    });

    // تطبيق اللغة الافتراضية
    changeLanguage(languageSelect.value);

    
// ==================================
// بانر متحرك تلقائياً - Yalla Shop
// ==================================

const bannerImages = [
    ...document.querySelectorAll(".banner-image")
];

const bannerDots = [
    ...document.querySelectorAll(".slider-dots .dot")
];

let currentBanner = 0;
let bannerTimer = null;

// عرض صورة محددة
function showBanner(index) {

    currentBanner = index;

    bannerImages.forEach(function (img, i) {
        img.classList.toggle("active", i === index);
    });

    bannerDots.forEach(function (dot, i) {
        const isActive = i === index;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
    });
}

// بدء التبديل التلقائي
function startBannerSlider() {

    clearInterval(bannerTimer);

    bannerTimer = setInterval(function () {

        const next = (currentBanner + 1) % bannerImages.length;

        showBanner(next);

    }, 4000);
}

// الضغط على النقاط
bannerDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showBanner(index);

        // إعادة احتساب الأربع ثوانٍ
        startBannerSlider();

    });

});

// التشغيل الأول
if (bannerImages.length > 0 &&
    bannerImages.length === bannerDots.length) {

    showBanner(0);
    startBannerSlider();
}

});