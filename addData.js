const mongoose = require('mongoose');
const Products = require('./models/productModel');
const expree = require('express');
const { sellerProducts } = require('./controllers/productController');
const SellerCart = require('./models/sellerCartModel');

const data = [
    {
      "title": "Fresho Apple - Red Delicious, Regular, 4 pcs (Approx. 530g - 640g) ",
      "category": "Fruits & Vegetables",
      "mrp": "175",
      "image": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
      "description": {
        "details": "            The bright red coloured and heart shaped Red Delicious apples are crunchy, juicy and slightly sweet. Red Delicious Apples are a natural source of fibre and are fat free. They contain a wide variety of anti-oxidants and polynutrients. <br> Do not forget to check our delicious fruit recipe - <strong><a href=\"https://www.bigbasket.com/cookbook/recipes/241/apple-halwa/\">https://www.bigbasket.com/cookbook/recipes/241/apple-halwa/</a> </strong>",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Carrot - Ooty, 500 g  ",
      "category": "Fruits & Vegetables",
      "mrp": "26",
      "image": ["5.jpg", "6.jpg", "7.jpg", "8.jpg"],
      "description": {
        "details": "            A popular sweet-tasting root vegetable, Carrots are narrow and cone shaped. They have thick, fleshy, deeply colored root, which grows underground, and feathery green leaves that emerge above the ground. While these greens are fresh tasting and slightly bitter, the carrot roots are crunchy textured with a sweet and minty aromatic taste. Fresho brings you the flavour and richness of the finest bright orange, crispy and juicy carrots. <br> Do not forget to check our delicious recipe - <strong><a href=\"https://www.bigbasket.com/cookbook/recipes/1203/carrot-or-gajar-ki-burfi/\">https://www.bigbasket.com/cookbook/recipes/1203/carrot-or-gajar-ki-burfi/</a> </strong>",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Cabbage, 1 pc (approx. 500 g to 800 g) ",
      "category": "Fruits & Vegetables",
      "mrp": "38",
      "image": [
        "9.jpg",
        "10.jpg",
        "11.jpg",
        "12.jpg",
        "13.jpg",
        "14.jpg",
        "15.jpg",
        "16.jpg"
      ],
      "description": {
        "details": "            With a texture of crispness and juiciness the moment you take the first bite, cabbages are sweet and grassy flavoured with dense and smooth leafy layers. <br> Do not forget to check our delicious recipe - <strong><a href=\"https://www.bigbasket.com/cookbook/recipes/710/cabbage-chowder/\">https://www.bigbasket.com/cookbook/recipes/710/cabbage-chowder/</a> </strong>",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Potato, 1 kg  ",
      "category": "Fruits & Vegetables",
      "mrp": "56",
      "image": ["17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg"],
      "description": {
        "details": "            Fresho Potatoes are nutrient-dense, non-fattening and have reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibers and essential minerals such as copper, magnesium, and iron. In India, potatoes are probably the second-most consumed vegetables after onions.",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Cauliflower, 1 pc (approx. 400 to 600 g) ",
      "category": "Fruits & Vegetables",
      "mrp": "65",
      "image": [
        "23.jpg",
        "24.jpg",
        "25.jpg",
        "26.jpg",
        "27.jpg",
        "28.jpg",
        "29.jpg",
        "30.jpg"
      ],
      "description": {
        "details": "            Cauliflower is made up of tightly bound clusters of soft, crumbly, sweet cauliflower florets that form a dense head. Resembling a classic tree, the florets are attached to a central edible white trunk which is firm and tender. <strong><a href=\"https://www.bigbasket.com/cookbook/recipes/2144/cauliflower-cheese-pancakes/\">https://www.bigbasket.com/cookbook/recipes/2144/cauliflower-cheese-pancakes/</a> </strong>",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Banana - Yelakki, 500 g  ",
      "category": "Fruits & Vegetables",
      "mrp": "104",
      "image": [
        "31.jpg",
        "32.jpg",
        "33.jpg",
        "34.jpg",
        "35.jpg",
        "36.jpg",
        "37.jpg",
        "38.jpg"
      ],
      "description": {
        "details": "            Fresh, tiny small sized, directly procured from the farm, this variety is called Yelakki in Bangalore and Elaichi in Mumbai. Despite its small size, they are naturally flavoured, aromatic and sweeter compared to regular bananas. Yelakki bananas are around 3- 4 inches long, and contain a thinner skin and better shelf life than Robusta bananas. <br> Do not forget to check our delicious fruit recipe - <strong><a href=\"https://www.bigbasket.com/cookbook/recipes/573/banana-pancake/\">https://www.bigbasket.com/cookbook/recipes/573/banana-pancake/</a> </strong>",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "bb Popular Sugar, 5 kg  ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "300",
      "image": [
        "39.jpg",
        "40.jpg",
        "41.jpg",
        "42.jpg",
        "43.jpg",
        "44.jpg",
        "45.jpg",
        "46.jpg",
        "47.jpg",
        "48.jpg",
        "49.jpg",
        "50.jpg",
        "51.jpg",
        "52.jpg"
      ],
      "description": {
        "details": "            <p>Sugar is the generalized name for sweet. Sugar is made from Sugarcane, the grains are light cream coloured. This is made from high-class sugarcane and is purified under a firm process is to produce organic manure, organic sugar cane like dung or compost is used.</p>",
        "manufacturer": "bb Popular",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "BORGES Olive Oil - Extra Light, 2x2 L Multipack ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "4700",
      "image": [
        "53.jpg",
        "54.jpg",
        "55.jpg",
        "56.jpg",
        "57.jpg",
        "58.jpg",
        "59.jpg",
        "60.jpg",
        "61.jpg",
        "62.jpg",
        "63.jpg",
        "64.jpg"
      ],
      "description": {
        "details": "            <p>Borges Light Flavour Olive Oil has a very soft taste allowing the flavours of other ingredients to come during. It is perfect for frying and baking and respected by cooks who desire the healthy benefits of olive oil but not a different olive taste.</p>",
        "manufacturer": "BORGES",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Aashirvaad Atta - Whole Wheat, 10 kg Pouch ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "340",
      "image": [
        "65.jpg",
        "66.jpg",
        "67.jpg",
        "68.jpg",
        "69.jpg",
        "70.jpg",
        "71.jpg",
        "72.jpg",
        "73.jpg",
        "74.jpg",
        "75.jpg",
        "76.jpg",
        "77.jpg",
        "78.jpg",
        "79.jpg",
        "80.jpg"
      ],
      "description": {
        "details": "",
        "manufacturer": "Aashirvaad",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fortune  Sunflower Refined Oil, 1 L Pouch ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "115",
      "image": [
        "81.jpg",
        "82.jpg",
        "83.jpg",
        "84.jpg",
        "85.jpg",
        "86.jpg",
        "87.jpg",
        "88.jpg",
        "89.jpg",
        "90.jpg",
        "91.jpg",
        "92.jpg",
        "93.jpg",
        "94.jpg"
      ],
      "description": {
        "details": "            Fortune Sunflower Oil is a light, healthy and nutritious cooking oil. Being rich in vitamins and consisting mainly of polyunsaturated fatty acids, it makes food easy to digest.",
        "manufacturer": "Fortune ",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "bb Popular Almond/Badam - Californian, Giri, 500 g Pouch ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "550",
      "image": [
        "95.jpg",
        "96.jpg",
        "97.jpg",
        "98.jpg",
        "99.jpg",
        "100.jpg",
        "101.jpg",
        "102.jpg",
        "103.jpg",
        "104.jpg",
        "105.jpg",
        "106.jpg",
        "107.jpg",
        "108.jpg"
      ],
      "description": {
        "details": "            Almonds are light brown skinned, tough, edible seeds of the almond fruit. They have a wealthy yet subtle bitter-sweet flavor. These are assets of nutrients, especially protein, dietary fibre, mono-unsaturated fatty acids and B complex vitamins. Also, it is wealthy in vitamin E and minerals such as potassium, calcium, manganese, zinc, iron and selenium. <br> Click here for unique and delicious recipes - https://www.bigbasket.com/flavors/collections/231/dry-fruits-berries-nuts/",
        "manufacturer": "bb Popular",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Tata Salt Iodized, 1 kg Pouch ",
      "category": "Foodgrains , Oil & Masla",
      "mrp": "19",
      "image": [
        "109.jpg",
        "110.jpg",
        "111.jpg",
        "112.jpg",
        "113.jpg",
        "114.jpg",
        "115.jpg",
        "116.jpg",
        "117.jpg",
        "118.jpg"
      ],
      "description": {
        "details": "            Tata and quality are synonymous in the world today. Tata Iodized Salt has been a staple in kitchens for generations now. This salt was first manufactured by Tata in a vacuum sealed pack, around the year 1983. Salt is one of the most important ingredients we use in food and cooking. It is a good method for food fortification and it also adds taste and flavour to any dish.",
        "manufacturer": "Tata Salt",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Nandini GoodLife Toned Milk, 500 ml Pouch ",
      "category": "Bakery, Cakes & Dairy",
      "mrp": "25",
      "image": [
        "119.jpg",
        "120.jpg",
        "121.jpg",
        "122.jpg",
        "123.jpg",
        "124.jpg",
        "125.jpg",
        "126.jpg",
        "127.jpg",
        "128.jpg"
      ],
      "description": {
        "details": "            Goodlife Smart Homogenised Double Toned Milk UHT processed milk with Min 1.5% fat and Min 9.0% SNF fortified with vitamins A and D. Suitable for preparing tea/coffee, milk shakes and milk delights for people leading a fitness conscious lifestyle. Not a day passes by when we do not need milk on a regular basis. If there are children in the house, milk is a must. Your morning tea or coffee is incomplete without it; breakfast cornflakes calls for it too. Besides its regular use, milk can be used for so many other things. Whip up a batch of cookies or bake some delicious cakes with milk. Scrambled eggs are so much fluffier and tastier, thanks to a dash of milk. Not to forget homemade milkshakes. There is so much you can do with just a cup of milk!",
        "manufacturer": "Nandini GoodLife",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Amul Butter - Pasteurised, 500 g Carton ",
      "category": "Bakery, Cakes & Dairy",
      "mrp": "225",
      "image": ["129.jpg", "130.jpg"],
      "description": {
        "details": "            Amul is synonymous with Butter in India.<br>\r",
        "manufacturer": "Amul",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Nandini GoodLife Toned Milk, 1 L Carton ",
      "category": "Bakery, Cakes & Dairy",
      "mrp": "53",
      "image": [
        "131.jpg",
        "132.jpg",
        "133.jpg",
        "134.jpg",
        "135.jpg",
        "136.jpg",
        "137.jpg",
        "138.jpg",
        "139.jpg",
        "140.jpg",
        "141.jpg",
        "142.jpg",
        "143.jpg",
        "144.jpg"
      ],
      "description": {
        "details": "            Goodlife Cow milk is UHT processed milk with Min.3.% fat and Min. 8.5% SNF. Suitable for all generation.",
        "manufacturer": "Nandini GoodLife",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Amul Malai Paneer, 200 g Pouch ",
      "category": "Bakery, Cakes & Dairy",
      "mrp": "66",
      "image": [
        "145.jpg",
        "146.jpg",
        "147.jpg",
        "148.jpg",
        "149.jpg",
        "150.jpg",
        "151.jpg",
        "152.jpg",
        "153.jpg",
        "154.jpg"
      ],
      "description": {
        "details": "            Equivalent to Cream Cottage cheese.<br>\r\r",
        "manufacturer": "Amul",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Sandwich Bread - Safe, Preservative Free, 200 g  ",
      "category": "Bakery, Cakes & Dairy",
      "mrp": "29",
      "image": ["155.jpg", "156.jpg", "157.jpg", "158.jpg"],
      "description": {
        "details": "            Fresho bread is one of life's greatest pleasures. Our breads are made using the finest ingredients. We make this bread extra special, so we hope you will enjoy eating it as much as we enjoyed baking it. Soft and delicious bread, perfect for all types of sandwiches!",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
        {
          "title": "Red Label Tea - Natural Care, 1 kg  ",
          "category": "Beverages",
          "mrp": "480",
          "image": [
            "800.jpg",
            "801.jpg",
            "802.jpg",
            "803.jpg",
            "804.jpg",
            "805.jpg",
            "806.jpg",
            "807.jpg",
            "808.jpg",
            "809.jpg"
          ],
          "description": {
            "details": "            Red label natural care is from the house of Brooke bond and the brand red label. Red label natural care tea contains the goodness of 5 natural ingredients - cardamom, ginger, tulsi, mulethi & ashwagandha, all of them are extremely beneficial for your body as they enhance immunity while giving a unique flavour to the rich tea. Red label natural care tea is also available in tea bags!<br>\r\r",
            "manufacturer": "Red Label",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Kinley Sparkling Water - Club Soda, 750 ml PET Bottle ",
          "category": "Beverages",
          "mrp": "50",
          "image": [
            "810.jpg",
            "811.jpg",
            "812.jpg",
            "813.jpg",
            "814.jpg",
            "815.jpg",
            "816.jpg",
            "817.jpg",
            "818.jpg",
            "819.jpg",
            "820.jpg",
            "821.jpg"
          ],
          "description": {
            "details": "            When it comes to safety and assurance of quality, Kinley soda water is the go-to choice. Launched in 2002, the bubbly zing of Kinley soda makes a perfect mixer for your mocktails and is the perfect companion to your imagination with the extra punch!\r\r\r",
            "manufacturer": "Kinley",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Taj Mahal Tea, 1 kg Carton ",
          "category": "Beverages",
          "mrp": "445",
          "image": [
            "822.jpg",
            "823.jpg",
            "824.jpg",
            "825.jpg",
            "826.jpg",
            "827.jpg",
            "828.jpg",
            "829.jpg",
            "830.jpg",
            "831.jpg",
            "832.jpg",
            "833.jpg"
          ],
          "description": {
            "details": "            50 Glorious years of Excellence </b> <br>&bull; When the history of Tea is written down, 1966 will be a celebrated Chapter. For in that year, Brooke Bond Taj Mahal Tea was born, with a promise - To foster excellence in each Cup. Fifty years on, we have not forgotten that promise. Ordinary teas usually provide either strength of just flavour. However, Only Brooke Bond Taj Mahal Tea contains the precious essence of the Finest fresh tea leaves, giving you the perfect balance of strength and flavor. A flavor, which can only be matched by the exquisite melodies composed by the maestros who have been our ambassadors over the decades.<br>&bull; Rigor in Selection and Blending<br>&bull; The tea from every tea estate has its own taste - because of its terroir, pluck and flush. How then do we turn it all into the unique Taj experience for our customers - year after year? Enter our master tasters and blenders, and their traditions, built over many years. It takes millions of tastings and years of experience to be a taste for Taj Mahal Tea. The brew is golden-orange in colour, has a rich taste and an uplifting aroma.<br>&bull; So go ahead, savour the flavour of this historic blend, and enjoy the perfect taste of this priceless cup of tea and exclaim- Wah Taj!<br><b>Features & Benefits - </b><br>&bull; Taj Mahal Teas are Tasted, graded and perfectly blended at the Brooke bond Tea Excellence Centre<br> &bull; Taj Mahal tea comes in a Unique Flavor Lock pack<br>&bull; A cup of Taj Mahal tea invites you to cheer your senses<br>&bull; Perfect balance of strength and flavor<br>&bull; Blended Since 1966<br>&bull; Also available in Tea bags",
            "manufacturer": "Taj Mahal",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Tata Tea Gold Tea, 1 Kg  ",
          "category": "Beverages",
          "mrp": "420",
          "image": [
            "834.jpg",
            "835.jpg",
            "836.jpg",
            "837.jpg",
            "838.jpg",
            "839.jpg",
            "840.jpg",
            "841.jpg",
            "842.jpg",
            "843.jpg"
          ],
          "description": {
            "details": "            <p>In the place, where the valley meets the mountains, Tata Tea Gold is born. An exquisite tea that combines the rich fullness of fine valley grown teas from Assam with the irresistible aroma of specially selected long leaves from highlands. Expertly blended by the master craftsmen from Tata Tea, this marque national black tea offering from Tata Tea&rsquo;s portfolio has been specially crafted for the discerning tea consumers. Taste so rich and aroma are so irresistible that it will leave you longing for more!</p>",
            "manufacturer": "Tata Tea Gold",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        
        {
          "title": "MAGGI  2-Minute Instant Noodles - Masala, 560 g Pouch ",
          "category": "Snacks",
          "mrp": "86",
          "image": [
            "844.jpg",
            "845.jpg",
            "846.jpg",
            "847.jpg",
            "848.jpg",
            "849.jpg",
            "850.jpg",
            "851.jpg",
            "852.jpg",
            "853.jpg",
            "854.jpg",
            "855.jpg",
            "856.jpg",
            "857.jpg"
          ],
          "description": {
            "details": "            <p>India&rsquo;s favourite Masala Noodles, MAGGI 2-minute Noodles, now comes with the goodness of Iron. Each portion (70g) of MAGGI Masala Noodles provides you with 15% of your daily Iron requirement (*as per the Daily Dietary Allowances for an Adult Sedentary Male (ICMR 2010). Containing your favourite masala taste, MAGGI noodles are made with the choicest quality spices. Make your bowl of MAGGI even better by chopping up some vegetables, dropping in an egg or throwing in your favourite ingredients.&nbsp;</p>",
            "manufacturer": "MAGGI ",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Cadbury Oreo Biscuit - Vanilla Creme, 3x120 g Multipack ",
          "category": "Snacks",
          "mrp": "87",
          "image": ["858.jpg", "859.jpg"],
          "description": {
            "details": "            Oreo sandwich creme biscuit brings together the rich, smooth taste of Vanilla creme filling with the bold taste of two crunchy Chocolate wafers. Take a delicious break with an Oreo cookie, the perfect anytime snack.",
            "manufacturer": "Cadbury",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Parle Gluco Biscuits - Parle-G, 800 g Pouch ",
          "category": "Snacks",
          "mrp": "60",
          "image": [
            "860.jpg",
            "861.jpg",
            "862.jpg",
            "863.jpg",
            "864.jpg",
            "865.jpg",
            "866.jpg",
            "867.jpg",
            "868.jpg",
            "869.jpg",
            "870.jpg",
            "871.jpg"
          ],
          "description": {
            "details": "            Filled with the goodness of milk and wheat, Parle-G is a source of all round nourishment. Treat yourself to a pack of yummy Parle-G biscuits to experience what has nurtured and strengthened millions of people for over 70 years. A meal substitute for some and a tasty and healthy snack for many others. Consumed by some for the value it offers, and many others for its taste. Whatever the occasion, it has always been around as an instant source of nourishment.",
            "manufacturer": "Parle",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Britannia Biscuits - Little Hearts, 6x34.5 g Multi Pack ",
          "category": "Snacks",
          "mrp": "60",
          "image": [
            "872.jpg",
            "873.jpg",
            "874.jpg",
            "875.jpg",
            "876.jpg",
            "877.jpg",
            "878.jpg",
            "879.jpg",
            "880.jpg",
            "881.jpg",
            "882.jpg",
            "883.jpg"
          ],
          "description": {
            "details": "            Britannia Little Hearts are small heart-shaped cookies that are crisp and sprinkled with powdered sugar. These are ideal for a delicious light snack or can be enjoyed with tea or coffee.",
            "manufacturer": "Britannia",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Quaker Oats, 1.5 kg Pouch ",
          "category": "Snacks",
          "mrp": "229",
          "image": [
            "884.jpg",
            "885.jpg",
            "886.jpg",
            "887.jpg",
            "888.jpg",
            "889.jpg",
            "890.jpg",
            "891.jpg",
            "892.jpg",
            "893.jpg",
            "894.jpg",
            "895.jpg",
            "896.jpg",
            "897.jpg"
          ],
          "description": {
            "details": "            Start your morning with a wholesome bowl of Quaker Oats- the perfect breakfast porridge for the whole family.\r\r",
            "manufacturer": "Quaker",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Lays Potato Chips - Calm Cream &amp; Onion Flavour, 30 g Pouch ",
          "category": "Snacks",
          "mrp": "10",
          "image": [
            "898.jpg",
            "899.jpg",
            "900.jpg",
            "901.jpg",
            "902.jpg",
            "903.jpg",
            "904.jpg",
            "905.jpg",
            "906.jpg",
            "907.jpg",
            "908.jpg",
            "909.jpg"
          ],
          "description": {
            "details": "            <p>Relish the delectable combination of sour and cream perfectly blended with herb and onion flavour. Delicious individual bags: perfect for snacking at work, home or school. Combining two great flavours, this one is absolutely delicious! Call your friends over or get ready to watch a movie no matter what you do, make sure you have this yummy snack close by.</p><p>Lays, the worlds largest and favourite snack food brand, has steadily established itself as an indispensable part of Indias snacking culture since its launch in 1995. With its irresistible taste, international and Indian flavours, Lays has established itself as a youth brand and continues to grow in the hearts and minds of its consumers.&nbsp;</p><p>Lays is made with Indias best-quality fresh potatoes, simply sliced and cooked in edible vegetable oils, and then seasoned with delicious flavours!</p>",
            "manufacturer": "Lays",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Head &amp; shoulders Anti-Dandruff Shampoo - Cool Menthol, 650 ml  ",
          "category": "https://www.bigbasket.com/pd/266639/close-up-everfresh-anti-germ-gel-toothpaste-red-hot-150-g/?nc=cl-bh-pl&t_pg=Beauty-Hygiene&t_p=beauty-hygiene&t_s=cl-bh-pl&t_pos=16&t_ch=desktop",
          "mrp": "450",
          "image": [
            "910.jpg",
            "911.jpg",
            "912.jpg",
            "913.jpg",
            "914.jpg",
            "915.jpg",
            "916.jpg",
            "917.jpg",
            "918.jpg",
            "919.jpg",
            "920.jpg",
            "921.jpg"
          ],
          "description": {
            "details": "            With a shot of tingly menthol for revitalising freshness. Leaves hair up to 100% dandruff free gentle enough for everyday use, even for color or chemically treated hair. Formulated with Head & Shoulders Fresh Scent Technology featuring enhanced fragrance notes for an improved in-shower scent experience up to 100% dandruff free. Visible flakes with regular use <br> For Beauty tips, tricks & more visit https://bigbasket.blog/",
            "manufacturer": "Head &amp; shoulders",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Vaseline Intensive Care Cocoa Glow Body Lotion, 3x400 ml Multipack ",
          "category": "https://www.bigbasket.com/pd/266639/close-up-everfresh-anti-germ-gel-toothpaste-red-hot-150-g/?nc=cl-bh-pl&t_pg=Beauty-Hygiene&t_p=beauty-hygiene&t_s=cl-bh-pl&t_pos=16&t_ch=desktop",
          "mrp": "855",
          "image": ["922.jpg", "923.jpg"],
          "description": {
            "details": "            <p>With daily exposure to environmental triggers, skin's natural moisture barrier can break down, allowing for water to escape the skin. The healing micro-droplets of Vaseline&reg; Jelly in our lotion for dry skin locks in moisture to allow the skin's natural barrier to recovering. Smooth, glowing skin can be yours with Vaseline Intensive Care Cocoa Glow Body Lotion. Your skin won't feel oily after using this body moisturizer &ndash; the fast-absorbing formula moisturises the skin but leaves it feeling soft and glowing, without feeling greasy. Vaseline Intensive Care Cocoa Glow Body Lotion helps keep your skin looking healthy and Glowing. Our rich formula combines 100% pure cocoa and shea butter, giving your skin a natural glow. Deep Moisturising Daily Body Lotion Vaseline Cocoa Glow goes beyond basic moisturization. Our Intensive Care range works to helps heal* dry skin deep down**. Vaseline Intensive Care Cocoa Glow Lotion contains micro-droplets of Vaseline&reg; Jelly that lock in moisture. Our moisturising lotion restores the essential moisture your skin needs with a blend of nourishing ingredients and gives skin a natural, healthy glow. Vaseline Intensive Care Cocoa Glow Body Lotion is also infused with cocoa butter and has a pleasant, subtle fragrance. Does the Vaseline smart pump unlock with just a 90? turn. With quick-lock technology, the pump locks in the raised position after a quarter turn, for easier use and no mess.</p>",
            "manufacturer": "Vaseline",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Santoor Classic Handwash, 200 ml Buy 1 Get 1 Free ",
          "category": "https://www.bigbasket.com/pd/266639/close-up-everfresh-anti-germ-gel-toothpaste-red-hot-150-g/?nc=cl-bh-pl&t_pg=Beauty-Hygiene&t_p=beauty-hygiene&t_s=cl-bh-pl&t_pos=16&t_ch=desktop",
          "mrp": "110",
          "image": ["924.jpg", "925.jpg", "926.jpg", "927.jpg"],
          "description": {
            "details": "            Santoor Classic Handwash is enriched with the natural goodness of Sandalwood and Tulsi that offers a unique dual benefit of tough on germs and soft on hands. It will clean your hands without the feeling of dryness and the mild scent will leave your hands fragrant.",
            "manufacturer": "Santoor",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Savlon Antiseptic - Disinfectant Liquid, 1 L  ",
          "category": "https://www.bigbasket.com/pd/266639/close-up-everfresh-anti-germ-gel-toothpaste-red-hot-150-g/?nc=cl-bh-pl&t_pg=Beauty-Hygiene&t_p=beauty-hygiene&t_s=cl-bh-pl&t_pos=16&t_ch=desktop",
          "mrp": "197",
          "image": [
            "928.jpg",
            "929.jpg",
            "930.jpg",
            "931.jpg",
            "932.jpg",
            "933.jpg",
            "934.jpg",
            "935.jpg",
            "936.jpg",
            "937.jpg",
            "938.jpg",
            "939.jpg",
            "940.jpg",
            "941.jpg",
            "942.jpg",
            "943.jpg"
          ],
          "description": {
            "details": "            <p>Savlon Antiseptic liquid smoothly cleanses and helps avoid infection aiding the natural healing of minor skin injuries including Insect bites &amp; stings, cuts &amp; grazes, minor burns &amp; scalds, bathing &amp; midwifery.</p><ul><li>A product trusted by 90% of doctors</li><li>A unique formula that kills 99.99% germs in 10 seconds</li><li>Offering you 8 times better protection</li></ul>",
            "manufacturer": "Savlon",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        },
        {
          "title": "Godrej Rich Creme Hair Colour - Natural Black No.1, 3x(20 gm + 20 ml) (Multipack) ",
          "category": "https://www.bigbasket.com/pd/266639/close-up-everfresh-anti-germ-gel-toothpaste-red-hot-150-g/?nc=cl-bh-pl&t_pg=Beauty-Hygiene&t_p=beauty-hygiene&t_s=cl-bh-pl&t_pos=16&t_ch=desktop",
          "mrp": "84",
          "image": [
            "944.jpg",
            "945.jpg",
            "946.jpg",
            "947.jpg",
            "948.jpg",
            "949.jpg",
            "950.jpg",
            "951.jpg"
          ],
          "description": {
            "details": "            <div class=\"fr-view\"><p>Godrej Expert Rich Creme Hair Colour is a unique creme hair colour which is extremely easy-to-use. It is the first time in India that a Creme Hair Colour is being offered to make hair colouring extremely convenient. It has no ammonia formula, the richness of aloe-protein and gives 100% grey coverage. It comes in easy to use pre-measured sachets. No need to measure. Simply cut, mix and apply. Absolutely convenient and the application time is only 30 mins. The creme doesn&rsquo;t contain ammonia; so it saves your hair from all that damage.</p></div>",
            "manufacturer": "Godrej",
            "barcode": "",
            "weight": "",
            "exp_date": "",
            "mfg_date": "",
            "calories": ""
          }
        }

  ]
// const addData = async (req,res) => {
//     for(let i = 1;i < data.length;i++){
//         let newData = {
//             title : data[i].Item_Name,
//             description : {
//                 ...data[i]
//             },
//             mrp : data[i].mrp,
//             image : ['product1.jpg','product2.jpg','product3.jpg'],

//         }
//         let pd = await Product.create({...newData});
//         console.log(i + " - " + pd._id);
//     }
//     res.send('Done');
// };

exports.addData = async (req , res) => {
    for(let i = 0;i < data.length;i++){
        let pd = await Product.create({...data[i]});
        console.log(i + " - " + pd._id);
    }
    res.send('Done');

}


exports.addToCart = async (req , res) => {
    let products = await Products.find({});
    for(let i = 0; i < products.length;i++){
        let pp = Math.floor(Math.random() * 150);
        let pd = await SellerCart.create({
            quantity : 40,
            price : pp < 150 ? 110 : pp,
            discount : Math.floor(Math.random() * 20),
            sellerId : i % 2 === 0 ? '600d617cf6feba208128891b' : '600ec314e383050015f71cee',
            title : products[i].title,
            productId : products[i]._id
        })
        console.log(i + " - " + pd._id);
    }
    res.send('Done');
}


// if(process.argv[2] === '--add'){
//     addData();
// }
