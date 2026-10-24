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
            image: "images/Thighs.png"
        },

        {
            name: "فخاد  ",
            price: "1000000",
            unit: "5ك",
            image: "images/Thighs.png"
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
            image: "images/Safayen.png"
        },
        {
            name: "  طاووق",
            price: "700000",
            unit: "1ك",
            image: "images/Raw tawook.png"
        },
        {
            name: "سودة  ",
            price: "320000",
            unit: "1ك",
            image: "images/Gizzards.png"
        },
        {
            name: "قوانص  ",
            price: "150000",
            unit: "1ك",
            image: "images/Black-hearted.png"
        },
        {
            name: "فروج كامل   ",
            price: "250000",
            unit: "1ك",
            image: "images/chicken.png"
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
            price: 99990,
              unit: " ربطة  ",
            category: "Bakery",
            image: "images/Issa.png",
            pictureClass: "milk-picture"
        },
        {
            id: 2,
            name: "حليب لاكتو  ",
            price: 419994,
            unit: " 750غ  ",
            category: "dairy",
            image: "images/Lacto milk.png",
            pictureClass: "chips-picture"
        },
        {
            id: 3,
            name: "مرتديلا تغذية بقر  ",
            price: 139995 ,
            unit: " 340غ  ",
            category: "food",
            image: "images/Beef Mortadella 340g.png",
            pictureClass: "tomato-picture"
        },
        {
            id: 4,
           name: "حلاوة دعبول سادة  ",
            price: 299970 ,
            unit: "    800غ ",
            category: "food",
            image: "images/Da'bool Plain Halva 800g.png",
            pictureClass: "banana-picture"
        },
        {
            id: 5,
            name: "فانسي رز مصري      ",
            price: 389997 ,
            unit: "    5ك ",
            category: "food",
            image: "images/Fancy Egyptian Rice 5kg.png",
            pictureClass: "eggs-picture"
        },
        {
            id: 6,
            name: "بهار ابيض  ",
            price: 59940 ,
            unit: "100غ",
            category: "spices",
            image: "images/White Pepper 100g.png",
            pictureClass: "rice-picture"
        },
        {
            id: 7,
            name: "نانا مكسي زهري  ",
            price: 69993,
            unit: " مربع*10",
          category: "cleaning",
           image: "images/Nana pink square maxi dress.png",
            pictureClass: "juice-picture"
        },
        {
            id: 8,
            name: "بسكويت كريمة  ",
            price: 99000,
            unit: "320 غ ",
            category: "Snacks",
             image: "images/Cream biscuits 320g.png",
            pictureClass: "cleaning-picture"
          },
            {
            id: 9,
            name: "قلوبات الرفاعي    ",
            price: 225000,
            unit: " ",
            category: "Snacks",
             image: "images/Al-Rifai Nuts.png",
            pictureClass: "cleaning-picture"
         },
           {
            id: 10,
            name: "  لوتس بيسكوف     ",
            price: 119997,
            unit: " *8",
            category: "Snacks",
             image: "images/Lotus Biscoff.png",
            pictureClass: "cleaning-picture"
         },

             {
            id: 12,
            name: "  معتوق شوفان +ميكس     ",
            price: 	59940,
            unit: "  ",
            category: "food",
             image: "images/Maatouk Oats + Mix.png",
            pictureClass: "cleaning-picture"
         },
      {
            id: 13,
            name: "  برسيل سوري مسحوق للغسيل    ",
            price: 	720000,
            unit: " 5ك ",
            category: "cleaning",
             image: "images/Persil Syrian Laundry Powder 5kg.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 14,
            name: "  برايفت ماكسي    ",
            price: 		69993,
            unit: "  *8 ",
            category: "cleaning",
             image: "images/Private Maxi.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 15,
            name: " شاي النحلة    ",
            price: 		900000,
            unit: "  1000غ ",
            category: "food",
             image: "images/Bee Tea.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 16,
            name: " زبيب    ",
            price: 		104994	 ,
            unit: "   200غ",
            category: "Snacks",
             image: "images/raisins.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 17,
            name: " جوزة الطيب    ",
            price: 		1620000	 ,
            unit: "  1ك",
            category: "spices",
             image: "images/nutmeg.png",
            pictureClass: "cleaning-picture"
        },
 {
            id: 18,
            name: " غوم وطني      ",
            price: 		319950	 ,
            unit: "  1ك",
            category: "Snacks",
             image: "images/National Gum.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 19,
            name: " مكاديميا     ",
            price: 		399960	 ,
            unit: "  500غ ",
            category: "spices",
             image: "images/Macadamia.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 20,
            name: " اوزمو هابي بسكويت     ",
            price: 		29997	 ,
            unit: "  37.5غ",
            category: "Snacks",
             image: "images/Ozmo Happy Biscuits.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 21,
            name: " لبن ليبان ليه     ",
            price: 		189900	 ,
            unit: " 1ك",
            category: "dairy",
             image: "images/Liban Lait Milk.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 22,
            name: " اكياس تغليف سجاد    ",
            price: 		99000	 ,
            unit: "  ",
            category: "cleaning",
             image: "images/bags.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 23,
            name: " اجاكس   ",
            price: 		199998	 ,
            unit: " 1.25ليتر ",
            category: "cleaning",
             image: "images/Ajax.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 24,
            name: " زيت سليم   ",
            price: 		830000	 ,
            unit: "4 ليتر",
            category: "food",
             image: "images/Slim Oil.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 25,
            name: " نسكافيه غولد نجار  ",
            price: 		589995	 ,
            unit: " 200غ ",
            category: "food",
             image: "images/Nescafé Gold Najjar.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 26,
            name: " دي يو اكس ",
            price: 		171000	 ,
            unit: " 150مل",
            category: "cleaning",
             image: "images/AXE.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 27,
            name: " دانيال مع هيل ",
            price: 		630000 ,
            unit: " 400غ ",
            category: "food",
             image: "images/Daniel.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 28,
            name: " شامبو برت بلاس",
            price: 		225000 ,
            unit: "  400مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 29,
            name: " ظرف تورابيكا كابتشينو ",
            price: 		19980 ,
            unit: "   ",
            category: "food",
             image: "images/Torabica cappuccino.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 30,
            name: " كبش قرنفل حب ",
            price: 		162000 ,
            unit: " 100غ",
            category: "spices",
             image: "images/Whole Cloves.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 32,
            name: " عبيد حبة كبيرة",
            price: 		329940 ,
            unit: " 1ك",
            category: "Snacks",
             image: "images/Slaves.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 33,
            name: " قهوة سالي",
            price: 		319950 ,
            unit: "  400غ",
            category: "food",
             image: "images/Sally.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 34,
            name: "علبة قرقش ",
            price: 	309960 ,
            unit: "  40 حبة",
            category: "Snacks",
             image: "images/Qarqash Box.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 35,
            name: "تاج بسمتي مع 3علب تونا   ",
            price: 1215000,
            unit: "  4.5ك",
            category: "food",
             image: "images/Taj Basmati.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 36,
            name: "    شفاطة ماجيك مع راس متحرك  ",
            price: 450000,
            unit: "  ",
            category: "cleaning",
             image: "images/Magic.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 37,
            name: "    اندومي كاري دجاج ",
            price: 24930,
            unit: " 75غ ",
            category: "food",
             image: "images/Indomie Chicken Curry.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 38,
            name: "   لوتس *50حبة",
            price: 399996,
            unit: " 312غ",
            category: "Snacks",
             image: "images/Lotus 50 units.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 39,
            name: "   مسحوق الغسيل حياة",
            price: 619992,
            unit: " 4ك",
            category: "cleaning",
             image: "images/Life washing powder.png",
            pictureClass: "cleaning-picture"
        },
 {
            id: 40,
            name: "  باكمايا خميرة فورية ",
            price: 90000,
            unit: " 125غ",
            category: "food",
             image: "images/Pakmaya Instant Yeast.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 41,
            name: "  اكس سمارت سائل يدين  ",
            price: 214200,
            unit: "   4 ليتر ",
            category: "cleaning",
             image: "images/X-Smart Hand Soap.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 42,
            name: "  لمبة توفيلر ",
            price: 225000,
            unit: "  40 وات",
            category: "Electrical",
             image: "images/Tofiler bulb.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 43,
            name: "  مرتديلا هنية  ",
            price: 74970,
            unit: "  340غ",
            category: "food",
             image: "images/Hania Mortadella.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 44,
            name: "  	نسلة نسكويك غوفريت ",
            price: 34992,
            unit: "   ",
            category: "Snacks",
             image: "images/Nestlé Nesquik Wafer.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 45,
            name: "  	جبنة حلوة",
            price: 450000 ,
            unit: " 1ك  ",
            category: "dairy",
             image: "images/Sweet cheese.png",
            pictureClass: "cleaning-picture"
          },
 {
            id: 46,
            name: "  	ربطة خبز ",
            price: 84996 ,
            unit: "   ",
            category: "Bakery",
             image: "images/pack of bread.png",
            pictureClass: "cleaning-picture"
         },
 {
            id: 47,
            name: "  	زيتون مقطع الجودة ",
            price: 	243000 ,
            unit: "   1ك ",
            category: "food",
             image: "images/Nestlé Nesquik Wafer.png",
            pictureClass: "cleaning-picture"
          },
        {
            id: 48,
            name: "  	كعك	 ",
            price: 	74997 ,
            unit: "    ",
            category: "Bakery",
             image: "images/Ka'ak.png",
            pictureClass: "cleaning-picture"
          },
            {
            id: 49,
            name: "  		بهار حلو ناعم	 ",
            price: 	38160 ,
            unit: "  25غ  ",
            category: "spices",
             image: "images/Fine allspice.png",
            pictureClass: "cleaning-picture"
         },
         {
            id: 50,
            name: "  	بيغ ام وايفر مغطس مشكل ",
            price: 	14940 ,
            unit: "    ",
            category: "Snacks",
             image: "images/Big M-Ever.png",
            pictureClass: "cleaning-picture"
         },
       {
            id: 51,
            name: "  	تروبيكانا سلايس",
            price: 99990 ,
            unit: "  1ليتر ",
            category: "drinks",
             image: "images/Tropicana Slice.png",
            pictureClass: "cleaning-picture"
         },
  {
            id: 52,
            name: " سائل غسيل سانيتا ",
            price: 630000 ,
            unit: " 5ك ",
            category: "cleaning",
             image: "images/Sanita washing liquid.png",
            pictureClass: "cleaning-picture"
         },
  {
            id: 53,
            name: " شامبو نورا ",
            price: 199980 ,
            unit: " 1250 م",
            category: "cleaning",
             image: "images/Nora Shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 54,
            name: " دف ميلكا اوريو",
            price: 85500 ,
            unit: "  ",
            category: "Snacks",
             image: "images/Milka Oreo bar.png",
            pictureClass: "cleaning-picture"
         },
{
            id: 55,
            name: " مرتديلا سلوى",
            price: 180000 ,
            unit: " 800غ ",
            category: "food",
             image: "images/Salwa Mortadella.png",
            pictureClass: "cleaning-picture"
          },
{
            id: 56,
            name: "   كيري    ",
            price: 180000 ,
            unit: " 4*2 ",
            category: "dairy",
             image: "images/Karry.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 57,
            name: "   لزيق جرح    ",
            price: 90000 ,
            unit: " 100 حبة ",
            category: "cleaning",
             image: "images/Bandages.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 59,
            name: "  بطارية انرجيزر   ",
            price: 49500 ,
            unit: "  ",
            category: "Electrical",
             image: "images/Energizer Battery.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 60,
            name: "  ديمة سوفتي  ",
            price: 34999 ,
            unit: "  ",
            category: "Snacks",
             image: "images/Dima Softi.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 61,
            name: "  جبنة بريزيدون  ",
            price: 132300 ,
            unit: " *16 ",
            category: "dairy",
             image: "images/President Cheese.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 62,
            name: "  	بوظة السلطان  ",
            price: 360000 ,
            unit: " 1ك ",
            category: "IceCream",
             image: "images/Sultan Ice Cream.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 63,
            name: "  	قداحة ضو  ",
            price:	19980 ,
            unit: "  ",
            category: "Electrical",
             image: "images/Lighter.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 64,
            name: "  اكياس نفايات اسود بيرلا  ",
            price: 149994 ,
            unit: " 20* ",
            category: "cleaning",
             image: "images/Perla Black.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 65,
            name: "  جنرال معطر حمامات  ",
            price: 157500 ,
            unit: "  2+1 ",
            category: "cleaning",
             image: "images/General Bathroom.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 66,
            name: " لمبة برم ",
            price: 180000 ,
            unit: "   30 W ",
            category: "Electrical",
             image: "images/LED Bulb 30W.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 67,
            name: "  ذرة  ",
            price: 343980 ,
            unit: "  2500غ ",
            category: "food",
             image: "images/Corn1.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 68,
            name: "   قرقش شوكولا ",
            price: 259920 ,
            unit: "  علبة ",
            category: "food",
             image: "images/Qarqash Chocolate.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 69,
            name: "  انفنتي سائل غسيل ",
            price: 360000 ,
            unit: "   3 لتر ",
            category: "cleaning",
             image: "images/Infinity Laundry Detergent.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 70,
            name: "  وايف اب ",
            price: 39960 ,
            unit: " 40غ ",
            category: "Snacks",
             image: "images/Wipe Up.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 71,
            name: "  	شوال طحين ",
            price:1980000 ,
            unit: "  50ك ",
            category: "food",
             image: "images/Flour.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 72,
            name: "  	مكنة حلاقة بيك نسائي",
            price:	135000,
            unit: "  5+1",
            category: "cleaning",
             image: "images/Women’s Razor.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 73,
            name: "  	قضامة فلت ",
            price: 58500 ,
            unit: "  200 غ",
            category: "Snacks",
             image: "images/Chickpeas.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 74,
            name: "  فلقة مياه نسلة",
            price: 169992 ,
            unit: "  0.33 لتر  ",
            category: "drinks",
             image: "images/Nestlé Pure.png",
            pictureClass: "cleaning-picture"
        },
         {
            id: 75,
            name: "  منتوس اي سي علكة ",
            price: 45000 ,
            unit: "  *8 ",
            category: "Snacks",
             image: "images/Mentos Ice Gum.png",
            pictureClass: "cleaning-picture"
        },
       {
            id: 76,
            name: "  بازيلا مع جزر ",
            price: 159300 ,
            unit: "  400 غ ",
            category: "Snacks",
             image: "images/Peas with carrots.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 77,
            name: "  بلاك غولد سمن نباتي ممتاز",
            price: 139500 ,
            unit: "  700مل",
            category: "food",
             image: "images/Black Gold.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 78,
            name: "  كيك اولكر ",
            price: 119970 ,
            unit: "  160غ",
            category: "Snacks",
             image: "images/Ülker Cake.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 79,
            name: "  عصير ريندا ",
            price: 79992 ,
            unit: "  1.25ليتر",
            category: "drinks",
             image: "images/Rinda Juice.png",
            pictureClass: "cleaning-picture"
        },
    
        {
            id: 80,
            name: "  فرشاة اسنان اطفال ",
            price: 81000 ,
            unit: "   ",
            category: "cleaning",
             image: "images/Children's toothbrush.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 81,
            name: "  بيتزوللو لازانيا ",
            price: 169992 ,
            unit: "   ",
            category: "food",
             image: "images/Pizzallo lasagna.png",
            pictureClass: "cleaning-picture"
        },

    {
            id: 76,
            name: "  نسكافيه ماتينال	 ",
            price: 569970 ,
            unit: "  200 غ ",
            category: "food",
             image: "images/Nescafé Matinal.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 77,
            name: "  مايونيز تركي",
            price: 109800 ,
            unit: "  550غ",
            category: "dairy",
             image: "images/Turkish Mayonnaise.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 78,
            name: "  صابون بالموليف ",
            price: 59994 ,
            unit: "  90غ",
            category: "cleaning",
             image: "images/Palmolive Soap.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 79,
            name: "  كولونيا ",
            price: 119970 ,
            unit: "  125مل",
            category: "cleaning",
             image: "images/Cologne.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 80,
            name: "  خبز تنور مرقوق ",
            price: 49950 ,
            unit: "   ",
            category: "Bakery",
             image: "images/tandoor bread.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 81,
            name: "  سامون	",
            price: 74997 ,
            unit: "   ",
            category: "Bakery",
             image: "images/Samoun.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 82,
            name: "  ذرة ديروني 	",
            price: 114993 ,
            unit: "  340غ ",
            category: "food",
             image: "images/Corn.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 83,
            name: "  صلصة البندورة يوردوم	",
            price: 180000 ,
            unit: "  830غ",
            category: "food",
             image: "images/Yurdum Tomato.png",
            pictureClass: "cleaning-picture"
        },
       {
            id: 84,
            name: "  شامبو اكس سمارت  ",
            price: 157500 ,
            unit: "  750 مل ",
            category: "cleaning",
             image: "images/X-Smart Shampoo.png",
            pictureClass: "cleaning-picture"
        },
           {
            id: 85,
            name: "  كاتشاب اكسترا  عصارة ",
            price: 189999 ,
            unit: "  800غ",
            category: "food",
             image: "images/Extra Ketchup.png",
            pictureClass: "cleaning-picture"
        },
               {
            id: 85,
            name: "  شامبو برت بلاس",
            price:	289998 ,
            unit: " 600مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 86,
            name: "  شامبو برت بلاس",
            price:	289998 ,
            unit: " 600مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 87,
            name: " فانيليا دومو ",
            price:	69993 ,
            unit: " 28 غ تنك",
            category: "food",
             image: "images/Domo Vanilla.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 88,
            name: " لمبة  ",
            price:	99000 ,
            unit: "  13 واط ",
            category: "Electrical",
             image: "images/13W Light Bulb.png",
            pictureClass: "cleaning-picture"
        },
      {
            id: 89,
            name: " بونبون مينت  ",
            price:	14940 ,
            unit: "   ",
            category: "Snacks",
             image: "images/Mint Bonbon.png",
            pictureClass: "cleaning-picture"
        },
      {
            id: 90,
            name: " 	شاي ليبتون ",
            price:	249999 ,
            unit: " 100ظرف  ",
            category: "food",
             image: "images/Lipton Tea.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 91,
            name: " 	برايفت ماكسي بوكيت   ",
            price:  78750,
            unit: "  *8 ",
            category: "cleaning",
             image: "images/Private Maxi.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 92,
            name: " السفير محارم  ",
            price:  31500,
            unit: " 100غ",
            category: "cleaning",
             image: "images/Safeer Tissues.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 93,
            name: " ريماس محاشي ",
            price:  19980 ,
            unit: " 40غ",
            category: "Snacks",
             image: "images/Rimas.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 94,
            name: " سميدس ",
            price:  630000 ,
            unit: " 900غ",
            category: "dairy",
             image: "images/Smedes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 95,
            name: " خبز مرقوق ",
            price:  79920 ,
            unit: "  ",
            category: "Bakery",
             image: "images/Markook bread.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 96,
            name: " 	كومفورت منعم للملابس",
            price:  349992,
            unit: " 2 ليتر ",
            category: "cleaning",
             image: "images/Comfort Fabric.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 97,
            name: " 	كراكي مالح ",
            price:  29970 ,
            unit: " 2 ليتر ",
            category: "Snacks",
             image: "images/Salty Crackers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 98,
            name: " 	شعيرية راميتو ",
            price:  112500 ,
            unit: "  750غ",
            category: "food",
             image: "images/Ramito vermicelli.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 99,
            name: " 	كادبري  ",
            price:  441000 ,
            unit: "  500غ ",
            category: "Snacks",
             image: "images/Cadbury.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 100,
            name: " 		سائل جلي كرمل   ",
            price:  109620 ,
            unit: "  1100مل",
            category: "Snacks",
             image: "images/Karmel.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 101,
            name: " برغل ابيض طراد  ",
            price:  385830 ,
            unit: "  5ك",
            category: "food",
             image: "images/White Bulgur.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 102,
            name: " قداحة خفيف ",
            price: 14940 ,
            unit: "   ",
            category: "Electrical",
             image: "images/Lighter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 103,
            name: " دونات كريسبي",
            price: 59994 ,
            unit: "   ",
            category: "Snacks",
             image: "images/Krispy Donut.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 104,
            name: " مكنسة نايلون خشنة ",
            price: 109998 ,
            unit: "   ",
            category: "cleaning",
             image: "images/Coarse Nylon Broom.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 105,
            name: " سيف مقطع ",
            price: 40500 ,
            unit: "  *12 ",
            category: "cleaning",
             image: "images/Scouring Pad.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 106,
            name: " 	ظرف حليب ديليش",
            price: 	15750 ,
            unit: "    ",
            category: "dairy",
             image: "images/Delish Milk Sachet.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 107,
            name: " 	مايونيز جيرسي ",
            price: 	585000 ,
            unit: "  3.785ليتر  ",
            category: "dairy",
             image: "images/Jersey Mayonnaise.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 108,
            name: " 	البني رول",
            price: 	69993 ,
            unit: "    ",
            category: "Snacks",
             image: "images/Al-Bani.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 109,
            name: " 	 فيتال اكياس تفريز سحاب",
            price: 81000 ,
            unit: "   *18  ",
            category: "cleaning",
             image: "images/Freezing.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 110,
            name: " 	 صابون تي شو+ديتول غالون",
            price:202500 ,
            unit: "   4 ليتر  ",
            category: "cleaning",
             image: "images/T-Show + Dettol Soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 111,
            name: " 	دبي بوظة كويين",
            price: 119970 ,
            unit: "      ",
            category: "IceCream",
             image: "images/Dubai Queen Ice Cream.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 112,
            name: " 	جبنة موزيريلا بوك	 ",
            price: 1099980 ,
            unit: "   1800غ ",
            category: "dairy",
             image: "images/Puck Mozzarella Cheese.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 113,
            name: " 	 شطة",
            price: 180000 ,
            unit: "   800غ  ",
            category: "food",
             image: "images/Freezing.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 114,
            name: " 	 مستر جوسي ",
            price: 79920 ,
            unit: "  1 ليتر ",
            category: "drinks",
             image: "images/Mr. Juicy.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 115,
            name: " 	 بيض كبير",
            price: 219960,
            unit: "    ",
            category: "food",
             image: "images/Large Eggs.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 116,
            name: " 	  خردل ميا ",
            price: 90000 ,
            unit: "  260 غ",
            category: "food",
             image: "images/Mustard.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 117,
            name: " نيو بارك جبنة مطبوخة ",
            price: 139950 ,
            unit: " 300 غ",
            category: "dairy",
             image: "images/New Park.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 118,
            name: " مالتيزرس ",
            price: 90000 ,
            unit: " 37غ",
            category: "Snacks",
             image: "images/Maltesers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 119,
            name: " بهار فاهيتا ",
            price: 79920 ,
            unit: " 100 غ",
            category: "spices",
             image: "images/Fajita Seasoning.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 120,
            name: " شامبو السادا ",
            price: 239994,
            unit: " 750مل",
            category: "cleaning",
             image: "images/Al-Sada.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 121,
            name: " بيغ ام ميغا  بندق  ",
            price: 15750,
            unit: "  ",
            category: "Snacks",
             image: "images/Big M.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 122,
            name: " 	صندوق معتوق ساندويش كريمة ",
            price: 427500,
            unit: "  ",
            category: "Snacks",
             image: "images/Maatouk Cream.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 123,
            name: " 	حلاوة سرور",
            price: 405000,
            unit: " 1ك ",
            category: "food",
             image: "images/Surour Halawa.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 124,
            name: " 	وانتد بوبس كارمل",
            price: 24930,
            unit: "  28غ",
            category: "Snacks",
            image: "images/Wanted.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 125,
            name: " 	قرقش	",
            price: 39960,
            unit: "   ",
            category: "Snacks",
            image: "images/Qarqash.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 126,
            name: " 	منتوس رول	",
            price: 36000 ,
            unit: "   ",
            category: "Snacks",
            image: "images/Mentos Roll.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 127,
            name: " 	صندوق مستر جوسي   ",
            price: 429993 ,
            unit: " *30	  ",
            category: "drinks",
            image: "images/Mr. Juicy (Box.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 128,
            name: " 	اسطنبولي بلدي  ",
            price: 450000 ,
            unit: " *1ك	  ",
            category: "food",
            image: "images/Istanbuli Baladi.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 129,
            name: " 	اوسلو كيك ريد لوف  ",
            price: 20700 ,
            unit: "    ",
            category: "Snacks",
            image: "images/Oslo Red Love Cake.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 130,
            name: " 	معالق بلاستيك ",
            price: 59994 ,
            unit: "  *50  ",
            category: "cleaning",
            image: "images/Plastic Spoons.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 131,
            name: " 	ام اند ام ",
            price: 69993 ,
            unit: "     ",
            category: "Snacks",
            image: "images/M&M's.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 132,
            name: " 	مرتديلا الراعي ",
            price: 124992 ,
            unit: "   200غ   ",
            category: "food",
            image: "images/Al-Ra'i Mortadella.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 133,
            name: " 	يانسون ناعم",
            price: 38160 ,
            unit: "      ",
            category: "spices",
            image: "images/Fennel (Ground or Coarse).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 134,
            name: " 	براوني كيك هازلنت  ",
            price: 59994 ,
            unit: "   40غ   ",
            category: "Snacks",
            image: "images/Hazelnut Brownie Cake.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 135,
            name: " 	 لوز مدخن الرئيف ",
            price: 	34920 ,
            unit: "      ",
            category: "Snacks",
            image: "images/Al-Ra'if Smoked Almonds.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 136,
            name: " 	زيت انجي ",
            price: 	679950 ,
            unit: "    5 ليتر  ",
            category: "food",
            image: "images/Inji Oil.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 137,
            name: " 	مصاصة تشوبا تشوبس ",
            price: 	9540 ,
            unit: "      ",
            category: "Snacks",
            image: "images/Chupa Chups Lollipop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 138,
            name: " 	توست محمص شمسين",
            price: 	108000 ,
            unit: "      ",
            category: "Bakery",
            image: "images/Shamsin Toasted Bread (Toast).png",
            pictureClass: "cleaning-picture"
        },

{
             id: 139,
            name: " 	شومر ناعم او خشن",
            price: 	59940 ,
            unit: "   100غ   ",
            category: "spices",
            image: "images/Fennel (Ground or Coarse).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 140,
            name: " 	تمر خضري عادي ",
            price: 	99900 ,
            unit: "  400غ  ",
            category: "food",
            image: "images/Regular Khodri Dates.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 141,
            name: " 	  سكر  لوباس ",
            price: 	409950 ,
            unit: "  5ك ",
            category: "food",
            image: "images/Lubas sugar (5 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 142,
            name: " 	 زعتر اسرتي",
            price: 	189000 ,
            unit: "  1ك",
            category: "food",
            image: "images/Usrati Thyme (Za'atar).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 143,
            name: " 	 سكر نبات الجودة  ",
            price: 	99900 ,
            unit: "  200 غ ",
            category: "food",
            image: "images/nabat sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 144,
            name: " 	 مرطبان زجاج ",
            price: 39996 ,
            unit: "  1ك",
            category: "food",
            image: "images/Glass Jar (1 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 145,
            name: " 	سكر ناعم الفيحاء ",
            price: 90000 ,
            unit: "  900غ ",
            category: "food",
            image: "images/Al-Fayhaa Fine Sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 146,
            name: " 	هيستيريا شوكولا",
            price: 	19980 ,
            unit: "   ",
            category: "Snacks",
            image: "images/Hysteria Chocolate.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 147,
            name: " 	رز مصري زين ",
            price: 399960 ,
            unit: "  5ك",
            category: "food",
            image: "images/Zein Egyptian Rice (5 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 148,
            name: " 	 ظرف عصير دارينا",
            price: 19980 ,
            unit: "   ",
            category: "drinks",
            image: "images/Darina Juice Sachet.png",
            pictureClass: "cleaning-picture"
        },

{
             id: 149,
            name: "  	صابون جيف يدين  ",
            price: 24993 ,
            unit: "  76غ ",
            category: "cleaning",
            image: "images/Cif Hand Soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 150,
            name: "  	الفيف  دريم لونغ ",
            price:349992,
            unit: "  400 مل",
            category: "cleaning",
            image: "images/Elvive Dream Long.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 151,
            name: "  	كيس بالون ",
            price:99990,
            unit: "  *100",
            category: "cleaning",
            image: "images/Bag of balloons.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 152,
            name: "  		فرشاة اسنان اورال ب سوفت",
            price:49995,
            unit: "   ",
            category: "cleaning",
            image: "images/Oral-B Soft Toothbrush.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 153,
            name: "  بالون مصران",
            price:49950,
            unit: "   ",
            category: "cleaning",
            image: "images/Balloon  erpentine).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 154,
            name: "  تمر خضري فلت",
            price:239994,
            unit: "  1ك ",
            category: "food",
            image: "images/Khudri Dates (loose).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 155,
            name: "  زيت الوردة دوار ",
            price:519930,
            unit: "  5 ليتر",
            category: "food",
            image: "images/Al-Warda Sunflower Oil.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 156,
            name: "  كعك اكسترا ريداني ",
            price:189990,
            unit: "  800غ ",
            category: "Bakery",
            image: "images/Extra Ridani Cakes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 157,
            name: " علبةاولكر بيسكريم ",
            price:855000,
            unit: "  *18 ",
            category: "Snacks",
            image: "images/Ülker Bisrem Box.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 158,
            name: "  البني بار كيك",
            price:59994,
            unit: "    ",
            category: "Snacks",
            image: "images/Al-Bani.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 159,
            name: "  برينس ",
            price:74970,
            unit: " 80غ   ",
            category: "Snacks",
            image: "images/Prince.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 160,
            name: "  اوزمو فان ",
            price:60750,
            unit: "    ",
            category: "Snacks",
            image: "images/Osmo Fan.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 161,
            name: "  عجينة بصمة",
            price:244998,
            unit: "  800غ  ",
            category: "Bakery",
            image: "images/Basma Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 162,
            name: "  عجينة الاوزي فوزي",
            price:117999,
            unit: "    ",
            category: "Bakery",
            image: "images/Fawzi Ouzi Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 163,
            name: " شيش برك فوزي",
            price:126000,
            unit: "    ",
            category: "Bakery",
            image: "images/Fawzi Shish Barak.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 164,
            name: " 	التاج شطة حارة",
            price:45000,
            unit: "    ",
            category: "food",
            image: "images/Al-Taj Hot Sauce.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 165,
            name: " 	اوريو",
            price:74970,
            unit: "   102غ	  ",
            category: "Snacks",
            image: "images/Oreo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 166,
            name: " 	عجينة بيتزا فوزي",
            price:153999,
            unit: "     ",
            category: "Bakery",
            image: "images/Fawzi Pizza Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 167,
            name: " 	رقائق طويلة",
            price:180000,
            unit: "     ",
            category: "Bakery",
            image: "images/Long Chips.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 168,
            name: " 	رقائق لف",
            price:135000	,
            unit: "     ",
            category: "Bakery",
            image: "images/Wrappers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 169,
            name: " 	شوربة ماجي ",
            price:180000	,
            unit: "  عرض   ",
            category: "food",
            image: "images/Maggi Soup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 170,
            name: " 	لوح داماك",
            price:74970	,
            unit: "     ",
            category: "Snacks",
            image: "images/Damac Board.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 171,
            name: " 	بهار مغربية ",
            price:59940	,
            unit: "  100   ",
            category: "spices",
            image: "images/Morocco.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 172,
            name: " 		محارم معطرة غود لايف",
            price:74970		,
            unit: "      ",
            category: "cleaning",
            image: "images/Morocco.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 173,
            name: " 			موزوريلا فرسانا ",
            price: 114930	,
            unit: "  200غ    ",
            category: "dairy",
            image: "images/Farsana Mozzarella.png",
            pictureClass: "cleaning-picture"
        },
                    {
             id: 174,
            name: " ديروني خردل",
            price: 148500	,
            unit: "   8 اونز   ",
            category: "food",
            image: "images/Deroni Mustard 8 oz.png",
            pictureClass: "cleaning-picture"
        },
                            {
             id: 175,
            name: "  ديروني رز ايطالي جامبو  ",
            price:180000	,
            unit: "   900غ  ",
            category: "food",
            image: "images/Deroni Italian Rice (Jumbo).png",
            pictureClass: "cleaning-picture"
        },
                                    {
             id: 176,
            name: "  عكاوي بلدي ",
            price:699993	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Baladi Akawi Cheese.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 177,
            name: "  جبنة فيتا",
            price:349920	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Feta Cheese.png",
            pictureClass: "cleaning-picture"
        },
          {
             id: 178,
            name: "  جبنة نابلسي",
            price:540000	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Nabulsi Cheese.png",
            pictureClass: "cleaning-picture"
        },
                  {
             id: 179,
            name: " 	جبنة مسنرة",
            price:324990	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Musanara Cheese.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 180,
            name: " 	 زيتون بلدي ",
            price:299970	,
            unit: "  1ك ",
            category: "food",
            image: "images/Local Olives.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 181,
            name: " 	مكنة حلاقة فينيس",
            price:180000	,
            unit: "  1ك ",
            category: "cleaning",
            image: "images/Venus Razor.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 182,
            name: " 	 مكدوس مرطبان",
            price:	289980	,
            unit: "  ",
            category: "food",
            image: "images/Makdous (jar).png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 183,
            name: " 	ملح ملوك",
            price:	9990	,
            unit: " 700غ ",
            category: "food",
            image: "images/Kings Salt.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 184,
            name: " 	سميد سفرتي",
            price:	84960	,
            unit: "  ",
            category: "food",
            image: "images/Safrati Semolina.png",
            pictureClass: "cleaning-picture"
        },
                    {
             id: 185,
            name: " 	كيك سابليه ",
            price:	19980	,
            unit: "  ",
            category: "Snacks",
            image: "images/Sablé Cake.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 186,
            name: " 	زي كولا",
            price:	29970	,
            unit: " 250 مل ",
            category: "drinks",
            image: "images/Z-Cola.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 187,
            name: "  بن حموي اكسترا هال",
            price:	959994	,
            unit: " 450غ",
            category: "food",
            image: "images/Bin Hamwi Extra Hall.png",
            pictureClass: "cleaning-picture"
        },
           {
             id: 188,
            name: "  	لازانيا ريجيا ",
            price:	229950	,
            unit: " ",
            category: "food",
            image: "images/Lasagna Reggia.png",
            pictureClass: "cleaning-picture"
        },
                   {
             id: 189,
            name: "  		المراعي جبنة مطبوخة",
            price:	260100	,
            unit: " 1ك ",
            category: "dairy",
            image: "images/Almarai Processed Cheese.png",
            pictureClass: "cleaning-picture"
        },
                          {
             id: 190,
            name: "  		 حليب كانديا نصف دسم ",
            price:	164997		,
            unit: " 1ليتر",
            category: "dairy",
            image: "images/Candia Semi-Skimmed.png",
            pictureClass: "cleaning-picture"
        },
                    {
             id: 191,
            name: " فاتيكا شامبو",
            price:199998		,
            unit: " 400+132مل",
            category: "cleaning",
            image: "images/Vatika Shampoo 400+132ml.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 192,
            name: " دوف غو فريش ",
            price:211500		,
            unit: "  ",
            category: "cleaning",
            image: "images/Dove Go Fresh.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 193,
            name: " دوف غو فريش ",
            price:439999		,
            unit: "  900غ ",
            category: "food",
            image: "images/Al-Qalaa’jiya Tahini.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 194,
            name: " فول شتورة لاند ",
            price:37800		,
            unit: "   400 غ",
            category: "food",
            image: "images/Shtoura Land Fava.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 195,
            name: "  كوفري ميلكا ",
            price:16020,
            unit: "    ",
            category: "Snacks",
            image: "images/Milka Bar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 196,
            name: "   دير عمار دارك كبير   ",
            price:19998,
            unit: "    ",
            category: "Snacks",
            image: "images/Deir Ammar Dark Chocolate.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 197,
            name: "   	مياه نستلة كبير  ",
            price:	39996,
            unit: "    2ليتر  ",
            category: "drinks",
            image: "images/Nestlé Water (Large).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 198,
            name: "   	شعيرية بيليلا مكسر ",
            price:	45000,
            unit: "     500غ ",
            category: "food",
            image: "images/Belila Broken Vermicelli 500g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 199,
            name: "    تونا بلان سوليه",
            price:	135000,
            unit: "     ",
            category: "food",
            image: "images/Plein Soleil Tuna.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 200,
            name: "   حمص مطحون شتورة لاند ",
            price:	49950,
            unit: "   380 غ   ",
            category: "food",
            image: "images/Shtoura Land Ground Chickpeas 380g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 201,
            name: "   سكر ديروني ",
            price:	74997	,
            unit: "  900غ  ",
            category: "food",
            image: "images/Derouni Sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 202,
            name: "  	ابو راشد بسمتي ",
            price:		169992	,
            unit: "   800 غ ",
            category: "food",
            image: "images/Abu Rashid Basmati.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 203,
            name: "  		تيك فايف تيفاني",
            price:	14999,
            unit: "    ",
            category: "Snacks",
            image: "images/Tiffany Take Five.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 204,
            name: "   كعك مطحون",
            price:	69930,
            unit: "  500غ    ",
            category: "food",
            image: "images/Breadcrumbs.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 205,
            name: "   	كبيس خيار الجودة   ",
            price:	216000,
            unit: "   1050 غ   ",
            category: "food",
            image: "images/Quality Pickled Cucumbers 1050g.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 206,
            name: "  حمص باليس فود  ",
            price:	121500,
            unit: "   900غ  ",
            category: "food",
            image: "images/Quality Pickled Cucumbers 1050g.png",
            pictureClass: "cleaning-picture"
        },
         {
             id: 207,
            name: "  اكوافينا  ",
            price:	19980,
            unit: "   600 مل ",
            category: "drinks",
            image: "images/wate.png",
            pictureClass: "cleaning-picture"
        },
     {
             id: 208,
            name: "  ماء ورد اليمامة ",
            price:	166500,
            unit: "    750 مل ",
            category: "food",
            image: "images/Al-Yamama Rose Water.png",
            pictureClass: "cleaning-picture"
        },
    {
             id: 209,
            name: "   فرشاة اسنان هولدنت",
            price:	45000	,
            unit: "    ",
            category: "cleaning",
            image: "images/Holdent Toothbrush.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 210,
            name: "  علبة شفر استرا ",
            price:	29997	,
            unit: "  ا*5  ",
            category: "cleaning",
            image: "images/Razor pack.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 211,
            name: "  اولويز دوبل مكسي ",
            price:	171000	,
            unit: "    ",
            category: "cleaning",
            image: "images/اولويز دوبل مكسي.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 212,
            name: "  كلاشي قضامة محلى ",
            price:	199980	,
            unit: "  300 غ  ",
            category: "Snacks",
            image: "images/Sweetened Roasted Chickpeas (Qadama).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 213,
            name: "  	منتوس نانو",
            price:	90000	,
            unit: "    ",
            category: "Snacks",
            image: "images/Mentos Nano.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 214,
            name: "  باريلا صدف صغير",
            price:	112500	,
            unit: " 500غ   ",
            category: "food",
            image: "images/Barilla Small Shells (Conchiglie).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 215,
            name: "  	بيضة كيندر جوي",
            price:	74970	,
            unit: "    ",
            category: "Snacks",
            image: "images/Kinder Joy Egg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 216,
            name: "  	ذرة ديروني مع ملعقة",
            price:	94950	,
            unit: "  185غ  ",
            category: "Snacks",
            image: "images/Derouni Corn (with spoon).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 217,
            name: "  تونة تريفا",
            price:	49500	,
            unit: "   ",
            category: "food",
            image: "images/Tuna Riva.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 218,
            name: "   الترا دو الفحم الاسود ",
            price:	429993	,
            unit: " 600 م  ",
            category: "cleaning",
            image: "images/Ultra Doux Black Charcoal.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 219,
            name: "   حليب دانو ",
            price:		439920	,
            unit: " 750غ ",
            category: "dairy",
            image: "images/Dano Milk 750g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 220,
            name: "  نيو بارك حليب منكه",
            price:		24930	,
            unit: "  ",
            category: "dairy",
            image: "images/New Park Flavored Milk.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 221,
            name: "  شاور بيزلاين",
            price:135000	,
            unit: " 500 مل ",
            category: "cleaning",
            image: "images/Beesline Shower Gel 500 ml.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 223,
            name: "   ماليزيا ديو للرجال ",
            price:199998,
            unit: " 150مل",
            category: "cleaning",
            image: "images/Malaysia Deo for Men.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 224,
            name: " بريل جامبو",
            price:229950,
            unit: " 1.25ليتر",
            category: "cleaning",
            image: "images/Pril Jumbo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 225,
            name: " بلسم حجاب كوزمال",
            price:219996,
            unit: "  ",
            category: "cleaning",
            image: "images/Cosmal Hijab Conditioner.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 226,
            name: " ذرة بوشار باليس فود",
            price:99000,
            unit: " 900غ ",
            category: "food",
            image: "images/Palis Food Popcorn Kernels.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 227,
            name: " 	شامبو الفيف",
            price:342000,
            unit: " 370مل ",
            category: "cleaning",
            image: "images/Elvive Shampoo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 228,
            name: "  سمنة روابي",
            price:2070000,
            unit: "12ك",
            category: "food",
            image: "images/Rawabi Ghee.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 229,
            name: "   شعيرية دوغا",
            price:299970,
            unit: "5ك",
            category: "food",
            image: "images/Doga Vermicelli.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 230,
            name: " شفرات exacta 3 للرجال",
            price:352800,
            unit: " *4",
            category: "cleaning",
            image: "images/Exacta 3 Razors for Men.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 231,
            name: "  شفر استور",
            price:139950,
            unit: " *6",
            category: "cleaning",
            image: "images/Shafar Store.png",
            pictureClass: "cleaning-picture"
        },
             {
             id: 232,
            name: "  	شوكو لارت",
            price:39960	,
            unit: "  ",
            category: "Snacks",
            image: "images/Choco Lart.png",
            pictureClass: "cleaning-picture"
        },
                     {
             id: 232,
            name: "  	شاي ديروني",
            price:309960,
            unit: " 400غ ",
            category: "food",
            image: "images/Derouni Tea.png",
            pictureClass: "cleaning-picture"
        },
                             {
             id: 233,
            name: "  	اندومي دجاج وجبة البلد",
            price:679950,
            unit: " *40",
            category: "food",
            image: "images/Indomie Chicken (Wajbat Al-Balad).png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 234,
            name: " شوكو برينس",
            price:108000,
            unit: " 250 غ",
            category: "Snacks",
            image: "images/Choco Prince.png",
            pictureClass: "cleaning-picture"
        },
    {
             id: 235,
            name: " 	فلاش اصلي   ",
            price:209970,
            unit: " 1ليتر",
            category: "cleaning",
            image: "images/Flash (Original).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 236,
            name: " 	علبة عصير دارينا  ",
            price:199980,
            unit: "  ",
            category: "drinks",
            image: "images/Darina Juice Carton.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 237,
            name: " 	كيندر كونتري ",
            price:59994,
            unit: "  ",
            category: "Snacks",
            image: "images/Kinder Country.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 238,
            name: " 		ديروني ارز بسمتي",
            price:169920,
            unit: " 800 غ ",
            category: "food",
            image: "images/Derouni Basmati Rice.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 239,
            name: " 		تاكز حار",
            price:124920,
            unit: "  113 غ ",
            category: "Snacks",
            image: "images/Spicy Tacos.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 240,
            name: " بازيلا سادة",
            price:45000,
            unit: "  400غ",
            category: "food",
            image: "images/Plain Peas 400g.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 241,
            name: " مرتديلا الاسرة بقر",
            price:73620,
            unit: " 340غ",
            category: "food",
            image: "images/Al-Usra Beef Mortadella.png",
            pictureClass: "cleaning-picture"
        },
             {
             id: 242,
            name: " بهار دجاج",
            price:59940,
            unit: " 100 غ",
            category: "spices",
            image: "images/بهار.png",
            pictureClass: "cleaning-picture"
        },
             {
             id: 243,
            name: "  جافيل ديمكس غالون",
            price:219996,
            unit: " 3.750لتر",
            category: "cleaning",
            image: "images/Javel (Bleach) D-Mix, Gallon.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 244,
            name: "  ماجيك مكنسة مع عصا",
            price:299970,
            unit: "  ",
            category: "cleaning",
            image: "images/Magic Broom with Handle.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 245,
            name: "  خل تفاح الجودة",
            price:109980,
            unit: " 500مل ",
            category: "food",
            image: "images/Apple Cider Vinegar (Quality).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 246,
            name: "  بيرلا المنيوم رول 25ft",
            price:79920,
            unit: "  ",
            category: "cleaning",
            image: "images/Perla Aluminum Foil 25ft.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 247,
            name: "  فيليدا اسفنج جلي غليتزي",
            price:125010,
            unit: " *3 ",
            category: "cleaning",
            image: "images/Vileda Glitzi Dishwashing Sponge.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 248,
            name: "  نيفيا ديو",
            price:270000,
            unit: "   ",
            category: "cleaning",
            image: "images/Nivea Deo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 249,
            name: "  	المراعي الدمشقية",
            price:119700	,
            unit: "  *16 ",
            category: "food",
            image: "images/(Al-Marai Al-Dimashqiya).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 250,
            name: "  	سردين اصفر",
            price:42300	,
            unit: "    ",
            category: "food",
            image: "images/Yellow Sardines.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 251,
            name: "  	منتوس 3D",
            price:29970	,
            unit: "    ",
            category: "Snacks",
            image: "images/Mentos 3D.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 252,
            name: "  	تيفاني اوتسفيل شوفان",
            price:31320	,
            unit: "    ",
            category: "Snacks",
            image: "images/Tiffany Oatsville Oats.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 253,
            name: "  	 شوال سكر",
            price:2970000,
            unit: "  50ك  ",
            category: "food",
            image: "images/Sack of Sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 254,
            name: "  	 هاجدو جبنة مطبوخة",
            price:202500,
            unit: "  400غ ",
            category: "dairy",
            image: "images/Hajdu Processed Cheese 400g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 255,
            name: "  	 برينغليز كبير",
            price:199980,
            unit: "  100غ",
            category: "Snacks",
            image: "images/Large Pringles.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 255,
            name: "  كعك مدور فتاح",
            price:	99990,
            unit: "   ",
            category: "Bakery",
            image: "images/Round Ka'ak (Bread Rings).png",
            pictureClass: "cleaning-picture"
        },
    {
             id: 259,
            name: "   رب بندورة يمامة",
            price:	166500,
            unit: "  660غ	 ",
            category: "food",
            image: "images/Yamama Tomato Paste.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 260,
            name: "  بريل 3ليتر +در جنرال",
            price:	450000,
            unit: " 750مل ",
            category: "cleaning",
            image: "images/Pril 3L + Der General 750ml.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 261,
            name: "  	برسيل جيل",
            price:	599940,
            unit: " 5ك",
            category: "cleaning",
            image: "images/Persil Gel.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 262,
            name: "  	برسيل جيل",
            price:	599940,
            unit: " 5ك",
            category: "cleaning",
            image: "images/Persil Gel.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 263,
            name: "  مربى فريز   مروج",
            price:	234000,
            unit: " 800غ",
            category: "food",
            image: "images/Murouj Strawberry Jam.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 264,
            name: "  مربى التين  مروج",
            price:	234000,
            unit: " 800غ",
            category: "food",
            image: "images/Murooj Preserved Figs.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 265,
            name: "  تين معقود  مروج",
            price:	288000,
            unit: " 800غ",
            category: "food",
            image: "images/Murooj Preserved Figs.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 266,
            name: "   دبس خروب بلدي  مروج",
            price:	261000,
            unit: " 1ك",
            category: "food",
            image: "images/Murouj Local Carob Molasses.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 267,
            name: "   زيتون مقطع المروج",
            price:	309600	,
            unit: " 1ك",
            category: "food",
            image: "images/Al-Murouj Sliced ​​Olives 1kg.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 268,
            name: " نيو بارك جبنة قشطية",
            price:		 163800	,
            unit: " عرض	",
            category: "dairy",
            image: "images/New Park Cream Cheese (Special Offer).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 269,
            name: " حليب كانديا خالي الدسم",
            price:		169992	,
            unit: " 1ل	",
            category: "dairy",
            image: "images/Candia Skimmed Milk.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 270,
            name: "  زبدة لورباك",
            price:	259992	,
            unit: "  200غ",
            category: "dairy",
            image: "images/Lurpak Butter 200g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 271,
            name: "  	أصابع جبنة",
            price:	180000	,
            unit: "  *15",
            category: "dairy",
            image: "images/Cheese Sticks.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 272,
            name: "  برك جبنة",
            price:	180000	,
            unit: "  *15",
            category: "dairy",
            image: "images/Cheese Borek.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 273,
            name: "  علبة قرقش  وايفر",
            price:	180000	,
            unit: "  *24",
            category: "Snacks",
            image: "images/Qarqash Wafer Box (24 count).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 274,
            name: "  حموي مع هال  اكسترا	",
            price:	399960	,
            unit: "  180غ",
            category: "food",
            image: "images/Hamwi Classic 180g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 275,
            name: "  حموي موكا ",
            price:	630000	,
            unit: "  450غ",
            category: "food",
            image: "images/Hamawi Mocha 450g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 276,
            name: "  حموي موكا ",
            price:	299970	,
            unit: "  180غ",
            category: "food",
            image: "images/Hamawi Mocha 180g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 277,
            name: "  حموي سائل  ",
            price:	299970	,
            unit: "  1ليتر",
            category: "food",
            image: "images/Hamawi Liquid 1L.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 278,
            name: "  حموي كلاسيك   ",
            price:	359910	,
            unit: "  180غ",
            category: "food",
            image: "images/Hamwi Classic 180g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 279,
            name: "  	نسكافي اوريجينال  ",
            price:		319950	,
            unit: "   *25",
            category: "food",
            image: "images/Nescafé Original.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 280,
            name: "  بيغ بابول علبة ",
            price:	117000	,
            unit: "   ",
            category: "Snacks",
            image: "images/Big Babol Box.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 281,
            name: " 	صابونة النور",
            price:	49950	,
            unit: "   ",
            category: "cleaning",
            image: "images/Al-Nour Soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 282,
            name: " 	 توت+جلاب الخواجة",
            price:	306000	,
            unit: "   ",
            category: "drinks",
            image: "images/Al-Khawaja Mulberry.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 283,
            name: " 	 ليبو  عائلي",
            price:	159993,
            unit: "  184غ ",
            category: "drinks",
            image: "images/Lipo 184g (Family Size).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 284,
            name: " 	 بيسكولاتا ستار",
            price:	54990,
            unit: "   ",
            category: "Snacks",
            image: "images/Biscolata Star.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 285,
            name: " 	نشا ",
            price:	49950,
            unit: " 500غ  ",
            category: "Bakery",
            image: "images/Starch 500g.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 286,
            name: " 	بزر ابيض ",
            price:		249930,
            unit: "	 500غ ",
            category: "Snacks",
            image: "images/White seeds 500g.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 287,
            name: " 	كري كري",
            price:	54990,
            unit: "	  	 200غ	",
            category: "dairy",
            image: "images/Kri Kri 200g.png",
            pictureClass: "cleaning-picture"
        },
           {
             id: 288,
            name: " 	تويكس ",
            price:	216000,
            unit: "	  	 4+1	",
            category: "Snacks",
            image: "images/Twix.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 289,
            name: " 	 تمر سقعي ",
            price:	300600,
            unit: "	  	 1ك	",
            category: "food",
            image: "images/Saq'i Dates.png",
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
        marketProductsGrid.innerHTML = marketProducts.filter(product => product.category !== "cleaning").map(product => {
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
            if (product.category === "cleaning") return false;
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
const SHOP_WHATSAPP = "96171918022";

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
            image: "images/apples.png",
         },
        {
            id: 1002,
            name: "موز",
            price: 120000,
            unit: "1ك",
            category: "fruit",
            image: "images/banana.png",
        },
        {
            id: 1003,
            name: "لوبية",
            price: 100000,
            unit: "1ك",
            category: "vegetable",
   image: "images/Cowpeas.png",
        },
        {
            id: 1004,
            name: "بندورة",
            price:600000,
            unit: "1ك",
            category: "vegetable",
                image: "images/tomato.png",
        },
        {
            id: 1005,
            name: "فليفلة",
            price: 80000,
            unit: "1ك",
            category: "vegetable",
            image: "images/Bell pepper.png",
        },
        {
            id: 1006,
            name: "حامض",
            price: 80000,
            unit: "1ك",
            category: "vegetable",
             image: "images/sour.png",
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
             image: "images/option.png",
        },
                {
            id: 1009,
            name: "مانجا",
            price: 130000,
            unit: "1ك",
            category: "fruit",
             image: "images/Manga.png",
        },
              {
            id: 1010,
            name: "زهرة",
            price: 60000,
            unit: "1ك",
            category: "vegetable",
             image: "images/Cauliflower.png",
        },
              {
            id: 1011,
            name: "ملفوف",
            price: 30000,
            unit: "1ك",
            category: "vegetable",
             image: "images/cabbage.png",
        },
              {
            id: 1012,
            name: "عنب",
            price: 120000,
            unit: "1ك",
            category: "fruit",
             image: "images/grapes.png",
        },
              {
            id: 1013,
            name: "افوكا",
            price: 150000,
            unit: "1ك",
            category: "fruit",
             image: "images/Avoca.png",
        },
              {
            id: 1014,
            name: "جزر",
            price: 100000,
            unit: "1ك",
            category: "vegetable",
             image: "images/carrot.png",
        },
              {
            id: 1015,
            name: "ثوم",
            price: 300000,
            unit: "1ك",
            category: "vegetable",
             image: "images/garlic.png",
        },
         {
            id: 1016,
            name: "بصل",
            price: 60000,
            unit: "1ك",
            category: "vegetable",
             image: "images/onion.png",
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
             image: "images/eggplant.png",
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
    ? `<img src="${product.image}" alt="${product.name}">`
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
        image: "images/Meat pies (Sfiha).png"
    },
    {
        id: 2002,
        name: "مشاوي مشكل",
        price: 1800000,
        unit: "1ك",
        category: "grill",
        image: "images/Mixed Grill.png"
    },
    {
        id: 2003,
        name: "لحم غنم",
        price: 1800000,
        unit: "1ك",
        category: "raw",
        image: "images/Lamb.png"
    },
    {
        id: 2004,
        name: "لحم بقر",
        price: 1300000,
        unit: "1ك",
        category: "raw",
        image: "images/beef.png"
    },
        {
        id: 2005,
        name: "طاووق مشوي  ",
        price: 1200000,
        unit: " مع سرفيس 1ك",
        category: "grill",
        image: "images/Grilled Tawook.png"
    },
            {
        id: 2006,
        name: "كفته    ",
        price: 1800000,
        unit: " مع سرفيس 1ك",
        category: "grill",
        image: "images/Grilled Kofta.png"
    },
                {
        id: 2007,
        name: "مقانق    ",
        price: 1200000,
        unit: "    1ك",
        category: "grill",
        image: "images/Grilled sausages.png"
    },
                    {
        id: 2008,
        name: "سجق    ",
        price: 1000000,
        unit: "    1ك",
        category: "raw",
        image: "images/Raw sausage.png"
    },
                        {
        id: 2009,
        name: "مقانق    ",
        price: 1350000,
        unit: "    1ك",
        category: "raw",
        image: "images/Makanek.png"
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
        ${products.map(p => `<button type="button" class="global-search-row" data-section="${escapeHTML(p.section)}" data-product-id="${escapeHTML(p.id ?? "")}" data-search-index="${escapeHTML(p.searchIndex ?? "")}">
            <span class="global-search-thumb">${p.image ? `<img src="${escapeHTML(p.image)}" alt="" loading="lazy">` : escapeHTML(p.emoji || "🛍️")}</span>
            <span class="global-search-info"><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.section)} · ${escapeHTML(p.unit || "")}</small></span>
            <b>${escapeHTML(p.price)} ل.ل</b>
        </button>`).join("")}
        ${!products.length && !sections.length ? '<p class="global-search-empty">ما لقينا منتجات أو أقسام مطابقة.</p>' : ''}`;
    globalSearchResults.hidden = false;
}
searchInput.addEventListener("input", renderGlobalSearch);
// الانتقال مباشرة إلى بطاقة المنتج من نتائج البحث
function focusSearchedProduct(section, productId, searchIndex) {
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
        renderGharibProducts();
        grid = gharibGrid;
    }
    if (!grid) return;
    const selector = section === "دواجن"
        ? `.gharib-product-card:nth-child(${Number(searchIndex) + 1})`
        : `[data-product-id="${String(productId).replace(/[^0-9]/g, "")}"]`;
    // ننتظر ظهور الشاشة واكتمال رسم البطاقات
    setTimeout(() => {
        const target = grid.querySelector(selector);
        if (!target) return;
        const scrollArea = target.closest(".market-products-scroll");
        if (scrollArea) {
            const targetRect = target.getBoundingClientRect();
            const areaRect = scrollArea.getBoundingClientRect();
            scrollArea.scrollTo({top: scrollArea.scrollTop + targetRect.top - areaRect.top - 65, behavior: "smooth"});
        } else {
            target.scrollIntoView({behavior: "smooth", block: "center"});
        }
        target.classList.remove("search-product-highlight");
        void target.offsetWidth;
        target.classList.add("search-product-highlight");
        setTimeout(() => target.classList.remove("search-product-highlight"), 2400);
    }, 180);
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
        focusSearchedProduct(section, productId, searchIndex);
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
const libraryProducts = [{"id":"library-001","name":"قلم لوح كوفرت","price":29970,"category":"pens","image":"images/library/library-001.png","unit":"قطعة"},{"id":"library-002","name":"علبة هندسة زيرو","price":109998,"category":"geometry","image":"images/library/library-002.png","unit":"قطعة"},{"id":"library-003","name":"قلم حبر كلارو اخضر","price":19998,"category":"pens","image":"images/library/library-003.png","unit":"قطعة"},{"id":"library-004","name":"براية مع غطا  يلانغ","price":29997,"category":"pens","image":"images/library/library-004.png","unit":"قطعة"},{"id":"library-005","name":"كوركتار يلانغ*8مل","price":29970,"category":"pens","image":"images/library/library-005.png","unit":"قطعة"},{"id":"library-006","name":"براية فضاء","price":19980,"category":"pens","image":"images/library/library-006.png","unit":"قطعة"},{"id":"library-007","name":"لوح20*30","price":129960,"category":"geometry","image":"images/library/library-007.png","unit":"قطعة"},{"id":"library-008","name":"قلم ماركة صيني","price":24999.3,"category":"pens","image":"images/library/library-008.png","unit":"قطعة"},{"id":"library-009","name":"دفتر 5 مواضيع كوفرت *80","price":90000,"category":"notebooks","image":"images/library/library-009.png","unit":"قطعة"},{"id":"library-010","name":"تلوين مي خفيف*12 قلم","price":49950,"category":"art","image":"images/library/library-010.png","unit":"قطعة"},{"id":"library-011","name":"دفتر *12 لون","price":319950,"category":"notebooks","image":"images/library/library-011.png","unit":"قطعة"},{"id":"library-012","name":"جيب ريموتEQUIPMENT","price":900000,"category":"bags","image":"images/library/library-012.png","unit":"قطعة"},{"id":"library-013","name":"اجاندة نوت بوك صغيرة مع مغيطة","price":90000,"category":"notebooks","image":"images/library/library-013.png","unit":"قطعة"},{"id":"library-014","name":"دفتر 120ورقة 5 الوان","price":149940,"category":"notebooks","image":"images/library/library-014.png","unit":"قطعة"},{"id":"library-015","name":"مسطرة بلاستيك 30سنتم صور","price":9999,"category":"geometry","image":"images/library/library-015.png","unit":"قطعة"},{"id":"library-016","name":"لانش بوكس حجم كبير","price":900000,"category":"supplies","image":"images/library/library-016.png","unit":"قطعة"},{"id":"library-017","name":"دفتر بريو *50ورقة","price":19998,"category":"notebooks","image":"images/library/library-017.png","unit":"قطعة"},{"id":"library-018","name":"مقلمة علب","price":315000,"category":"bags","image":"images/library/library-018.png","unit":"قطعة"},{"id":"library-019","name":"كوركتار","price":45000,"category":"pens","image":"images/library/library-019.png","unit":"قطعة"},{"id":"library-020","name":"علب ورق *500","price":99990,"category":"notebooks","image":"images/library/library-020.png","unit":"قطعة"},{"id":"library-021","name":"شنطة prime.","price":1350000,"category":"bags","image":"images/library/library-021.png","unit":"قطعة"},{"id":"library-022","name":"غورد بلاستيك*750مل*2","price":599940,"category":"supplies","image":"images/library/library-022.png","unit":"قطعة"},{"id":"library-023","name":"دفتر 5 الوان ZOK","price":81000,"category":"notebooks","image":"images/library/library-023.png","unit":"قطعة"},{"id":"library-024","name":"دفتر 10الوان رصور","price":299970,"category":"notebooks","image":"images/library/library-024.png","unit":"قطعة"},{"id":"library-025","name":"اقلام تلوين خشب كاسبر*12قلم","price":90000,"category":"art","image":"images/library/library-025.png","unit":"قطعة"},{"id":"library-026","name":"الة حاسبة علمية eco-026","price":720000,"category":"geometry","image":"images/library/library-026.png","unit":"قطعة"},{"id":"library-027","name":"مقص بونينيا","price":69993,"category":"other","image":"images/library/library-027.png","unit":"قطعة"},{"id":"library-028","name":"اجاندة ستيتش","price":299970,"category":"notebooks","image":"images/library/library-028.png","unit":"قطعة"},{"id":"library-029","name":"غورد فاكيوم كاب","price":900000,"category":"supplies","image":"images/library/library-029.png","unit":"قطعة"},{"id":"library-030","name":"cp 89 mouse","price":270000,"category":"electronics","image":"images/library/library-030.png","unit":"قطعة"},{"id":"library-031","name":"دفتر رصور 5 الوان عربي","price":180000,"category":"notebooks","image":"images/library/library-031.png","unit":"قطعة"},{"id":"library-032","name":"مقص كورفت","price":49950,"category":"other","image":"images/library/library-032.png","unit":"قطعة"},{"id":"library-033","name":"تلوين رنا*12 قلم","price":79992,"category":"art","image":"images/library/library-033.png","unit":"قطعة"},{"id":"library-034","name":"مسطرة BOOKMARKسلكون","price":29970,"category":"geometry","image":"images/library/library-034.png","unit":"قطعة"},{"id":"library-035","name":"شنطة prime   .","price":1350000,"category":"bags","image":"images/library/library-035.png","unit":"قطعة"},{"id":"library-036","name":"دفتر 5الوان *80 ورقة","price":99990,"category":"notebooks","image":"images/library/library-036.png","unit":"قطعة"},{"id":"library-037","name":"قلم حبر كلارو احمر","price":19998,"category":"pens","image":"images/library/library-037.png","unit":"قطعة"},{"id":"library-038","name":"اجاندة لابوبو","price":199980,"category":"notebooks","image":"images/library/library-038.png","unit":"قطعة"},{"id":"library-039","name":"لعبة مجموعة عمار","price":630000,"category":"toys","image":"images/library/library-039.png","unit":"قطعة"},{"id":"library-040","name":"قلم مكتب","price":90000,"category":"pens","image":"images/library/library-040.png","unit":"قطعة"},{"id":"library-041","name":"تلوين شمع يلانغ*12قلم","price":149994,"category":"art","image":"images/library/library-041.png","unit":"قطعة"},{"id":"library-042","name":"مجموعة طيارة وسيارة","price":450000,"category":"toys","image":"images/library/library-042.png","unit":"قطعة"},{"id":"library-043","name":"قلم مع ممحاة","price":24999.93,"category":"pens","image":"images/library/library-043.png","unit":"قطعة"},{"id":"library-044","name":"مقلمة مدرسية 264351","price":199980,"category":"bags","image":"images/library/library-044.png","unit":"قطعة"},{"id":"library-045","name":"رول تسعير","price":99990,"category":"notebooks","image":"images/library/library-045.png","unit":"قطعة"},{"id":"library-046","name":"مكبسة مايبد","price":299999.7,"category":"other","image":"images/library/library-046.png","unit":"قطعة"},{"id":"library-047","name":"محاية استرا ناعمة","price":9999,"category":"pens","image":"images/library/library-047.png","unit":"قطعة"},{"id":"library-050","name":"قلم حبر بيك ازرق","price":19998,"category":"pens","image":"images/library/library-050.png","unit":"قطعة"},{"id":"library-051","name":"دفتر نوت","price":270000,"category":"notebooks","image":"images/library/library-051.png","unit":"قطعة"},{"id":"library-052","name":"شنطة سبورت اسود","price":1800000,"category":"bags","image":"images/library/library-052.png","unit":"قطعة"},{"id":"library-053","name":"قلم رصاص مع محاية vneeds","price":9999,"category":"pens","image":"images/library/library-053.png","unit":"قطعة"},{"id":"library-054","name":"مفكرة بريو *192 ورقة","price":99999.9,"category":"notebooks","image":"images/library/library-054.png","unit":"قطعة"},{"id":"library-055","name":"اجاندة  ستيتش","price":299970,"category":"notebooks","image":"images/library/library-055.png","unit":"قطعة"},{"id":"library-056","name":"wireless mouse ms9922","price":630000,"category":"electronics","image":"images/library/library-056.png","unit":"قطعة"},{"id":"library-057","name":"كوريكتير تايب*2","price":119970,"category":"pens","image":"images/library/library-057.png","unit":"قطعة"},{"id":"library-059","name":"علبة اقلام تلوين خشب يلانغ*12قلم","price":119997,"category":"art","image":"images/library/library-059.png","unit":"قطعة"},{"id":"library-060","name":"جبالة باطون لعبة","price":450000,"category":"toys","image":"images/library/library-060.png","unit":"قطعة"},{"id":"library-061","name":"كول يلانغ اصفر*25غ","price":39996,"category":"other","image":"images/library/library-061.png","unit":"قطعة"},{"id":"library-062","name":"قلم  لوح زيرو","price":39960,"category":"pens","image":"images/library/library-062.png","unit":"قطعة"},{"id":"library-064","name":"علبة اقلام رصاص كورفت*12","price":119997,"category":"pens","image":"images/library/library-064.png","unit":"قطعة"},{"id":"library-065","name":"w 920 mouse wireless","price":450000,"category":"electronics","image":"images/library/library-065.png","unit":"قطعة"},{"id":"library-066","name":"دفتر رسم صغير احمر","price":19998,"category":"notebooks","image":"images/library/library-066.png","unit":"قطعة"},{"id":"library-067","name":"كوركتار *5مم","price":79920,"category":"pens","image":"images/library/library-067.png","unit":"قطعة"},{"id":"library-069","name":"دفتر رصور 72 ورقة","price":90000,"category":"notebooks","image":"images/library/library-069.png","unit":"قطعة"},{"id":"library-071","name":"الة حاسبة kk837b","price":315000,"category":"geometry","image":"images/library/library-071.png","unit":"قطعة"},{"id":"library-073","name":"دفتر غلاف بلاسيك *48ورقة","price":45000,"category":"notebooks","image":"images/library/library-073.png","unit":"قطعة"},{"id":"library-074","name":"شنطة روضة بارلي","price":1350000,"category":"bags","image":"images/library/library-074.png","unit":"قطعة"},{"id":"library-075","name":"براية","price":14994,"category":"pens","image":"images/library/library-075.png","unit":"قطعة"},{"id":"library-076","name":"ورق تصوير*500ورق","price":450000,"category":"notebooks","image":"images/library/library-076.png","unit":"قطعة"},{"id":"library-077","name":"علبة هندسة ماب","price":90000,"category":"geometry","image":"images/library/library-077.png","unit":"قطعة"},{"id":"library-081","name":"قلم رصاص زيرو مع محاية","price":9999,"category":"pens","image":"images/library/library-081.png","unit":"قطعة"},{"id":"library-082","name":"دفتر 48*70غ مجلد حساب","price":34920,"category":"notebooks","image":"images/library/library-082.png","unit":"قطعة"},{"id":"library-084","name":"دفتر ديلوكس*50ورقة","price":24999.3,"category":"notebooks","image":"images/library/library-084.png","unit":"قطعة"},{"id":"library-086","name":"اجاندة صغيرة","price":69930,"category":"notebooks","image":"images/library/library-086.png","unit":"قطعة"},{"id":"library-087","name":"دفتر 48ورقة*70غمجلد","price":34992,"category":"notebooks","image":"images/library/library-087.png","unit":"قطعة"},{"id":"library-088","name":"دفتر*48ورقة فرنسيMPP","price":19980,"category":"notebooks","image":"images/library/library-088.png","unit":"قطعة"},{"id":"library-089","name":"براية دبدوب","price":49950,"category":"pens","image":"images/library/library-089.png","unit":"قطعة"},{"id":"library-091","name":"قلم كورفت اسود","price":14994,"category":"pens","image":"images/library/library-091.png","unit":"قطعة"},{"id":"library-092","name":"شوميز سحاب مع حلقة","price":45000,"category":"bags","image":"images/library/library-092.png","unit":"قطعة"},{"id":"library-094","name":"قلم حبر كلارو ازرق","price":19998,"category":"pens","image":"images/library/library-094.png","unit":"قطعة"},{"id":"library-095","name":"ورق كلاسور حساب","price":45000,"category":"notebooks","image":"images/library/library-095.png","unit":"قطعة"},{"id":"library-097","name":"دفتر رسم احمر كبير","price":49950,"category":"notebooks","image":"images/library/library-097.png","unit":"قطعة"},{"id":"library-098","name":"دفتر غلاف بلاستيك عربي *48 ورقة","price":45000,"category":"notebooks","image":"images/library/library-098.png","unit":"قطعة"},{"id":"library-099","name":"شنطة بارلي روضة","price":1350000,"category":"bags","image":"images/library/library-099.png","unit":"قطعة"},{"id":"library-103","name":"قلم ازرق بيانو","price":19980,"category":"pens","image":"images/library/library-103.png","unit":"قطعة"},{"id":"library-105","name":"دفتر 12 لون رصور","price":319950,"category":"notebooks","image":"images/library/library-105.png","unit":"قطعة"},{"id":"library-106","name":"قلم هايليتر كورفت","price":29997,"category":"pens","image":"images/library/library-106.png","unit":"قطعة"},{"id":"library-107","name":"شنطة prime  .","price":1350000,"category":"bags","image":"images/library/library-107.png","unit":"قطعة"},{"id":"library-108","name":"تلوين خشب mba*24","price":180000,"category":"art","image":"images/library/library-108.png","unit":"قطعة"},{"id":"library-109","name":"علبة اقلام الوان*12 قلم","price":270000,"category":"art","image":"images/library/library-109.png","unit":"قطعة"},{"id":"library-111","name":"مقلمة SPORT24","price":270000,"category":"bags","image":"images/library/library-111.png","unit":"قطعة"},{"id":"library-112","name":"قلم بيانو احمر","price":19999.8,"category":"pens","image":"images/library/library-112.png","unit":"قطعة"},{"id":"library-114","name":"الة حاسبة ستايفري ct-140e","price":675000,"category":"geometry","image":"images/library/library-114.png","unit":"قطعة"},{"id":"library-115","name":"براية دوبل مع محاية دايمرس","price":69993,"category":"pens","image":"images/library/library-115.png","unit":"قطعة"},{"id":"library-117","name":"علبة تلوين شمع*12 لون","price":45000,"category":"art","image":"images/library/library-117.png","unit":"قطعة"},{"id":"library-118","name":"علبة اقلام حبر ملونة*12 قلم","price":139995,"category":"pens","image":"images/library/library-118.png","unit":"قطعة"},{"id":"library-119","name":"كرتون ملون","price":49950,"category":"notebooks","image":"images/library/library-119.png","unit":"قطعة"},{"id":"library-120","name":"شنطة lovencar","price":2700000,"category":"bags","image":"images/library/library-120.png","unit":"قطعة"},{"id":"library-121","name":"قلم حبر كورفيت اخضر","price":14999.94,"category":"pens","image":"images/library/library-121.png","unit":"قطعة"},{"id":"library-122","name":"دفتر نوت زهري","price":270000,"category":"notebooks","image":"images/library/library-122.png","unit":"قطعة"},{"id":"library-131","name":"قلم حبر كلارو اسود","price":19980,"category":"pens","image":"images/library/library-131.png","unit":"قطعة"},{"id":"library-132","name":"دفتر 48 ورقة PAPEC","price":19980,"category":"notebooks","image":"images/library/library-132.png","unit":"قطعة"},{"id":"library-150","name":"قلم بيانو اسود","price":19980,"category":"pens","image":"images/library/library-150.png","unit":"قطعة"},{"id":"library-153","name":"دفتر رصور 5 الوان","price":99990,"category":"notebooks","image":"images/library/library-153.png","unit":"قطعة"},{"id":"library-158","name":"دفتر 6 الوان رصور","price":199980,"category":"notebooks","image":"images/library/library-158.png","unit":"قطعة"},{"id":"library-166","name":"قلم كورفت اخضر","price":14994,"category":"pens","image":"images/library/library-166.png","unit":"قطعة"},{"id":"library-185","name":"قلم حبر كورفيت ازرق فاتح","price":14994,"category":"pens","image":"images/library/library-185.png","unit":"قطعة"},{"id":"library-189","name":"دفتر مدرسي بلاستيك*48ورقة حساب","price":45000,"category":"notebooks","image":"images/library/library-189.png","unit":"قطعة"}];
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
  document.getElementById('restaurantsHeader').textContent = restaurantCurrent || 'المطاعم';
  list.hidden = Boolean(restaurantCurrent);
  menu.hidden = !restaurantCurrent;
  if (!restaurantCurrent) {
    list.replaceChildren();
    restaurantNames.filter(n => n.toLocaleLowerCase().includes(query)).forEach(name => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'restaurant-list-row';
      const photo = document.createElement('img'); photo.className = 'restaurant-cover'; photo.alt = ''; photo.loading = 'lazy'; photo.src = restaurantPhotos[restaurantNames.indexOf(name)]; photo.onerror = () => {photo.style.display='none';};
      const label = document.createElement('strong'); label.textContent = name;
      const arrow = document.createElement('span'); arrow.className = 'restaurant-row-arrow'; arrow.textContent = '❮'; arrow.setAttribute('aria-hidden','true');
      button.append(photo,label,arrow);
      button.addEventListener('click',()=>{restaurantCurrent=name;restaurantFilter='all';restaurantSearch.value='';renderRestaurantView();document.getElementById('restaurantMenuItems').scrollTop=0;});
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
    b.addEventListener('click',()=>{restaurantFilter=id;renderRestaurantView();document.getElementById('restaurantMenuItems').scrollTop=0;});tabs.appendChild(b);
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
// سحب التصنيفات بالماوس، واللمس مدعوم عبر CSS overflow-x.
(()=>{const bar=document.getElementById('restaurantCategories');let down=false,start=0,scroll=0,moved=false,block=false;
bar.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;moved=false;start=e.clientX;scroll=bar.scrollLeft;});
window.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-start;if(Math.abs(dx)>5)moved=true;if(moved){bar.scrollLeft=scroll-dx;e.preventDefault();}},{passive:false});
window.addEventListener('pointerup',()=>{if(!down)return;down=false;if(moved){block=true;setTimeout(()=>block=false,90);}});
bar.addEventListener('click',e=>{if(block){e.preventDefault();e.stopImmediatePropagation();block=false;}},true);
bar.addEventListener('dragstart',e=>e.preventDefault());})();
