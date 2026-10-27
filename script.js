document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splashScreen");
    const home = document.getElementById("homeScreen");
    const bar = document.getElementById("loadingBar");
    const percent = document.getElementById("loadingPercent");

    let progress = 0;

    // شاشة بداية قصيرة، بدون انتظار وهمي لتحميل صور المنتجات
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
  }, 7);

    // البحث عن الأقسام
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const categoryCards = [
        ...document.querySelectorAll(".category-card[data-category]")
    ];
    const searchMessage = document.getElementById("searchMessage");

    // البحث الشامل يتم تفعيله بعد تحميل مصفوفات المنتجات أدناه.
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        renderGlobalSearch();
    });

    // اختيار قسم وفتح صفحة سوبر ماركت
    const supermarketScreen = document.getElementById("supermarketScreen");
    const vegetablesScreen = document.getElementById("vegetablesScreen");
const butcherScreen = document.getElementById("butcherScreen");
const cleaningScreen = document.getElementById("cleaningScreen");
const poultryScreen = document.getElementById("poultryScreen");
const libraryScreen = document.getElementById("libraryScreen");
    categoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const category = card.dataset.category;

          
if (category === "سوبر ماركت") {
    supermarketScreen.hidden = false;
    home.classList.add("market-open");
    return;
}

if (category === "خضرة وفواكه") {
    vegetablesScreen.hidden = false;
    home.classList.add("market-open");
    document.getElementById("vegetablesProductsGrid")?.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    return;
}
if (category === "مطاعم") {
    restaurantsScreen.hidden = false;
    home.classList.add("market-open");
    restaurantCurrent = null;
    restaurantFilter = 'all';
    renderRestaurantView();
    return;
}
if (category === "مكتبة") {
    libraryScreen.hidden = false;
    home.classList.add("market-open");
    renderLibraryProducts();
    return;
}
if (category === "دواجن") {
    poultryScreen.hidden = false;
    home.classList.add("market-open");
    renderGharibProducts();
    return;
}
if (category === "منظفات") {
    cleaningScreen.hidden = false;
    home.classList.add("market-open");
    renderCleaningProducts();
    return;
}
if (category === "ملحمة") {
    butcherScreen.hidden = false;
    home.classList.add("market-open");
    return;
}
if (
    category === "حلويات" ||
    category === "مطاعم" ||
     category === "مكتبة" ||
    category === "منظفات"
) {
    return;
}
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
            const category = document.querySelector('.photo-hero .hero-copy')?.dataset.category;
            const card = Array.from(document.querySelectorAll('#categoriesGrid .category-card'))
                .find(el => el.dataset.category === category);
            if (card) card.click();
            else document.getElementById('categoriesSection')?.scrollIntoView({behavior:'smooth'});
        });

const moreCategoriesButton =
    document.getElementById("moreCategoriesButton");

if (moreCategoriesButton) {
    moreCategoriesButton.addEventListener("click", function () {
        alert("رح نضيف أقسام جديدة قريباً!");
    });
}

    // القائمة السفلية
    document.querySelectorAll(".nav-item").forEach(function (item) {
        item.addEventListener("click", function () {
            document.querySelectorAll(".nav-item").forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            const page = item.dataset.page;

          
        });
    });

   
  
    // =====================================
    // غريب تشكن - المنتجات التجريبية
    // =====================================

    const gharibProducts = [
        {
            name: "فخاد  ",
            price: "220000",
            unit: "1ك",
            image: "images/poultry/Thighs.png"
        },

        {
            name: "فخاد  ",
            price: "1000000",
            unit: "5ك",
            image: "images/poultry/Thighs.png"
        },
        {
            name: "جوانح  ",
            price: "250000",
            unit: "1ك",
            image: "images/Wings.png"
        },
        {
            name: "سفاين   ",
            price: "600000",
            unit: "1ك",
            image: "images/poultry/Safayen.png"
        },
        {
            name: "  طاووق",
            price: "700000",
            unit: "1ك",
            image: "images/poultry/Raw tawook.png"
        },
        {
            name: "سودة  ",
            price: "320000",
            unit: "1ك",
            image: "images/poultry/Gizzards.png"
        },
        {
            name: "قوانص  ",
            price: "150000",
            unit: "1ك",
            image: "images/poultry/Black-hearted.png"
        },
        {
            name: "فروج كامل   ",
            price: "250000",
            unit: "1ك",
            image: "images/poultry/chicken.png"
        }
    ];

    const gharibGrid =
        document.getElementById("gharibProductsGrid");

    const gharibToggleButton = null;

    let gharibShowAll = true;

    function renderGharibProducts() {
        gharibGrid.innerHTML = "";

        gharibProducts.forEach(function (product, index) {
            const card = document.createElement("article");
            card.className = "gharib-product-card";

            if ((!gharibShowAll && index >= 4) || !product.name.trim().includes(document.getElementById("poultryProductSearch").value.trim())) {
                card.hidden = true;
            }

            const picture = document.createElement("div");
            picture.className = "gharib-product-image";

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;
            image.loading = "lazy";
            image.decoding = "async";
            image.width = 94; image.height = 94;

            // صورة بديلة إذا لم تكن الصورة موجودة
            image.onerror = function () {
                picture.innerHTML = "";
                picture.textContent = "🍗";
                picture.style.fontSize = "55px";
            };

            picture.appendChild(image);

            const title = document.createElement("h3");
            title.textContent = product.name;

            const description = document.createElement("p");
            description.className = "gharib-product-description";
            description.textContent = product.description || "";

            const bottom = document.createElement("div");
            bottom.className = "gharib-product-bottom";

            const price = document.createElement("strong");
            price.className = "gharib-product-price";
         price.textContent = Number(product.price).toLocaleString("en-US") + " ل.ل";

            const unit = document.createElement("span");
            unit.className = "gharib-product-unit";
            unit.textContent = product.unit;

           

const addButton = document.createElement("button");
addButton.className = "market-add";
addButton.type = "button";
addButton.textContent = "+";
addButton.setAttribute("aria-label", "إضافة " + product.name + " إلى السلة");

addButton.addEventListener("click", function () {
    const cartId = "gharib-" + index;
    const existing = marketCart.find(item => item.id === cartId);
    if (existing) existing.quantity++;
    else marketCart.push({
        id: cartId,
        name: product.name.trim(),
        price: Number(product.price),
        unit: product.unit,
        image: product.image,
        quantity: 1
    });
    updateMarketCart();
    showAddToCartToast();
});

bottom.append(price, unit, addButton);

card.append(picture, title, description, bottom);
gharibGrid.appendChild(card);

        });


    }



    renderGharibProducts();



    // ==================================
    // بانر متحرك تلقائياً - Yalla Shop
    // ==================================

    const bannerImages = Array.from(
        document.querySelectorAll(".banner-image")
    );

    const bannerDots = Array.from(
        document.querySelectorAll(".slider-dots .dot")
    );

    let currentBanner = 0;
    let bannerTimer;

    function showBanner(index) {
        if (bannerImages.length === 0) return;

        currentBanner = (
            index + bannerImages.length
        ) % bannerImages.length;

        bannerImages.forEach((img, i) => {
            img.classList.toggle("active", i === currentBanner);
        });
        // نص مستقل لكل بانر، ويبقى قابلاً للتعديل من HTML/CSS.
        const bannerInfo = [
            {title:'حلّي يومك', second:'بألذ الحلويات', desc:'تشكيلة حلويات لكل مناسبة', category:'حلويات'},
            {title:'عالم', second:'   الألوان والفن ', desc:'كل ما تحتاجه للدراسة', category:'مكتبة'},
            {title:'انتعاش', second:'الطبيعة يومياً  ', desc:'خضرة وفواكه بجودة عالية', category:'خضرة وفواكه'},
            {title:'بيت نظيف', second:'بكل سهولة', desc:'مستلزمات التنظيف لبيتك', category:'منظفات'}
        ];
        const info = bannerInfo[currentBanner];
        const copy = document.querySelector('.photo-hero .hero-copy');
        if (copy && info) {
            const heading = copy.querySelector('h1');
            const subtitle = copy.querySelector('p');
            if (heading) {
                heading.replaceChildren();
                heading.append(document.createTextNode(info.title), document.createElement('br'));
                const second = document.createElement('em'); second.textContent = info.second;
                heading.append(second);
            }
            if (subtitle) subtitle.textContent = info.desc;
            copy.dataset.category = info.category;
        }
        const hero = document.querySelector('.photo-hero');
        if (hero) hero.classList.remove('reference-slide');

        bannerDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentBanner);
        });
    }

    function startBannerSlider() {
        clearInterval(bannerTimer);

        if (bannerImages.length < 2) return;

        bannerTimer = setInterval(() => {
            if (!document.hidden) showBanner(currentBanner + 1);
        }, 4800);
    }

    bannerDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showBanner(index);
            startBannerSlider();
        });
    });

    if (bannerImages.length > 0) {
        showBanner(0);
        startBannerSlider();
    }

    // =====================================
    // صفحة سوبر ماركت - المنتجات بمكان واحد
    // =====================================
    const marketBackButton = document.getElementById("marketBackButton");
    const marketProductsGrid = document.getElementById("marketProductsGrid");
    const marketFilters = document.querySelectorAll(".market-filter");
    const marketSearchInput = document.getElementById("marketProductSearch");
    const marketSearchWrap = document.getElementById("marketSearchWrap");
    const marketProductsTitle = document.getElementById("marketProductsTitle");
    const marketProductsCount = document.getElementById("marketProductsCount");
    const marketNoProducts = document.getElementById("marketNoProducts");

    // أضف كل منتج مرة واحدة فقط من هنا
    const marketProducts = [
  {
            id: 1,
            name: "نجار بدون هال     ",
            price: 600000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Najjar (without cardamom) 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 2,
            name: "نجار مع هال         ",
            price: 670000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Najjar (with cardamom) 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id:3,
            name: "دومينغو          ",
            price: 520000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Domingo 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 4,
            name: "ستار كافيه             ",
            price: 570000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Star Cafe 400g.png",
            pictureClass: "chips-picture"
        },
        {
            id:5,
            name: "كاريوكا           ",
            price: 590000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Carioca 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 6,
            name: "  دانيال بدون هال             ",
            price: 535000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Daniel (without cardamom) 400g.png",
            pictureClass: "chips-picture"
        },
{
            id:7,
            name: "دانيال  مع هال           ",
            price: 630000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Daniel (with cardamom) 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 8,
            name: "  سوبريمو  ",
            price: 500000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Supremo 400g.png",
            pictureClass: "chips-picture"
        },
{
            id:9,
            name: "عدنان    ",
            price: 820000,
            unit: " 500 غ  ",
            category: "coffee",
            image: "images/coffee/Adnan 500g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 10,
            name: "  عدنان مع هال  ",
            price: 860000,
            unit: " 500 غ  ",
            category: "coffee",
            image: "images/coffee/Adnan (with cardamom) 500g.png",
            pictureClass: "chips-picture"
        },
{
            id:11,
            name: "بست كافيه    ",
            price: 510000,
            unit: " 400 غ  ",
            category: "coffee",
            image: "images/coffee/Best Cafe 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 12,
            name: "  معتوق مع هال ",
            price: 630000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Maatouk (with cardamom) 450g.png",
            pictureClass: "chips-picture"
        },
{
            id:13,
            name: "حموي سادة بيور      ",
            price: 690000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Best Cafe 400g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 14,
            name: "  حموي غامق مع اكسترا هال",
            price: 810000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi (dark, with extra cardamom) 450g.png",
            pictureClass: "chips-picture"
        },
{
            id:15,
            name: "حموي كلاسيك مع هال          ",
            price: 760000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi (classic, with cardamom) 450g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 16,
            name: "  حموي اكسترا هال ",
            price: 960000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi (extra cardamom) 450g.png",
            pictureClass: "chips-picture"
        },
{
            id:17,
            name: "  نجار  ",
            price: 290000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Najjar 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 18,
            name: "  نجار مع هال     ",
            price: 300000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Najjar (with cardamom) 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:19,
            name: "  ستار كافيه  ",
            price: 275000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Star Cafe 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 20,
            name: " كاريوكا   ",
            price: 260000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Carioca 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:21,
            name: "  دانيال بدون هال ",
            price: 270000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Daniel (without cardamom) 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 22,
            name: " ريو    ",
            price: 250000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Rio 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:23,
            name: "  سوبريمو",
            price: 245000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Supremo 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 24,
            name: " بن برازيل    ",
            price: 250000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Brazil Coffee 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:25,
            name: "  الداعوق ",
            price: 245000,
            unit: " 200 غ  ",
            category: "coffee",
            image: "images/coffee/Al-Daouk 200g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 26,
            name: " زيدان       ",
            price: 195000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Zaidan 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:27,
            name: "  بالما  ",
            price: 165000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Palma 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 28,
            name: " بست كافيه        ",
            price: 230000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Best Café 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:29,
            name: "  معتوق   ",
            price: 270000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Maatouk 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 30,
            name: " معتوق مع هال          ",
            price: 315000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Maatouk with Cardamom 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:31,
            name: "  حموي كلاسيك مع هال   ",
            price: 360000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi Classic with Cardamom 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 32,
            name: " حموي  ",
            price: 305000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:33,
            name: "  حموي غامق مع هال  ",
            price: 320000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Hamwi Dark with Cardamom 180g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 34,
            name: " دومينغو   ",
            price: 250000,
            unit: " 180 غ  ",
            category: "coffee",
            image: "images/coffee/Domingo 180g.png",
            pictureClass: "chips-picture"
        },
{
            id:35,
            name: "  بن كابتن اسبريسو ",
            price: 1080000,
            unit: " 1 كيلو ",
            category: "coffee",
            image: "images/coffee/Captain Espresso Coffee.png",
            pictureClass: "chips-picture"
        },
          {
            id: 36,
            name: " باريستا مبيض   ",
            price: 270000,
            unit: " 350 غ  ",
            category: "coffee",
            image: "images/coffee/Barista Bleach.png",
            pictureClass: "chips-picture"
        },
{
            id:37,
            name: "  باريستا fat free ",
            price: 380000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Barista Fat-Free.png",
            pictureClass: "chips-picture"
        },
          {
            id: 38,
            name: " كوفي مايت     ",
            price: 250000,
            unit: " 450 غ  ",
            category: "coffee",
            image: "images/coffee/Coffee-Mate 450g.png",
            pictureClass: "chips-picture"
        },
        {
            id:39,
            name: " كوفي مايت",
            price: 450000,
            unit: "   1 كيلو ",
            category: "coffee",
            image: "images/coffee/Coffee-Mate 1 kg.png",
            pictureClass: "chips-picture"
        },
          {
            id: 40,
            name: "   نسكافيه 2in1     ",
            price: 480000,
            unit: "   ",
            category: "coffee",
            image: "images/coffee/Nescafé 2-in-1.png",
            pictureClass: "chips-picture"
        },
{
            id:41,
            name: "   نسكافيه كلاسيك 3in 1 ",
            price: 420000,
            unit: "    ",
            category: "coffee",
            image: "images/coffee/Nescafé Classic 3-in-1.png",
            pictureClass: "chips-picture"
        },
          {
            id: 42,
            name: "  باريستا نسكافيه 2in1   ",
            price: 290000,
            unit: "   ",
            category: "coffee",
            image: "images/coffee/Barista Nescafe 2-in-1.png",
            pictureClass: "chips-picture"
        },
{
            id:43,
            name: "  باريستا 3in1 ",
            price: 320000,
            unit: "    ",
            category: "coffee",
            image: "images/coffee/Barista 3-in-1.png",
            pictureClass: "chips-picture"
        },
          {
            id: 44,
            name: "  تورابيكا كابتشينو 20 + 2  ",
            price: 400000,
            unit: "   ",
            category: "coffee",
            image: "images/coffee/Torabika Cappuccino 20+2.png",
            pictureClass: "chips-picture"
        },
{
            id:45,
            name: "  متى  ",
            price: 120000,
            unit: "    ",
            category: "coffee",
            image: "images/coffee/Mate.png",
            pictureClass: "chips-picture"
        },
          {
            id: 46,
            name: "  نسكافيه تشيبو ",
            price: 620000,
            unit: "200 غ   ",
            category: "coffee",
            image: "images/coffee/Tchibo Coffee 200g.png",
            pictureClass: "chips-picture"
        },
{
            id:47,
            name: "  نسكافيه غولد  ",
            price: 800000,
            unit: "  200 غ   ",
            category: "coffee",
            image: "images/coffee/Nescafé Gold 200g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 48,
            name: "  نجار غولد    ",
            price: 600000,
            unit: "190 غ   ",
            category: "coffee",
            image: "images/coffee/Najjar Gold 190g.png",
            pictureClass: "chips-picture"
        },
{
            id:49,
            name: "  نسكافيه باريستا ",
            price: 625000,
            unit: "  200 غ   ",
            category: "coffee",
            image: "images/coffee/Nescafé Barista 200g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 50,
            name: "  ماتينال   ",
            price: 560000,
            unit: "200 غ   ",
            category: "coffee",
            image: "images/coffee/Matinal 200g.png",
            pictureClass: "chips-picture"
        },
{
            id:51,
            name: " نجار غولد ",
            price: 330000,
            unit: "  95 غ   ",
            category: "coffee",
            image: "images/coffee/Najjar Gold 95g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 52,
            name: "  باريستا كلاسيك   ",
            price: 520000,
            unit: "200 غ   ",
            category: "coffee",
            image: "images/coffee/Barista Classic 200g.png",
            pictureClass: "chips-picture"
        },
{
            id:53,
            name: " باريستا decaf",
            price: 470000,
            unit: "  95 غ   ",
            category: "coffee",
            image: "images/coffee/Barista Decaf 95g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 54,
            name: " نسكافيه كلاسيك  باريستا  ",
            price: 330000,
            unit: "95 غ   ",
            category: "coffee",
            image: "images/coffee/Nescafé Classic 95g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 55,
            name: " نسكافيه نجار احمر ",
            price: 270000,
            unit: "95 غ   ",
            category: "coffee",
            image: "images/coffee/Nescafé Najjar Red 95g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 56,
            name: "نسكافيه بريك ",
            price: 120000,
            unit: "50 غ   ",
            category: "coffee",
            image: "images/coffee/Nescafé Break 50g.png",
            pictureClass: "chips-picture"
        },
{
            id: 57,
            name: " شراب شوكولا بوليو",
            price: 450000,
            unit: "450 غ   ",
            category: "coffee",
            image: "images/coffee/Polio Chocolate Syrup 450g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 58,
            name: "بوليو شراب شوكولا   ",
            price: 30000,
            unit: "ظرف   ",
            category: "coffee",
            image: "images/coffee/Polio Chocolate Syrup (sachet).png",
            pictureClass: "chips-picture"
        },
{
            id: 59,
            name: " كاستر دومر شوكولا ",
            price: 300000,
            unit: "300 غ   ",
            category: "coffee",
            image: "images/coffee/Domo Chocolate Custard 300g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 60,
            name: "كاستر دومو فانيل       ",
            price: 185000,
            unit: "300 غ    ",
            category: "coffee",
            image: "images/coffee/Domo Vanilla Custard 300g.png",
            pictureClass: "chips-picture"
        },
{
            id: 61,
            name: " كاستر دومر شوكولا ",
            price: 135000,
            unit: "200 غ   ",
            category: "coffee",
            image: "images/coffee/Domo Chocolate Custard 200g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 62,
            name: "كاستر دومو فانيل       ",
            price: 100000,
            unit: "200 غ    ",
            category: "coffee",
            image: "images/coffee/Domo Vanilla Custard 200g.png",
            pictureClass: "chips-picture"
        },
{
            id: 63,
            name: " كاكاو دومر ",
            price: 360000,
            unit: "100 غ   ",
            category: "coffee",
            image: "images/coffee/Domo Cocoa 100g.png",
            pictureClass: "chips-picture"
        },
          {
            id: 64,
            name: "دومو هوت شوكو           ",
            price: 40000,
            unit: "ظرف    ",
            category: "coffee",
            image: "images/coffee/Domo Hot Choco (sachet).png",
            pictureClass: "chips-picture"
        },
{
            id: 65,
            name: "  دومو هوت شوكو لايت ",
            price: 40000,
            unit: "ظرف    ",
            category: "coffee",
            image: "images/coffee/Domo Hot Choco Light (sachet).png",
            pictureClass: "chips-picture"
        },         
{
             id: 225,
            name: " بلسم حجاب كوزمال",
            price:220000,
            unit: "  400 مل",
            category: "cleaning",
            image: "images/cleaning/Cosmal Hijab Conditioner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 313,
            name: " 		لمبة ",
            price:	100000,
            unit: "	9W",
            category: "Electrical",
            image: "images/cleaning/9W Light Bulb.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 1,
            name: " 		لمبة ",
            price:	270000,
            unit: "	48W",
            category: "Electrical",
            image: "images/cleaning/48W Light Bulb.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 328,
            name: "  	شامبو سانسيلك",
            price:	200000,
            unit: "	350مل ",
            category: "cleaning",
            image: "images/cleaning/Sunsilk shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 331,
            name: " مسحوق غسيل لاتس ",
            price:	1050000,
            unit: "	4 كيلو ",
            category: "cleaning",
            image: "images/cleaning/Lats laundry powder.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 332,
            name: " برسيل ",
            price:	900000,
            unit: "	4 كيلو ",
            category: "cleaning",
            image: "images/cleaning/Persil.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 333,
            name: " بونكس  ",
            price:	750000,
            unit: "	4 كيلو ",
            category: "cleaning",
            image: "images/cleaning/Bonux 4 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 334,
            name: " بونكس  ",
            price:	310000,
            unit: "	1.5 ك   ",
            category: "cleaning",
            image: "images/cleaning/Bonux 1.5 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 335,
            name: " مدار  ",
            price:	1370000,
            unit: "	7 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/madar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 336,
            name: " اوكسي  ",
            price:	1530000,
            unit: "	10 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Oxy.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 337,
            name: " اريال   ",
            price:	990000,
            unit: "	4 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Ariel 4 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 338,
            name: " حياة    ",
            price:	1400000,
            unit: "	9 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Hayat 9 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 339,
            name: " حياة    ",
            price:	650000,
            unit: "	4 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/4-Kilogram Life.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 340,
            name: " افراح     ",
            price:	1350000,
            unit: "	8 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Afrah 8 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 341,
            name: " برسيل      ",
            price:	1710000,
            unit: "	10 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Persil 10 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 342,
            name: " انفنتي       ",
            price:	750000,
            unit: "	4 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Infiniti 4K.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 343,
            name: " بيروس        ",
            price:	660000,
            unit: "	6 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/peros.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 344,
            name: " اريال         ",
            price:	171000,
            unit: "	10 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Ariel 10 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 345,
            name: " لاتس سائل          ",
            price:	750000,
            unit: "	2 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Liquid Latex 2 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 346,
            name: " لاتس سائل          ",
            price:	1125000,
            unit: "	5 ليتر  ",
            category: "cleaning",
            image: "images/cleaning/Liquid Latex 5 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 347,
            name: "   برسيل سائل          ",
            price:	650000,
            unit: "	5 كيلو  ",
            category: "cleaning",
            image: "images/cleaning/Persil liquid 5 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 348,
            name: " سانيتا سائل       ",
            price:	630000,
            unit: "	5 كيلو  ",
            category: "cleaning",
            image: "images/cleaning/Sanita liquid,.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 349,
            name: "   ايبيزا سائل       ",
            price:	300000,
            unit: "	6 كيلو  ",
            category: "cleaning",
            image: "images/cleaning/Ibiza liquid, 6 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 350,
            name: "  اومو سائل",
            price:	425000,
            unit: "	2.5 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/OMO liquid 2.5 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 351,
            name: " حياة ",
            price:	330000,
            unit: "	3 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/Life 3 Liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 352,
            name: " اريال سائل ",
            price:	630000,
            unit: "	5 كيلو    ",
            category: "cleaning",
            image: "images/cleaning/Ariel liquid detergent 5 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 353,
            name: " ديمكس ",
            price:	300000,
            unit: "	3 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Dymex.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 354,
            name: " معطر غسيل كومفورت ",
            price:	400000,
            unit: "	3 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Comfort Laundry Fragrance 3L.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 355,
            name: " معطر غسيل داوني",
            price:	480000,
            unit: "	3 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Downy laundry scent booster.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 356,
            name: " معطر سانيتا",
            price:	470000,
            unit: "	3 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Sanita perfume.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 357,
            name: " داوني مركز",
            price:	570000,
            unit: "	1.5 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Downy concentrate 1.5 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 358,
            name: " معطر كومفورت",
            price:	340000,
            unit: "	2 ليتر     ",
            category: "cleaning",
            image: "images/cleaning/Comfort perfume.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 359,
            name: " بريل  سائل جلي  ",
            price:	120000,
            unit: "	650 مل      ",
            category: "cleaning",
            image: "images/cleaning/Pril Dishwashing Liquid.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 360,
            name: " بريل  سائل جلي  ",
            price:	250000,
            unit: "	1.25 ليتر      ",
            category: "cleaning",
            image: "images/cleaning/Pril dishwashing liquid 1.25 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 361,
            name: " فيري  ",
            price:	320000,
            unit: "	800 مل      ",
            category: "cleaning",
            image: "images/cleaning/Fairy 800 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 362,
            name: " فيري جامبو  ",
            price:	400000,
            unit: "	      ",
            category: "cleaning",
            image: "images/cleaning/Very Jumbo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 363,
            name: " سائل جلي كرمل ",
            price:	100000,
            unit: "	  مل 650    ",
            category: "cleaning",
            image: "images/cleaning/Karmel Dishwashing Liquid 650 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 364,
            name: " سائل جلي افراح",
            price:	100000,
            unit: "	  عرض مع سفنجة جلي   ",
            category: "cleaning",
            image: "images/cleaning/Afrah Dishwashing Liquid.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 365,
            name: " سائل جلي ديمكس",
            price:	170000,
            unit: "	  1.5 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Dimex dishwashing liquid 1.5 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 366,
            name: " سائل جلي ديمكس",
            price:	850000,
            unit: "	  700 مل   ",
            category: "cleaning",
            image: "images/cleaning/Dimex Dishwashing Liquid 700.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 367,
            name: "معجون مدهش للجلي",
            price:	300000,
            unit: "	  1600غ  ",
            category: "cleaning",
            image: "images/cleaning/Amazing Dishwashing Paste.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 368,
            name: "    سائل جلي لاتس",
            price:	130000,
            unit: "	   1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Lats Dishwashing Liquid.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 369,
            name: "    سائل جلي وزير ",
            price:	350000,
            unit: "	   3 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Wazir dishwashing liquid, 3 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 370,
            name: " بريل اصلي ",
            price:	600000,
            unit: "	   3 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Original Pril, 3 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 371,
            name: " ديمكس سائل جلي",
            price:	340000,
            unit: "	   3.7 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Dimex Dishwashing Liquid 3.7 Liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 372,
            name: " منظفات حياة مع سطل",
            price:	900000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Hayat cleaning supplies with a bucket.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 373,
            name: " يس متعدد الاستعمالات ",
            price:	145000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Multi-purpose.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 374,
            name: " لاتس      ",
            price:	130000,
            unit: "	300غ   ",
            category: "cleaning",
            image: "images/cleaning/Lats 300g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 375,
            name: " محارم معطرة giggles      ",
            price:	85000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Giggles scented wet wipes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 376,
            name: " وايبس وي وي   ",
            price:	130000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Wipes Wee Wee.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 377,
            name: " وايبس كينغ   ",
            price:	90000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Wipes King.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 378,
            name: " وايبس هابيز بالماء      ",
            price:	180000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Habeez Water Wipes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 379,
            name: " وايبس هابيز          ",
            price:	170000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Habeez Wipes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 380,
            name: " وايبس السادا بالماء             ",
            price:	180000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Water Wipes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 381,
            name: " وايبس جيبسي   ",
            price:	155000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Gypsy Wipes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 382,
            name: " مبيض الافراح      ",
            price:	45000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Wedding Whitener (Brightener).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 383,
            name: " نيلة         ",
            price:	30000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Indigo (Nila).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 384,
            name: " منظف ومعقم جيرمكس         ",
            price:	200000,
            unit: "	 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Germex Cleaner and Sanitizer, 1 Liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 385,
            name: " جيرمكس منظف ومعقم ",
            price:	320000,
            unit: "	2 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Germex Cleaner and Sanitizer, 2 Liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 386,
            name: " منظف ومعقم جيرمكس",
            price:	630000,
            unit: "	4 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Germex cleaner and disinfectant, 4 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 387,
            name: " معقم فيرول",
            price:	950000,
            unit: "	500 مل   ",
            category: "cleaning",
            image: "images/cleaning/Ferol disinfectant, 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 388,
            name: " ديتول   ",
            price:	280000,
            unit: "	500 مل   ",
            category: "cleaning",
            image: "images/cleaning/Dettol 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 389,
            name: " اجاكس    ",
            price:	200000,
            unit: "	1.5 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Ajax 1.25 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 390,
            name: " منظف كرمل     ",
            price:	100000,
            unit: "	800 مل   ",
            category: "cleaning",
            image: "images/cleaning/Karmel Cleaner 800 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 391,
            name: " دير جنرال    ",
            price:	130000,
            unit: "	750 مل   ",
            category: "cleaning",
            image: "images/cleaning/Deer General 750 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 392,
            name: " دير جنرال    ",
            price:	330000,
            unit: "	3 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/General 3-liter cleaner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 393,
            name: " سانيتا منظف اسطح      ",
            price:	315000,
            unit: "	3 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/Sanita 3-liter surface cleaner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 394,
            name: " ديمكس  منظف عام ",
            price:	220000,
            unit: "	2.7 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/Dimex All-Purpose Cleaner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 395,
            name: " ملح جلاية سومات",
            price:	290000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Finish Dishwasher Tablets (48 count).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 396,
            name: " سومات زيت جلاية",
            price:	460000,
            unit: "  500 مل  ",
            category: "cleaning",
            image: "images/cleaning/Somat Dishwasher Rinse Aid 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 397,
            name: " مزيل البقع لاتس",
            price:	360000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Lats Stain Remover.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 398,
            name: " هاربيك منظف مراحيض",
            price:	130000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Harpic Toilet Cleaner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 399,
            name: " معطر مراحيض Wwc ",
            price:	90000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/WWC Toilet Freshener.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 400,
            name: " معقم يدين بيور  ",
            price:	40000,
            unit: "  60 مل ",
            category: "cleaning",
            image: "images/cleaning/Pure Hand Sanitizer.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 401,
            name: " اكياس نفايات زهري بيرلا ",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Perla Pink Trash Bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 402,
            name: " اكياس نفايات اسود بيرلا",
            price:	150000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Black Perla waste bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 403,
            name: " اكياس نفايات ازرق بيرلا",
            price:	220000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Perla Blue Trash Bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 404,
            name: "  اكياس نفايات اسود بحبلة",
            price:	50000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Black Trash Bags with Drawstring.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 405,
            name: "  اكياس نفايات زهري  بحبلة",
            price:	450000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Pink trash bags with a drawstring.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 406,
            name: "  اكياس نفايات ازرق   بحبلة",
            price:	70000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Blue trash bags with a drawstring.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 407,
            name: "  كفوف طبية اسود ",
            price:	370000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Black medical gloves.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 408,
            name: "  كفوف طبية ازرق ",
            price:	350000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Blue medical gloves.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 409,
            name: "  مكنة حلاقة عربي ",
            price:	50000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Arabic Shaver.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 410,
            name: "  شفر استور ",
            price:	140000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Astor coded.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 411,
            name: " شفر جيلات",
            price:	200000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Gelatin blade.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 412,
            name: " شفر جيلات نسائي ",
            price:	180000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Women's Gillette Razor.png",
            pictureClass: "cleaning-picture"
        },
       {
             id: 413,
            name: " شفر ستانلس",
            price:	594000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Astra razor blade pack.png",
            pictureClass: "cleaning-picture"
        }, 
     {
             id: 414,
            name: " علبة شفر استرا",
            price:	540000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Astra razor blade packش.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 415,
            name: "معجون حلاقة غادة",
            price:	120000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Ghada Shaving Paste.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 416,
            name: "رغوة حلاقة جيلات    ",
            price:	220000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Gillette Shaving Foam.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 417,
            name: "اودكس ملون        ",
            price:	105000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Odex Color.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 418,
            name: "اودكس ازرق          ",
            price:	100000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Odex Blue 1 Liter.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 419,
            name: "جافيل لكروا  ",
            price:	110000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/La Croix Bleach, 1 liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 420,
            name: "منظف ومعقم كلوركس    ",
            price:	140000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Clorox Cleaner and Disinfectant, 1 Liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 421,
            name: " جافيل ديمكس        ",
            price:	60000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Dimex bleach, 1 liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 422,
            name: " كرمل معقم ومطهر          ",
            price:	70000,
            unit: " 1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Carmel sterilizer and disinfectant, 1 liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 423,
            name: " لكروا    ",
            price:	300000,
            unit: " 3.5 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Lacroix 3.8 litres.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 424,
            name: " جافيل ديمكس    ",
            price:	220000,
            unit: "3 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Javel Dimex 3 liters.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 425,
            name: " اودكس       ",
            price:	300000,
            unit: "4 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Audex 4 Liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 426,
            name: " صابونة جيف       ",
            price:	30000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Jif soap.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 427,
            name: " صابونة دوف        ",
            price:	80000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Dove soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 428,
            name: " صابونة ديتول         ",
            price:	550000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Dettol soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 429,
            name: " صابونة الوزير          ",
            price:	850000,
            unit: "  5 حبات  ",
            category: "cleaning",
            image: "images/cleaning/Al-Wazir soap (pack of 5).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 430,
            name: " صابونة لوكس           ",
            price:	700000,
            unit: "  5 حبات  ",
            category: "cleaning",
            image: "images/cleaning/Lux soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 431,
            name: " صابون سائل ديتول ",
            price:	150000,
            unit: "  250 مل    ",
            category: "cleaning",
            image: "images/cleaning/Dettol liquid soap 250 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 432,
            name: " صابون سائل ايبيزا",
            price:	100000,
            unit: "  500 مل    ",
            category: "cleaning",
            image: "images/cleaning/Ibiza liquid soap 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 433,
            name: " صابون سائل لوكس ",
            price:	200000,
            unit: "  500 مل    ",
            category: "cleaning",
            image: "images/cleaning/Lux Liquid Soap 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 434,
            name: " صابون السادة  لوكس ",
            price:	75000,
            unit: "  500 مل    ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Liquid Soap 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 435,
            name: " مزيل التعرق ريكسونا",
            price:	260000,
            unit: "  200 مل    ",
            category: "cleaning",
            image: "images/cleaning/Rexona Deodorant 200 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 436,
            name: " صابون سائل السادة غالون",
            price:	240000,
            unit: "    ليتر 3.75    ",
            category: "cleaning",
            image: "images/cleaning/Liquid Soap (Plain) – 1 Gallon.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 437,
            name: " مزيل التعرق نيفيا",
            price:	270000,
            unit: "    150 مل   ",
            category: "cleaning",
            image: "images/cleaning/Nivea Deodorant 150 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 438,
            name: " مزيل التعرق اديداس",
            price:	270000,
            unit: "    150 مل   ",
            category: "cleaning",
            image: "images/cleaning/Adidas Deodorant 150 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 439,
            name: " نيفيا رول",
            price:	180000,
            unit: "      ",
            category: "cleaning",
            image: "images/cleaning/Nivea Roll-on.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 440,
            name: " بلسم الفيف  ",
            price:	300000,
            unit: "  200 مل    ",
            category: "cleaning",
            image: "images/cleaning/Elvive Conditioner 200 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 441,
            name: " الترا دو بلسم  ",
            price:	275000,
            unit: "   200 مل    ",
            category: "cleaning",
            image: "images/cleaning/Ultra Doux Conditioner 200 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 442,
            name: " بلسم تريزيدي      ",
            price:	200000,
            unit: "  400 مل    ",
            category: "cleaning",
            image: "images/cleaning/Tresédy Conditioner 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 443,
            name: " بلسم دوف      ",
            price:	340000,
            unit: "   350 مل    ",
            category: "cleaning",
            image: "images/cleaning/Dove Conditioner 350ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 445,
            name: " بلسم كوزمالين        ",
            price:	250000,
            unit: "  500 مل    ",
            category: "cleaning",
            image: "images/cleaning/Cosmaline Conditioner 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 446,
            name: "   بلسم بانتين      ",
            price:	350000,
            unit: "   500 مل    ",
            category: "cleaning",
            image: "images/cleaning/Pantene Conditioner 500 ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 447,
            name: " بلسم ايبيزا           ",
            price:	170000,
            unit: "  1 ليتر   ",
            category: "cleaning",
            image: "images/cleaning/Ibiza Conditioner 1 Liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 448,
            name: "   بديل الزيت بانتين  ",
            price:	340000,
            unit: "   275 مل    ",
            category: "cleaning",
            image: "images/cleaning/Pantene Oil Replacement 275 ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 449,
            name: " زيت جونسون ",
            price:	260000,
            unit: "  300 مل  ",
            category: "cleaning",
            image: "images/cleaning/Johnson’s Oil 300 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 450,
            name: "  لوكس شاور جل ",
            price:	300000,
            unit: "   700 مل    ",
            category: "cleaning",
            image: "images/cleaning/Lux Shower Gel 700 ml.png",
            pictureClass: "cleaning-picture"
        },
                {
             id: 451,
            name: "ماليزيا شاور جل ",
            price:	207000,
            unit: "  1 ليتر ",
            category: "cleaning",
            image: "images/cleaning/Malaysian shower gel, 1 liter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 452,
            name: "  شاور جل كليب",
            price:	300000,
            unit: "      ",
            category: "cleaning",
            image: "images/cleaning/Clip shower gel.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 453,
            name:" كليب لوشن للجسم",
            price:	430000,
            unit: " 400 مل",
            category: "cleaning",
            image: "images/cleaning/Clip Body Lotion 400 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 454,
            name: "  بلسم السادة",
            price:	260000,
            unit: "  1.85 ليتر    ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Conditioner 1.85 liters.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 455,
            name:" شامبو جونسون اطفال    ",
            price:	150000,
            unit: " 400 مل",
            category: "cleaning",
            image: "images/cleaning/Johnson’s Baby Shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 456,
            name: "  شامبو جونسون اطفال  ",
            price:	280000,
            unit: " 750 مل   ",
            category: "cleaning",
            image: "images/cleaning/Johnson’s Baby Shampoo 750ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 457,
            name:" شامبو كلير   ",
            price:	570000,
            unit: " 900 مل",
            category: "cleaning",
            image: "images/cleaning/Clear Shampoo 900ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 458,
            name: "  شامبو سانسيلك ",
            price:	520000,
            unit: " 1000 مل   ",
            category: "cleaning",
            image: "images/cleaning/Sunsilk Shampoo 1000ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 459,
            name:" شامبو دوف  ",
            price:	687000,
            unit: " 1000 مل",
            category: "cleaning",
            image: "images/cleaning/Dove Shampoo 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 460,
            name: "  شامبو بانتين ",
            price:	720000,
            unit: " 1000 مل   ",
            category: "cleaning",
            image: "images/cleaning/Pantene Shampoo 1000ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 461,
            name:" شامبو شولدرز    ",
            price:	740000,
            unit: " 1000 مل",
            category: "cleaning",
            image: "images/cleaning/Head & Shoulders Shampoo 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 462,
            name: "  شامبو الفيف",
            price:	450000,
            unit: " 600 مل   ",
            category: "cleaning",
            image: "images/cleaning/Elvive Shampoo 600ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 463,
            name:" شامبو دوف   ",
            price:	420000,
            unit: " 600 مل",
            category: "cleaning",
            image: "images/cleaning/dove.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 464,
            name: "  شامبو الفيف",
            price:	350000,
            unit: " 400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Elvive Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 465,
            name:" شامبو شولدرز    ",
            price:	410000,
            unit: " 500 مل",
            category: "cleaning",
            image: "images/cleaning/Head & Shoulders 500ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 466,
            name: "  شامبو شولدرز ",
            price:	330000,
            unit: " 350 مل   ",
            category: "cleaning",
            image: "images/cleaning/Head & Shoulders Shampoo 350ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 467,
            name:" شامبو بانتين    ",
            price:	330000,
            unit: " 400 مل",
            category: "cleaning",
            image: "images/cleaning/Pantene Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 468,
            name: "  شامبو tresemme   ",
            price:	200000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Tresemme Shampoo.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 469,
            name:" شامبو حجاب   ",
            price:	200000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Hijab Shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 470,
            name: "  شامبو سانسيلك   ",
            price:	180000,
            unit: "  350 مل   ",
            category: "cleaning",
            image: "images/cleaning/Sunsilk shampoo 350ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 471,
            name:"شامبو صبغة شعر   ",
            price:	200000,
            unit: " 420 مل   ",
            category: "cleaning",
            image: "images/cleaning/Hair dye shampoo 420ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 472,
            name: "  شامبو كلير    ",
            price:	260000,
            unit: "  400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Clear shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 473,
            name:"شامبو كلير       ",
            price:	360000,
            unit: " 600 مل   ",
            category: "cleaning",
            image: "images/cleaning/Clear shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 474,
            name: "  شامبو فاتيكا  ",
            price:	225000,
            unit: "  400 مل   ",
            category: "cleaning",
            image: "images/cleaning/vatika.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 475,
            name:"شامبو الترادو اطفال         ",
            price:	300000,
            unit: " 400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Ultra Doux Kids Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 476,
            name: "  شامبو الترا دو    ",
            price:	350000,
            unit: "  400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Ultra Doux Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 477,
            name:"شامبو اطفال السادا             ",
            price:	180000,
            unit: " 400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Baby Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 478,
            name: "  شامبو herbal   ",
            price:	360000,
            unit: "  400 مل   ",
            category: "cleaning",
            image: "images/cleaning/Herbal Shampoo 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 479,
            name:"شامبو برت بلاس                 ",
            price:	290000,
            unit: " 600 مل   ",
            category: "cleaning",
            image: "images/cleaning/Pert Plus Shampoo 600ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 480,
            name: "    شامبو ايبيزا   ",
            price:	125000,
            unit: "  650 مل   ",
            category: "cleaning",
            image: "images/cleaning/Ibiza Shampoo 650ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 481,
            name:"  شامبو اليغانس مع جل استحمام ",
            price:	270000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Elegance Shampoo with Shower Gel.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 482,
            name: "    شامبو اليغانس     ",
            price:	240000,
            unit: "  750 مل   ",
            category: "cleaning",
            image: "images/cleaning/Elegance Shampoo 750ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 483,
            name:"  شامبو كوزمالين",
            price:	300000,
            unit: "  500 مل   ",
            category: "cleaning",
            image: "images/cleaning/Cosmaline Shampoo 500ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 484,
            name: "    جل شعر السادا        ",
            price:	360000,
            unit: "  1000 مل   ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Hair Gel 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 485,
            name:"  جل شعر السادا  ",
            price:	120000,
            unit: "  250 مل   ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Hair Gel 250ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 486,
            name: "    جل شعر السادا        ",
            price:	60000,
            unit: "  100 مل   ",
            category: "cleaning",
            image: "images/cleaning/Al-Sada Hair Gel 100ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 486,
            name:"  كلونيا 777   ",
            price:	140000,
            unit: "  125 مل   ",
            category: "cleaning",
            image: "images/cleaning/777 Cologne 125ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 487,
            name: "  كالونيا 777      ",
            price:	250000,
            unit: "  280 مل   ",
            category: "cleaning",
            image: "images/cleaning/777 Cologne 280ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 488,
            name: "ممسحة ارض         ",
            price:	110000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Floor mop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 489,
            name: "فوط مطبخ        ",
            price:	56000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Kitchen towels.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 490,
            name: "ممسحة ارض ميكرو فايبر           ",
            price:	200000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Magic cotton floor mop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 491,
            name: "ممسحة ارض قطن ماجيك          ",
            price:	75000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Microfiber floor mop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 492,
            name: "  ماجيك كلين فيسكوز ",
            price:	80000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Magic Clean Viscose.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 493,
            name: " فيليدا 3+1اسفنج  ",
            price:	300000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Vileda 3+1 Sponges.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 494,
            name: "  فوط ايديكس",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Idex Towels.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 495,
            name: " فوط زجاج اوكسي ",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Oxi Glass Towels.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 496,
            name: " فوطة oks ميكرو فايبر",
            price:	130000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/OKS Microfiber Towel.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 497,
            name: " كف عمال  ",
            price:	60000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Workers' Gloves.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 498,
            name: " كف ماليزي ",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Malaysian-style mop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 499,
            name: " مساحة ماجيك متحركة  ",
            price:	450000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Adjustable magic mop.png",
            pictureClass: "cleaning-picture"
        },
       {
             id: 500,
            name: " مساحة سيلكون   ",
            price:	360000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Silicone squeegee.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 501,
            name: " شفاطة كوبرا طويلة ",
            price:	70000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Long Cobra suction tool.png",
            pictureClass: "cleaning-picture"
        }, 
     {
             id: 502,
            name: " شفاطة كوبرا قصيرة     ",
            price:	60000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Cobra short suction cup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 503,
            name: "شفاطة اوكسي",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Oxy suction cup.png",
            pictureClass: "cleaning-picture"
        }, 
 {
             id: 504,
            name: " عصا حديد  ",
            price:	80000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Iron rod.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 505,
            name: "عصا خشب   ",
            price:	40000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Wooden stick.png",
            pictureClass: "cleaning-picture"
        }, 
 {
             id: 506,
            name: " مكنسة ناعمة  ",
            price:	125000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Soft broom.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 507,
            name: "مكنسة نايلون خشنة     ",
            price:	110000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Coarse Nylon Broom.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 508,
            name: "شفاطة زجاج او مجلى         ",
            price:	45000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Glass or sink suction cup.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 509,
            name: "مجرود حديد          ",
            price:	130000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Metal dustpan.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 510,
            name: "  مكنسة ناعمة  ",
            price:	50000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Soft broom 2.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 511,
            name: "  مكنسة مع نربيش           ",
            price:	150000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Broom with hose.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 512,
            name: "  فرشاة سجاد    ",
            price:	60000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Carpet brush.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 513,
            name: "  معطر جو   ",
            price:	220000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Air freshener.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 514,
            name: "  معطر جو مكنة نسمات ",
            price:	200000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Nasamat Air Freshener Machine.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 515,
            name: " معطر جو لاتس  ",
            price:	230000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Lets Air Freshener.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 516,
            name: "  هاكر طارد حشرات  ",
            price:	70000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Insect Repellent Hacker.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 517,
            name: "  هاكر قاتل الحشرات",
            price:	225000,
            unit: "  400 مل ",
            category: "household",
            image: "images/cleaning/Hacker Insect Killer 400 ml.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 518,
            name: " قاتل الحشرات هاكر ",
            price:	335000,
            unit: " 750 مل   ",
            category: "household",
            image: "images/cleaning/Hacker Insect Killer 750 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 519,
            name: "  فرشاية اسنان اورال",
            price:	70000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Oral-B toothbrush.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 520,
            name: " معجون اسنان كرست",
            price:	110000,
            unit: "    ",
            category: "household",
            image: "images/cleaning/Crest toothpaste.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 521,
            name: "  معجون اسنان اطفال كولغيت",
            price:	90000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Colgate children's toothpaste.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 522,
            name: " معجون اسنان اكوا فريش",
            price:	120000,
            unit: "    ",
            category: "household",
            image: "images/cleaning/Aquafresh toothpaste.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 523,
            name: "  معجون اسنان كولغيت",
            price:	120000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Colgate toothpaste.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 524,
            name: " معجون اسنان سيغنال",
            price:	400000,
            unit: "    ",
            category: "household",
            image: "images/cleaning/Signal toothpaste.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 525,
            name: "  معجون اسنان سانسوداين",
            price:	270000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Sensodyne toothpaste.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 526,
            name: " مناشف بيرلا",
            price:	45000,
            unit: "   200 غ ",
            category: "household",
            image: "images/cleaning/Perla towels 200 grams.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 527,
            name: "  محارم ناعمة جيبسي",
            price:	190000,
            unit: " 300 منديل   ",
            category: "household",
            image: "images/cleaning/Gypsy soft tissues (300 tissues).png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 528,
            name: " محارم كينغ",
            price:	45000,
            unit: "   200 غ ",
            category: "household",
            image: "images/cleaning/King tissues (200 grams).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 529,
            name: "  محارم لومكس تواليت",
            price:	550000,
            unit: " 4 رول   ",
            category: "household",
            image: "images/cleaning/Lumex Toilet Paper (4-roll pack).png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 530,
            name: " محارم كينغ",
            price:	90000,
            unit: "   400 غ ",
            category: "household",
            image: "images/cleaning/King Tissues 400g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 531,
            name: "  رول مطبخ",
            price:	120000,
            unit: "    ",
            category: "household",
            image: "images/cleaning/Kitchen roll.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 532,
            name: " اولويز ماكسي",
            price:	320000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Always Maxi.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 533,
            name: "  اولويز ماكسي ليلي",
            price:	300000,
            unit: "    ",
            category: "household",
            image: "images/cleaning/Always Maxi Night.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 534,
            name: " اولويز 8 طويل  ",
            price:	120000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Always 8 Long.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 535,
            name: "  نانا ماكسي ",
            price:	110000,
            unit: " 18 فوطة    ",
            category: "household",
            image: "images/cleaning/Nana Maxi 18 pads.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 536,
            name: " نانا ماكسي ",
            price:	140000,
            unit: "  9 فوطة ",
            category: "household",
            image: "images/cleaning/Nana Maxi 9 pads.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 537,
            name: "  ريلاكس ",
            price:	220000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Relax.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 538,
            name: "  فريش داي   ",
            price:	400000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Fresh Day.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 539,
            name: "  برايفت سوبر ",
            price:	230000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Private Super.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 540,
            name: "  برايفت ليلي  ",
            price:	240000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Private Lily.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 541,
            name: "  برايفت  10 + 20  مجاني",
            price:	200000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Private 20+10 Free.png",
            pictureClass: "cleaning-picture"
        }, 
{
             id: 542,
            name: "  جل شعر السادا  ",
            price:	360000,
            unit: " 1000 مل  ",
            category: "household",
            image: "images/cleaning/Sada Hair Gel with 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 544,
            name: "  جل شعر السادا  ",
            price:	60000,
            unit: " 100 مل  ",
            category: "household",
            image: "images/cleaning/Sada Hair Gel with 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 545,
            name: "  Perfume elegance ",
            price:	200000,
            unit: " 300 مل  ",
            category: "household",
            image: "images/cleaning/Perfume elegance 300ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 546,
            name: "  Elegance body splash ",
            price:	210000,
            unit: " 300 مل  ",
            category: "household",
            image: "images/cleaning/Elegance body splash 300ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 547,
            name: "  مزيل طلاء اظافر السادا ",
            price:	70000,
            unit: " 200 مل  ",
            category: "household",
            image: "images/cleaning/Sada Nail Polish Remover 200ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 548,
            name: " سبراي لفك تشابك الشعر السادا ",
            price:	170000,
            unit: " 120 مل  ",
            category: "household",
            image: "images/cleaning/Sada Hair Detangling Spray 120ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 549,
            name: "  Wax شعر السادا",
            price:	110000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Sada Hair Wax.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 550,
            name: " موس شعر اليغانس  ",
            price:	630000,
            unit: " 500 مل  ",
            category: "household",
            image: "images/cleaning/Elegance Hair Mousse 500ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 551,
            name: "  مثبت شعر اليغانس ",
            price:	345000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Elegance Hairspray.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 552,
            name: " بودرة جونسون ",
            price:	270000,
            unit: " 200 مل  ",
            category: "household",
            image: "images/cleaning/Johnson's Powder 200g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 553,
            name: "  كليب ",
            price:	220000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Clip.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 554,
            name: " فازلين ",
            price:	230000,
            unit: "  ",
            category: "household",
            image: "images/cleaning/Vaseline.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 555,
            name: "  كولونيا اطفال ",
            price:	140000,
            unit: "300 مل   ",
            category: "household",
            image: "images/cleaning/Children's Cologne.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 556,
            name: " سبيرتو السادا ",
            price:	90000,
            unit: " 250 مل ",
            category: "household",
            image: "images/cleaning/Alsada Alcohol 250ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 557,
            name: "  هالك صراصير ",
            price:	50000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Cockroach killer.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 558,
            name: " نيفيا كريم",
            price:	120000,
            unit: "  ",
            category: "household",
            image: "images/cleaning/Nivea cream.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 559,
            name: " Labello",
            price:	180000,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Labello.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 560,
            name: " فازلين لوشن  ",
            price:	270000,
            unit: " 400 مل ",
            category: "household",
            image: "images/cleaning/Vaseline Lotion 400ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 561,
            name: " سبيرتو السادا ",
            price:	200000,
            unit: "  1000 مل ",
            category: "household",
            image: "images/cleaning/Al-Saada Rubbing Alcohol 1000ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 562,
            name: " كليب صغير     ",
            price:	120000,
            unit: "  ",
            category: "household",
            image: "images/cleaning/Small clip.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 563,
            name: " حفاضات وي وي عادي ",
            price:	630000,
            unit: "  مقياس من1الى 6",
            category: "household",
            image: "images/cleaning/Wee Wee Standard Diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 564,
            name: "حفاضات وي وي حجم اقتصادي     ",
            price:	845000,
            unit: " مقياس من1الى 6 ",
            category: "household",
            image: "images/cleaning/Wee Wee Diapers – Economy Size.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 565,
            name: " 	حفاضات لولو ",
            price:	380000,
            unit: "	  مقياس من1الى 6  ",
            category: "cleaning",
            image: "images/cleaning/Lulu Diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 566,
            name: " حفاضات غيزمو ",
            price:	270000,
            unit: " قياس من1الى7",
            category: "household",
            image: "images/cleaning/Gizmo Diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 567,
            name: " بيبي امل  ",
            price:	380000,
            unit: "	  مقياس من1الى 6  ",
            category: "cleaning",
            image: "images/cleaning/Baby Amal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 568,
            name: " حفاضات تيدي  ",
            price:	180000,
            unit: " مقياس من1الى 6 ",
            category: "household",
            image: "images/cleaning/Teddy Diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 569,
            name: " حفاضات باربي ",
            price:	175000,
            unit: "	  مقياس من1الى 6  ",
            category: "cleaning",
            image: "images/cleaning/Barbie Diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 570,
            name: " كرتونة هابيز     ",
            price:	2160000,
            unit: "  ",
            category: "household",
            image: "images/cleaning/Huggies carton.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 571,
            name: "   حفاضات بيبي كبير  ",
            price:	630000,
            unit: "	   ",
            category: "cleaning",
            image: "images/cleaning/Large baby diapers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 572,
            name: " كباية كرتون  ",
            price:	60000,
            unit: " 6 اوز ",
            category: "household",
            image: "images/cleaning/6 oz paper cup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 573,
            name: "  كبايات بلاستيك",
            price:	750000,
            unit: "100 حبة",
            category: "cleaning",
            image: "images/cleaning/Plastic cups (100 count).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 574,
            name: " كباية كرتون  ",
            price:	90000,
            unit: " 9 اوز ",
            category: "household",
            image: "images/cleaning/9 oz paper cup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 575,
            name: "  كباية كرتون",
            price:	45000,
            unit: "4 اوز   ",
            category: "cleaning",
            image: "images/cleaning/4 oz paper cup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 576,
            name: " فنجان قهوة بلاستيك    ",
            price:	50000,
            unit: " 100 حبة   ",
            category: "household",
            image: "images/cleaning/Plastic coffee cups.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 577,
            name: "    اصابع تشعيل فحم  ",
            price:	150000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Charcoal-lighting sticks.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 578,
            name: " فحم اركيلة مسدس  ",
            price:	380000,
            unit: "   1 كيلو    ",
            category: "household",
            image: "images/cleaning/Hookah Charcoal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 579,
            name: "   فحم شوي مميز  ",
            price:	270000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Premium Grilling Charcoal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 580,
            name: " فحم شوي عالماشي      ",
            price:	420000,
            unit: "       ",
            category: "household",
            image: "images/cleaning/Quick-light charcoal for grilling.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 581,
            name: "   فحم اركيلة افريقي      ",
            price:	740000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/African hookah charcoal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 582,
            name: " فحم شوي افريقي     ",
            price:	410000,
            unit: "       ",
            category: "household",
            image: "images/cleaning/African charcoal for grilling.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 583,
            name: "   شوك او معالق بلاستيك    ",
            price:	60000,
            unit: "   ",
            category: "cleaning",
            image: "images/cleaning/Plastic forks or spoons.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 584,
            name: " صحن بلاستيك    ",
            price:	60000 ,
            unit: "  7 انش     ",
            category: "household",
            image: "images/cleaning/7-inch plastic plate.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 585,
            name: "  صحن بلاستيك ",
            price:	90000,
            unit: "  9 انش   ",
            category: "cleaning",
            image: "images/cleaning/9-inch plastic plate.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 586,
            name: " صحن غميق بلاستيك      ",
            price:	300000 ,
            unit: "     ",
            category: "household",
            image: "images/cleaning/Deep plastic bowl.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 587,
            name: "  كاسة مع غطا    ",
            price:	450000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Cup with a lid.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 588,
            name: " ورق المينيوم بيرلا  ",
            price:	270000 ,
            unit: "  750 غ   ",
            category: "household",
            image: "images/cleaning/Perla Aluminum Foil 750g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 589,
            name: "  ورق نايلون لاصق بيرلا ",
            price:	230000,
            unit: "   700 غ  ",
            category: "cleaning",
            image: "images/cleaning/Perla Cling Film 700g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 590,
            name: " ورق المينيوم بيرلا  ",
            price:	80000 ,
            unit: "  7.6  متر ",
            category: "household",
            image: "images/cleaning/Perla aluminum foil 7.6m.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 591,
            name: "  ورق نايلون لاصق بيرلا ",
            price:	60000,
            unit: "     0.3*15 متر  ",
            category: "cleaning",
            image: "images/cleaning/Perla adhesive film 15m x 0.3m.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 592,
            name: " سيف نيغرو ",
            price:	180000 ,
            unit: "  7.6  متر ",
            category: "household",
            image: "images/cleaning/Negro Sword.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 593,
            name: "  سيف ستاليس اوكس",
            price:	80000,
            unit: "   15 غ ",
            category: "cleaning",
            image: "images/cleaning/Stainless Steel Sword (15g).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 594,
            name: " ليف جلي سويت",
            price:	40000 ,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Live Jelly Sweet.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 595,
            name: "  ليف جلي ماجيك ",
            price:	50000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Live Jelly Magic.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 596,
            name: " ليفة حمام كف   ",
            price:	100000 ,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Bath mitt.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 597,
            name: "  ملاقط خشب ",
            price:	60000,
            unit: "  20 ملقط   ",
            category: "cleaning",
            image: "images/cleaning/Wooden tongs.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 598,
            name: " ملاقط بلاستيك باج        ",
            price:	90000 ,
            unit: "   ",
            category: "household",
            image: "images/cleaning/Plastic bag clips.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 599,
            name: "  سوفت لازالة الشعر    ",
            price:	45000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Soft, for hair removal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 600,
            name: " مفرش سفرة    ",
            price:	90000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Table cover.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 601,
            name: "  اكياس تفريز مع سحاب  ",
            price:	60000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Parchment paper.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 602,
            name: " ورق زبدة",
            price:	120000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Freezer bags with a zipper.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 603,
            name: " اكياس ساندويش  ",
            price:	70000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Sandwich bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 604,
            name: " سنيتا اركيلة بيرلا",
            price:	100000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Sunita Arkeela Perla.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 605,
            name: " سيخ لحمة    ",
            price:	45000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Meat skewer.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 606,
            name: " سنيتا    ",
            price:	200000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Sanita.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 607,
            name: " ورق زبدة رول       ",
            price:	130000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Parchment paper roll.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 608,
            name: " اكياس فرن     ",
            price:	45000,
            unit: "    ",
            category: "cleaning",
            image: "images/cleaning/Oven bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 609,
            name: "   شاي ليبتون     ",
            price:	230000,
            unit: " 100 ظرف   ",
            category: "food",
            image: "images/foodstuffs/Lipton tea, 100 bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 610,
            name: " شاي ليبتون       ",
            price:	70000,
            unit: "  25 ظرف  ",
            category: "food",
            image: "images/foodstuffs/Lipton tea, 25 bags.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 611,
            name: "   شاي رأس الحصان       ",
            price:	200000,
            unit: " 140 غ   ",
            category: "food",
            image: "images/foodstuffs/Horse Head Tea 140g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 612,
            name: "   شاي رأس الحصان       ",
            price:	460000,
            unit: "  350 غ  ",
            category: "food",
            image: "images/foodstuffs/Horse Head Tea 350g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 613,
            name: "   شاي رأس الحصان       ",
            price:	890000,
            unit: " 700 غ   ",
            category: "food",
            image: "images/foodstuffs/Horse Head Tea 700g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 614,
            name: "  شاي الوزة   ",
            price:	130000,
            unit: "  50 ظرف ",
            category: "food",
            image: "images/foodstuffs/Al-Wazza Tea (50 sachets).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 615,
            name: "   امين باش زنجبيل بالعسل    ",
            price:	80000,
            unit: " 12 ظرف  ",
            category: "food",
            image: "images/foodstuffs/Amin Bash Ginger with Honey.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 616,
            name: "  العطارة زهورات مشكلة   ",
            price:	80000,
            unit: "  20 ظرف ",
            category: "food",
            image: "images/foodstuffs/Al-Attara Assorted Herbal Blend (20 sachets).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 617,
            name: "   سحلب دومو   ",
            price:	250000,
            unit: "   ظرف  ",
            category: "food",
            image: "images/foodstuffs/Domo Sahlab sachet.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 618,
            name: "  جيلي دومو نباتي 1+5 مجانا  ",
            price:	360000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Domo Vegetarian Jelly (5+1 free).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 619,
            name: "   سيريلاك   ",
            price:	120000,
            unit: "      ",
            category: "food",
            image: "images/foodstuffs/Cerelac.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 620,
            name: "  جيلي دومو نباتي 1+5 مجانا  ",
            price:	280000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Jelly Domo 5+1 free.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 621,
            name: "   امريكانا بيتي فور   ",
            price:	800000,
            unit: "  900 غ    ",
            category: "food",
            image: "images/foodstuffs/Americana Petit Fours 900g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 622,
            name: "  رز سام ",
            price:	100000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Sami Rice 1.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 623,
            name: "   بسكوت غندور  ",
            price:	270000,
            unit: "      ",
            category: "food",
            image: "images/foodstuffs/Gandour biscuits.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 624,
            name: "  شراب دارينا",
            price:	20000,
            unit: "  ظرف ",
            category: "food",
            image: "images/foodstuffs/Darina drink mix (sachet).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 625,
            name: "  كورن فلاكس ",
            price:	630000,
            unit: "  900 غ    ",
            category: "food",
            image: "images/foodstuffs/Corn Flakes 900g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 626,
            name: "  بوبينز  ",
            price:	400000,
            unit: "  500 غ ",
            category: "food",
            image: "images/foodstuffs/Poppins 500g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 627,
            name: "  نيدو  ",
            price:	1620000,
            unit: "  2250 غ    ",
            category: "food",
            image: "images/foodstuffs/Nido 2,250 grams.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 628,
            name: "  نيدو   ",
            price:	780000,
            unit: "  900 غ ",
            category: "food",
            image: "images/foodstuffs/Nido 900 grams.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 629,
            name: "  حليب دانو  ",
            price:	420000,
            unit: "  750 غ    ",
            category: "food",
            image: "images/foodstuffs/Dano milk 750 grams.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 630,
            name: "  حليب كليو   ",
            price:	560000,
            unit: "  900 غ ",
            category: "food",
            image: "images/foodstuffs/Clio milk 900 grams.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 631,
            name: "  حليب لاكتو   ",
            price:	420000,
            unit: "  750 غ    ",
            category: "food",
            image: "images/foodstuffs/Lacto milk 750g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 632,
            name: "  حليب كليم    ",
            price:	1170000,
            unit: "  2 كيلو",
            category: "food",
            image: "images/foodstuffs/KLIM milk 2kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 633,
            name: "  معكرونة ريجيا   ",
            price:	100000,
            unit: "      ",
            category: "food",
            image: "images/foodstuffs/Regia pasta.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 634,
            name: "  لازانيا ريجيا   ",
            price:	250000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Regia Lasagna.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 635,
            name: "   معكرونة باريلا طويلة  ",
            price:	120000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Barilla long pasta.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 636,
            name: "  فوتوتشيني ريجيا  ",
            price:	150000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Fettuccine Regia.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 637,
            name: "   جبنة سميدس ",
            price:	1040000,
            unit: " 105 كيلو  ",
            category: "food",
            image: "images/foodstuffs/Barilla long pasta.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 638,
            name: "  فوتوتشيني ريجيا  ",
            price:	150000,
            unit: "   ",
            category: "food",
            image: "images/foodstuffs/Fettuccine Regia.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 639,
            name: "   جبنة سميدس ",
            price:	1040000,
            unit: " 105 كيلو  ",
            category: "food",
            image: "images/foodstuffs/Smedes Cheese 105 kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 640,
            name: "  جبنة سميدس ",
            price:	650000,
            unit: " 900 غ  ",
            category: "food",
            image: "images/foodstuffs/Smedes Cheese 900g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 641,
            name: "   جبنة سميدس ",
            price:	290000,
            unit: " 400 غ   ",
            category: "food",
            image: "images/foodstuffs/Smedes Cheese 400g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 642,
            name: "  جبنة la vache quirit   ",
            price:	130000,
            unit: " 8 قطع ",
            category: "food",
            image: "images/foodstuffs/La Vache Qui Rit cheese, 8 pieces.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 643,
            name: "     جبنة la vache quirit ",
            price:	260000,
            unit: " ١٦ قطعة  ",
            category: "food",
            image: "images/foodstuffs/La Vache Qui Rit cheese, 16 pieces.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 644,
            name: "     جبنة la vache quirit ",
            price:	375000,
            unit: " 24 قطعة  ",
            category: "food",
            image: "images/foodstuffs/La Vache Quirit cheese, 24 pieces.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 645,
            name: "   بيكون سامبلي",
            price:	55000,
            unit: " 8 قطع    ",
            category: "food",
            image: "images/foodstuffs/Becon Sample 8 pieces.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 646,
            name: "   بيكون  ",
            price:	130000,
            unit: " 8 قطعة  ",
            category: "food",
            image: "images/foodstuffs/8 amulets.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 647,
            name: "  بيكون    ",
            price:	260000,
            unit: " 16 قطعة    ",
            category: "food",
            image: "images/foodstuffs/16 amulets.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 648,
            name: "   بيكون  ",
            price:	370000,
            unit: " 24 قطعة  ",
            category: "food",
            image: "images/foodstuffs/It will be 24.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 649,
            name: "  بيكون    ",
            price:	480000,
            unit: " 32 قطعة    ",
            category: "food",
            image: "images/foodstuffs/It will be 32.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 650,
            name: "   جبنة بيلا  ",
            price:	50000,
            unit: " 8 قطع  ",
            category: "food",
            image: "images/foodstuffs/Bella cheese (8 pieces).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 651,
            name: "  كيري    ",
            price:	130000,
            unit: " 6 قطع    ",
            category: "food",
            image: "images/foodstuffs/Kiri cheese (6 pieces).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 652,
            name: "  كيري ",
            price:	180000,
            unit: " 12 قطعة  ",
            category: "food",
            image: "images/foodstuffs/Kiri 12 pieces.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 653,
            name: "  كيري    ",
            price:	500000,
            unit: " 400 غ   ",
            category: "food",
            image: "images/foodstuffs/Kiri 400 grams.png",
            pictureClass: "cleaning-picture"
        }



    ];

    let activeMarketFilter = "all";
    let marketCart = [];
    // Bridge for restaurant menu buttons, which are rendered outside this handler.
    window.yallaAddRestaurantProduct = function(product, restaurantName) {
        const id = 'restaurant:' + restaurantName + ':' + product.id;
        const existing = marketCart.find(item => item.id === id);
        if (existing) existing.quantity += 1;
        else {
            const priceUnknown = restaurantName === 'RAAD Resto Café' && product.category === 'sauces' && product.price == null;
            marketCart.push({
                id, name: restaurantName + ' - ' + product.name,
                price: priceUnknown ? null : Number(product.price),
                priceUndetermined: priceUnknown,
                image: product.image, quantity: 1
            });
        }
        updateMarketCart();
        showAddToCartToast();
    };


    // إنشاء بطاقات المنتجات تلقائياً
    function renderMarketProducts() {
        marketProductsGrid.innerHTML = marketProducts.filter(product => product.category !== "cleaning" && product.category !== "Vegetables").map(product => {
            const picture = product.image
                ? `<img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" width="94" height="94">`
                : product.emoji;

            return `
                <article class="market-product"
                    data-category="${product.category}"
                    data-name="${product.name}"
                    data-product-id="${product.id}">

                    <div class="market-product-picture ${product.pictureClass}">
                        ${picture}
                    </div>

                    <h3>${product.name}</h3>
                    <p class="market-product-unit">${product.unit}</p>

                    <div class="market-product-bottom">
                      <strong>${product.price.toLocaleString("en-US")} ل.ل</strong>

                        <button type="button" class="market-add"
                            data-product-id="${product.id}"
                            aria-label="إضافة ${product.name} للسلة">
                            +
                        </button>
                    </div>
                </article>
            `;
        }).join("");

        filterMarketProducts();
    }

    // إظهار المنتجات بحسب القسم والبحث
    function filterMarketProducts() {
        const query = marketSearchInput.value.trim().toLowerCase();

        const filteredProducts = marketProducts.filter(product => {
            if (product.category === "cleaning" || product.category === "Vegetables") return false;
            const matchesCategory =
                activeMarketFilter === "all" ||
                product.category === activeMarketFilter;

            const matchesSearch =
                product.name.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });

        marketProductsGrid.querySelectorAll(".market-product").forEach(card => {
            const productId = Number(card.dataset.productId);

            card.hidden = !filteredProducts.some(
                product => product.id === productId
            );
        });

        marketProductsCount.textContent =
            filteredProducts.length + " منتجات";

        marketNoProducts.hidden = filteredProducts.length > 0;
        const coffeeIntro = document.getElementById("coffeeCategoryIntro");
        if (coffeeIntro) coffeeIntro.hidden = activeMarketFilter !== "coffee";
        if (activeMarketFilter === "coffee" && filteredProducts.length === 0) {
            marketNoProducts.textContent = query ? "ما لقينا قهوة مطابقة لبحثك." : "منتجات البن والقهوة رح تنضاف قريباً.";
        } else {
            marketNoProducts.textContent = "ما لقينا منتجات مطابقة لبحثك.";
        }
    }

    // الضغط على أزرار الأقسام
    marketFilters.forEach(button => {
        button.addEventListener("click", () => {
            marketFilters.forEach(filter =>
                filter.classList.remove("active")
            );

            button.classList.add("active");
            activeMarketFilter = button.dataset.filter;

            marketProductsTitle.textContent =
                activeMarketFilter === "all"
                    ? "كل المنتجات"
                    : button.textContent.trim();

            filterMarketProducts();
        });
    });

    // البحث
    marketSearchInput.addEventListener("input", filterMarketProducts);

    document.getElementById("marketSearchButton")
        .addEventListener("click", () => {
            marketSearchWrap.hidden = !marketSearchWrap.hidden;

            if (!marketSearchWrap.hidden) {
                marketSearchInput.focus();
            } else {
                marketSearchInput.value = "";
                filterMarketProducts();
            }
        });

    // الرجوع إلى الصفحة الرئيسية
    marketBackButton.addEventListener("click", () => {
        supermarketScreen.hidden = true;
        home.classList.remove("market-open");
    });

    // إضافة للسلة والمفضلة
    marketProductsGrid.addEventListener("click", event => {
        const addButton = event.target.closest(".market-add");

        if (addButton) {
            const productId = Number(addButton.dataset.productId);
            const product = marketProducts.find(
                item => item.id === productId
            );

            if (!product) return;

            const existing = marketCart.find(
                item => item.id === productId
            );

            if (existing) {
                existing.quantity++;
            } else {
                marketCart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            updateMarketCart();
            showAddToCartToast();
            return;
        }


    });

    // تحديث عداد السلة
    function updateMarketCart() {
        const totalQuantity = marketCart.reduce(
            (total, item) => total + item.quantity, 0
        );

        // عداد السلة الموجود في القائمة الرئيسية
        const homeCartCount = document.querySelector(
            '.nav-item[data-page="السلة"] .cart-icon i'
        );

        if (homeCartCount) {
            homeCartCount.textContent = totalQuantity;
        }
    }

    
/* ===== Yalla Shop - Shopping Cart ===== */

// ضعي رقم واتساب المتجر مع رمز الدولة، بدون +
const SHOP_WHATSAPP = "96171780180";

// إنشاء شاشة السلة
const cartScreen = document.createElement("section");
cartScreen.id = "yallaCartScreen";
cartScreen.hidden = true;

cartScreen.innerHTML = `
  <div class="yc-header">
    <button type="button" id="ycBack">❮</button>
    
<h2 class="yc-header-title">
    <span>سلة مشترياتك</span>
    <svg class="yc-cart-icon"
         width="23" height="23"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.5 13h12l2.5-9H6"/>
    </svg>
</h2>

  </div>

  <div class="yc-scroll">
    <div class="yc-date" id="ycDate"></div>

    <h3 class="yc-title">المنتجات المختارة</h3>
    <div id="ycItems"></div>

    <div class="yc-summary">
      <div>
        <span>عدد الأصناف</span>
        <strong id="ycKinds">0</strong>
      </div>
      <div>
        <span>مجموع القطع</span>
        <strong id="ycCount">0</strong>
      </div>
      <div class="yc-total">
        <span>المجموع الكلي</span>
        <strong id="ycTotal">0 ل.ل</strong>
      </div>
    </div>

    <div class="yc-delivery">
      <h3>📍 معلومات التوصيل</h3>

      <label for="ycName">الاسم الكامل</label>
      <input id="ycName"
        placeholder="اكتب اسمك الكامل"
        autocomplete="name">

      <label for="ycPhone">رقم الهاتف</label>
      <input id="ycPhone"
        type="tel"
        placeholder="رقم للتواصل معك"
        autocomplete="tel">

      <label for="ycAddress">عنوان التوصيل</label>
      <textarea id="ycAddress" rows="2"
        placeholder="المنطقة، الشارع، المبنى..."></textarea>

      <p class="yc-location-help">📱 تحديد الموقع اختياري. إذا بدك ترسل موقعك، افتح المتجر من الموبايل وشغّل GPS واضغط الزر. فيك تطلب بدون تحديد موقع.</p>
      <button type="button" id="ycLocation">
        📍 تحديد موقعي من الهاتف
      </button>

      <p id="ycLocationStatus"></p>
    </div>

    <button type="button" id="ycOrder">
      اطلب الآن عبر واتساب
    </button>

    <p class="yc-note">
      سيتم فتح واتساب برسالة جاهزة لمراجعتها وإرسالها.
    </p>
  </div>
`;

document.body.appendChild(cartScreen);

const cartItemsBox = document.getElementById("ycItems");
const cartName = document.getElementById("ycName");
const cartPhone = document.getElementById("ycPhone");
const cartAddress = document.getElementById("ycAddress");
const cartLocationStatus =
    document.getElementById("ycLocationStatus");

let customerCoordinates = null;

function cartMoney(value) {
    return Number(value).toLocaleString("en-US", {
        maximumFractionDigits: 4
    }) + " ل.ل";
}

// البحث عن صورة المنتج من بيانات الأقسام
function getCartProduct(item) {
    const sources = [
        marketProducts,
        ...(typeof vegetablesProducts !== "undefined"
            ? [vegetablesProducts] : []),
        ...(typeof butcherProducts !== "undefined"
            ? [butcherProducts] : [])
    ];

    for (const products of sources) {
        const found = products.find(p =>
            p.id === item.id && p.name === item.name
        );
        if (found) return found;
    }

    return item;
}

function renderYallaCart() {
    cartItemsBox.replaceChildren();

    marketCart.forEach((item, index) => {
        const product = getCartProduct(item);

        const card = document.createElement("article");
        card.className = "yc-item";

        const image = document.createElement("img");
        image.className = "yc-image";
        image.alt = item.name;
        image.src = product.image || "";
        image.hidden = !product.image;

        const details = document.createElement("div");
        details.className = "yc-details";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const unit = document.createElement("small");
        unit.textContent = product.unit || "";

        const price = document.createElement("b");
        price.textContent = item.priceUndetermined || item.price == null
            ? 'السعر غير محدد'
            : cartMoney(item.price * item.quantity);

        const controls = document.createElement("div");
        controls.className = "yc-controls";

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.setAttribute("aria-label", "تقليل " + item.name);

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.setAttribute("aria-label", "زيادة " + item.name);

        const remove = document.createElement("button");
        remove.className = "yc-remove";
        remove.textContent = "×";
        remove.setAttribute("aria-label", "حذف " + item.name);

        plus.onclick = () => {
            item.quantity++;
            updateMarketCart();
            showAddToCartToast();
            renderYallaCart();
        };

        minus.onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                marketCart.splice(index, 1);
            }
            updateMarketCart();
            renderYallaCart();
        };

        remove.onclick = () => {
            marketCart.splice(index, 1);
            updateMarketCart();
            renderYallaCart();
        };

        controls.append(minus, quantity, plus);
        details.append(name, unit, price, controls);
        card.append(image, details, remove);
        cartItemsBox.appendChild(card);
    });



    const count = marketCart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = marketCart.reduce(
        (sum, item) => sum + (item.priceUndetermined || item.price == null ? 0 : Number(item.price) * item.quantity), 0
    );

  
document.getElementById("ycKinds").textContent =
    marketCart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    document.getElementById("ycTotal").textContent =
        cartMoney(total);
}

// رسائل التحقق الخاصة بواجهة Yalla Shop
const ycMessage = document.createElement("div");
ycMessage.id = "ycCustomMessage";
ycMessage.setAttribute("role", "alert");
ycMessage.hidden = true;
cartScreen.querySelector(".yc-delivery").prepend(ycMessage);
const ycMessageStyle = document.createElement("style");
ycMessageStyle.textContent = `
#ycCustomMessage:not([hidden]){display:block;padding:12px 14px;margin:8px 0 16px;border-radius:12px;background:#eaf3ff;border:1px solid #93c5fd;color:#084b9c;font-size:14px;font-weight:700;line-height:1.8;box-shadow:0 4px 14px #0954aa12}
.yc-field-error{border:2px solid #e05252!important;background:#fff7f7!important;outline:none!important}
`;
document.head.appendChild(ycMessageStyle);
function ycNotify(message, field) {
    ycMessage.textContent = message;
    ycMessage.hidden = false;
    [cartName, cartPhone, cartAddress].forEach(el => el.classList.remove("yc-field-error"));
    if (field) {
        field.classList.add("yc-field-error");
        field.focus();
    }
}
[cartName, cartPhone, cartAddress].forEach(field => {
    field.addEventListener("input", () => {
        field.classList.remove("yc-field-error");
        ycMessage.hidden = true;
    });
});
const ycMobile = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
let ycLocationPending = null;
function ycRequestLocation() {
    if (!navigator.geolocation) {
        cartLocationStatus.textContent = "تحديد الموقع غير مدعوم بهالجهاز.";
        return Promise.resolve(false);
    }
    if (!window.isSecureContext) {
        cartLocationStatus.textContent = "تحديد الموقع بحاجة لاتصال HTTPS آمن أو تطبيق WebView يسمح بالموقع.";
        return Promise.resolve(false);
    }
    if (ycLocationPending) return ycLocationPending;
    cartLocationStatus.textContent = "عم نطلب إذن تحديد موقعك...";
    ycLocationPending = new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            position => {
                customerCoordinates = {lat:position.coords.latitude,lng:position.coords.longitude};
                cartLocationStatus.textContent = "✓ تم تحديد موقع التوصيل بنجاح";
                resolve(true);
            },
            error => {
                customerCoordinates = null;
                cartLocationStatus.textContent = error.code === 1
                    ? "ما سمحت بتحديد الموقع. فعّل إذن الموقع من إعدادات التطبيق."
                    : "تعذّر تحديد الموقع. تأكد من تشغيل GPS والإنترنت.";
                resolve(false);
            },
            {enableHighAccuracy:true,timeout:15000,maximumAge:0}
        );
    }).finally(() => { ycLocationPending = null; });
    return ycLocationPending;
}
function showMarketCart() {
    renderYallaCart();
    cartScreen.hidden = false;
    if (!ycMobile()) {
        ycNotify("📱 لتحديد موقع التوصيل وإرساله مع الطلب، افتح Yalla Shop من الموبايل.");
    }
}
function closeYallaCart() { cartScreen.hidden = true; }
document.getElementById("ycBack").onclick = closeYallaCart;
document.querySelectorAll('.bottom-nav .nav-item[data-page="السلة"]').forEach(button => {
    button.addEventListener("click", showMarketCart);
});
document.getElementById("ycLocation").onclick = () => {
    if (!ycMobile()) {
        ycNotify("📱 افتح المتجر من الموبايل حتى تقدر تحدد موقعك وترسله مع الطلب.");
        return;
    }
    ycRequestLocation();
};
// تجهيز الطلب وإرساله إلى واتساب، ثم تفريغ السلة فور فتح الرابط
 document.getElementById("ycOrder").onclick = async () => {
    if (!marketCart.length) { ycNotify("سلتك فاضية، ضيف منتجات أولاً."); return; }
    // Pending RAAD sauce prices must be confirmed by the merchant before checkout.
    if (marketCart.some(item => item.priceUndetermined || item.price == null)) {
        ycNotify("في صوص بالسلة سعره غير محدد. يرجى تأكيد سعر الصوص مع المطعم قبل إرسال الطلب.");
        return;
    }
    const name = cartName.value.trim();
    const phone = cartPhone.value.trim();
    const address = cartAddress.value.trim();
    if (!name) { ycNotify("يرجى كتابة الاسم الكامل قبل إرسال الطلب.",cartName); return; }
    if (!phone) { ycNotify("يرجى كتابة رقم الهاتف قبل إرسال الطلب.",cartPhone); return; }
    if (!/^[+\d\s()-]{7,20}$/.test(phone) || phone.replace(/\D/g, "").length < 7) {
        ycNotify("يرجى كتابة رقم هاتف صحيح.",cartPhone); return;
    }
    if (!address) { ycNotify("يرجى كتابة عنوان التوصيل قبل إرسال الطلب.",cartAddress); return; }
    if (!/^961\d{7,12}$/.test(SHOP_WHATSAPP)) {
        ycNotify("رقم واتساب المتجر غير مضبوط، تواصل مع إدارة المتجر."); return;
    }
    const total = marketCart.reduce((sum,item) => sum + item.price * item.quantity,0);
    const locationLink = customerCoordinates
        ? `https://www.google.com/maps?q=${customerCoordinates.lat},${customerCoordinates.lng}`
        : "";
    const message = createYallaWhatsAppInvoice({
        name,phone,address,locationLink,
        cart:marketCart.map(item => ({...item})),total
    });
    const url = "https://wa.me/" + SHOP_WHATSAPP + "?text=" + encodeURIComponent(message);
    // فتح واتساب عبر انتقال مباشر لتوافق أفضل مع WebView على Android
    // عند محاولة الانتقال، نفرغ السلة فوراً حسب طلب صاحب المتجر.
    marketCart.length = 0;
    updateMarketCart();
    renderYallaCart();
    closeYallaCart();
    window.location.href = url;
};

/* ===== Yalla Shop WhatsApp Invoice ===== */

function createYallaWhatsAppInvoice({
    name,
    phone,
    address,
    locationLink = "",
    cart,
    total
}) {
    const money = value =>
        Number(value).toLocaleString("en-US", {
            maximumFractionDigits: 4
        }) + " ل.ل";

    const date = new Date().toLocaleString("ar-LB");

    const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    const products = cart.map((item, index) => {
        const quantity = Number(item.quantity);
        const price = Number(item.price);

        return [
            `*${index + 1}. ${item.name}*`,
            `الكمية: ${quantity}`,
            `سعر الوحدة: ${money(price)}`,
            `الإجمالي: ${money(price * quantity)}`
        ].join("\n");
    }).join("\n\n");

    return [
        "*Yalla Shop*",
        "فاتورة طلب مشتريات",
        `التاريخ: ${date}`,
        "━━━━━━━━━━━━━━",
        "",
        "*معلومات الزبون*",
        `الاسم: ${name}`,
        `الهاتف: ${phone}`,
        `العنوان: ${address}`,
        ...(locationLink
            ? ["", "*موقع التوصيل*", locationLink]
            : []),
        "",
        "━━━━━━━━━━━━━━",
        "*المنتجات المطلوبة*",
        "",
        products,
        "",
        "━━━━━━━━━━━━━━",
        `عدد القطع: ${count}`,
        `*المجموع النهائي: ${money(total)}*`,
        "━━━━━━━━━━━━━━",
        "",
        "شكراً لتسوقكم من Yalla Shop"
    ].join("\n");
}


    // أزرار القائمة السفلية للسوبر ماركت
    document.querySelectorAll("[data-market-page]").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.dataset.marketPage;

            if (page === "home") {
                supermarketScreen.hidden = true;
                home.classList.remove("market-open");
            } else if (page === "cart") {
                showMarketCart();
            } else if (page === "products") {
                marketProductsGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else if (page === "offers") {
                alert("العروض ستتوفر قريباً.");
            } else if (page === "profile") {
                alert("صفحة حسابي قيد التجهيز.");
            }

            document.querySelectorAll("[data-market-page]").forEach(item => {
                item.classList.toggle("selected", item === button);
            });
        });
    });


    // ================================================================================================
    // مودال الخضرة والفواكه
    // ======================================================================================

    const vegetablesBackButton =
        document.getElementById("vegetablesBackButton");

    const vegetablesProductsGrid =
        document.getElementById("vegetablesProductsGrid");

    const vegetablesSearchInput =
        document.getElementById("vegetablesProductSearch");

    const vegetablesSearchWrap =
        document.getElementById("vegetablesSearchWrap");

    const vegetablesSearchButton =
        document.getElementById("vegetablesSearchButton");

    const vegetablesProductsTitle =
        document.getElementById("vegetablesProductsTitle");

    const vegetablesProductsCount =
        document.getElementById("vegetablesProductsCount");

    const vegetablesNoProducts =
        document.getElementById("vegetablesNoProducts");

    const vegetablesFilters =
        document.querySelectorAll(".vegetables-filter");

    let activeVegetablesFilter = "all";

    const vegetablesProducts = [
                     {
            id: 1001,
            name: "  تفاح     ",
            price: 140000,
            unit: " 1ك",
            category: "fruit",
            image: "images/fruit/apples.png",
         },
        {
            id: 1002,
            name: "موز",
            price: 120000,
            unit: "1ك",
            category: "fruit",
            image: "images/fruit/banana.png",
        },
        {
            id: 1003,
            name: "لوبية",
            price: 100000,
            unit: "1ك",
            category: "vegetable",
   image: "images/fruit/Cowpeas.png",
        },
        {
            id: 1004,
            name: "بندورة",
            price:600000,
            unit: "1ك",
            category: "vegetable",
                image: "images/fruit/tomato.png",
        },
        {
            id: 1005,
            name: "فليفلة",
            price: 80000,
            unit: "1ك",
            category: "vegetable",
            image: "images/fruit/Bell pepper.png",
        },
        {
            id: 1006,
            name: "حامض",
            price: 80000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/sour.png",
        },
                {
            id: 1007,
            name: "كوسا",
            price: 70000,
            unit: "1ك",
            category: "vegetable",
             image: "images/zucchini.png",
        },
                {
            id: 1008,
            name: "خيار",
            price: 80000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/option.png",
        },
                {
            id: 1009,
            name: "مانجا",
            price: 130000,
            unit: "1ك",
            category: "fruit",
             image: "images/fruit/Manga.png",
        },
              {
            id: 1010,
            name: "زهرة",
            price: 60000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/Cauliflower.png",
        },
              {
            id: 1011,
            name: "ملفوف",
            price: 30000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/cabbage.png",
        },
              {
            id: 1012,
            name: "عنب",
            price: 120000,
            unit: "1ك",
            category: "fruit",
             image: "images/fruit/grapes.png",
        },
              {
            id: 1013,
            name: "افوكا",
            price: 150000,
            unit: "1ك",
            category: "fruit",
             image: "images/fruit/Avoca.png",
        },
              {
            id: 1014,
            name: "جزر",
            price: 100000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/carrot.png",
        },
              {
            id: 1015,
            name: "ثوم",
            price: 300000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/garlic.png",
        },
         {
            id: 1016,
            name: "بصل",
            price: 60000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/onion.png",
        },
              {
            id: 1017,
            name: "بطاطا ",
            price: 570000,
            unit: "شوال",
            category: "vegetable",
             image: "images/Sack potatoes.png",
        },
                   {
            id: 1018,
            name: "باذنجان ",
            price:  70000,
            unit: "1ك",
            category: "vegetable",
             image: "images/fruit/eggplant.png",
        }
    ];

    // إنشاء بطاقات المنتجات
    function renderVegetablesProducts() {
        vegetablesProductsGrid.innerHTML =
            vegetablesProducts.map(product => `
                <article class="market-product"
                         data-product-id="${product.id}">

                    <div class="market-product-picture">
                       ${product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" width="94" height="94">`
    : (product.emoji || "")}
                    </div>

                    <h3>${product.name}</h3>

                    <p class="market-product-unit">
                        ${product.unit}
                    </p>

                    <div class="market-product-bottom">
                      <strong>${product.price.toLocaleString("en-US")} ل.ل</strong>

                        <button type="button"
                                class="market-add vegetables-add"
                                data-product-id="${product.id}"
                                aria-label="إضافة ${product.name} للسلة">
                            +
                        </button>
                    </div>
                </article>
            `).join("");

        filterVegetablesProducts();
    }

    // البحث والتصنيف
    function filterVegetablesProducts() {
        const query =
            vegetablesSearchInput.value.trim().toLowerCase();

        const filtered = vegetablesProducts.filter(product => {
            const matchesCategory =
                activeVegetablesFilter === "all" ||
                product.category === activeVegetablesFilter;

            const matchesSearch =
                product.name.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });

        vegetablesProductsGrid
            .querySelectorAll(".market-product")
            .forEach(card => {
                const id = Number(card.dataset.productId);

                card.hidden = !filtered.some(
                    product => product.id === id
                );
            });

        vegetablesProductsCount.textContent =
            filtered.length + " منتجات";

        vegetablesNoProducts.hidden = filtered.length > 0;
    }

    vegetablesFilters.forEach(button => {
        button.addEventListener("click", () => {
            vegetablesFilters.forEach(filter =>
                filter.classList.remove("active")
            );

            button.classList.add("active");
            activeVegetablesFilter = button.dataset.filter;

            vegetablesProductsTitle.textContent =
                activeVegetablesFilter === "all"
                    ? "كل المنتجات"
                    : button.textContent.trim();

            filterVegetablesProducts();
        });
    });

    // تشغيل البحث
    vegetablesSearchInput.addEventListener(
        "input",
        filterVegetablesProducts
    );

    vegetablesSearchButton.addEventListener("click", () => {
        vegetablesSearchWrap.hidden =
            !vegetablesSearchWrap.hidden;

        if (!vegetablesSearchWrap.hidden) {
            vegetablesSearchInput.focus();
        } else {
            vegetablesSearchInput.value = "";
            filterVegetablesProducts();
        }
    });

    // الرجوع إلى الصفحة الرئيسية
    vegetablesBackButton.addEventListener("click", () => {
        vegetablesScreen.hidden = true;
        home.classList.remove("market-open");
    });

    // إضافة المنتجات إلى سلة المشروع نفسها
    vegetablesProductsGrid.addEventListener("click", event => {
        const addButton = event.target.closest(".vegetables-add");

        if (!addButton) return;

        const productId = Number(addButton.dataset.productId);

        const product = vegetablesProducts.find(
            item => item.id === productId
        );

        if (!product) return;

        const existing = marketCart.find(
            item => item.id === productId
        );

        if (existing) {
            existing.quantity++;
        } else {
            marketCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateMarketCart();
    });

    // فتح السلة المشتركة
const vegetablesCartButton =
    document.getElementById("vegetablesCartButton");

if (vegetablesCartButton) {
    vegetablesCartButton.addEventListener("click", () => {
        showMarketCart();
    });
}

    renderVegetablesProducts();
/* ==============================================================================================================
   مودال الملحمة - Yalla Shop
================================================================================================================== */
const butcherBackButton = document.getElementById("butcherBackButton");
const butcherSearchButton =document.getElementById("butcherSearchButton");
const butcherSearchWrap =  document.getElementById("butcherSearchWrap");
const butcherSearchInput = document.getElementById("butcherProductSearch");
const butcherProductsGrid = document.getElementById("butcherProductsGrid");
const butcherProductsTitle = document.getElementById("butcherProductsTitle");
const butcherProductsCount = document.getElementById("butcherProductsCount");
const butcherNoProducts =  document.getElementById("butcherNoProducts");
const butcherFilters = document.querySelectorAll(".butcher-filter");
let activeButcherFilter = "all";
const butcherProducts = [
    {
        id: 2001,
        name: "صفايح",
        price: 1700000,
        unit: "1ك",
        category: "grill",
        image: "images/grill/Meat pies (Sfiha).png"
    },
    {
        id: 2002,
        name: "مشاوي مشكل",
        price: 1800000,
        unit: "1ك",
        category: "grill",
        image: "images/grill/Mixed Grill.png"
    },
    {
        id: 2003,
        name: "لحم غنم",
        price: 1800000,
        unit: "1ك",
        category: "raw",
        image: "images/grill/Lamb.png"
    },
    {
        id: 2004,
        name: "لحم بقر",
        price: 1300000,
        unit: "1ك",
        category: "raw",
        image: "images/grill/beef.png"
    },
        {
        id: 2005,
        name: "طاووق مشوي  ",
        price: 1200000,
        unit: " مع سرفيس 1ك",
        category: "grill",
        image: "images/grill/Grilled Tawook.png"
    },
            {
        id: 2006,
        name: "كفته    ",
        price: 1800000,
        unit: " مع سرفيس 1ك",
        category: "grill",
        image: "images/grill/Grilled Kofta.png"
    },
                {
        id: 2007,
        name: "مقانق    ",
        price: 1200000,
        unit: "    1ك",
        category: "grill",
        image: "images/grill/Grilled sausages.png"
    },
                    {
        id: 2008,
        name: "سجق    ",
        price: 1000000,
        unit: "    1ك",
        category: "raw",
        image: "images/grill/Raw sausage.png"
    },
                        {
        id: 2009,
        name: "مقانق    ",
        price: 1350000,
        unit: "    1ك",
        category: "raw",
        image: "images/grill/Makanek.png"
    }
];

// إنشاء بطاقات المنتجات
function renderButcherProducts() {
    butcherProductsGrid.innerHTML = butcherProducts.map(product => `
        <article class="market-product"
                 data-product-id="${product.id}">

            <div class="market-product-picture">
                <img src="${product.image}"
                     alt="${product.name}"
                     onerror="this.style.display='none'">
            </div>

            <h3>${product.name}</h3>

            <p class="market-product-unit">${product.unit}</p>

            <div class="market-product-bottom">
                <strong>
                    ${product.price.toLocaleString("en-US")} ل.ل
                </strong>

                <button type="button"
                        class="market-add butcher-add"
                        data-product-id="${product.id}"
                        aria-label="إضافة ${product.name} للسلة">
                    +
                </button>
            </div>
        </article>
    `).join("");

    filterButcherProducts();
}

// البحث والتصنيف
function filterButcherProducts() {
    const query = butcherSearchInput.value.trim().toLowerCase();

    const filtered = butcherProducts.filter(product => {
        const matchesCategory =
            activeButcherFilter === "all" ||
            product.category === activeButcherFilter;

        const matchesSearch =
            product.name.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    butcherProductsGrid.querySelectorAll(".market-product")
        .forEach(card => {
            const id = Number(card.dataset.productId);

            card.hidden = !filtered.some(product => product.id === id);
        });

    butcherProductsCount.textContent = filtered.length + " منتجات";

    butcherNoProducts.hidden = filtered.length > 0;

    const activeButton = document.querySelector(
        ".butcher-filter.active"
    );

    butcherProductsTitle.textContent =
        activeButcherFilter === "all"
            ? "كل المنتجات"
            : activeButton
                ? activeButton.textContent.trim()
                : "كل المنتجات";
}

// الضغط على التصنيفات
butcherFilters.forEach(button => {
    button.addEventListener("click", function () {
        butcherFilters.forEach(filter =>
            filter.classList.remove("active")
        );

        button.classList.add("active");
        activeButcherFilter = button.dataset.filter;

        filterButcherProducts();
    });
});

// فتح وإغلاق البحث
butcherSearchButton.addEventListener("click", function () {
    butcherSearchWrap.hidden = !butcherSearchWrap.hidden;

    if (!butcherSearchWrap.hidden) {
        butcherSearchInput.focus();
    } else {
        butcherSearchInput.value = "";
        filterButcherProducts();
    }
});

butcherSearchInput.addEventListener(
    "input",
    filterButcherProducts
);

// الرجوع إلى الصفحة الرئيسية
butcherBackButton.addEventListener("click", function () {
    butcherScreen.hidden = true;
    home.classList.remove("market-open");
});

// إضافة منتجات الملحمة إلى السلة المشتركة
butcherProductsGrid.addEventListener("click", function (event) {
    const addButton = event.target.closest(".butcher-add");

    if (!addButton) return;

    const productId = Number(addButton.dataset.productId);

    const product = butcherProducts.find(
        item => item.id === productId
    );

    if (!product) return;

    const existing = marketCart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        marketCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateMarketCart();
    showAddToCartToast();
});

document.getElementById("poultryBackButton").addEventListener("click", () => {
    poultryScreen.hidden = true;
    home.classList.remove("market-open");
});
document.getElementById("poultrySearchButton").addEventListener("click", () => {
    const wrap = document.getElementById("poultrySearchWrap");
    wrap.hidden = !wrap.hidden;
    if (!wrap.hidden) document.getElementById("poultryProductSearch").focus();
    else { document.getElementById("poultryProductSearch").value = ""; renderGharibProducts(); }
});
document.getElementById("poultryProductSearch").addEventListener("input", renderGharibProducts);

// بحث شامل تحت شريط البحث الرئيسي
const globalSearchResults = document.getElementById("globalSearchResults");
const globalSearchNormalize = value => String(value || "").toLowerCase()
    .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
    .replace(/[\u064b-\u065f]/g, "").trim();

function renderGlobalSearch() {
    const query = globalSearchNormalize(searchInput.value);
    if (!query) {
        globalSearchResults.hidden = true;
        globalSearchResults.innerHTML = "";
        return;
    }
    const sources = [
        ...marketProducts.map(p => ({...p, section: p.category === "cleaning" ? "منظفات" : "سوبر ماركت"})),
        ...vegetablesProducts.map(p => ({...p, section: "خضرة وفواكه"})),
        ...butcherProducts.map(p => ({...p, section: "ملحمة"})),
        ...gharibProducts.map((p, index) => ({...p, section: "دواجن", searchIndex: index}))
    ];
    const sections = categoryCards.filter(card => globalSearchNormalize(card.dataset.category).includes(query));
    const products = sources.filter(p => globalSearchNormalize(p.name).includes(query));
    const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char =>
        ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    globalSearchResults.innerHTML = `
        ${sections.map(card => `<button type="button" class="global-search-row" data-section="${escapeHTML(card.dataset.category)}"><strong>📁 ${escapeHTML(card.dataset.category)}</strong><small>قسم</small></button>`).join("")}
        ${products.map(p => `<button type="button" class="global-search-row" data-section="${escapeHTML(p.section)}" data-product-id="${escapeHTML(p.id ?? "")}" data-search-index="${escapeHTML(p.searchIndex ?? "")}" data-search-image="${escapeHTML(p.image ?? "")}" data-search-name="${escapeHTML(p.name ?? "")}">
            <span class="global-search-thumb">${p.image ? `<img src="${escapeHTML(p.image)}" alt="" loading="lazy">` : escapeHTML(p.emoji || "🛍️")}</span>
            <span class="global-search-info"><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.section)} · ${escapeHTML(p.unit || "")}</small></span>
            <b>${escapeHTML(p.price)} ل.ل</b>
        </button>`).join("")}
        ${!products.length && !sections.length ? '<p class="global-search-empty">ما لقينا منتجات أو أقسام مطابقة.</p>' : ''}`;
    globalSearchResults.hidden = false;
}
searchInput.addEventListener("input", renderGlobalSearch);
// الانتقال مباشرة إلى بطاقة المنتج من نتائج البحث
function focusSearchedProduct(section, productId, searchIndex, expectedImage, expectedName) {
    let grid;
    if (section === "سوبر ماركت") {
        activeMarketFilter = "all";
        marketFilters.forEach(button => button.classList.toggle("active", button.dataset.filter === "all"));
        marketProductsTitle.textContent = "كل المنتجات";
        marketSearchInput.value = "";
        filterMarketProducts();
        grid = marketProductsGrid;
    } else if (section === "منظفات") {
        cleaningSearchInput.value = "";
        renderCleaningProducts();
        grid = cleaningGrid;
    } else if (section === "خضرة وفواكه") {
        activeVegetablesFilter = "all";
        document.querySelectorAll(".vegetables-filter:not(.butcher-filter)").forEach(button =>
            button.classList.toggle("active", button.dataset.filter === "all"));
        document.getElementById("vegetablesProductSearch").value = "";
        filterVegetablesProducts();
        grid = vegetablesProductsGrid;
    } else if (section === "ملحمة") {
        activeButcherFilter = "all";
        document.querySelectorAll(".butcher-filter").forEach(button =>
            button.classList.toggle("active", button.dataset.filter === "all"));
        butcherSearchInput.value = "";
        filterButcherProducts();
        grid = butcherProductsGrid;
    } else if (section === "دواجن") {
        gharibShowAll = true;
        const poultrySearch = document.getElementById("poultryProductSearch");
        if (poultrySearch) poultrySearch.value = "";
        renderGharibProducts();
        grid = gharibGrid;
    }
    if (!grid) return;
    const selector = section === "دواجن"
        ? `.gharib-product-card:nth-child(${Number(searchIndex) + 1})`
        : `[data-product-id="${String(productId).replace(/[^0-9]/g, "")}"]`;
    // Find the exact card, then scroll its real scrolling ancestor into view.
    const findTarget = () => {
        const cards = Array.from(grid.querySelectorAll(".market-product, .gharib-product-card"));
        if (section === "دواجن") return cards[Number(searchIndex)] || null;
                const candidates = cards.filter(card => card.dataset.productId === String(productId));
        return candidates.find(card => expectedImage && card.querySelector("img")?.getAttribute("src") === expectedImage)
            || candidates.find(card => expectedName && card.querySelector("h3")?.textContent.trim() === expectedName.trim())
            || candidates[0] || null;
    };
    setTimeout(() => {
        const target = findTarget();
        if (!target) return;
        // ScrollIntoView handles nested scrolling containers (including ys-section-scroll).
        target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        target.classList.remove("search-product-highlight");
        void target.offsetWidth;
        target.classList.add("search-product-highlight");
        setTimeout(() => target.classList.remove("search-product-highlight"), 2400);
    }, 350);
}

globalSearchResults.addEventListener("click", event => {
    const item = event.target.closest("[data-section]");
    if (!item) return;
    const section = item.dataset.section;
    const productId = item.dataset.productId;
    const searchIndex = item.dataset.searchIndex;
    const card = categoryCards.find(c => c.dataset.category === section);
    globalSearchResults.hidden = true;
    searchInput.value = "";
    searchInput.blur();
    if (card) card.click();
    if (productId !== undefined || searchIndex !== undefined) {
        focusSearchedProduct(section, productId, searchIndex, item.dataset.searchImage, item.dataset.searchName);
    }
});

// مودال المنظفات: نفس بطاقات الملحمة مع ظهور تدريجي عند الفتح
const cleaningGrid = document.getElementById("cleaningProductsGrid");
const cleaningSearchInput = document.getElementById("cleaningProductSearch");
const cleaningSearchWrap = document.getElementById("cleaningSearchWrap");
const cleaningCount = document.getElementById("cleaningProductsCount");
const cleaningEmpty = document.getElementById("cleaningNoProducts");

function renderCleaningProducts() {
    const query = cleaningSearchInput.value.trim().toLowerCase();
    const products = marketProducts.filter(product =>
        product.category === "cleaning" && product.name.toLowerCase().includes(query)
    );
    cleaningCount.textContent = products.length + " منتجات";
    cleaningEmpty.hidden = products.length !== 0;
    cleaningGrid.innerHTML = products.map((product, index) => `
        <article class="market-product cleaning-reveal" style="--reveal-order:${Math.min(index, 11)}" data-product-id="${product.id}">
            <div class="market-product-picture">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <h3>${product.name}</h3>
            <p class="market-product-unit">${product.unit || ""}</p>
            <div class="market-product-bottom">
                <strong>${product.price.toLocaleString("en-US")} ل.ل</strong>
                <button type="button" class="market-add cleaning-add" data-product-id="${product.id}" aria-label="إضافة ${product.name} للسلة">+</button>
            </div>
        </article>
    `).join("");
}

document.getElementById("cleaningBackButton").addEventListener("click", () => {
    cleaningScreen.hidden = true;
    home.classList.remove("market-open");
});
document.getElementById("cleaningSearchButton").addEventListener("click", () => {
    cleaningSearchWrap.hidden = !cleaningSearchWrap.hidden;
    if (!cleaningSearchWrap.hidden) cleaningSearchInput.focus();
    else { cleaningSearchInput.value = ""; renderCleaningProducts(); }
});
cleaningSearchInput.addEventListener("input", renderCleaningProducts);
cleaningGrid.addEventListener("click", event => {
    const button = event.target.closest(".cleaning-add");
    if (!button) return;
    const product = marketProducts.find(item => item.id === Number(button.dataset.productId) && item.category === "cleaning");
    if (!product) return;
    const existing = marketCart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else marketCart.push({id:product.id, name:product.name, price:product.price, quantity:1});
    updateMarketCart();
    showAddToCartToast();
});


// المكتبة: أسعار إرشادية بالليرة اللبنانية على أساس 90,000 ل.ل / دولار.
// تحقق من الأسعار والتوفر قبل نشر المتجر للبيع.
const libraryProducts = [{"id":"library-001","name":"قلم لوح كوفرت","price":29970,"category":"pens","image":"images/library/library-001.png","unit":"قطعة"},{"id":"library-002","name":"علبة هندسة زيرو","price":109998,"category":"geometry","image":"images/library/library-002.png","unit":"قطعة"},{"id":"library-003","name":"قلم حبر كلارو اخضر","price":19998,"category":"pens","image":"images/library/library-003.png","unit":"قطعة"},{"id":"library-004","name":"براية مع غطا  يلانغ","price":29997,"category":"pens","image":"images/library/library-004.png","unit":"قطعة"},{"id":"library-005","name":"كوركتار يلانغ*8مل","price":29970,"category":"pens","image":"images/library/library-005.png","unit":"قطعة"},{"id":"library-006","name":"براية فضاء","price":19980,"category":"pens","image":"images/library/library-006.png","unit":"قطعة"},{"id":"library-007","name":"لوح20*30","price":129960,"category":"geometry","image":"images/library/library-007.png","unit":"قطعة"},{"id":"library-008","name":"قلم ماركة صيني","price":24999.3,"category":"pens","image":"images/library/library-008.png","unit":"قطعة"},{"id":"library-009","name":"دفتر 5 مواضيع كوفرت *80","price":90000,"category":"notebooks","image":"images/library/library-009.png","unit":"قطعة"},{"id":"library-010","name":"تلوين مي خفيف*12 قلم","price":49950,"category":"art","image":"images/library/library-010.png","unit":"قطعة"},{"id":"library-011","name":"دفتر *12 لون","price":319950,"category":"notebooks","image":"images/library/library-011.png","unit":"قطعة"},{"id":"library-012","name":"جيب ريموتEQUIPMENT","price":900000,"category":"toys","image":"images/library/library-012.png","unit":"قطعة"},{"id":"library-013","name":"اجاندة نوت بوك صغيرة مع مغيطة","price":90000,"category":"notebooks","image":"images/library/library-013.png","unit":"قطعة"},{"id":"library-014","name":"دفتر 120ورقة 5 الوان","price":149940,"category":"notebooks","image":"images/library/library-014.png","unit":"قطعة"},{"id":"library-015","name":"مسطرة بلاستيك 30سنتم صور","price":9999,"category":"geometry","image":"images/library/library-015.png","unit":"قطعة"},{"id":"library-016","name":"لانش بوكس حجم كبير","price":900000,"category":"supplies","image":"images/library/library-016.png","unit":"قطعة"},{"id":"library-017","name":"دفتر بريو *50ورقة","price":19998,"category":"notebooks","image":"images/library/library-017.png","unit":"قطعة"},{"id":"library-018","name":"مقلمة علب","price":315000,"category":"bags","image":"images/library/library-018.png","unit":"قطعة"},{"id":"library-019","name":"كوركتار","price":45000,"category":"pens","image":"images/library/library-019.png","unit":"قطعة"},{"id":"library-020","name":"علب ورق *500","price":99990,"category":"notebooks","image":"images/library/library-020.png","unit":"قطعة"},{"id":"library-021","name":"شنطة prime.","price":1350000,"category":"bags","image":"images/library/library-021.png","unit":"قطعة"},{"id":"library-022","name":"غورد بلاستيك*750مل*2","price":599940,"category":"supplies","image":"images/library/library-022.png","unit":"قطعة"},{"id":"library-023","name":"دفتر 5 الوان ZOK","price":81000,"category":"notebooks","image":"images/library/library-023.png","unit":"قطعة"},{"id":"library-024","name":"دفتر 10الوان رصور","price":299970,"category":"notebooks","image":"images/library/library-024.png","unit":"قطعة"},{"id":"library-025","name":"اقلام تلوين خشب كاسبر*12قلم","price":90000,"category":"art","image":"images/library/library-025.png","unit":"قطعة"},{"id":"library-026","name":"الة حاسبة علمية eco-026","price":720000,"category":"geometry","image":"images/library/library-026.png","unit":"قطعة"},{"id":"library-027","name":"مقص بونينيا","price":69993,"category":"other","image":"images/library/library-027.png","unit":"قطعة"},{"id":"library-028","name":"اجاندة ستيتش","price":299970,"category":"notebooks","image":"images/library/library-028.png","unit":"قطعة"},{"id":"library-029","name":"غورد فاكيوم كاب","price":900000,"category":"supplies","image":"images/library/library-029.png","unit":"قطعة"},{"id":"library-030","name":"cp 89 mouse","price":270000,"category":"electronics","image":"images/library/library-030.png","unit":"قطعة"},{"id":"library-031","name":"دفتر رصور 5 الوان عربي","price":180000,"category":"notebooks","image":"images/library/library-031.png","unit":"قطعة"},{"id":"library-032","name":"مقص كورفت","price":49950,"category":"other","image":"images/library/library-032.png","unit":"قطعة"},{"id":"library-033","name":"تلوين رنا*12 قلم","price":79992,"category":"art","image":"images/library/library-033.png","unit":"قطعة"},{"id":"library-034","name":"مسطرة BOOKMARKسلكون","price":29970,"category":"geometry","image":"images/library/library-034.png","unit":"قطعة"},{"id":"library-035","name":"شنطة prime   .","price":1350000,"category":"bags","image":"images/library/library-035.png","unit":"قطعة"},{"id":"library-036","name":"دفتر 5الوان *80 ورقة","price":99990,"category":"notebooks","image":"images/library/library-036.png","unit":"قطعة"},{"id":"library-037","name":"قلم حبر كلارو احمر","price":19998,"category":"pens","image":"images/library/library-037.png","unit":"قطعة"},{"id":"library-038","name":"اجاندة لابوبو","price":199980,"category":"notebooks","image":"images/library/library-038.png","unit":"قطعة"},{"id":"library-039","name":"لعبة مجموعة عمار","price":630000,"category":"toys","image":"images/library/library-039.png","unit":"قطعة"},{"id":"library-040","name":"قلم مكتب","price":90000,"category":"pens","image":"images/library/library-040.png","unit":"قطعة"},{"id":"library-041","name":"تلوين شمع يلانغ*12قلم","price":149994,"category":"art","image":"images/library/library-041.png","unit":"قطعة"},{"id":"library-042","name":"مجموعة طيارة وسيارة","price":450000,"category":"toys","image":"images/library/library-042.png","unit":"قطعة"},{"id":"library-043","name":"قلم مع ممحاة","price":24999.93,"category":"pens","image":"images/library/library-043.png","unit":"قطعة"},{"id":"library-044","name":"مقلمة مدرسية 264351","price":199980,"category":"bags","image":"images/library/library-044.png","unit":"قطعة"},{"id":"library-045","name":"رول تسعير","price":99990,"category":"notebooks","image":"images/library/library-045.png","unit":"قطعة"},{"id":"library-046","name":"مكبسة مايبد","price":299999.7,"category":"other","image":"images/library/library-046.png","unit":"قطعة"},{"id":"library-047","name":"محاية استرا ناعمة","price":9999,"category":"pens","image":"images/library/library-047.png","unit":"قطعة"},{"id":"library-050","name":"قلم حبر بيك ازرق","price":19998,"category":"pens","image":"images/library/library-050.png","unit":"قطعة"},{"id":"library-051","name":"دفتر نوت","price":270000,"category":"notebooks","image":"images/library/library-051.png","unit":"قطعة"},{"id":"library-052","name":"شنطة سبورت اسود","price":1800000,"category":"bags","image":"images/library/library-052.png","unit":"قطعة"},{"id":"library-053","name":"قلم رصاص مع محاية vneeds","price":9999,"category":"pens","image":"images/library/library-053.png","unit":"قطعة"},{"id":"library-054","name":"مفكرة بريو *192 ورقة","price":99999.9,"category":"notebooks","image":"images/library/library-054.png","unit":"قطعة"},{"id":"library-055","name":"اجاندة  ستيتش","price":299970,"category":"notebooks","image":"images/library/library-055.png","unit":"قطعة"},{"id":"library-056","name":"wireless mouse ms9922","price":630000,"category":"electronics","image":"images/library/library-056.png","unit":"قطعة"},{"id":"library-057","name":"كوريكتير تايب*2","price":119970,"category":"pens","image":"images/library/library-057.png","unit":"قطعة"},{"id":"library-059","name":"علبة اقلام تلوين خشب يلانغ*12قلم","price":119997,"category":"art","image":"images/library/library-059.png","unit":"قطعة"},{"id":"library-060","name":"جبالة باطون لعبة","price":450000,"category":"toys","image":"images/library/library-060.png","unit":"قطعة"},{"id":"library-061","name":"كول يلانغ اصفر*25غ","price":39996,"category":"other","image":"images/library/library-061.png","unit":"قطعة"},{"id":"library-062","name":"قلم  لوح زيرو","price":39960,"category":"pens","image":"images/library/library-062.png","unit":"قطعة"},{"id":"library-064","name":"علبة اقلام رصاص كورفت*12","price":119997,"category":"pens","image":"images/library/library-064.png","unit":"قطعة"},{"id":"library-065","name":"w 920 mouse wireless","price":450000,"category":"electronics","image":"images/library/library-065.png","unit":"قطعة"},{"id":"library-066","name":"دفتر رسم صغير احمر","price":19998,"category":"notebooks","image":"images/library/library-066.png","unit":"قطعة"},{"id":"library-067","name":"كوركتار *5مم","price":79920,"category":"pens","image":"images/library/library-067.png","unit":"قطعة"},{"id":"library-069","name":"دفتر رصور 72 ورقة","price":90000,"category":"notebooks","image":"images/library/library-069.png","unit":"قطعة"},{"id":"library-071","name":"الة حاسبة kk837b","price":315000,"category":"geometry","image":"images/library/library-071.png","unit":"قطعة"},{"id":"library-073","name":"دفتر غلاف بلاسيك *48ورقة","price":45000,"category":"notebooks","image":"images/library/library-073.png","unit":"قطعة"},{"id":"library-074","name":"شنطة روضة بارلي","price":1350000,"category":"bags","image":"images/library/library-074.png","unit":"قطعة"},{"id":"library-075","name":"براية","price":14994,"category":"pens","image":"images/library/library-075.png","unit":"قطعة"},{"id":"library-076","name":"ورق تصوير*500ورق","price":450000,"category":"notebooks","image":"images/library/library-076.png","unit":"قطعة"},{"id":"library-077","name":"علبة هندسة ماب","price":90000,"category":"geometry","image":"images/library/library-077.png","unit":"قطعة"},{"id":"library-081","name":"قلم رصاص زيرو مع محاية","price":9999,"category":"pens","image":"images/library/library-081.png","unit":"قطعة"},{"id":"library-082","name":"دفتر 48*70غ مجلد حساب","price":34920,"category":"notebooks","image":"images/library/library-082.png","unit":"قطعة"},{"id":"library-084","name":"دفتر ديلوكس*50ورقة","price":24999.3,"category":"notebooks","image":"images/library/library-084.png","unit":"قطعة"},{"id":"library-086","name":"اجاندة صغيرة","price":69930,"category":"notebooks","image":"images/library/library-086.png","unit":"قطعة"},{"id":"library-087","name":"دفتر 48ورقة*70غمجلد","price":34992,"category":"notebooks","image":"images/library/library-087.png","unit":"قطعة"},{"id":"library-088","name":"دفتر*48ورقة فرنسيMPP","price":19980,"category":"notebooks","image":"images/library/library-088.png","unit":"قطعة"},{"id":"library-089","name":"براية دبدوب","price":49950,"category":"pens","image":"images/library/library-089.png","unit":"قطعة"},{"id":"library-091","name":"قلم كورفت اسود","price":14994,"category":"pens","image":"images/library/library-091.png","unit":"قطعة"},{"id":"library-092","name":"شوميز سحاب مع حلقة","price":45000,"category":"bags","image":"images/library/library-092.png","unit":"قطعة"},{"id":"library-094","name":"قلم حبر كلارو ازرق","price":19998,"category":"pens","image":"images/library/library-094.png","unit":"قطعة"},{"id":"library-095","name":"ورق كلاسور حساب","price":45000,"category":"notebooks","image":"images/library/library-095.png","unit":"قطعة"},{"id":"library-097","name":"دفتر رسم احمر كبير","price":49950,"category":"notebooks","image":"images/library/library-097.png","unit":"قطعة"},{"id":"library-098","name":"دفتر غلاف بلاستيك عربي *48 ورقة","price":45000,"category":"notebooks","image":"images/library/library-098.png","unit":"قطعة"},{"id":"library-099","name":"شنطة بارلي روضة","price":1350000,"category":"bags","image":"images/library/library-099.png","unit":"قطعة"},{"id":"library-103","name":"قلم ازرق بيانو","price":19980,"category":"pens","image":"images/library/library-103.png","unit":"قطعة"},{"id":"library-105","name":"دفتر 12 لون رصور","price":319950,"category":"notebooks","image":"images/library/library-105.png","unit":"قطعة"},{"id":"library-106","name":"قلم هايليتر كورفت","price":29997,"category":"pens","image":"images/library/library-106.png","unit":"قطعة"},{"id":"library-107","name":"شنطة prime  .","price":1350000,"category":"bags","image":"images/library/library-107.png","unit":"قطعة"},{"id":"library-108","name":"تلوين خشب mba*24","price":180000,"category":"art","image":"images/library/library-108.png","unit":"قطعة"},{"id":"library-109","name":"علبة اقلام الوان*12 قلم","price":270000,"category":"art","image":"images/library/library-109.png","unit":"قطعة"},{"id":"library-111","name":"مقلمة SPORT24","price":270000,"category":"bags","image":"images/library/library-111.png","unit":"قطعة"},{"id":"library-112","name":"قلم بيانو احمر","price":19999.8,"category":"pens","image":"images/library/library-112.png","unit":"قطعة"},{"id":"library-114","name":"الة حاسبة ستايفري ct-140e","price":675000,"category":"geometry","image":"images/library/library-114.png","unit":"قطعة"},{"id":"library-115","name":"براية دوبل مع محاية دايمرس","price":69993,"category":"pens","image":"images/library/library-115.png","unit":"قطعة"},{"id":"library-117","name":"علبة تلوين شمع*12 لون","price":45000,"category":"art","image":"images/library/library-117.png","unit":"قطعة"},{"id":"library-118","name":"علبة اقلام حبر ملونة*12 قلم","price":139995,"category":"pens","image":"images/library/library-118.png","unit":"قطعة"},{"id":"library-119","name":"كرتون ملون","price":49950,"category":"notebooks","image":"images/library/library-119.png","unit":"قطعة"},{"id":"library-120","name":"شنطة lovencar","price":2700000,"category":"bags","image":"images/library/library-120.png","unit":"قطعة"},{"id":"library-121","name":"قلم حبر كورفيت اخضر","price":14999.94,"category":"pens","image":"images/library/library-121.png","unit":"قطعة"},{"id":"library-122","name":"دفتر نوت زهري","price":270000,"category":"notebooks","image":"images/library/library-122.png","unit":"قطعة"},{"id":"library-131","name":"قلم حبر كلارو اسود","price":19980,"category":"pens","image":"images/library/library-131.png","unit":"قطعة"},{"id":"library-132","name":"دفتر 48 ورقة PAPEC","price":19980,"category":"notebooks","image":"images/library/library-132.png","unit":"قطعة"},{"id":"library-150","name":"قلم بيانو اسود","price":19980,"category":"pens","image":"images/library/library-150.png","unit":"قطعة"},{"id":"library-153","name":"دفتر رصور 5 الوان","price":99990,"category":"notebooks","image":"images/library/library-153.png","unit":"قطعة"},{"id":"library-158","name":"دفتر 6 الوان رصور","price":199980,"category":"notebooks","image":"images/library/library-158.png","unit":"قطعة"},{"id":"library-166","name":"قلم كورفت اخضر","price":14994,"category":"pens","image":"images/library/library-166.png","unit":"قطعة"},{"id":"library-185","name":"قلم حبر كورفيت ازرق فاتح","price":14994,"category":"pens","image":"images/library/library-185.png","unit":"قطعة"},{"id":"library-189","name":"دفتر مدرسي بلاستيك*48ورقة حساب","price":45000,"category":"notebooks","image":"images/library/library-189.png","unit":"قطعة"}];
const libraryGrid = document.getElementById('libraryProductsGrid');
const librarySearchInput = document.getElementById('libraryProductSearch');
const librarySearchWrap = document.getElementById('librarySearchWrap');
// فلاتر خاصة بقسم المكتبة فقط.
const libraryFilterBar = document.querySelector('.library-filter')?.parentElement;
if (libraryFilterBar) {
  [{id:'toys',label:'ألعاب'},{id:'electronics',label:'إلكترونيات'},{id:'supplies',label:'مستلزمات'}].forEach(f => {
    if (!libraryFilterBar.querySelector(`[data-filter="${f.id}"]`)) {
      const btn = document.createElement('button');
      btn.type='button'; btn.className='library-filter'; btn.dataset.filter=f.id; btn.textContent=f.label;
      libraryFilterBar.appendChild(btn);
    }
  });
}
const libraryFilters = document.querySelectorAll('.library-filter');
let libraryActiveFilter = 'all';
const libraryTitles = {all:'كل منتجات المكتبة',books:'كتب وقصص',notebooks:'دفاتر وورق',pens:'أقلام وكتابة',bags:'شنط ومقالم',geometry:'هندسة وحساب',art:'رسم وأشغال',filing:'ملفات وتنظيم',other:'لوازم متنوعة',toys:'ألعاب',electronics:'إلكترونيات',supplies:'مستلزمات'};
function renderLibraryProducts() {
  const query = librarySearchInput.value.trim().toLocaleLowerCase();
  const shown = libraryProducts.filter(p => (libraryActiveFilter === 'all' || p.category === libraryActiveFilter) && p.name.toLocaleLowerCase().includes(query));
  document.getElementById('libraryProductsTitle').textContent = libraryTitles[libraryActiveFilter];
  document.getElementById('libraryProductsCount').textContent = shown.length + ' منتجات';
  document.getElementById('libraryNoProducts').hidden = shown.length > 0;
  libraryGrid.innerHTML = '';
  shown.forEach((product, i) => {
    const card = document.createElement('article');
    card.className = 'market-product library-product';
    const libraryPicture = product.image
      ? `<img src="${product.image}" alt="" loading="lazy" width="94" height="94" style="width:94px;height:94px;object-fit:contain;display:block">`
      : '<span style="font-size:11px;color:#718096;text-align:center;line-height:1.5">الصورة قيد التجهيز</span>';
    card.innerHTML = `<div class="market-product-picture library-product-picture" style="width:94px;height:94px;flex:0 0 94px;overflow:hidden;display:grid;place-items:center" aria-hidden="true">${libraryPicture}</div><h3></h3><p class="market-product-unit"></p><div class="market-product-bottom"><strong>${product.price.toLocaleString('en-US',{maximumFractionDigits:8})} ل.ل</strong><button type="button" class="market-add library-add" aria-label="إضافة للسلة">+</button></div>`;
    card.querySelector('h3').textContent = product.name;
    card.querySelector('.market-product-unit').textContent = product.unit;
    card.querySelector('.library-add').addEventListener('click', () => {
      const existing = marketCart.find(item => item.id === product.id);
      if (existing) existing.quantity++;
      else marketCart.push({id:product.id,name:product.name,price:product.price,image:product.image,quantity:1});
      updateMarketCart();
      showAddToCartToast();
    });
    libraryGrid.appendChild(card);
  });
}
document.getElementById('libraryBackButton').addEventListener('click', () => {
  libraryScreen.hidden = true;
  home.classList.remove('market-open');
});
document.getElementById('librarySearchButton').addEventListener('click', () => {
  librarySearchWrap.hidden = !librarySearchWrap.hidden;
  if (!librarySearchWrap.hidden) librarySearchInput.focus();
  else { librarySearchInput.value = ''; renderLibraryProducts(); }
});
librarySearchInput.addEventListener('input', renderLibraryProducts);
libraryFilters.forEach(button => button.addEventListener('click', () => {
  libraryActiveFilter = button.dataset.filter;
  libraryFilters.forEach(b => b.classList.toggle('active', b === button));
  renderLibraryProducts();
}));
renderLibraryProducts();

// تشغيل المنتجات
renderButcherProducts();




    // إنشاء المنتجات عند تحميل الصفحة
    renderMarketProducts();
    // عرض أقسام الصفحة الرئيسية من بيانات المنتجات الأصلية، بدون نسخ بيانات أو تغيير المودالات.
    (function buildYallaShowcase(){
      // منتجات تنظيف مختارة من كتالوج المتجر الفعلي، مع أسعارها وصورها الأصلية.
      const cleaningFeatured = marketProducts.filter(x => x.category === 'cleaning' && x.image).slice(0, 12);
      const orbit = document.getElementById('ysFoodOrbit');
      const cleanEscape = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      if (orbit && cleaningFeatured.length) {
        const card = (x,i) => `<article class="ys-orbit-card ys-clean-card" style="--i:${i}"><button class="ys-clean-open" type="button" data-open-category="منظفات" aria-label="عرض ${cleanEscape(x.name)} في قسم المنظفات"><span class="ys-img"><img src="${cleanEscape(x.image)}" alt="${cleanEscape(x.name)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.classList.add('ys-img-fallback')"></span><strong>${cleanEscape(x.name)}</strong><small>${Number(x.price).toLocaleString('en-US')} ل.ل</small><span class="ys-clean-cta">عرض المنتج ←</span></button><button class="ys-fav-toggle" type="button" data-fav-id="market-${x.id}" data-fav-name="${cleanEscape(x.name)}" data-fav-img="${cleanEscape(x.image)}" data-fav-price="${x.price}" data-fav-category="منظفات" aria-label="أضف للمفضلة">♡</button></article>`;
        orbit.innerHTML = [...cleaningFeatured, ...cleaningFeatured].map(card).join('');
        orbit.classList.add('ys-clean-marquee');
        const pause = () => orbit.classList.add('ys-paused');
        const resume = () => orbit.classList.remove('ys-paused');
        orbit.addEventListener('pointerenter', pause);
        orbit.addEventListener('pointerleave', resume);
        orbit.addEventListener('focusin', pause);
        orbit.addEventListener('focusout', resume);
        let previousTime = 0;
        let pausedUntil = 0;
        orbit.addEventListener('touchstart', () => { pausedUntil = performance.now() + 5000; }, {passive:true});
        orbit.addEventListener('wheel', () => { pausedUntil = performance.now() + 3500; }, {passive:true});
        function animateCleaning(time) {
          if (previousTime && !document.hidden && !orbit.classList.contains('ys-paused') && time > pausedUntil && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            orbit.scrollLeft -= Math.min((time - previousTime) * 0.025, 2);
            const halfway = orbit.scrollWidth / 2;
            if (Math.abs(orbit.scrollLeft) >= halfway - 2) orbit.scrollLeft += halfway;
          }
          previousTime = time;
          requestAnimationFrame(animateCleaning);
        }
        requestAnimationFrame(animateCleaning);
      }
      // قسمان مستقلان: شرائط تلقائية مبنية من بيانات المنتجات الفعلية.
      const escShow=(v)=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      function showcaseCard(p,i,category,type){
        const id=type==='meat'?'butcher-'+p.id:'poultry-'+i;
        const price=Number(p.price||0).toLocaleString('en-US');
        return `<article class="ys-slide-card ys-slide-${type}"><button type="button" class="ys-slide-open" data-open-category="${category}" aria-label="تصفح ${escShow(p.name)}"><span class="ys-slide-photo"><img src="${escShow(p.image)}" alt="${escShow(p.name)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'"></span><span class="ys-slide-name">${escShow(p.name)}</span><span class="ys-slide-unit">${escShow(p.unit||'')}</span><span class="ys-slide-price">${price} ل.ل</span><span class="ys-slide-cta">تسوّق الآن ←</span></button><button type="button" class="ys-fav-toggle ys-slide-heart" data-fav-id="${escShow(id)}" data-fav-name="${escShow(p.name)}" data-fav-img="${escShow(p.image)}" data-fav-price="${escShow(p.price)}" data-fav-category="${category}" aria-label="أضف للمفضلة">♡</button></article>`;
      }
      function setupShowcase(id,items,category,type){
        const host=document.getElementById(id);
        if(!host||!items.length)return;
        const cards=items.map((p,i)=>showcaseCard(p,i,category,type)).join('');
        // مجموعة واحدة فقط: السحب بيعرض كل المنتجات بدون تكرار.
        host.innerHTML=`<div class="ys-auto-viewport ys-auto-${type}" tabindex="0" role="region" aria-label="منتجات ${category}، اسحب لاستعراض المنتجات"><div class="ys-auto-track">${cards}</div></div><p class="ys-scroll-hint">اسحب لتشوف المزيد <span aria-hidden="true">↔</span></p>`;
        const viewport=host.querySelector('.ys-auto-viewport');
        let dragging=false, moved=false, startX=0, startScroll=0, blockClick=false;
        let playing=false, played=false, stopped=false, raf=0, startedAt=0;
        const cancelIntro=()=>{stopped=true;playing=false;if(raf)cancelAnimationFrame(raf)};
        // على الكمبيوتر: اسحب البطاقات بالماوس مثل السحب على الموبايل.
        viewport.addEventListener('pointerdown',e=>{
          if(e.pointerType==='mouse'&&e.button!==0)return;
          cancelIntro();dragging=true;moved=false;startX=e.clientX;startScroll=viewport.scrollLeft;
          if(e.pointerType==='mouse')viewport.setPointerCapture?.(e.pointerId);
        });
        viewport.addEventListener('pointermove',e=>{
          if(!dragging||e.pointerType!=='mouse')return;
          const dx=e.clientX-startX;
          if(Math.abs(dx)>5)moved=true;
          if(moved){viewport.scrollLeft=startScroll-dx;e.preventDefault()}
        });
        const release=()=>{if(!dragging)return;dragging=false;if(moved){blockClick=true;setTimeout(()=>blockClick=false,150)}};
        viewport.addEventListener('pointerup',release);
        viewport.addEventListener('pointercancel',release);
        viewport.addEventListener('lostpointercapture',release);
        viewport.addEventListener('click',e=>{if(blockClick){e.preventDefault();e.stopImmediatePropagation();blockClick=false}},true);
        viewport.addEventListener('dragstart',e=>e.preventDefault());
        viewport.addEventListener('touchstart',cancelIntro,{passive:true});
        viewport.addEventListener('wheel',e=>{
          if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&!e.ctrlKey){
            // العجلة فوق الشريط تحرك المنتجات أفقياً، وباقي الصفحة تضل قابلة للتمرير.
            const max=viewport.scrollWidth-viewport.clientWidth;
            const next=Math.max(0,Math.min(max,viewport.scrollLeft+e.deltaY));
            if(next!==viewport.scrollLeft){cancelIntro();e.preventDefault();viewport.scrollLeft=next}
          }else if(e.deltaX){cancelIntro()}
        },{passive:false});
        viewport.addEventListener('keydown',e=>{
          if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
            cancelIntro();e.preventDefault();viewport.scrollBy({left:e.key==='ArrowRight'?150:-150,behavior:'smooth'});
          }
        });
        // مرة واحدة فقط: عند وصول القسم للشاشة يمشي الشريط لحاله، يبطئ ثم يوقف.
        const startIntro=()=>{
          if(played||stopped||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
          played=true;playing=true;
          const max=viewport.scrollWidth-viewport.clientWidth;
          const distance=Math.min(max, type==='meat'?205:165);
          if(distance<12)return;
          const initial=viewport.scrollLeft;
          const duration=2100;
          const step=t=>{
            if(!playing||document.hidden)return;
            if(!startedAt)startedAt=t;
            const progress=Math.min((t-startedAt)/duration,1);
            viewport.scrollLeft=initial+distance*(1-Math.pow(1-progress,3));
            if(progress<1)raf=requestAnimationFrame(step);else playing=false;
          };
          raf=requestAnimationFrame(step);
        };
        if('IntersectionObserver' in window){
          const observer=new IntersectionObserver(entries=>{
            if(entries.some(e=>e.isIntersecting)){observer.disconnect();setTimeout(startIntro,220)}
          },{threshold:.35});
          observer.observe(host);
        }else startIntro();
      }
      setupShowcase('ysMeatFeature',butcherProducts.filter(x=>x.image).slice(0,10),'ملحمة','meat');
      setupShowcase('ysPoultryFeature',gharibProducts.filter(x=>x.image).slice(0,10),'دواجن','poultry');
      const offers=document.getElementById('ysOffers');
      const offerItems=[['خضرة وفواكه','images/green.jpg','خضرة وفواكه'],['مكتبة','images/library.jpg','مستلزمات المدرسة'],['منظفات','images/Cleaning.jpg','كل شي للنظافة'],['حلويات','images/Sweets.jpg','أطيب الحلويات']];
      if(offers)offers.innerHTML=offerItems.map(([cat,img,title])=>`<button type="button" data-open-category="${cat}"><img src="${img}" loading="lazy" alt=""><strong>${title}</strong><span>اكتشف القسم ←</span></button>`).join('');
    })();
    // تجربة الصفحة الرئيسية الاحترافية — من دون تعديل نظام السلة أو المنتجات
    const proTrack = document.getElementById('proFeaturedTrack');
    if (proTrack) {
        const picks = marketProducts.filter(p => p.image && p.name && Number.isFinite(Number(p.price)) && p.category !== 'Vegetables' && p.category !== 'cleaning').slice(0, 10);
        const fragment = document.createDocumentFragment();
        picks.forEach((p, index) => {
            const card = document.createElement('article');
            card.className = 'pro-feature-card';
            const picture = document.createElement('div'); picture.className = 'pro-feature-picture';
            const img = document.createElement('img'); img.src = p.image; img.alt = p.name.trim(); img.width = 94; img.height = 94;
            img.loading = index < 2 ? 'eager' : 'lazy'; img.decoding = 'async';
            img.onerror = () => { img.style.display = 'none'; picture.classList.add('image-unavailable'); };
            picture.append(img);
            const name = document.createElement('h3'); name.textContent = p.name.trim();
            const unit = document.createElement('small'); unit.textContent = p.unit || '';
            const price = document.createElement('strong'); price.textContent = Number(p.price).toLocaleString('en-US') + ' ل.ل';
            const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'عرض المنتج';
            btn.setAttribute('aria-label', 'عرض ' + p.name.trim());
            btn.addEventListener('click', () => {
                document.querySelector('.category-card[data-category="سوبر ماركت"]')?.click();
                const search = document.getElementById('marketProductSearch');
                if (search) { search.value = p.name.trim(); search.dispatchEvent(new Event('input', {bubbles:true})); }
            });
            const meta = document.createElement('div'); meta.className = 'next-price-row';
            meta.append(price, btn);
            card.append(picture, name, unit, meta); fragment.append(card);
        });
        proTrack.append(fragment);
        // حركة تلقائية خفيفة للمنتجات، تتوقف عند التفاعل أو إخفاء الصفحة
        let paused = false;
        const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        proTrack.addEventListener('pointerenter', () => { paused = true; });
        proTrack.addEventListener('pointerleave', () => { paused = false; });
        proTrack.addEventListener('touchstart', () => { paused = true; }, {passive:true});
        proTrack.addEventListener('touchend', () => { window.setTimeout(() => { paused = false; }, 4500); }, {passive:true});
        if (motionOK && picks.length > 3) window.setInterval(() => {
            const home = document.querySelector('.home-content');
            if (paused || document.hidden || !home || home.offsetParent === null || !proTrack.offsetWidth) return;
            const step = proTrack.querySelector('.pro-feature-card')?.getBoundingClientRect().width + 11 || 156;
            const max = proTrack.scrollWidth - proTrack.clientWidth;
            if (max < 20) return;
            const next = proTrack.scrollLeft + (getComputedStyle(proTrack).direction === 'rtl' ? -step : step);
            const atEnd = Math.abs(proTrack.scrollLeft) >= max - step * .4;
            proTrack.scrollTo({left: atEnd ? 0 : next, behavior:'smooth'});
        }, 4200);
    }

    // مجموعات الاحتياجات: منتجات حقيقية من مصفوفات المتجر الأصلية
    const needsScreen = document.getElementById('ysNeedsScreen');
    const needsGrid = document.getElementById('ysNeedsGrid');
    const needsTitle = document.getElementById('ysNeedsTitle');
    const needsCount = document.getElementById('ysNeedsCount');
    const needsGroups = {
      pantry: {title:'مونة البيت', entries:[...marketProducts.filter(p=>['food','drinks','Bakery','dairy','spices','Snacks','IceCream'].includes(p.category)).map(p=>({p,source:'market'}))]},
      cooking: {title:'طبخة اليوم', entries:[...vegetablesProducts.map(p=>({p,source:'vegetables'})),...butcherProducts.map(p=>({p,source:'butcher'})),...gharibProducts.map(p=>({p,source:'gharib'})),...marketProducts.filter(p=>p.category==='spices').map(p=>({p,source:'market'}))]},
      breakfast: {title:'فطور وقهوة', entries:marketProducts.filter(p=>['coffee','Bakery','dairy','drinks'].includes(p.category)).map(p=>({p,source:'market'}))}
    };
    const escNeed = value => String(value??'').replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    function closeNeeds(){needsScreen.hidden=true;home.classList.remove('market-open');}
    let currentNeedsEntries = [];
    const needsSearchInput = document.getElementById('ysNeedsSearchInput');
    const needsEmpty = document.getElementById('ysNeedsEmpty');
    function renderNeedsProducts(){
      const query = needsSearchInput.value.trim().toLocaleLowerCase();
      const entries = currentNeedsEntries.filter(({p})=>String(p.name||'').toLocaleLowerCase().includes(query));
      needsCount.textContent=entries.length+' منتجات';
      needsEmpty.hidden=entries.length>0;
      needsGrid.replaceChildren();
      entries.forEach(({p,source},i)=>{
        const card=document.createElement('article');card.className='market-product';
        const picture=document.createElement('div');picture.className='market-product-picture '+(p.pictureClass||'');
        const image=document.createElement('img');image.src=p.image||'';image.alt=p.name||'';image.loading='lazy';image.decoding='async';
        picture.append(image);
        const title=document.createElement('h3');title.textContent=p.name||'';
        const unit=document.createElement('p');unit.className='market-product-unit';unit.textContent=p.unit||'';
        const bottom=document.createElement('div');bottom.className='market-product-bottom';
        const price=document.createElement('strong');price.textContent=p.price==null?'السعر عند الطلب':Number(p.price).toLocaleString('en-US')+' ل.ل';
        const add=document.createElement('button');add.className='market-add';add.type='button';add.textContent='+';add.setAttribute('aria-label','إضافة '+(p.name||'')+' للسلة');
        add.addEventListener('click',()=>{
          const id='needs-'+source+'-'+(p.id??p.name??i);
          const found=marketCart.find(x=>x.id===id);
          if(found)found.quantity++;
          else marketCart.push({id,name:(p.name||'').trim(),price:Number(p.price)||0,priceUndetermined:p.price==null,unit:p.unit||'',image:p.image||'',quantity:1});
          updateMarketCart();showAddToCartToast();
        });
        bottom.append(price,add);card.append(picture,title,unit,bottom);needsGrid.append(card);
      });
    }
    function openNeeds(key){
      const group=needsGroups[key];if(!group)return;
      needsTitle.textContent=group.title;
      const banner = document.getElementById('ysNeedsBanner');
      const subtitle = document.getElementById('ysNeedsSubtitle');
      const bannerData = {
        pantry: {image:'images/background/Mortar background.webp', subtitle:'كل المواد الغذائية اللي بتحتاجها ببيتك'},
        cooking: {image:"images/background/Cooking background.webp", subtitle:'مكونات طيبة لطبخة اليوم'},
        breakfast: {image:'images/background/Today’s Background.webp', subtitle:'كل شي لفطور صباحك وقهوتك'}
      };
      const selectedBanner = bannerData[key];
      if (banner && selectedBanner) banner.style.backgroundImage = `linear-gradient(0deg,rgba(0,24,59,.78),rgba(0,24,59,.06) 70%),url(${JSON.stringify(selectedBanner.image)})`;
      if (subtitle && selectedBanner) subtitle.textContent = selectedBanner.subtitle;
      document.getElementById('ysNeedsBrowseLabel').textContent='تصفّح '+group.title;
      needsSearchInput.value='';
      document.getElementById('ysNeedsSearchWrap').hidden=true;
      currentNeedsEntries=group.entries;
      renderNeedsProducts();
      needsScreen.hidden=false;home.classList.add('market-open');
      needsScreen.querySelector('.ys-needs-scroll').scrollTop=0;
    }
    document.getElementById('ysNeedsSearchButton')?.addEventListener('click',()=>{
      const wrap=document.getElementById('ysNeedsSearchWrap');wrap.hidden=!wrap.hidden;
      if(!wrap.hidden)needsSearchInput.focus();else{needsSearchInput.value='';renderNeedsProducts();}
    });
    needsSearchInput?.addEventListener('input',renderNeedsProducts);
    document.querySelectorAll('[data-need]').forEach(b=>b.addEventListener('click',()=>openNeeds(b.dataset.need)));
    // الرجوع لهذه الصفحات يتم من زر الرجوع بالموبايل أو المتصفح.
    document.querySelectorAll('[data-pro-category]').forEach(btn => btn.addEventListener('click', () => {
        const category = btn.dataset.proCategory;
        document.querySelectorAll('.category-card').forEach(card => { if (card.dataset.category === category) card.click(); });
    }));
    document.getElementById('proViewMarket')?.addEventListener('click', () => document.querySelector('.category-card[data-category="سوبر ماركت"]')?.click());
    document.getElementById('proExplore')?.addEventListener('click', () => document.getElementById('categoriesSection')?.scrollIntoView({behavior:'smooth',block:'start'}));
    const revealItems = document.querySelectorAll('.pro-reveal, .categories-grid .category-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('pro-visible'); observer.unobserve(entry.target); }
        }), {root: document.querySelector('.home-content'), threshold: 0.06});
        revealItems.forEach(el => observer.observe(el));
    } else revealItems.forEach(el => el.classList.add('pro-visible'));



});



// سحب شريط الأقسام بالماوس
const categoriesSlider = document.getElementById("marketCategories");

if (categoriesSlider) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;

    categoriesSlider.addEventListener("mousedown", (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = categoriesSlider.scrollLeft;
        categoriesSlider.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const distance = e.pageX - startX;

        if (Math.abs(distance) > 5) {
            moved = true;
        }

        categoriesSlider.scrollLeft = startScrollLeft - distance;
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        categoriesSlider.style.cursor = "grab";
    });

    categoriesSlider.addEventListener("click", (e) => {
        if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
        }
    }, true);
}


document.querySelectorAll(".bottom-nav .nav-item").forEach(function(button) {
    if (button.dataset.page === "الرئيسية") {
        button.addEventListener("click", function() {

            // إغلاق صفحات الأقسام
            ["supermarketScreen", "vegetablesScreen", "butcherScreen", "cleaningScreen", "poultryScreen"]
                .forEach(function(id) {
                    const screen = document.getElementById(id);
                    if (screen) screen.hidden = true;
                });

            // الرجوع للشاشة الرئيسية
            const home = document.getElementById("homeScreen");
            home.classList.remove("market-open");
            home.hidden = false;

            // الرجوع لأول الصفحة
            const content = home.querySelector(".home-content");
            if (content) content.scrollTop = 0;

        });
    }
});

// حركة ظهور عناوين العروض عند التمرير
document.addEventListener("DOMContentLoaded", function () {

    const animatedTitles = document.querySelectorAll(
        ".products-section .section-heading, " +
        ".gharib-section .gharib-title"
    );

    if (!("IntersectionObserver" in window)) {
        animatedTitles.forEach(function(title) {
            title.classList.add("show");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedTitles.forEach(function(title) {
        observer.observe(title);
    });

});

// ===== ظهور منتجات العروض عند التمرير =====

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.getElementById("gharibProductsGrid");

    if (!grid) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }

            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    function observeProducts() {
        const cards = grid.querySelectorAll(
            ".gharib-product-card:not(.reveal)"
        );

        cards.forEach(function(card) {
            if (reducedMotion) {
                card.classList.add("reveal");
            } else {
                observer.observe(card);
            }
        });
    }

    // مراقبة المنتجات الموجودة
    observeProducts();

    // مراقبة المنتجات الجديدة عند عرض الكل
    const mutationObserver = new MutationObserver(
        observeProducts
    );

    mutationObserver.observe(grid, {
        childList: true
    });

});

// =====================================
// Yalla Shop - Category Reveal Animation
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const section = document.getElementById("categoriesSection");

    if (!section) return;

    const heading = section.querySelector(".section-heading");

    const cards = section.querySelectorAll(".category-card");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // تأخير خفيف بين البطاقات
    cards.forEach(function(card, index) {
        card.style.transitionDelay =
            ((index % 3) * 0.1) + "s";
    });

    // إذا الجهاز لا يدعم المراقبة أو يفضّل تقليل الحركة
    if (reducedMotion || !("IntersectionObserver" in window)) {
        if (heading) heading.classList.add("category-visible");

        cards.forEach(function(card) {
            card.classList.add("category-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("category-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            root: document.querySelector(".home-content"),
            threshold: 0.12,
            rootMargin: "0px 0px -15px 0px"
        }
    );

    if (heading) observer.observe(heading);

    cards.forEach(function(card) {
        observer.observe(card);
    });

});

// =====================================
// Yalla Shop - Global Cart Toast
// =====================================

let yallaToastTimer;

function showAddToCartToast() {

    let toast = document.getElementById("yallaCartToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "yallaCartToast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        toast.innerHTML = `
            <div class="yalla-toast-icon">
                <svg width="23" height="23"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2.5"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m7 12 3 3 7-7"/>
                </svg>
            </div>

            <div class="yalla-toast-text">
                <strong>تمت الإضافة بنجاح!</strong>
                <span>تم إضافة المنتج إلى سلة المشتريات</span>
            </div>
        `;

        document.body.appendChild(toast);
    }

    clearTimeout(yallaToastTimer);

    toast.classList.remove("show");

    // إعادة تشغيل الحركة عند الإضافة المتكررة
    void toast.offsetWidth;

    toast.classList.add("show");

    yallaToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// سحب تصنيفات المكتبة بالماوس مثل الهاتف، مع إبقاء النقر على الأقسام شغالاً.
(() => {
  const bar = document.getElementById('libraryCategories');
  if (!bar) return;
  let dragging = false, startX = 0, startScroll = 0, moved = false, blockClick = false;
  bar.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false;
    startX = e.clientX; startScroll = bar.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) { moved = true; bar.classList.add('dragging'); }
    if (moved) { bar.scrollLeft = startScroll - dx; e.preventDefault(); }
  }, {passive:false});
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false; bar.classList.remove('dragging');
    if (moved) { blockClick = true; setTimeout(() => { blockClick = false; }, 80); }
  });
  bar.addEventListener('click', e => {
    if (blockClick) { e.preventDefault(); e.stopImmediatePropagation(); blockClick = false; }
  }, true);
  bar.addEventListener('dragstart', e => e.preventDefault());
})();

// مطعم رعد: كل البيانات والأسعار مستخرجة من المنيو المرسلة.
// غيّر image لكل صنف إلى مسار الصورة التي تضعها في مجلد images/raad.
const restaurantsScreen = document.getElementById('restaurantsScreen');
const restaurantNames = ['RAAD Resto Café'];
const restaurantPhotos = ['images/raad/cover.jpg']; // صورة بطاقة المطعم
const restaurantMenus = {
  'RAAD Resto Café': {
    categories: [['sandwiches','السندويشات'],['burgers','البرغر'],['meals','الوجبات'],['pizza','البيتزا'],['sauces','الصوصات']],
    items: [
    {
        "id": "raad-1",
        "name": "فاهيتا",
        "price": 600000,
        "description": "دجاج، بصل، فليفلة، موزاريلا، صويا، أفوكا وصوص",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-01.jpg"
    },
    {
        "id": "raad-2",
        "name": "فرنسيسكو",
        "price": 600000,
        "description": "دجاج، جبنة، مايونيز، آيسبرغ، كبيس، ذرة",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-02.jpg"
    },
    {
        "id": "raad-3",
        "name": "فيلادلفيا",
        "price": 700000,
        "description": "ستيك لحم، فليفلة، بصل، جبنة، صويا، مايونيز",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-03.jpg"
    },
    {
        "id": "raad-4",
        "name": "كفتة",
        "price": 400000,
        "description": "كفتة، مايونيز، بندورة، كبيس، آيسبرغ",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-04.jpg"
    },
    {
        "id": "raad-5",
        "name": "طاووق",
        "price": 400000,
        "description": "طاووق، توم، كبيس، بطاطا",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-05.jpg"
    },
    {
        "id": "raad-6",
        "name": "كريسبي",
        "price": 400000,
        "description": "دجاج كريسبي، بطاطا، توم، كبيس، كوكتيل صوص",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-06.jpg"
    },
    {
        "id": "raad-7",
        "name": "بطاطا ساندويش",
        "price": 250000,
        "description": "بطاطا، سلطة ملفوف، كبيس، مايونيز، كاتشب، توم",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-07.jpg"
    },
    {
        "id": "raad-8",
        "name": "سجق",
        "price": 400000,
        "description": "سجق، جبنة، مايونيز، كبيس، بطاطا",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-08.jpg"
    },
    {
        "id": "raad-9",
        "name": "ستيك مشروم راب",
        "price": 700000,
        "description": "لحمة، بطاطا ستيك، جبنة موزاريلا، فطر، صوص الفطر",
        "category": "sandwiches",
        "image": "images/raad/sandwiches-09.jpg"
    },
    {
        "id": "raad-10",
        "name": "هامبرغر",
        "price": 500000,
        "description": "برغر لحم، تشيدر، بندورة، بصل مشوي، هاني ماسترد، خس",
        "category": "burgers",
        "image": "images/raad/burgers-10.jpg"
    },
    {
        "id": "raad-11",
        "name": "برغر المختار",
        "price": 600000,
        "description": "دبل برغر لحم، مكس جبنة، آيسبرغ، كبيس، باربكيو، مايونيز، بطاطا ستيك",
        "category": "burgers",
        "image": "images/raad/burgers-11.jpg"
    },
    {
        "id": "raad-12",
        "name": "لبناني برغر",
        "price": 500000,
        "description": "برغر لحم، مايونيز، كاتشب، بطاطا، سلطة ملفوف",
        "category": "burgers",
        "image": "images/raad/burgers-12.jpg"
    },
    {
        "id": "raad-13",
        "name": "تشيكن برغر",
        "price": 500000,
        "description": "برغر دجاج، جبنة، كوكتيل صوص، خس، كبيس",
        "category": "burgers",
        "image": "images/raad/burgers-13.jpg"
    },
    {
        "id": "raad-14",
        "name": "برغر فطر",
        "price": 700000,
        "description": "لحمة، قطعتان تشيدر، فطر، صوص الفطر",
        "category": "burgers",
        "image": "images/raad/burgers-14.jpg"
    },
    {
        "id": "raad-15",
        "name": "كريسبي وجبة",
        "price": 700000,
        "description": "4 قطع دجاج كريسبي، بطاطا، سلطة ملفوف، كاتشب، توم",
        "category": "meals",
        "image": "images/raad/meals-15.jpg"
    },
    {
        "id": "raad-16",
        "name": "طاووق وجبة",
        "price": 700000,
        "description": "سيخان طاووق، بطاطا، سلطة ملفوف، توم، كاتشب",
        "category": "meals",
        "image": "images/raad/meals-16.jpg"
    },
    {
        "id": "raad-17",
        "name": "موزاريلا ستيك",
        "price": 300000,
        "description": "4 حبات مع هاني ماسترد",
        "category": "meals",
        "image": "images/raad/meals-17.jpg"
    },
    {
        "id": "raad-18",
        "name": "علبة بطاطا",
        "price": 200000,
        "description": "بطاطا مقلية مع صوصات",
        "category": "meals",
        "image": "images/raad/meals-18.jpg"
    },
    {
        "id": "raad-19",
        "name": "بيتزا فاهيتا صغير",
        "price": 500000,
        "description": "صلصة بيتزا، دجاج، فليفلة، بصل، موزاريلا، أفوكا صوص",
        "category": "pizza",
        "image": "images/raad/pizza-19.jpg"
    },
    {
        "id": "raad-20",
        "name": "بيتزا فاهيتا وسط",
        "price": 700000,
        "description": "صلصة بيتزا، دجاج، فليفلة، بصل، موزاريلا، أفوكا صوص",
        "category": "pizza",
        "image": "images/raad/pizza-20.jpg"
    },
    {
        "id": "raad-21",
        "name": "بيتزا فاهيتا كبير",
        "price": 1000000,
        "description": "صلصة بيتزا، دجاج، فليفلة، بصل، موزاريلا، أفوكا صوص",
        "category": "pizza",
        "image": "images/raad/pizza-21.jpg"
    },
    {
        "id": "raad-22",
        "name": "بيتزا سجق صغير",
        "price": 400000,
        "description": "صلصة بيتزا، سجق، موزاريلا، سمنة",
        "category": "pizza",
        "image": "images/raad/pizza-22.jpg"
    },
    {
        "id": "raad-23",
        "name": "بيتزا سجق وسط",
        "price": 600000,
        "description": "صلصة بيتزا، سجق، موزاريلا، سمنة",
        "category": "pizza",
        "image": "images/raad/pizza-23.jpg"
    },
    {
        "id": "raad-24",
        "name": "بيتزا سجق كبير",
        "price": 900000,
        "description": "صلصة بيتزا، سجق، موزاريلا، سمنة",
        "category": "pizza",
        "image": "images/raad/pizza-24.jpg"
    },
    {
        "id": "raad-25",
        "name": "بيتزا مارغريتا صغير",
        "price": 400000,
        "description": "صلصة بيتزا، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-25.jpg"
    },
    {
        "id": "raad-26",
        "name": "بيتزا مارغريتا وسط",
        "price": 600000,
        "description": "صلصة بيتزا، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-26.jpg"
    },
    {
        "id": "raad-27",
        "name": "بيتزا مارغريتا كبير",
        "price": 900000,
        "description": "صلصة بيتزا، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-27.jpg"
    },
    {
        "id": "raad-28",
        "name": "بيتزا خضرة صغير",
        "price": 400000,
        "description": "صلصة بيتزا، موزاريلا، فليفلة، زيتون، ذرة، فطر",
        "category": "pizza",
        "image": "images/raad/pizza-28.jpg"
    },
    {
        "id": "raad-29",
        "name": "بيتزا خضرة وسط",
        "price": 600000,
        "description": "صلصة بيتزا، موزاريلا، فليفلة، زيتون، ذرة، فطر",
        "category": "pizza",
        "image": "images/raad/pizza-29.jpg"
    },
    {
        "id": "raad-30",
        "name": "بيتزا خضرة كبير",
        "price": 900000,
        "description": "صلصة بيتزا، موزاريلا، فليفلة، زيتون، ذرة، فطر",
        "category": "pizza",
        "image": "images/raad/pizza-30.jpg"
    },
    {
        "id": "raad-31",
        "name": "بيتزا بيبروني صغير",
        "price": 400000,
        "description": "صلصة بيتزا، بيبروني، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-31.jpg"
    },
    {
        "id": "raad-32",
        "name": "بيتزا بيبروني وسط",
        "price": 600000,
        "description": "صلصة بيتزا، بيبروني، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-32.jpg"
    },
    {
        "id": "raad-33",
        "name": "بيتزا بيبروني كبير",
        "price": 900000,
        "description": "صلصة بيتزا، بيبروني، موزاريلا",
        "category": "pizza",
        "image": "images/raad/pizza-33.jpg"
    },
    {
        "id": "raad-34",
        "name": "صوص كوكتيل",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-34.jpg"
    },
    {
        "id": "raad-35",
        "name": "صوص باربكيو",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-35.jpg"
    },
    {
        "id": "raad-36",
        "name": "صوص كاتشب",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-36.jpg"
    },
    {
        "id": "raad-37",
        "name": "صوص أفوكا صوص",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-37.jpg"
    },
    {
        "id": "raad-38",
        "name": "صوص دايناميت",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-38.jpg"
    },
    {
        "id": "raad-39",
        "name": "صوص هاني ماسترد",
        "price": null,
        "description": "السعر غير مذكور في المنيو",
        "category": "sauces",
        "image": "images/raad/sauces-39.jpg"
    }
]
  }
};
let restaurantCurrent = null;
let restaurantFilter = 'all';
const restaurantSearch = document.getElementById('restaurantsSearch');
function renderRestaurantView() {
  const list = document.getElementById('restaurantList');
  const menu = document.getElementById('restaurantMenu');
  const query = restaurantSearch.value.trim().toLocaleLowerCase();
  const restaurantsHeader = document.getElementById('restaurantsHeader');
  if (restaurantsHeader) restaurantsHeader.textContent = restaurantCurrent || 'المطاعم';
  list.hidden = Boolean(restaurantCurrent);
  menu.hidden = !restaurantCurrent;
  // Keep the menu above the list and explicitly control its display.
  list.style.setProperty('display', restaurantCurrent ? 'none' : 'flex', 'important');
  menu.style.setProperty('display', restaurantCurrent ? 'block' : 'none', 'important');
  const restaurantScroll = document.querySelector('#restaurantsScreen .ys-section-scroll');
  if (restaurantScroll) restaurantScroll.classList.toggle('restaurant-menu-open', Boolean(restaurantCurrent));
  if (!restaurantCurrent) {
    list.replaceChildren();
    restaurantNames.filter(n => n.toLocaleLowerCase().includes(query)).forEach(name => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'restaurant-list-row';
      const photo = document.createElement('img'); photo.className = 'restaurant-cover'; photo.alt = ''; photo.loading = 'lazy'; photo.src = restaurantPhotos[restaurantNames.indexOf(name)]; photo.onerror = () => {photo.style.display='none';};
      const label = document.createElement('strong'); label.textContent = name;
      const arrow = document.createElement('span'); arrow.className = 'restaurant-row-arrow'; arrow.textContent = '❮'; arrow.setAttribute('aria-hidden','true');
      button.append(photo,label,arrow);
      button.addEventListener('click',()=>{restaurantCurrent=name;restaurantFilter='all';restaurantSearch.value='';renderRestaurantView();const sc=document.querySelector('#restaurantsScreen .ys-section-scroll');if(sc)sc.scrollTop=0;});
      list.appendChild(button);
    });
    if (!list.children.length) {const empty=document.createElement('p');empty.className='restaurant-empty';empty.textContent='ما لقينا مطعم بهالاسم.';list.appendChild(empty);}
    return;
  }

  const data = restaurantMenus[restaurantCurrent] || {categories:[],items:[]};
  const tabs = document.getElementById('restaurantCategories');tabs.replaceChildren();
  const categories = [['all','الكل'],...data.categories];
  categories.forEach(([id,label])=>{
    const b=document.createElement('button');b.type='button';b.textContent=label;
    b.className='restaurant-tab'+(restaurantFilter===id?' active':'');
    b.addEventListener('click',()=>{restaurantFilter=id;renderRestaurantView();document.querySelector('#restaurantsScreen .ys-section-scroll')?.scrollTo({top:0,behavior:'instant'});});tabs.appendChild(b);
  });
  const items=document.getElementById('restaurantMenuItems');items.replaceChildren();
  const shown=data.items.filter(x=>(restaurantFilter==='all'||x.category===restaurantFilter)&&x.name.toLocaleLowerCase().includes(query));
  shown.forEach(product=>{
    const isRaad = restaurantCurrent === 'RAAD Resto Café';
    const line=document.createElement('div');line.className='restaurant-item'+(isRaad?' raad-product-card':'')+(isRaad && product.category === 'sauces'?' raad-sauce-card':'');
    const info=document.createElement('div');info.className='restaurant-item-info';
    const name=document.createElement('strong');name.textContent=product.name;
    const description=document.createElement('small');description.className='restaurant-item-description';description.textContent=product.description || '';
    info.append(name);
    if (product.description) info.append(description);
    const picture=document.createElement('img');picture.className='restaurant-item-photo';picture.src=product.image;
    picture.alt=product.name;picture.loading='lazy';
    picture.onerror=()=>{picture.removeAttribute('src');picture.classList.add('restaurant-photo-empty');picture.alt='';};
    const add=document.createElement('button');add.type='button';add.className='restaurant-add';add.textContent='+';
    add.setAttribute('aria-label','إضافة '+product.name+' إلى السلة');
    if (product.price == null && !(isRaad && product.category === 'sauces')) add.style.display='none';
    let addedTimer;
    add.addEventListener('click',()=>{
      if (product.price == null && !(isRaad && product.category === 'sauces')) return;
      if (typeof window.yallaAddRestaurantProduct !== 'function') {
        console.error('Shopping cart is not ready yet');return;
      }
      window.yallaAddRestaurantProduct(product, restaurantCurrent);
      add.classList.add('added');add.textContent='✓';
      window.clearTimeout(addedTimer);
      addedTimer=window.setTimeout(()=>{if(add.isConnected){add.classList.remove('added');add.textContent='+';}},800);
    });
    if (isRaad) {
      const photoFrame=document.createElement('div');photoFrame.className='raad-photo-frame';photoFrame.append(picture);
      if (product.price != null || product.category === 'sauces') {
        const actions=document.createElement('div');actions.className='raad-product-actions'+(product.category === 'sauces'?' raad-sauce-actions':'');
        if (product.price != null) {
          const price=document.createElement('span');price.className='raad-product-price';
          price.textContent=Number(product.price).toLocaleString('en-US')+' ل.ل';
          actions.append(price);
        }
        actions.append(add);info.append(actions);
      }
      line.append(photoFrame,info);
    } else {
      if (product.price != null) {
        const price=document.createElement('span');price.textContent=Number(product.price).toLocaleString('en-US')+' ل.ل';info.append(price);
      }
      line.append(picture,info,add);
    }
    items.appendChild(line);
  });
  if(!shown.length){const empty=document.createElement('p');empty.className='restaurant-empty';empty.textContent=data.items.length?'ما في أصناف مطابقة للبحث بهالقسم.':'المنيو لهيدا المطعم ما انضافت بعد. ابعتلي الأصناف والأسعار لنضيفها من دون تخمين.';items.appendChild(empty);}
}
document.getElementById('restaurantsBack').addEventListener('click',()=>{
  if(restaurantCurrent){restaurantCurrent=null;restaurantFilter='all';restaurantSearch.value='';renderRestaurantView();}
  else{restaurantsScreen.hidden=true;home.classList.remove('market-open');}
});
document.getElementById('restaurantsSearchToggle').addEventListener('click',()=>{
  const wrap=document.getElementById('restaurantsSearchWrap');wrap.hidden=!wrap.hidden;
  if(!wrap.hidden)restaurantSearch.focus();else{restaurantSearch.value='';renderRestaurantView();}
});
restaurantSearch.addEventListener('input',renderRestaurantView);
// Populate the restaurant list immediately, even before opening the section.
renderRestaurantView();
// سحب التصنيفات بالماوس، واللمس مدعوم عبر CSS overflow-x.
(()=>{const bar=document.getElementById('restaurantCategories');let down=false,start=0,scroll=0,moved=false,block=false;
bar.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;moved=false;start=e.clientX;scroll=bar.scrollLeft;});
window.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-start;if(Math.abs(dx)>5)moved=true;if(moved){bar.scrollLeft=scroll-dx;e.preventDefault();}},{passive:false});
window.addEventListener('pointerup',()=>{if(!down)return;down=false;if(moved){block=true;setTimeout(()=>block=false,90);}});
bar.addEventListener('click',e=>{if(block){e.preventDefault();e.stopImmediatePropagation();block=false;}},true);
bar.addEventListener('dragstart',e=>e.preventDefault());})();

// تحسين صور المنتجات المُضافة ديناميكياً دون تحميل الصور خارج الشاشة.
// يُفضّل استخدام loading=lazy مباشرة في قوالب المنتجات أعلاه.
(function () {
  const optimize = (img) => {
    if (img.closest('.market-product, .gharib-product-card, .library-product-card, .restaurant-product-card')) {
      img.loading = 'lazy';
      img.decoding = 'async';
      if (!img.hasAttribute('width')) img.width = 94;
      if (!img.hasAttribute('height')) img.height = 94;
    }
  };
  const observer = new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.matches('img')) optimize(node);
      node.querySelectorAll?.('img').forEach(optimize);
    }
  });
  observer.observe(document.documentElement, {childList:true,subtree:true});
})();

/* Reference homepage: real navigation through existing category buttons */
document.addEventListener('DOMContentLoaded', () => {
 const jump = (name) => document.querySelector('.category-card[data-category="'+name+'"]')?.click();
 
 document.getElementById('referenceExplore')?.addEventListener('click',()=>document.getElementById('categoriesSection')?.scrollIntoView({behavior:'smooth'}));
 document.getElementById('referenceOffersAll')?.addEventListener('click',()=>jump('سوبر ماركت'));
 document.getElementById('referenceMenuButton')?.addEventListener('click',()=>document.getElementById('categoriesSection')?.scrollIntoView({behavior:'smooth'}));
 document.getElementById('referenceHeartButton')?.addEventListener('click',()=>document.getElementById('proFeaturedSection')?.scrollIntoView({behavior:'smooth'}));
 // فتح الأقسام من الشريط السفلي يتم عبر مودال كل الأقسام أدناه.
 
});

document.addEventListener('DOMContentLoaded',()=>{document.querySelector('.photo-hero')?.classList.remove('reference-slide');});

// المفضلة: تخزين محلي، قلوب للمنتجات الموجودة، وشاشة مستقلة بدلاً من التوصيل.
document.addEventListener('DOMContentLoaded',()=>{
 const KEY='yallashop_favorites_v1';let favorites={};
 try{favorites=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){favorites={}}
 const favScreen=document.getElementById('ysFavorites'),list=document.getElementById('ysFavList');
 const esc=s=>String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(favorites))}catch(e){};refresh()};
 function refresh(){
   const count=Object.keys(favorites).length,el=document.getElementById('ysFavCount');
   if(el){el.textContent=count;el.hidden=!count}
   document.querySelectorAll('.ys-fav-toggle').forEach(b=>{let on=!!favorites[b.dataset.favId];b.textContent=on?'♥':'♡';b.classList.toggle('is-favorite',on);b.setAttribute('aria-pressed',String(on))});
   if(list){list.innerHTML=Object.entries(favorites).map(([id,x])=>`<article class="ys-fav-card"><img src="${esc(x.image)}" alt="" loading="lazy"><div><strong>${esc(x.name)}</strong><small>${x.price?Number(x.price).toLocaleString('en-US')+' ل.ل':''}</small><button type="button" data-open-category="${esc(x.category)}">افتح القسم ←</button></div><button type="button" class="ys-fav-remove" data-remove-fav="${esc(id)}" aria-label="إزالة من المفضلة">♥</button></article>`).join('')||'<p class="ys-empty">لسّا ما ضفت شي للمفضلة ❤️<br>إضغط على القلب جنب أي منتج بتحبّه.</p>'}
   document.getElementById('ysFavTotal').textContent=count+' منتجات';
 }
 function closeFav(){favScreen.hidden=true;document.getElementById('homeScreen')?.classList.remove('ys-favorites-open')}
 function openFav(){document.querySelectorAll('#homeScreen > section.supermarket-screen').forEach(s=>s.hidden=true);document.getElementById('homeScreen')?.classList.remove('market-open');favScreen.hidden=false;document.getElementById('homeScreen')?.classList.add('ys-favorites-open');refresh()}
 document.getElementById('ysFavBack')?.addEventListener('click',closeFav);
 document.querySelector('.bottom-nav [data-page="المفضلة"]')?.addEventListener('click',openFav);
 document.querySelector('.bottom-nav [data-page="الرئيسية"]')?.addEventListener('click',closeFav);
 document.addEventListener('click',e=>{
  const heart=e.target.closest('.ys-fav-toggle');
  if(heart){e.preventDefault();e.stopPropagation();const id=heart.dataset.favId;if(favorites[id])delete favorites[id];else favorites[id]={name:heart.dataset.favName,image:heart.dataset.favImg,price:heart.dataset.favPrice,category:heart.dataset.favCategory};save();return}
  const remove=e.target.closest('[data-remove-fav]');if(remove){delete favorites[remove.dataset.removeFav];save();return}
  const open=e.target.closest('[data-open-category]');if(open){closeFav();document.querySelector('.category-card[data-category="'+open.dataset.openCategory+'"]')?.click()}
 });
 // أزرار القلوب تُضاف للمنتجات فور عرضها، بما فيها المنتجات المحمّلة ديناميكياً.
 const selectors=['.market-product','.gharib-product-card','.library-product-card','.restaurant-product-card','.cleaning-product-card','.vegetables-product-card','.butcher-product-card','.pro-product-card'];
 const addHearts=root=>{for(const selector of selectors){const cards=[...(root.matches?.(selector)?[root]:[]),...(root.querySelectorAll?.(selector)||[])];for(const card of cards){if(card.querySelector('.ys-fav-toggle'))continue;const img=card.querySelector('img'),name=card.dataset.name||card.querySelector('h3')?.textContent?.trim();if(!name)continue;const id=selector+'-'+(card.dataset.productId||img?.getAttribute('src')||name);const b=document.createElement('button');b.type='button';b.className='ys-fav-toggle ys-fav-floating';b.dataset.favId=id;b.dataset.favName=name;b.dataset.favImg=img?.getAttribute('src')||'';b.dataset.favPrice=(card.querySelector('.market-product-bottom strong, .gharib-product-price')?.textContent||'').replace(/[^0-9.]/g,'');b.dataset.favCategory=card.closest('#supermarketScreen')?'سوبر ماركت':card.closest('#vegetablesScreen')?'خضرة وفواكه':card.closest('#butcherScreen')?'ملحمة':card.closest('#poultryScreen')?'دواجن':card.closest('#libraryScreen')?'مكتبة':card.closest('#cleaningScreen')?'منظفات':'سوبر ماركت';b.setAttribute('aria-label','إضافة للمفضلة');card.appendChild(b);b.textContent=favorites[id]?'♥':'♡';b.classList.toggle('is-favorite',!!favorites[id]);}}};
 addHearts(document.body);
 const observer=new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1&&!n.closest?.('#ysFavList'))addHearts(n)});
 observer.observe(document.body,{childList:true,subtree:true});refresh();
 const reveal=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('ys-visible');reveal.unobserve(x.target)}}),{threshold:.08});
 document.querySelectorAll('.ys-section-head,.ys-meat-feature,.ys-poultry-feature,.ys-offers').forEach(el=>{el.classList.add('ys-visible')});
});

// Menu icon in compact home header: open the existing categories area.
document.getElementById('ysHeaderMenu')?.addEventListener('click', function () {
  const section = document.getElementById('categoriesSection');
  if (section) section.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
});
document.addEventListener('DOMContentLoaded', () => {
  const sections = {
    supermarketScreen: ['سوبر ماركت', 'images/background/Supermarket background.webp'],
    vegetablesScreen: ['خضرة وفواكه', 'images/background/Background of vegetables and fruits .webp'],
    butcherScreen: ['الملحمة', 'images/background/Meat background.webp'],
    cleaningScreen: ['المنظفات', 'images/background/Detergents Background.webp'],
    poultryScreen: ['الدواجن', 'images/background/Poultry background.webp'],
    libraryScreen: ['المكتبة', 'images/background/Library background.webp'],
    restaurantsScreen: ['المطاعم', 'images/background/Restaurant background.webp']
  };
  Object.entries(sections).forEach(([id, [title, image]]) => {
    const screen = document.getElementById(id);
    if (!screen) return;
    const header = screen.querySelector(':scope > .market-header');
    if (!header) return;
    const scroll = document.createElement('div');
    scroll.className = 'ys-section-scroll';
    const banner = document.createElement('div');
    banner.className = 'ys-section-banner';
    banner.style.backgroundImage = `linear-gradient(0deg, rgba(2,18,40,.74), rgba(2,18,40,.08) 72%), url("${image}")`;
    const heading = document.createElement('div');
    heading.className = 'ys-banner-title';
    const name = document.createElement('strong');
    name.textContent = title;
    const subtitle = document.createElement('span');
    subtitle.textContent = 'تسوّق منتجاتنا بكل سهولة';
    heading.append(name, subtitle);
    // Keep search outside the image, and remove the duplicate old title/back arrow.
    const searchRow = document.createElement('div');
    searchRow.className = 'ys-search-row';
    const searchLabel = document.createElement('span');
    searchLabel.textContent = 'تصفّح ' + title;
    searchRow.append(searchLabel);
    const searchButton = header.querySelector('.market-search-icon');
    if (searchButton) {
      searchButton.setAttribute('aria-label', 'بحث في ' + title);
      searchRow.append(searchButton);
    }
    banner.append(heading);
    const nodes = [...screen.children].filter(el => el !== scroll);
    screen.append(scroll);
    scroll.append(banner, searchRow);
    nodes.forEach(el => { if(el !== header) scroll.append(el); });
    header.remove();
  });
});

// Android hardware/browser back: each opened category receives a history entry.
// Closing via the device back button returns to the main shop, not out of the app.
document.addEventListener('DOMContentLoaded', () => {
  const ids = ['supermarketScreen','vegetablesScreen','butcherScreen','cleaningScreen','poultryScreen','libraryScreen','restaurantsScreen'];
  const screens = ids.map(id => document.getElementById(id)).filter(Boolean);
  let active = null;
  let handlingPop = false;
  const sync = () => {
    if (handlingPop) return;
    const opened = screens.find(el => !el.hidden);
    if (opened && active !== opened.id) {
      active = opened.id;
      history.pushState({ysCategory: opened.id}, '', location.href);
    } else if (!opened) active = null;
  };
  const observer = new MutationObserver(sync);
  screens.forEach(el => observer.observe(el, {attributes:true, attributeFilter:['hidden']}));
  window.addEventListener('popstate', () => {
    handlingPop = true;
    const opened = screens.find(el => !el.hidden);
    if (opened) {
      opened.hidden = true;
      document.getElementById('homeScreen')?.classList.remove('market-open');
      active = null;
    }
    // Restore a previous category if navigating forward.
    const target = history.state?.ysCategory;
    if (target && screens.some(el => el.id === target)) {
      const el = document.getElementById(target);
      if (el) { el.hidden = false; document.getElementById('homeScreen')?.classList.add('market-open'); active = target; }
    }
    queueMicrotask(() => { handlingPop = false; });
  });
  // Any remaining internal back controls should use the same history stack.
  screens.forEach(screen => {
    screen.querySelectorAll('.market-back').forEach(btn => btn.addEventListener('click', e => {
      if (active === screen.id) { e.stopImmediatePropagation(); history.back(); }
    }, true));
  });
});


// زر الرئيسية: العودة إلى بداية الصفحة من أي قسم أو نافذة.
document.addEventListener('DOMContentLoaded', function () {
  const homeButton = document.querySelector('.bottom-nav .nav-item[data-page="الرئيسية"]');
  if (!homeButton) return;
  homeButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const home = document.getElementById('homeScreen');
    if (!home) return;
    home.hidden = false;
    home.querySelectorAll('section.supermarket-screen').forEach(section => { section.hidden = true; });
    ['supermarketScreen','vegetablesScreen','butcherScreen','cleaningScreen','poultryScreen','libraryScreen','restaurantsScreen','ysFavorites','yallaCartScreen'].forEach(id => {
      const section = document.getElementById(id);
      if (section) section.hidden = true;
    });
    home.classList.remove('market-open', 'ys-favorites-open');
    document.querySelectorAll('.bottom-nav .nav-item').forEach(button => {
      button.classList.toggle('active', button === homeButton);
    });
    home.querySelectorAll('.home-content').forEach(content => { content.scrollTop = 0; });
    window.scrollTo(0, 0);
  }, true);
});


// واجهة كل الأقسام: شبكة صور كبيرة مع رجوع الموبايل وسهم الرجوع.
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('ysCategoriesModal');
  const grid = document.getElementById('ysCategoriesModalGrid');
  const opener = document.getElementById('referenceAllCategories');
  const back = document.getElementById('ysCategoriesBack');
  if (!modal || !grid || !opener || !back) return;
  const cards = [...document.querySelectorAll('#categoriesGrid .category-card[data-category]')];
  const assets = 'images/categories-premium/';
  const pictures = {'سوبر ماركت':'supermarket.webp','مطاعم':'restaurants.webp','خضرة وفواكه':'vegetables.webp','مكتبة':'stationery.webp','ملحمة':'meat.webp','دواجن':'poultry.webp','منظفات':'cleaning.webp','حلويات':'sweets.webp'};
  const aliases = {'خضرة وفواكه':['خضرة وفواكه','خضار وفواكه'],'مطاعم':['مطاعم','مطعم'],'ملحمة':['ملحمة','لحوم'],'مكتبة':['مكتبة','قرطاسية'],'منظفات':['منظفات','المنظفات']};
  const used = new Set();
  function findCard(name) { return cards.find(c => (aliases[name] || [name]).includes(c.dataset.category)); }
  function addTile(name, filename, card) {
    if (!card || used.has(card)) return;
    used.add(card);
    const tile = document.createElement('button');
    tile.type = 'button'; tile.className = 'ys-premium-tile' + (name === 'سوبر ماركت' ? ' ys-premium-feature' : '');
    tile.dataset.search = name; tile.dataset.section = ({'سوبر ماركت':'supermarket','مطاعم':'restaurants','خضرة وفواكه':'vegetables','مكتبة':'stationery','ملحمة':'meat','دواجن':'poultry','منظفات':'cleaning','حلويات':'sweets'})[name] || 'other';
    const img = document.createElement('img'); img.src = assets + filename; img.alt = ''; img.loading = 'lazy';
    const title = document.createElement('strong'); title.textContent = name;
    const arrow = document.createElement('span'); arrow.className='ys-premium-arrow'; arrow.textContent='→'; arrow.setAttribute('aria-hidden','true');
    tile.append(img,title,arrow);
    tile.addEventListener('click', () => {
      modal.hidden = true;
      history.replaceState({ysCategoryPickerClosed:true}, '', location.href);
      card.click();
    });
    grid.append(tile);
  }
  ['سوبر ماركت','مطاعم','خضرة وفواكه','مكتبة','ملحمة','دواجن','منظفات','حلويات'].forEach(name => addTile(name,pictures[name],findCard(name)));
  cards.filter(card => !used.has(card)).forEach(card => addTile(card.dataset.category, 'other_categories.webp', card));
  const search = document.getElementById('ysPremiumCategorySearch');
  search?.addEventListener('input', () => {
    const q = search.value.trim().toLocaleLowerCase('ar');
    grid.querySelectorAll('.ys-premium-tile').forEach(tile => { tile.hidden = !tile.dataset.search.toLocaleLowerCase('ar').includes(q); });
  });
  function openModal() {
    if (!modal.hidden) return;
    // Clear stale category navigation so returning from the picker never opens an old category.
    history.replaceState({ysHome:true}, '', location.href);
    modal.hidden = false;
    history.pushState({ysAllCategories:true}, '', location.href);
    modal.scrollTop = 0;
  }
  opener.addEventListener('click', openModal);
  document.querySelector('.bottom-nav .nav-item[data-page="الأقسام"]')?.addEventListener('click', openModal);
  document.getElementById('showAllButton')?.addEventListener('click', openModal);
  document.getElementById('referenceExplore')?.addEventListener('click', openModal);
  back.addEventListener('click', () => {
    modal.hidden = true;
    history.replaceState({ysHome:true}, '', location.href);
    document.querySelectorAll('.bottom-nav .nav-item').forEach(nav => nav.classList.toggle('active', nav.dataset.page === 'الرئيسية'));
    document.getElementById('homeScreen')?.classList.remove('market-open');
  });
  window.addEventListener('popstate', () => { modal.hidden = true; });
  document.querySelector('.bottom-nav [data-page="الرئيسية"]')?.addEventListener('click', () => { modal.hidden = true; }, true);
});


// شريط المكتبة: صور المنتجات الأصلية فقط، حركة تلقائية وتوقف عند التفاعل.
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('ysStationeryWindow');
  const track = document.getElementById('ysStationeryTrack');
  const allButton = document.getElementById('ysStationeryViewAll');
  if (!viewport || !track) return;

  // تنويع الأدوات: قلم، دفتر، ألوان، مسطرة، مقلمة، أدوات هندسة، وغيرها.
  const selections = [
    ['library-001.png', 'قلم'],
    ['library-009.png', 'دفتر'],
    ['library-010.png', 'ألوان'],
    ['library-015.png', 'مسطرة'],
    ['library-018.png', 'مقلمة'],
    ['library-025.png', 'أقلام تلوين'],
    ['library-026.png', 'آلة حاسبة'],
    ['library-033.png', 'ألوان رسم'],
    ['library-044.png', 'مقلمة مدرسية'],
    ['library-050.png', 'قلم حبر'],
    ['library-066.png', 'دفتر رسم'],
    ['library-077.png', 'علبة هندسة']
  ];
  const openLibrary = () => {
    const card = document.querySelector('#categoriesGrid .category-card[data-category="مكتبة"]');
    if (card) card.click();
  };
  allButton?.addEventListener('click', openLibrary);
  const buildTile = ([file, description]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ys-stationery-tile';
    button.setAttribute('aria-label', 'افتح المكتبة: ' + description);
    const img = document.createElement('img');
    img.src = 'images/library/' + file;
    img.alt = description;
    img.loading = 'lazy';
    img.decoding = 'async';
    button.append(img);
    button.addEventListener('click', openLibrary);
    return button;
  };
  // نسختان متطابقتان تسمحان بدوران الشريط دون فراغ عند نهاية المنتجات.
  selections.forEach(item => track.append(buildTile(item)));
  selections.forEach(item => track.append(buildTile(item)));

  let paused = false;
  let userPauseUntil = 0;
  let lastTime = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pauseBriefly = () => { userPauseUntil = performance.now() + 3500; };
  viewport.addEventListener('pointerenter', () => { paused = true; });
  viewport.addEventListener('pointerleave', () => { paused = false; pauseBriefly(); });
  viewport.addEventListener('pointerdown', pauseBriefly);
  viewport.addEventListener('touchstart', pauseBriefly, {passive:true});
  viewport.addEventListener('wheel', pauseBriefly, {passive:true});
  viewport.addEventListener('focusin', () => { paused = true; });
  viewport.addEventListener('focusout', () => { paused = false; });
  viewport.addEventListener('scroll', () => { /* Keep native swipe and keyboard scrolling available. */ }, {passive:true});
  function animate(now) {
    const delta = lastTime ? Math.min(now - lastTime, 60) : 0;
    lastTime = now;
    if (!reduceMotion.matches && !document.hidden && !paused && now > userPauseUntil && viewport.getClientRects().length) {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        viewport.scrollLeft += delta * 0.065;
        if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});

// Support device/browser Back for the three "شو ناقص بيتك اليوم" pages.
document.addEventListener('DOMContentLoaded', () => {
  const needs = document.getElementById('ysNeedsScreen');
  const home = document.getElementById('homeScreen');
  if (!needs) return;
  let tracked = false;
  new MutationObserver(() => {
    if (!needs.hidden && !tracked) {
      tracked = true;
      history.pushState({ysNeeds: true}, '', location.href);
    } else if (needs.hidden) {
      tracked = false;
    }
  }).observe(needs, {attributes:true, attributeFilter:['hidden']});
  window.addEventListener('popstate', () => {
    if (!needs.hidden) {
      needs.hidden = true;
      home?.classList.remove('market-open');
    }
    tracked = false;
  });
});
