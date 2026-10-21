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

   
  
    // زر العروضات اليومية: الانتقال إلى القسم
    document.getElementById("productsButton")
        .addEventListener("click", function () {
            document.getElementById("productsSection")
                .scrollIntoView({ behavior: "smooth" });
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

    const gharibToggleButton =
        document.getElementById("gharibToggleButton");

    let gharibShowAll = false;

    function renderGharibProducts() {
        gharibGrid.innerHTML = "";

        gharibProducts.forEach(function (product, index) {
            const card = document.createElement("article");
            card.className = "gharib-product-card";

            if (!gharibShowAll && index >= 4) {
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
            description.textContent = product.description;

            const bottom = document.createElement("div");
            bottom.className = "gharib-product-bottom";

            const price = document.createElement("strong");
            price.className = "gharib-product-price";
         price.textContent = product.price + " ل.ل";

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

        gharibToggleButton.textContent =
            gharibShowAll ? "عرض أقل" : "عرض الكل";

        gharibToggleButton.hidden = gharibProducts.length <= 4;
    }

    gharibToggleButton.addEventListener("click", function () {
        gharibShowAll = !gharibShowAll;
        renderGharibProducts();
    });

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
            id: 12,
            name: "  معتوق شوفان +ميكس     ",
            price: 	0.666,
            unit: "  ",
            category: "food",
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
            category: "Snacks",
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
            id: 59,
            name: "  بطارية انرجيزر   ",
            price: 0.55 ,
            unit: "  ",
            category: "Electrical",
             image: "images/Energizer Battery.png",
            pictureClass: "cleaning-picture"
        },
{
            id: 60,
            name: "  ديمة سوفتي  ",
            price: 0.38888 ,
            unit: "  ",
            category: "Snacks",
             image: "images/Dima Softi.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 61,
            name: "  جبنة بريزيدون  ",
            price: 1.47 ,
            unit: " *16 ",
            category: "dairy",
             image: "images/President Cheese.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 62,
            name: "  	بوظة السلطان  ",
            price: 4 ,
            unit: " 1ك ",
            category: "IceCream",
             image: "images/Sultan Ice Cream.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 63,
            name: "  	قداحة ضو  ",
            price:	0.222 ,
            unit: "  ",
            category: "Electrical",
             image: "images/Lighter.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 64,
            name: "  اكياس نفايات اسود بيرلا  ",
            price: 1.6666 ,
            unit: " 20* ",
            category: "cleaning",
             image: "images/Perla Black.png",
            pictureClass: "cleaning-picture"
        },
        {
            id: 65,
            name: "  جنرال معطر حمامات  ",
            price: 1.75 ,
            unit: "  2+1 ",
            category: "cleaning",
             image: "images/General Bathroom.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 66,
            name: " لمبة برم ",
            price: 2 ,
            unit: "   30 W ",
            category: "Electrical",
             image: "images/LED Bulb 30W.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 67,
            name: "  ذرة  ",
            price: 3.822 ,
            unit: "  2500غ ",
            category: "food",
             image: "images/Corn1.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 68,
            name: "   قرقش شوكولا ",
            price: 2.888 ,
            unit: "  علبة ",
            category: "food",
             image: "images/Qarqash Chocolate.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 69,
            name: "  انفنتي سائل غسيل ",
            price: 4 ,
            unit: "   3 لتر ",
            category: "cleaning",
             image: "images/Infinity Laundry Detergent.png",
            pictureClass: "cleaning-picture"
        },
            {
            id: 70,
            name: "  وايف اب ",
            price: 0.444 ,
            unit: " 40غ ",
            category: "Snacks",
             image: "images/Wipe Up.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 71,
            name: "  	شوال طحين ",
            price:22 ,
            unit: "  50ك ",
            category: "food",
             image: "images/Flour.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 72,
            name: "  	مكنة حلاقة بيك نسائي",
            price:	1.5,
            unit: "  5+1",
            category: "cleaning",
             image: "images/Women’s Razor.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 73,
            name: "  	قضامة فلت ",
            price: 0.65 ,
            unit: "  200 غ",
            category: "Snacks",
             image: "images/Chickpeas.png",
            pictureClass: "cleaning-picture"
        },
                {
            id: 74,
            name: "  فلقة مياه نسلة",
            price: 1.8888 ,
            unit: "  0.33 لتر  ",
            category: "drinks",
             image: "images/Nestlé Pure.png",
            pictureClass: "cleaning-picture"
        },
         {
            id: 75,
            name: "  منتوس اي سي علكة ",
            price: 0.5 ,
            unit: "  *8 ",
            category: "Snacks",
             image: "images/Mentos Ice Gum.png",
            pictureClass: "cleaning-picture"
        },
       {
            id: 76,
            name: "  بازيلا مع جزر ",
            price: 1.77 ,
            unit: "  400 غ ",
            category: "Snacks",
             image: "images/Peas with carrots.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 77,
            name: "  بلاك غولد سمن نباتي ممتاز",
            price: 1.55 ,
            unit: "  700مل",
            category: "food",
             image: "images/Black Gold.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 78,
            name: "  كيك اولكر ",
            price: 1.333 ,
            unit: "  160غ",
            category: "Snacks",
             image: "images/Ülker Cake.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 79,
            name: "  عصير ريندا ",
            price: 0.8888 ,
            unit: "  1.25ليتر",
            category: "drinks",
             image: "images/Rinda Juice.png",
            pictureClass: "cleaning-picture"
        },
    
        {
            id: 80,
            name: "  فرشاة اسنان اطفال ",
            price: 0.9 ,
            unit: "   ",
            category: "cleaning",
             image: "images/Children's toothbrush.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 81,
            name: "  بيتزوللو لازانيا ",
            price: 1.8888 ,
            unit: "   ",
            category: "food",
             image: "images/Pizzallo lasagna.png",
            pictureClass: "cleaning-picture"
        },

    {
            id: 76,
            name: "  نسكافيه ماتينال	 ",
            price: 6.333 ,
            unit: "  200 غ ",
            category: "food",
             image: "images/Nescafé Matinal.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 77,
            name: "  مايونيز تركي",
            price: 1.22 ,
            unit: "  550غ",
            category: "dairy",
             image: "images/Turkish Mayonnaise.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 78,
            name: "  صابون بالموليف ",
            price: 0.6666 ,
            unit: "  90غ",
            category: "cleaning",
             image: "images/Palmolive Soap.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 79,
            name: "  كولونيا ",
            price: 1.333 ,
            unit: "  125مل",
            category: "cleaning",
             image: "images/Cologne.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 80,
            name: "  خبز تنور مرقوق ",
            price: 0.555 ,
            unit: "   ",
            category: "Bakery",
             image: "images/tandoor bread.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 81,
            name: "  سامون	",
            price: 0.8333 ,
            unit: "   ",
            category: "Bakery",
             image: "images/Samoun.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 82,
            name: "  ذرة ديروني 	",
            price: 1.2777 ,
            unit: "  340غ ",
            category: "food",
             image: "images/Corn.png",
            pictureClass: "cleaning-picture"
        },
    {
            id: 83,
            name: "  صلصة البندورة يوردوم	",
            price: 2 ,
            unit: "  830غ",
            category: "food",
             image: "images/Yurdum Tomato.png",
            pictureClass: "cleaning-picture"
        },
       {
            id: 84,
            name: "  شامبو اكس سمارت  ",
            price: 1.75 ,
            unit: "  750 مل ",
            category: "cleaning",
             image: "images/X-Smart Shampoo.png",
            pictureClass: "cleaning-picture"
        },
           {
            id: 85,
            name: "  كاتشاب اكسترا  عصارة ",
            price: 2.1111 ,
            unit: "  800غ",
            category: "food",
             image: "images/Extra Ketchup.png",
            pictureClass: "cleaning-picture"
        },
               {
            id: 85,
            name: "  شامبو برت بلاس",
            price:	3.2222 ,
            unit: " 600مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 86,
            name: "  شامبو برت بلاس",
            price:	3.2222 ,
            unit: " 600مل",
            category: "cleaning",
             image: "images/Pert Plus.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 87,
            name: " فانيليا دومو ",
            price:	0.7777 ,
            unit: " 28 غ تنك",
            category: "food",
             image: "images/Domo Vanilla.png",
            pictureClass: "cleaning-picture"
        },
          {
            id: 88,
            name: " لمبة  ",
            price:	1.1 ,
            unit: "  13 واط ",
            category: "Electrical",
             image: "images/13W Light Bulb.png",
            pictureClass: "cleaning-picture"
        },
      {
            id: 89,
            name: " بونبون مينت  ",
            price:	0.166 ,
            unit: "   ",
            category: "Snacks",
             image: "images/Mint Bonbon.png",
            pictureClass: "cleaning-picture"
        },
      {
            id: 90,
            name: " 	شاي ليبتون ",
            price:	2.77777 ,
            unit: " 100ظرف  ",
            category: "food",
             image: "images/Lipton Tea.png",
            pictureClass: "cleaning-picture"
        },
  {
             id: 91,
            name: " 	برايفت ماكسي بوكيت   ",
            price:  0.875,
            unit: "  *8 ",
            category: "cleaning",
             image: "images/Private Maxi.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 92,
            name: " السفير محارم  ",
            price:  0.35,
            unit: " 100غ",
            category: "cleaning",
             image: "images/Safeer Tissues.png",
            pictureClass: "cleaning-picture"
        },
 {
             id: 93,
            name: " ريماس محاشي ",
            price:  0.222 ,
            unit: " 40غ",
            category: "Snacks",
             image: "images/Rimas.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 94,
            name: " سميدس ",
            price:  7 ,
            unit: " 900غ",
            category: "dairy",
             image: "images/Smedes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 95,
            name: " خبز مرقوق ",
            price:  0.888 ,
            unit: "  ",
            category: "Bakery",
             image: "images/Markook bread.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 96,
            name: " 	كومفورت منعم للملابس",
            price:  3.8888,
            unit: " 2 ليتر ",
            category: "cleaning",
             image: "images/Comfort Fabric.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 97,
            name: " 	كراكي مالح ",
            price:  0.333 ,
            unit: " 2 ليتر ",
            category: "Snacks",
             image: "images/Salty Crackers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 98,
            name: " 	شعيرية راميتو ",
            price:  1.25 ,
            unit: "  750غ",
            category: "food",
             image: "images/Ramito vermicelli.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 99,
            name: " 	كادبري  ",
            price:  4.9 ,
            unit: "  500غ ",
            category: "Snacks",
             image: "images/Cadbury.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 100,
            name: " 		سائل جلي كرمل   ",
            price:  1.218 ,
            unit: "  1100مل",
            category: "Snacks",
             image: "images/Karmel.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 101,
            name: " برغل ابيض طراد  ",
            price:  4.287 ,
            unit: "  5ك",
            category: "food",
             image: "images/White Bulgur.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 102,
            name: " قداحة خفيف ",
            price: 0.166 ,
            unit: "   ",
            category: "Electrical",
             image: "images/Lighter.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 103,
            name: " دونات كريسبي",
            price: 0.6666 ,
            unit: "   ",
            category: "Snacks",
             image: "images/Krispy Donut.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 104,
            name: " مكنسة نايلون خشنة ",
            price: 1.2222 ,
            unit: "   ",
            category: "cleaning",
             image: "images/Coarse Nylon Broom.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 105,
            name: " سيف مقطع ",
            price: 0.45 ,
            unit: "  *12 ",
            category: "cleaning",
             image: "images/Scouring Pad.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 106,
            name: " 	ظرف حليب ديليش",
            price: 	0.175 ,
            unit: "    ",
            category: "dairy",
             image: "images/Delish Milk Sachet.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 107,
            name: " 	مايونيز جيرسي ",
            price: 	6.5 ,
            unit: "  3.785ليتر  ",
            category: "dairy",
             image: "images/Jersey Mayonnaise.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 108,
            name: " 	البني رول",
            price: 	0.7777 ,
            unit: "    ",
            category: "Snacks",
             image: "images/Al-Bani.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 109,
            name: " 	 فيتال اكياس تفريز سحاب",
            price: 0.9 ,
            unit: "   *18  ",
            category: "cleaning",
             image: "images/Freezing.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 110,
            name: " 	 صابون تي شو+ديتول غالون",
            price:2.25 ,
            unit: "   4 ليتر  ",
            category: "cleaning",
             image: "images/T-Show + Dettol Soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 111,
            name: " 	دبي بوظة كويين",
            price: 1.333 ,
            unit: "      ",
            category: "IceCream",
             image: "images/Dubai Queen Ice Cream.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 112,
            name: " 	جبنة موزيريلا بوك	 ",
            price: 12.222 ,
            unit: "   1800غ ",
            category: "dairy",
             image: "images/Puck Mozzarella Cheese.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 113,
            name: " 	 شطة",
            price: 2 ,
            unit: "   800غ  ",
            category: "food",
             image: "images/Freezing.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 114,
            name: " 	 مستر جوسي ",
            price: 0.888 ,
            unit: "  1 ليتر ",
            category: "drinks",
             image: "images/Mr. Juicy.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 115,
            name: " 	 بيض كبير",
            price: 2.444,
            unit: "    ",
            category: "food",
             image: "images/Large Eggs.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 116,
            name: " 	  خردل ميا ",
            price: 1 ,
            unit: "  260 غ",
            category: "food",
             image: "images/Mustard.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 117,
            name: " نيو بارك جبنة مطبوخة ",
            price: 1.555 ,
            unit: " 300 غ",
            category: "dairy",
             image: "images/New Park.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 118,
            name: " مالتيزرس ",
            price: 1 ,
            unit: " 37غ",
            category: "Snacks",
             image: "images/Maltesers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 119,
            name: " بهار فاهيتا ",
            price: 0.888 ,
            unit: " 100 غ",
            category: "spices",
             image: "images/Fajita Seasoning.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 120,
            name: " شامبو السادا ",
            price: 2.6666,
            unit: " 750مل",
            category: "cleaning",
             image: "images/Al-Sada.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 121,
            name: " بيغ ام ميغا  بندق  ",
            price: 0.175,
            unit: "  ",
            category: "Snacks",
             image: "images/Big M.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 122,
            name: " 	صندوق معتوق ساندويش كريمة ",
            price: 4.75,
            unit: "  ",
            category: "Snacks",
             image: "images/Maatouk Cream.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 123,
            name: " 	حلاوة سرور",
            price: 4.5,
            unit: " 1ك ",
            category: "food",
             image: "images/Surour Halawa.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 124,
            name: " 	وانتد بوبس كارمل",
            price: 0.277,
            unit: "  28غ",
            category: "Snacks",
            image: "images/Wanted.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 125,
            name: " 	قرقش	",
            price: 0.444,
            unit: "   ",
            category: "Snacks",
            image: "images/Qarqash.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 126,
            name: " 	منتوس رول	",
            price: 0.4 ,
            unit: "   ",
            category: "Snacks",
            image: "images/Mentos Roll.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 127,
            name: " 	صندوق مستر جوسي   ",
            price: 4.7777 ,
            unit: " *30	  ",
            category: "drinks",
            image: "images/Mr. Juicy (Box.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 128,
            name: " 	اسطنبولي بلدي  ",
            price: 5 ,
            unit: " *1ك	  ",
            category: "food",
            image: "images/Istanbuli Baladi.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 129,
            name: " 	اوسلو كيك ريد لوف  ",
            price: 0.23 ,
            unit: "    ",
            category: "Snacks",
            image: "images/Oslo Red Love Cake.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 130,
            name: " 	معالق بلاستيك ",
            price: 0.6666 ,
            unit: "  *50  ",
            category: "cleaning",
            image: "images/Plastic Spoons.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 131,
            name: " 	ام اند ام ",
            price: 0.7777 ,
            unit: "     ",
            category: "Snacks",
            image: "images/M&M's.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 132,
            name: " 	مرتديلا الراعي ",
            price: 1.3888 ,
            unit: "   200غ   ",
            category: "food",
            image: "images/Al-Ra'i Mortadella.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 133,
            name: " 	يانسون ناعم",
            price: 0.424 ,
            unit: "      ",
            category: "spices",
            image: "images/Fennel (Ground or Coarse).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 134,
            name: " 	براوني كيك هازلنت  ",
            price: 0.6666 ,
            unit: "   40غ   ",
            category: "Snacks",
            image: "images/Hazelnut Brownie Cake.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 135,
            name: " 	 لوز مدخن الرئيف ",
            price: 	0.388 ,
            unit: "      ",
            category: "Snacks",
            image: "images/Al-Ra'if Smoked Almonds.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 136,
            name: " 	زيت انجي ",
            price: 	7.555 ,
            unit: "    5 ليتر  ",
            category: "food",
            image: "images/Inji Oil.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 137,
            name: " 	مصاصة تشوبا تشوبس ",
            price: 	0.106 ,
            unit: "      ",
            category: "Snacks",
            image: "images/Chupa Chups Lollipop.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 138,
            name: " 	توست محمص شمسين",
            price: 	1.2 ,
            unit: "      ",
            category: "Bakery",
            image: "images/Shamsin Toasted Bread (Toast).png",
            pictureClass: "cleaning-picture"
        },

{
             id: 139,
            name: " 	شومر ناعم او خشن",
            price: 	0.666 ,
            unit: "   100غ   ",
            category: "spices",
            image: "images/Fennel (Ground or Coarse).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 140,
            name: " 	تمر خضري عادي ",
            price: 	1.11 ,
            unit: "  400غ  ",
            category: "food",
            image: "images/Regular Khodri Dates.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 141,
            name: " 	  سكر  لوباس ",
            price: 	4.555 ,
            unit: "  5ك ",
            category: "food",
            image: "images/Lubas sugar (5 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 142,
            name: " 	 زعتر اسرتي",
            price: 	2.1 ,
            unit: "  1ك",
            category: "food",
            image: "images/Usrati Thyme (Za'atar).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 143,
            name: " 	 سكر نبات الجودة  ",
            price: 	1.11 ,
            unit: "  200 غ ",
            category: "food",
            image: "images/nabat sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 144,
            name: " 	 مرطبان زجاج ",
            price: 0.4444 ,
            unit: "  1ك",
            category: "food",
            image: "images/Glass Jar (1 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 145,
            name: " 	سكر ناعم الفيحاء ",
            price: 1 ,
            unit: "  900غ ",
            category: "food",
            image: "images/Al-Fayhaa Fine Sugar.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 146,
            name: " 	هيستيريا شوكولا",
            price: 	0.222 ,
            unit: "   ",
            category: "Snacks",
            image: "images/Hysteria Chocolate.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 147,
            name: " 	رز مصري زين ",
            price: 4.444 ,
            unit: "  5ك",
            category: "food",
            image: "images/Zein Egyptian Rice (5 kg).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 148,
            name: " 	 ظرف عصير دارينا",
            price: 0.222 ,
            unit: "   ",
            category: "drinks",
            image: "images/Darina Juice Sachet.png",
            pictureClass: "cleaning-picture"
        },

{
             id: 149,
            name: "  	صابون جيف يدين  ",
            price: 0.2777 ,
            unit: "  76غ ",
            category: "cleaning",
            image: "images/Cif Hand Soap.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 150,
            name: "  	الفيف  دريم لونغ ",
            price:3.8888,
            unit: "  400 مل",
            category: "cleaning",
            image: "images/Elvive Dream Long.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 151,
            name: "  	كيس بالون ",
            price:1.111,
            unit: "  *100",
            category: "cleaning",
            image: "images/Bag of balloons.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 152,
            name: "  		فرشاة اسنان اورال ب سوفت",
            price:0.5555,
            unit: "   ",
            category: "cleaning",
            image: "images/Oral-B Soft Toothbrush.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 153,
            name: "  بالون مصران",
            price:0.555,
            unit: "   ",
            category: "cleaning",
            image: "images/Balloon  erpentine).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 154,
            name: "  تمر خضري فلت",
            price:2.6666,
            unit: "  1ك ",
            category: "food",
            image: "images/Khudri Dates (loose).png",
            pictureClass: "cleaning-picture"
        },
{
             id: 155,
            name: "  زيت الوردة دوار ",
            price:5.777,
            unit: "  5 ليتر",
            category: "food",
            image: "images/Al-Warda Sunflower Oil.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 156,
            name: "  كعك اكسترا ريداني ",
            price:2.111,
            unit: "  800غ ",
            category: "Bakery",
            image: "images/Extra Ridani Cakes.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 157,
            name: " علبةاولكر بيسكريم ",
            price:9.5,
            unit: "  *18 ",
            category: "Snacks",
            image: "images/Ülker Bisrem Box.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 158,
            name: "  البني بار كيك",
            price:0.6666,
            unit: "    ",
            category: "Snacks",
            image: "images/Al-Bani.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 159,
            name: "  برينس ",
            price:0.833,
            unit: " 80غ   ",
            category: "Snacks",
            image: "images/Prince.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 160,
            name: "  اوزمو فان ",
            price:0.675,
            unit: "    ",
            category: "Snacks",
            image: "images/Osmo Fan.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 161,
            name: "  عجينة بصمة",
            price:2.7222,
            unit: "  800غ  ",
            category: "Bakery",
            image: "images/Basma Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 162,
            name: "  عجينة الاوزي فوزي",
            price:1.3111,
            unit: "    ",
            category: "Bakery",
            image: "images/Fawzi Ouzi Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 163,
            name: " شيش برك فوزي",
            price:1.4,
            unit: "    ",
            category: "Bakery",
            image: "images/Fawzi Shish Barak.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 164,
            name: " 	التاج شطة حارة",
            price:0.5,
            unit: "    ",
            category: "food",
            image: "images/Al-Taj Hot Sauce.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 165,
            name: " 	اوريو",
            price:0.833,
            unit: "   102غ	  ",
            category: "Snacks",
            image: "images/Oreo.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 166,
            name: " 	عجينة بيتزا فوزي",
            price:1.7111,
            unit: "     ",
            category: "Bakery",
            image: "images/Fawzi Pizza Dough.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 167,
            name: " 	رقائق طويلة",
            price:2,
            unit: "     ",
            category: "Bakery",
            image: "images/Long Chips.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 168,
            name: " 	رقائق لف",
            price:1.5	,
            unit: "     ",
            category: "Bakery",
            image: "images/Wrappers.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 169,
            name: " 	شوربة ماجي ",
            price:2	,
            unit: "  عرض   ",
            category: "food",
            image: "images/Maggi Soup.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 170,
            name: " 	لوح داماك",
            price:0.833	,
            unit: "     ",
            category: "Snacks",
            image: "images/Damac Board.png",
            pictureClass: "cleaning-picture"
        },
{
             id: 171,
            name: " 	بهار مغربية ",
            price:0.666	,
            unit: "  100   ",
            category: "spices",
            image: "images/Morocco.png",
            pictureClass: "cleaning-picture"
        },
        {
             id: 172,
            name: " 		محارم معطرة غود لايف",
            price:0.833		,
            unit: "      ",
            category: "cleaning",
            image: "images/Morocco.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 173,
            name: " 			موزوريلا فرسانا ",
            price: 1.277	,
            unit: "  200غ    ",
            category: "dairy",
            image: "images/Farsana Mozzarella.png",
            pictureClass: "cleaning-picture"
        },
                    {
             id: 174,
            name: " ديروني خردل",
            price: 1.65	,
            unit: "   8 اونز   ",
            category: "food",
            image: "images/Deroni Mustard 8 oz.png",
            pictureClass: "cleaning-picture"
        },
                            {
             id: 175,
            name: "  ديروني رز ايطالي جامبو  ",
            price:2	,
            unit: "   900غ  ",
            category: "food",
            image: "images/Deroni Italian Rice (Jumbo).png",
            pictureClass: "cleaning-picture"
        },
                                    {
             id: 176,
            name: "  عكاوي بلدي ",
            price:7.7777	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Baladi Akawi Cheese.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 177,
            name: "  جبنة فيتا",
            price:3.888	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Feta Cheese.png",
            pictureClass: "cleaning-picture"
        },
          {
             id: 178,
            name: "  جبنة نابلسي",
            price:6	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Nabulsi Cheese.png",
            pictureClass: "cleaning-picture"
        },
                  {
             id: 179,
            name: " 	جبنة مسنرة",
            price:3.611	,
            unit: "  1ك ",
            category: "dairy",
            image: "images/Musanara Cheese.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 180,
            name: " 	 زيتون بلدي ",
            price:3.333	,
            unit: "  1ك ",
            category: "food",
            image: "images/Local Olives.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 181,
            name: " 	مكنة حلاقة فينيس",
            price:2	,
            unit: "  1ك ",
            category: "cleaning",
            image: "images/Venus Razor.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 182,
            name: " 	 مكدوس مرطبان",
            price:	3.222	,
            unit: "  ",
            category: "food",
            image: "images/Makdous (jar).png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 183,
            name: " 	ملح ملوك",
            price:	0.111	,
            unit: " 700غ ",
            category: "food",
            image: "images/Kings Salt.png",
            pictureClass: "cleaning-picture"
        },
            {
             id: 184,
            name: " 	سميد سفرتي",
            price:	0.944	,
            unit: "  ",
            category: "food",
            image: "images/Safrati Semolina.png",
            pictureClass: "cleaning-picture"
        },
                    {
             id: 185,
            name: " 	كيك سابليه ",
            price:	0.222	,
            unit: "  ",
            category: "Snacks",
            image: "images/Sablé Cake.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 186,
            name: " 	زي كولا",
            price:	0.333	,
            unit: " 250 مل ",
            category: "drinks",
            image: "images/Z-Cola.png",
            pictureClass: "cleaning-picture"
        },
   {
             id: 187,
            name: "  بن حموي اكسترا هال",
            price:	10.6666	,
            unit: " 450غ",
            category: "food",
            image: "images/Bin Hamwi Extra Hall.png",
            pictureClass: "cleaning-picture"
        },
           {
             id: 188,
            name: "  	لازانيا ريجيا ",
            price:	2.555	,
            unit: " ",
            category: "food",
            image: "images/Lasagna Reggia.png",
            pictureClass: "cleaning-picture"
        },
                   {
             id: 189,
            name: "  		المراعي جبنة مطبوخة",
            price:	2.89	,
            unit: " 1ك ",
            category: "dairy",
            image: "images/Almarai Processed Cheese.png",
            pictureClass: "cleaning-picture"
        },
                          {
             id: 190,
            name: "  		 حليب كانديا نصف دسم ",
            price:	1.8333		,
            unit: " 1ليتر",
            category: "dairy",
            image: "images/Candia Semi-Skimmed.png",
            pictureClass: "cleaning-picture"
        }
    ];

    let activeMarketFilter = "all";
    let marketCart = [];


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
        price.textContent = cartMoney(
            item.price * item.quantity
        );

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
        (sum, item) => sum + item.price * item.quantity, 0
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
        ...gharibProducts.map((p, index) => ({...p, section: "غريب تشكن", searchIndex: index}))
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
    } else if (section === "غريب تشكن") {
        gharibShowAll = true;
        renderGharibProducts();
        grid = gharibGrid;
    }
    if (!grid) return;
    const selector = section === "غريب تشكن"
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
    else if (section === "غريب تشكن") {
        document.getElementById("gharibSection")?.scrollIntoView({behavior:"smooth"});
    }
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
            ["supermarketScreen", "vegetablesScreen", "butcherScreen", "cleaningScreen"]
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
