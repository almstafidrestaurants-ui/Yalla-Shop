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

    const gharibProducts = window.YallaCatalog.filter(p=>p.group==='poultry').map(p=>({...p}));
window.YallaRegistry.register('poultry', gharibProducts, 4);;

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
    const cartId = "gharib-" + product.ysKey;
    const existing = marketCart.find(item => item.id === cartId);
    if (existing) existing.quantity++;
    else marketCart.push({ysKey: product.ysKey,
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
    const marketProducts = window.YallaCatalog.filter(p=>p.group==='market').map(p=>({...p}));
window.YallaRegistry.register('market', marketProducts, 1);;

    let activeMarketFilter = "all";
    let marketCart = [];
    // Bridge for restaurant menu buttons, which are rendered outside this handler.
    window.yallaAddRestaurantProduct = function(product, restaurantName) {
        const id = 'restaurant:' + restaurantName + ':' + product.id;
        const existing = marketCart.find(item => item.id === id);
        if (existing) existing.quantity += 1;
        else {
            const priceUnknown = restaurantName === 'RAAD Resto Café' && product.category === 'sauces' && product.price == null;
            marketCart.push({ysKey: product.ysKey,
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
                marketCart.push({ysKey: product.ysKey,
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

      <p class="yc-location-help">📍 تحديد الموقع اختياري. يمكنك إرسال الطلب بعنوان التوصيل المكتوب فقط، أو الضغط على الزر لإضافة موقعك تلقائياً.</p>
      <button type="button" id="ycLocation">
        📍 تحديد موقعي من الهاتف
      </button>
      <p id="ycLocationStatus" role="status" aria-live="polite"></p>
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
    syncYallaCart();
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
// تحديد الموقع يعمل على iOS وAndroid والمتصفح المكتبي، بشرط HTTPS وإذن المستخدم.
let ycLocationPending = null;
let customerLocationLink = "";
const ycLocationButton = document.getElementById("ycLocation");
function ycRequestLocation() {
    if (ycLocationPending) return ycLocationPending;
    if (!window.isSecureContext) {
        cartLocationStatus.textContent = "⚠️ تحديد الموقع يحتاج رابط HTTPS. يمكنك إرسال الطلب بدون تحديد الموقع باستخدام عنوان التوصيل المكتوب.";
        return Promise.resolve(false);
    }
    if (!navigator.geolocation) {
        cartLocationStatus.textContent = "⚠️ هالمتصفح ما بيدعم تحديد الموقع. يمكنك إرسال الطلب باستخدام عنوان التوصيل المكتوب فقط.";
        return Promise.resolve(false);
    }
    cartLocationStatus.textContent = "عم نطلب إذن الموقع… وافق على الرسالة اللي بتظهر على جهازك.";
    ycLocationButton.disabled = true;
    ycLocationPending = new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            position => {
                customerCoordinates = {lat: position.coords.latitude, lng: position.coords.longitude};
                customerLocationLink = `https://www.google.com/maps?q=${customerCoordinates.lat},${customerCoordinates.lng}`;
                cartLocationStatus.textContent = "✓ تم تحديد الموقع بنجاح، ورح ينضاف رابط الموقع للطلب.";
                resolve(true);
            },
            error => {
                customerCoordinates = null;
                customerLocationLink = "";
                const messages = {
                    1: "إذن الموقع مرفوض. يمكنك إرسال الطلب بالعنوان المكتوب، أو السماح بالموقع من إعدادات المتصفح والمحاولة مجدداً.",
                    2: "⚠️ الجهاز ما قدر يحدد موقعك. يمكنك إرسال الطلب بالعنوان المكتوب، أو تفعيل خدمات الموقع والمحاولة مجدداً.",
                    3: "⌛ تحديد الموقع أخد وقت طويل. يمكنك إرسال الطلب بالعنوان المكتوب أو محاولة تحديد الموقع مجدداً."
                };
                cartLocationStatus.textContent = messages[error.code] || "تعذّر تحديد الموقع. يمكنك إرسال الطلب باستخدام عنوان التوصيل المكتوب فقط.";
                resolve(false);
            },
            {enableHighAccuracy: false, timeout: 25000, maximumAge: 60000}
        );
    }).finally(() => {
        ycLocationPending = null;
        ycLocationButton.disabled = false;
    });
    return ycLocationPending;
}
function showMarketCart() {
    renderYallaCart();
    cartScreen.hidden = false;
}
function closeYallaCart() { cartScreen.hidden = true; }
document.getElementById("ycBack").onclick = closeYallaCart;
document.querySelectorAll('.bottom-nav .nav-item[data-page="السلة"]').forEach(button => {
    button.addEventListener("click", showMarketCart);
});
ycLocationButton.addEventListener("click", ycRequestLocation);
// تجهيز الطلب وإرساله إلى واتساب، ثم تفريغ السلة فور فتح الرابط
 document.getElementById("ycOrder").onclick = async () => {
    if (!navigator.onLine) { ycNotify("اتصل بالإنترنت لتأكيد الأسعار قبل الطلب."); return; }
    if (!await window.YallaCloud.ensureFresh()) { ycNotify("تعذر تأكيد الأسعار. حاول مجدداً عند عودة المزامنة."); return; }
    syncYallaCart();
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
    const locationLink = customerCoordinates ? customerLocationLink : "";
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

    const vegetablesProducts = window.YallaCatalog.filter(p=>p.group==='vegetables').map(p=>({...p}));
window.YallaRegistry.register('vegetables', vegetablesProducts, 2);;

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
            marketCart.push({ysKey: product.ysKey,
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
const butcherProducts = window.YallaCatalog.filter(p=>p.group==='butcher').map(p=>({...p}));
window.YallaRegistry.register('butcher', butcherProducts, 3);;

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
        marketCart.push({ysKey: product.ysKey,
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
    else marketCart.push({ysKey: product.ysKey,id:product.id, name:product.name, price:product.price, quantity:1});
    updateMarketCart();
    showAddToCartToast();
});


// المكتبة: أسعار إرشادية بالليرة اللبنانية على أساس 90,000 ل.ل / دولار.
// تحقق من الأسعار والتوفر قبل نشر المتجر للبيع.
const libraryProducts = window.YallaCatalog.filter(p=>p.group==='library').map(p=>({...p}));
window.YallaRegistry.register('library', libraryProducts, 5);;
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
      else marketCart.push({ysKey: product.ysKey,id:product.id,name:product.name,price:product.price,image:product.image,quantity:1});
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




    window.yallaAddDynamicProduct = function(key){
      const p=window.YallaRegistry.find(key);if(!p)return;
      const existing=marketCart.find(item=>item.ysKey===p.ysKey);
      if(existing)existing.quantity++;
      else marketCart.push({ysKey:p.ysKey,id:p.id,name:p.name,price:p.price,image:p.image,quantity:1});
      updateMarketCart();showAddToCartToast();
    };
    function syncYallaCart() {
      for (let i=marketCart.length-1;i>=0;i--) {
        const item=marketCart[i];
        const p=window.YallaRegistry.find(item.ysKey);
        if (!p) {marketCart.splice(i,1);continue;}
        item.name=(p.group?.startsWith('restaurant')?'RAAD Resto Café - ':'')+p.name;
        item.price=p.price; item.image=p.image; item.priceUndetermined=p.price==null;
      }
    }
    window.addEventListener('yalla-catalog-change',()=>{
      renderMarketProducts(); renderVegetablesProducts(); renderButcherProducts();
      renderGharibProducts(); renderCleaningProducts(); renderLibraryProducts(); renderGlobalSearch();
      syncYallaCart(); updateMarketCart(); if(!cartScreen.hidden)renderYallaCart();
    });
    // إنشاء المنتجات عند تحميل الصفحة
    renderMarketProducts();
    // عرض أقسام الصفحة الرئيسية من بيانات المنتجات الأصلية، بدون نسخ بيانات أو تغيير المودالات.
    (function buildYallaShowcase(){
      // منتجات تنظيف مختارة من كتالوج المتجر الفعلي، مع أسعارها وصورها الأصلية.
      const cleaningFeatured = marketProducts.filter(x => x.category === 'cleaning' && x.image).slice(0, 12);
      const orbit = document.getElementById('ysFoodOrbit');
      const cleanEscape = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      if (orbit && cleaningFeatured.length) {
        const card = (x,i) => `<article class="ys-orbit-card ys-clean-card" data-ys-key="${x.ysKey}" data-ys-group="${x.group}" style="--i:${i}"><button class="ys-clean-open" type="button" data-open-category="منظفات" aria-label="عرض ${cleanEscape(x.name)} في قسم المنظفات"><span class="ys-img"><img src="${cleanEscape(x.image)}" alt="${cleanEscape(x.name)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.classList.add('ys-img-fallback')"></span><strong>${cleanEscape(x.name)}</strong><small>${Number(x.price).toLocaleString('en-US')} ل.ل</small><span class="ys-clean-cta">عرض المنتج ←</span></button><button class="ys-fav-toggle" type="button" data-fav-id="market-${x.id}" data-fav-name="${cleanEscape(x.name)}" data-fav-img="${cleanEscape(x.image)}" data-fav-price="${x.price}" data-fav-category="منظفات" aria-label="أضف للمفضلة">♡</button></article>`;
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
        return `<article class="ys-slide-card ys-slide-${type}" data-ys-key="${p.ysKey}" data-ys-group="${p.group}"><button type="button" class="ys-slide-open" data-open-category="${category}" aria-label="تصفح ${escShow(p.name)}"><span class="ys-slide-photo"><img src="${escShow(p.image)}" alt="${escShow(p.name)}" loading="lazy" decoding="async" onerror="this.style.visibility='hidden'"></span><span class="ys-slide-name">${escShow(p.name)}</span><span class="ys-slide-unit">${escShow(p.unit||'')}</span><span class="ys-slide-price">${price} ل.ل</span><span class="ys-slide-cta">تسوّق الآن ←</span></button><button type="button" class="ys-fav-toggle ys-slide-heart" data-fav-id="${escShow(id)}" data-fav-name="${escShow(p.name)}" data-fav-img="${escShow(p.image)}" data-fav-price="${escShow(p.price)}" data-fav-category="${category}" aria-label="أضف للمفضلة">♡</button></article>`;
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

    // المشروبات: نفس بطاقات وحركة البن والقهوة، من بيانات المنتجات الأصلية
    const drinksTrack = document.getElementById('drinksFeaturedTrack');
    if (drinksTrack) {
      const drinks = marketProducts.filter(p => p.category === 'drinks' && p.image && p.name && Number.isFinite(Number(p.price)));
      const openDrinks = (name) => {
        document.querySelector('.category-card[data-category="سوبر ماركت"]')?.click();
        document.querySelector('#marketCategories [data-filter="drinks"]')?.click();
        if (name) {
          const search = document.getElementById('marketProductSearch');
          if (search) {search.value=name;search.dispatchEvent(new Event('input',{bubbles:true}));}
        }
      };
      document.getElementById('drinksViewAll')?.addEventListener('click',()=>openDrinks());
      drinks.forEach((p,index)=>{
        const card=document.createElement('article');card.className='pro-feature-card';
        const picture=document.createElement('div');picture.className='pro-feature-picture';
        const img=document.createElement('img');img.src=p.image;img.alt=p.name.trim();img.width=94;img.height=94;
        img.loading=index<2?'eager':'lazy';img.decoding='async';
        img.onerror=()=>{img.style.display='none';picture.classList.add('image-unavailable')};
        picture.append(img);
        const name=document.createElement('h3');name.textContent=p.name.trim();
        const unit=document.createElement('small');unit.textContent=p.unit||'';
        const price=document.createElement('strong');price.textContent=Number(p.price).toLocaleString('en-US')+' ل.ل';
        const btn=document.createElement('button');btn.type='button';btn.textContent='عرض المنتج';
        btn.setAttribute('aria-label','عرض '+p.name.trim());btn.addEventListener('click',()=>openDrinks(p.name.trim()));
        const meta=document.createElement('div');meta.className='next-price-row';meta.append(price,btn);
        card.append(picture,name,unit,meta);drinksTrack.append(card);
      });
      let paused=false;
      drinksTrack.addEventListener('pointerenter',()=>paused=true);
      drinksTrack.addEventListener('pointerleave',()=>paused=false);
      drinksTrack.addEventListener('touchstart',()=>paused=true,{passive:true});
      drinksTrack.addEventListener('touchend',()=>setTimeout(()=>paused=false,4500),{passive:true});
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && drinks.length>3) setInterval(()=>{
        if(paused||document.hidden||!drinksTrack.offsetWidth)return;
        const step=(drinksTrack.querySelector('.pro-feature-card')?.getBoundingClientRect().width||145)+11;
        const max=drinksTrack.scrollWidth-drinksTrack.clientWidth;
        if(max<20)return;
        const atEnd=Math.abs(drinksTrack.scrollLeft)>=max-step*.4;
        const next=drinksTrack.scrollLeft+(getComputedStyle(drinksTrack).direction==='rtl'?-step:step);
        drinksTrack.scrollTo({left:atEnd?0:next,behavior:'smooth'});
      },4200);
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
          else marketCart.push({ysKey: p.ysKey,id,name:(p.name||'').trim(),price:Number(p.price)||0,priceUndetermined:p.price==null,unit:p.unit||'',image:p.image||'',quantity:1});
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
      currentNeedsEntries = window.YallaRegistry.all().filter(p=>key==='cooking'
 ? ['vegetables','butcher','poultry'].includes(p.group)||(p.group==='market'&&p.category==='spices')
 : p.group==='market'&&(key==='breakfast'?['coffee','Bakery','dairy','drinks']:['food','drinks','Bakery','dairy','spices','Snacks','IceCream']).includes(p.category)).map(p=>({p,source:p.group}));
      renderNeedsProducts();
      needsScreen.hidden=false;home.classList.add('market-open');
      needsScreen.querySelector('.ys-needs-scroll').scrollTop=0;
    }
    window.addEventListener('yalla-catalog-change',()=>{if(!needsScreen.hidden){currentNeedsEntries=currentNeedsEntries.map(e=>({...e,p:window.YallaRegistry.find(e.p.ysKey)})).filter(e=>e.p);renderNeedsProducts();}});
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
const restaurantMenus = {"RAAD Resto Café":{categories:[["sandwiches","السندويشات"],["burgers","البرغر"],["meals","الوجبات"],["pizza","البيتزا"],["sauces","الصوصات"]],items:window.YallaCatalog.filter(p=>p.group==='restaurant0').map(p=>({...p}))}};
window.YallaRegistry.register('restaurant0', restaurantMenus["RAAD Resto Café"].items, 10);;
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
window.addEventListener('yalla-catalog-change',renderRestaurantView);
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
 window.addEventListener('yalla-catalog-change',()=>{for(const [key,x] of Object.entries(favorites)){if(!x.ysKey)continue;const p=window.YallaRegistry.find(x.ysKey);if(!p){delete favorites[key];continue;}x.name=p.name;x.price=p.price;x.image=p.image;}save();});
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
  if(heart){e.preventDefault();e.stopPropagation();const id=heart.dataset.favId;if(favorites[id])delete favorites[id];else favorites[id]={ysKey:(heart.closest('[data-ys-key]')?.dataset.ysKey||window.YallaRegistry.all().find(p=>String(p.id)===heart.closest('[data-product-id]')?.dataset.productId)?.ysKey||window.YallaRegistry.all().find(p=>p.name.trim()===String(heart.dataset.favName||'').trim()&&Number(p.price)===Number(heart.dataset.favPrice))?.ysKey),name:heart.dataset.favName,image:heart.dataset.favImg,price:heart.dataset.favPrice,category:heart.dataset.favCategory};save();return}
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



/* Custom animated storefront — all cards use the existing live product registry. */
(() => {
  'use strict';
  const hosts = {Bakery:document.getElementById('ysDiscoveryBakery'),Purchases:document.getElementById('ysDiscoveryPurchases'),Snacks:document.getElementById('ysDiscoverySnacks')};
  if (!Object.values(hosts).some(Boolean)) return;
  const groups = [
    {key:'Bakery',title:'المخبوزات والإفطار',desc:'طعم طيب لبداية أحلى',theme:'bakery',rows:1},
    {key:'Snacks',title:'المكسرات',desc:'',theme:'nuts',rows:1},
    {key:'Purchases',title:'المقرمشات',desc:'قرمشة على كيفك',theme:'crisps',rows:3}
  ];
  const escapeHTML = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function openCategory(key){
    document.querySelector('#categoriesGrid [data-category="سوبر ماركت"]')?.click();
    document.querySelectorAll('#marketCategories [data-filter]').forEach(b=>{if(b.dataset.filter.toLowerCase()===key.toLowerCase())b.click()});
  }
  function card(p,key){
    const b=document.createElement('button');b.type='button';b.className='fresh-card';
    b.innerHTML=`<span class="fresh-photo"><img loading="lazy" decoding="async" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}"></span><strong>${escapeHTML(p.name)}</strong><span class="fresh-price">${Number(p.price||0).toLocaleString('en-US')} ل.ل</span>`;
    b.addEventListener('click',()=>openCategory(key));return b;
  }
  function render(){
    const reg=window.YallaRegistry;
    if(!reg||typeof reg.all!=='function')return;
    const all=reg.all().filter(p=>p&&p.group==='market'&&p.image);
    Object.values(hosts).forEach(h=>h?.replaceChildren());
    groups.forEach(g=>{
      const items=all.filter(p=>String(p.category||'').toLowerCase()===g.key.toLowerCase());
      if(!items.length)return;
      const section=document.createElement('section');section.className=`fresh-section fresh-${g.theme}`;
      section.innerHTML=(g.theme==='nuts'||g.theme==='crisps'||g.theme==='bakery') ? `<div class="fresh-head"><h3>${g.title}</h3><button class="fresh-all" type="button">عرض الكل ‹</button></div><div class="fresh-content"></div>` : `<div class="fresh-head"><div><span class="fresh-kicker">YALLA SHOP ✦</span><h3>${g.title}</h3><p>${g.desc}</p></div><button class="fresh-all" type="button">عرض الكل ‹</button></div><div class="fresh-content"></div>`;
      section.querySelector('.fresh-all').addEventListener('click',()=>openCategory(g.key));
      const content=section.querySelector('.fresh-content');
      if(g.theme==='bakery'){
        const grid=document.createElement('div');grid.className='fresh-bakery-grid';
        items.slice(0,4).forEach(p=>grid.append(card(p,g.key)));content.append(grid);
      }else{
        for(let r=0;r<g.rows;r++){
          const view=document.createElement('div');view.className='fresh-marquee';view.setAttribute('aria-label',g.title+' - صف '+(r+1));
          const track=document.createElement('div');track.className='fresh-track';
          const row=items.filter((_,i)=>g.rows===1||i%g.rows===r).slice(0,12);
          const selected=row.length?row:items.slice(0,8);
          for(let copy=0;copy<2;copy++)selected.forEach(p=>{const c=card(p,g.key);if(copy){c.tabIndex=-1;c.setAttribute('aria-hidden','true')}track.append(c)});
          view.append(track);content.append(view);
        }
      }
      hosts[g.key]?.append(section);
    });
  }
  let pending;
  function schedule(){clearTimeout(pending);pending=setTimeout(render,100)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{render();setTimeout(render,1000)});
  else{render();setTimeout(render,1000)}
  window.addEventListener('yalla-catalog-change',schedule);
})();

/* Fruit & vegetable circular rail from the existing catalog */
(() => {
  const rail=document.getElementById('ysFruitRail');
  if(!rail)return;
  const open=(category)=>{
    document.querySelector('#categoriesGrid [data-category="خضرة وفواكه"]')?.click();
    if(category){document.querySelector('#vegetablesScreen .vegetables-filter[data-filter="'+category+'"]')?.click()}
  };
  document.getElementById('ysFruitAll')?.addEventListener('click',()=>open());
  const render=()=>{
    const reg=window.YallaRegistry;
    if(!reg||typeof reg.all!=='function')return;
    const products=reg.all().filter(p=>p&&p.group==='vegetables'&&p.image);
    if(!products.length)return;
    rail.replaceChildren();
    const seen=new Set();
    products.filter(p=>{const name=String(p.name||'').trim();if(!name||seen.has(name))return false;seen.add(name);return true}).slice(0,12).forEach(p=>{
      const btn=document.createElement('button');btn.type='button';btn.className='ys-fruit-item';
      const circle=document.createElement('span');circle.className='ys-fruit-image';
      const img=document.createElement('img');img.src=p.image;img.alt=p.name;img.loading='lazy';img.decoding='async';
      const title=document.createElement('strong');title.textContent=p.name;
      circle.append(img);btn.append(circle,title);
      btn.addEventListener('click',()=>open(p.category==='fruit'?'fruit':'vegetable'));
      rail.append(btn);
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{render();setTimeout(render,800)});
  else{render();setTimeout(render,800)}
  window.addEventListener('yalla-catalog-change',render);
})();
