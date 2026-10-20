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
  }, 50);

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

   
    // اختيار قسم وفتح صفحة سوبر ماركت
    const supermarketScreen = document.getElementById("supermarketScreen");

    categoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const category = card.dataset.category;

            if (category === "سوبر ماركت") {
                supermarketScreen.hidden = false;
                home.classList.add("market-open");

                document.getElementById("marketProductsScroll")?.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

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
            document.getElementById("categoriesSection")
                .scrollIntoView({ behavior: "smooth" });
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

        bannerDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentBanner);
        });
    }

    function startBannerSlider() {
        clearInterval(bannerTimer);

        if (bannerImages.length < 2) return;

        bannerTimer = setInterval(() => {
            showBanner(currentBanner + 1);
        }, 4000);
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
            name: "  خبز فاهيتا عيسى   ",
            price: 1.111,
              unit: " ربطة  ",
            category: "Bakery",
            image: "images/Issa.png",
            pictureClass: "milk-picture"
        },
        {
            id: 2,
            name: "حليب لاكتو  ",
            price: 4.6666,
            unit: " 750غ  ",
            category: "dairy",
            image: "images/Lacto milk.png",
            pictureClass: "chips-picture"
        },
        {
            id: 3,
            name: "مرتديلا تغذية بقر  ",
            price: 1.5555 ,
            unit: " 340غ  ",
            category: "food",
            image: "images/Beef Mortadella 340g.png",
            pictureClass: "tomato-picture"
        },
        {
            id: 4,
           name: "حلاوة دعبول سادة  ",
            price: 3.333 ,
            unit: "    800غ ",
            category: "food",
            image: "images/Da'bool Plain Halva 800g.png",
            pictureClass: "banana-picture"
        },
        {
            id: 5,
            name: "فانسي رز مصري      ",
            price: 4.3333 ,
            unit: "    5ك ",
            category: "food",
            image: "images/Fancy Egyptian Rice 5kg.png",
            pictureClass: "eggs-picture"
        },
        {
            id: 6,
            name: "بهار ابيض  ",
            price: 0.666 ,
            unit: "100غ",
            category: "spices",
            image: "images/White Pepper 100g.png",
            pictureClass: "rice-picture"
        },
        {
            id: 7,
            name: "نانا مكسي زهري  ",
            price: 0.7777,
            unit: " مربع*10",
          category: "cleaning",
           image: "images/Nana pink square maxi dress.png",
            pictureClass: "juice-picture"
        },
        {
            id: 8,
            name: "بسكويت كريمة  ",
            price: 1.1,
            unit: "320 غ ",
            category: "Snacks",
             image: "images/Cream biscuits 320g.png",
            pictureClass: "cleaning-picture"
          },
            {
            id: 9,
            name: "قلوبات الرفاعي    ",
            price: 2.5,
            unit: " ",
            category: "Snacks",
             image: "images/Al-Rifai Nuts.png",
            pictureClass: "cleaning-picture"
         },
           {
            id: 10,
            name: "  لوتس بيسكوف     ",
            price: 1.3333,
            unit: " *8",
            category: "Snacks",
             image: "images/Lotus Biscoff.png",
            pictureClass: "cleaning-picture"
         },
             {
            id: 11,
            name: "  تفاح     ",
            price: 1.5555,
            unit: " 1ك",
            category: "Vegetables",
             image: "images/apples.png",
            pictureClass: "cleaning-picture"
         },
             {
            id: 12,
            name: "  معتوق شوفان +ميكس     ",
            price: 	0.666,
            unit: "  ",
            category: "Bakery",
             image: "images/Maatouk Oats + Mix.png",
            pictureClass: "cleaning-picture"
         },
      {
            id: 13,
            name: "  برسيل سوري مسحوق للغسيل    ",
            price: 	8,
            unit: " 5ك ",
            category: "cleaning",
             image: "images/Persil Syrian Laundry Powder 5kg.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 14,
            name: "  برايفت ماكسي    ",
            price: 		0.7777,
            unit: "  *8 ",
            category: "cleaning",
             image: "images/Private Maxi.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 15,
            name: " شاي النحلة    ",
            price: 		10,
            unit: "  1000غ ",
            category: "food",
             image: "images/Bee Tea.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 16,
            name: " زبيب    ",
            price: 		1.1666	 ,
            unit: "   200غ",
            category: "Snacks",
             image: "images/raisins.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 17,
            name: " جوزة الطيب    ",
            price: 		18	 ,
            unit: "  1ك",
            category: "spices",
             image: "images/nutmeg.png",
            pictureClass: "cleaning-picture"
        },
 {
            id: 18,
            name: " غوم وطني      ",
            price: 		3.555	 ,
            unit: "  1ك",
            category: "Snacks",
             image: "images/National Gum.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 19,
            name: " مكاديميا     ",
            price: 		4.444	 ,
            unit: "  500غ ",
            category: "spices",
             image: "images/Macadamia.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 20,
            name: " اوزمو هابي بسكويت     ",
            price: 		0.3333	 ,
            unit: "  37.5غ",
            category: "spices",
             image: "images/Ozmo Happy Biscuits.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 21,
            name: " لبن ليبان ليه     ",
            price: 		2.11	 ,
            unit: " 1ك",
            category: "dairy",
             image: "images/Liban Lait Milk.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 22,
            name: " اكياس تغليف سجاد    ",
            price: 		1.1	 ,
            unit: "  ",
            category: "cleaning",
             image: "images/bags.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 23,
            name: " اجاكس   ",
            price: 		2.2222	 ,
            unit: " 1.25ليتر ",
            category: "cleaning",
             image: "images/Ajax.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 24,
            name: " زيت سليم   ",
            price: 		9.22222	 ,
            unit: "4 ليتر",
            category: "food",
             image: "images/Slim Oil.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 25,
            name: " نسكافيه غولد نجار  ",
            price: 		6.5555	 ,
            unit: " 200غ ",
            category: "food",
             image: "images/Nescafé Gold Najjar.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 26,
            name: " دي يو اكس ",
            price: 		1.9	 ,
            unit: " 150مل",
            category: "cleaning",
             image: "images/AXE.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 27,
            name: " دانيال مع هيل ",
            price: 		7 ,
            unit: " 400غ ",
            category: "food",
             image: "images/Daniel.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 28,
            name: " شامبو برت بلاس",
            price: 		2.5 ,
            unit: "  400مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 29,
            name: " ظرف تورابيكا كابتشينو ",
            price: 		0.222 ,
            unit: "   ",
            category: "food",
             image: "images/Torabica cappuccino.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 30,
            name: " كبش قرنفل حب ",
            price: 		1.8 ,
            unit: " 100غ",
            category: "spices",
             image: "images/Whole Cloves.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 32,
            name: " عبيد حبة كبيرة",
            price: 		3.666 ,
            unit: " 1ك",
            category: "Snacks",
             image: "images/Slaves.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 33,
            name: " قهوة سالي",
            price: 		3.555 ,
            unit: "  400غ",
            category: "food",
             image: "images/Sally.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 34,
            name: "علبة قرقش ",
            price: 	3.444 ,
            unit: "  40 حبة",
            category: "Snacks",
             image: "images/Qarqash Box.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 35,
            name: "تاج بسمتي مع 3علب تونا   ",
            price: 13.5,
            unit: "  4.5ك",
            category: "food",
             image: "images/Taj Basmati.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 36,
            name: "    شفاطة ماجيك مع راس متحرك  ",
            price: 5,
            unit: "  ",
            category: "cleaning",
             image: "images/Magic.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 37,
            name: "    اندومي كاري دجاج ",
            price: 0.277,
            unit: " 75غ ",
            category: "food",
             image: "images/Indomie Chicken Curry.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 38,
            name: "   لوتس *50حبة",
            price: 4.4444,
            unit: " 312غ",
            category: "Snacks",
             image: "images/Lotus 50 units.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 39,
            name: "   مسحوق الغسيل حياة",
            price: 6.8888,
            unit: " 4ك",
            category: "cleaning",
             image: "images/Life washing powder.png",
            pictureClass: "cleaning-picture"
        },
 {
            id: 40,
            name: "  باكمايا خميرة فورية ",
            price: 1,
            unit: " 125غ",
            category: "food",
             image: "images/Pakmaya Instant Yeast.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 41,
            name: "  اكس سمارت سائل يدين  ",
            price: 2.38,
            unit: "   4 ليتر ",
            category: "cleaning",
             image: "images/X-Smart Hand Soap.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 42,
            name: "  لمبة توفيلر ",
            price: 2.5,
            unit: "  40 وات",
            category: "Electrical",
             image: "images/Tofiler bulb.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 43,
            name: "  مرتديلا هنية  ",
            price: 0.833,
            unit: "  340غ",
            category: "food",
             image: "images/Hania Mortadella.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 44,
            name: "  	نسلة نسكويك غوفريت ",
            price: 0.3888,
            unit: "   ",
            category: "Snacks",
             image: "images/Nestlé Nesquik Wafer.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 45,
            name: "  	جبنة حلوة",
            price: 5 ,
            unit: " 1ك  ",
            category: "dairy",
             image: "images/Sweet cheese.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 46,
            name: "  	ربطة خبز ",
            price: 0.9444 ,
            unit: "   ",
            category: "Bakery",
             image: "images/pack of bread.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 47,
            name: "  	زيتون مقطع الجودة ",
            price: 	2.7 ,
            unit: "   1ك ",
            category: "food",
             image: "images/Nestlé Nesquik Wafer.png",
            pictureClass: "cleaning-picture"
          },
        {
            id: 48,
            name: "  	كعك	 ",
            price: 	0.8333 ,
            unit: "    ",
            category: "Bakery",
             image: "images/Ka'ak.png",
            pictureClass: "cleaning-picture"
          },
            {
            id: 49,
            name: "  		بهار حلو ناعم	 ",
            price: 	0.424 ,
            unit: "  25غ  ",
            category: "spices",
             image: "images/Fine allspice.png",
            pictureClass: "cleaning-picture"
         },
         {
            id: 50,
            name: "  	بيغ ام وايفر مغطس مشكل ",
            price: 	0.166 ,
            unit: "    ",
            category: "Snacks",
             image: "images/Big M-Ever.png",
            pictureClass: "cleaning-picture"
         },
       {
            id: 51,
            name: "  	تروبيكانا سلايس",
            price: 1.111 ,
            unit: "  1ليتر ",
            category: "drinks",
             image: "images/Tropicana Slice.png",
            pictureClass: "cleaning-picture"
         },
  {
            id: 52,
            name: " سائل غسيل سانيتا ",
            price: 7 ,
            unit: " 5ك ",
            category: "cleaning",
             image: "images/Sanita washing liquid.png",
            pictureClass: "cleaning-picture"
         },
  {
            id: 53,
            name: " شامبو نورا ",
            price: 2.222 ,
            unit: " 1250 م",
            category: "cleaning",
             image: "images/Nora Shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 54,
            name: " دف ميلكا اوريو",
            price: 0.95 ,
            unit: "  ",
            category: "Snacks",
             image: "images/Milka Oreo bar.png",
            pictureClass: "cleaning-picture"
         },
{
            id: 55,
            name: " مرتديلا سلوى",
            price: 2 ,
            unit: " 800غ ",
            category: "food",
             image: "images/Salwa Mortadella.png",
            pictureClass: "cleaning-picture"
          },
{
            id: 56,
            name: "   كيري    ",
            price: 2 ,
            unit: " 4*2 ",
            category: "dairy",
             image: "images/Karry.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 57,
            name: "   لزيق جرح    ",
            price: 1 ,
            unit: " 100 حبة ",
            category: "cleaning",
             image: "images/Bandages.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 58,
            name: "  بطارية انرجيزر   ",
            price: 0.55 ,
            unit: "  ",
            category: "Electrical",
             image: "images/Energizer Battery.png",
            pictureClass: "cleaning-picture"
        }


    ];

    let activeMarketFilter = "all";
    let marketCart = [];


    // إنشاء بطاقات المنتجات تلقائياً
    function renderMarketProducts() {
        marketProductsGrid.innerHTML = marketProducts.map(product => {
            const picture = product.image
                ? `<img src="${product.image}" alt="${product.name}">`
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
                        <strong>$${product.price.toFixed(2)}</strong>

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

    // عرض السلة
    function showMarketCart() {
        if (marketCart.length === 0) {
            alert("سلّة السوبر ماركت فارغة حالياً.");
            return;
        }

        const lines = marketCart.map(item =>
            `${item.name} × ${item.quantity} — $${(
                item.price * item.quantity
            ).toFixed(2)}`
        );

        const total = marketCart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        alert(
            "محتويات السلة:\n\n" +
            lines.join("\n") +
            "\n\nالمجموع: $" + total.toFixed(2)
        );
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

    // إنشاء المنتجات عند تحميل الصفحة
    renderMarketProducts();


});

// تحريك شريط الأقسام تلقائياً
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("marketCategories");

    if (!slider) return;

    let direction = 1;

    setInterval(function () {

        const maxScroll =
            slider.scrollWidth - slider.clientWidth;

        if (maxScroll <= 0) return;

        slider.scrollLeft += direction * 1;

        if (Math.abs(slider.scrollLeft) >= maxScroll) {
            direction = -1;
        }

        if (slider.scrollLeft === 0) {
            direction = 1;
        }

    }, 50);

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