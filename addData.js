const mongoose = require('mongoose');
const Product = require('./models/productModel');
const expree = require('express');

const data = [
    {
      "title": "Vim Dishwash Liquid Gel - Lemon, 1.8 L Can ",
      "category": "Household",
      "mrp": "315",
      "image": [
        "400.jpg",
        "401.jpg",
        "402.jpg",
        "403.jpg",
        "404.jpg",
        "405.jpg",
        "406.jpg",
        "407.jpg",
        "408.jpg",
        "409.jpg",
        "410.jpg",
        "411.jpg",
        "412.jpg",
        "413.jpg"
      ],
      "description": {
        "details": "Vim is the No.1 dishwashing brand in India. Vim&rsquo;s Dishwash Liquid Gel is a concentrated gel containing the power of 100 lemons(power refers to the cleaning benefits of lemons). It cleans the utensils deeply and unlike dishwash bars, it does not leave any powdery white layer of residue behind on them. It provides great value for money as only one spoon of Vim Liquid Dishwash Gel is enough to clean one sink-full of dirty utensils(as per the independent lab test conducted). Vim Liquid Dishwash Gel also helps you to remove the stubborn malodours from your tiffin boxes. It provides a pleasant cleaning experience and gives a refreshing lemon fragrance during dishwash. Its pH neutral formula is soft on hands compared to other bars. It can safely be used to clean delicate utensils and all kinds of expensive crockery including the non-stick cookware. It does not leave any scratches on the surfaces and keeps the utensils looking new. It is extremely convenient to use. Just take a spoonful of Vim Dishwash Liquid Gel, mix it in a bowl of water and use the mixture to wash an entire sink-full load of dishes. Vim Dishwash Liquid Gel is available in different sizes and packaging format in the market which includes bottles and pouch packs",
        "manufacturer": "Vim",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Harpic Disinfectant Toilet Cleaner Liquid, Original - Kills 99.9% Germs, 3x1 L Multipack ",
      "category": "Household",
      "mrp": "453",
      "image": [
        "414.jpg",
        "415.jpg",
        "416.jpg",
        "417.jpg",
        "418.jpg",
        "419.jpg",
        "420.jpg",
        "421.jpg",
        "422.jpg",
        "423.jpg",
        "424.jpg",
        "425.jpg",
        "426.jpg",
        "427.jpg",
        "428.jpg",
        "429.jpg",
        "430.jpg",
        "431.jpg"
      ],
      "description": {
        "details": "Harpic All in One is the one stop shop for all toilet cleaning needs. Unlike ordinary cleaners, it combines the benefits of Tough stain removal, 99.9% germ kill and Freshness. The result is a sparkling clean, hygienic, fresh and germ free toilet without any malodour with every use of Harpic. 5x power action: 5 times better at lime scale removal VS ordinary cleaners, Helps eliminate mal-odour, Clings to attack stains, Kills all germs (*Post 60 minutes of contact with undiluted product). Harpic All in One is the one stop shop for all toilet cleaning needs. Unlike ordinary cleaners, it combines the benefits of Tough stain removal, 99.9% germ kill and Freshness. The result is a sparkling clean, hygienic, fresh and germ free toilet without any malodour with every use of Harpic.&nbsp;",
        "manufacturer": "Harpic",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Lizol Disinfectant Surface &amp; Floor Cleaner Liquid - Citrus, Kills 99.9% Germs, 500 ml  ",
      "category": "Household",
      "mrp": "",
      "image": [
        "432.jpg",
        "433.jpg",
        "434.jpg",
        "435.jpg",
        "436.jpg",
        "437.jpg",
        "438.jpg",
        "439.jpg",
        "440.jpg",
        "441.jpg",
        "442.jpg",
        "443.jpg",
        "444.jpg",
        "445.jpg",
        "446.jpg",
        "447.jpg"
      ],
      "description": {
        "details": "Lizol is India's No.1 Household Cleaning Brand which is highly recommended by the Indian Medical Association. Lizol guarantees to kill 99.99% of disease-causing bacteria as well as germs while leaving your room smelling fragrant with a wide variety of mesmerising aromas.&nbsp;",
        "manufacturer": "Lizol",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Vim Dishwash Bar - Lemon, 200 g (Pack of 3) ",
      "category": "Household",
      "mrp": "44",
      "image": [
        "448.jpg",
        "449.jpg",
        "450.jpg",
        "451.jpg",
        "452.jpg",
        "453.jpg",
        "454.jpg",
        "455.jpg",
        "456.jpg",
        "457.jpg",
        "458.jpg",
        "459.jpg",
        "460.jpg",
        "461.jpg"
      ],
      "description": {
        "details": "Vim is the No.1 dishwashing brand in India. More than 7 out of 10 Urban Indian Households are regular Vim Dishwash Bar users. With the power of 100 lemons(power refers to the cleaning benefits of lemons), Vim dishwash bar easily removes the toughest of stains. It does wonder in cleaning even in small quantities and provides the fastest removal of burnt food(as per independent lab test conducted on burnt food stains), reducing the overall time and efforts required to clean the utensils. Vim dishwash bar provides a pleasant cleaning experience, as it gives a refreshing lemon fragrance during dishwash. It is the only dish wash bar which comes with a unique plastic coating at the bottom that prevents wastage and sogging, as the coating does not let the bar come in direct contact with water and makes it last longer than ordinary bars. It can safely be used for cleaning all types of utensils like stainless steel, ceramic, non - stick ware, glass etc. Vim dishwash bar is available in different pack formats such as single packs, multipacks and sturdy tub packs. Vim dishwash bar is also available in an Anti-Smell variant. Vim&rsquo;s Anti Smell range contains 2 in 1 formulation with pudina extract that gives great in-wash freshness and also the degreasing power of lemons.",
        "manufacturer": "Vim",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Rin Detergent Bar, 4x250 g Multipack ",
      "category": "Household",
      "mrp": "",
      "image": ["462.jpg", "463.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Rin",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Vim Dishwash Liquid Gel - Lemon, 155 ml Pouch ",
      "category": "Household",
      "mrp": "19",
      "image": [
        "464.jpg",
        "465.jpg",
        "466.jpg",
        "467.jpg",
        "468.jpg",
        "469.jpg",
        "470.jpg",
        "471.jpg",
        "472.jpg",
        "473.jpg",
        "474.jpg",
        "475.jpg",
        "476.jpg",
        "477.jpg"
      ],
      "description": {
        "details": "Vim is the No.1 dishwashing brand in India. Vim&rsquo;s Dishwash Liquid Gel is a concentrated gel containing the power of 100 lemons(power refers to the cleaning benefits of lemons). It cleans the utensils deeply and unlike dishwash bars, it does not leave any powdery white layer of residue behind on them. It provides great value for money as only one spoon of Vim Liquid Dishwash Gel is enough to clean one sink-full of dirty utensils(as per the independent lab test conducted). Vim Liquid Dishwash Gel also helps you to remove the stubborn malodours from your tiffin boxes. It provides a pleasant cleaning experience and gives a refreshing lemon fragrance during dishwash. Its pH neutral formula is soft on hands compared to other bars. It can safely be used to clean delicate utensils and all kinds of expensive crockery including the non-stick cookware. It does not leave any scratches on the surfaces and keeps the utensils looking new. It is extremely convenient to use. Just take a spoonful of Vim Dishwash Liquid Gel, mix it in a bowl of water and use the mixture to wash an entire sink-full load of dishes. Vim Dishwash Liquid Gel is available in different sizes and packaging format in the market which includes bottles and pouch packs.",
        "manufacturer": "Vim",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Duracell Ultra-Alkaline Battery AAA, 2 pcs  ",
      "category": "Kitchen & Garden",
      "mrp": "83",
      "image": [
        "478.jpg",
        "479.jpg",
        "480.jpg",
        "481.jpg",
        "482.jpg",
        "483.jpg",
        "484.jpg",
        "485.jpg",
        "486.jpg",
        "487.jpg",
        "488.jpg",
        "489.jpg"
      ],
      "description": {
        "details": "Duracell Ultra AAA &ndash; Up to 100% more power. Duralock Power Preserve technology keeps batteries fresh and powered even after 10 years in storage! Duracell AAA alkaline batteries are engineered to deliver the power needed for household devices that are used on a daily basis. These batteries deliver the right level of power to fulfil nearly every electronic need and are very reliable and long-lasting.</p><p>Benefits:&nbsp;",
        "manufacturer": "Duracell",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Pedigree Wet Dog Food - Chicken &amp; Liver Chunks In Gravy, For Adult Dogs (Pack of 15), 4x70 g Multipack ",
      "category": "Kitchen & Garden",
      "mrp": "1860",
      "image": ["490.jpg", "491.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Pedigree",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Whiskas Wet Cat Food - Ocean Fish, For Adult Cats, +1 Year, 24x85 g Multipack ",
      "category": "Kitchen & Garden",
      "mrp": "",
      "image": ["492.jpg", "493.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Whiskas",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "HIT Anti Mosquito Racquet - Rechargeable Insect Killer Bat With LED Light, 1 pc (6 Months Warranty) ",
      "category": "Kitchen & Garden",
      "mrp": "",
      "image": [
        "494.jpg",
        "495.jpg",
        "496.jpg",
        "497.jpg",
        "498.jpg",
        "499.jpg",
        "500.jpg",
        "501.jpg",
        "502.jpg",
        "503.jpg",
        "504.jpg",
        "505.jpg",
        "506.jpg",
        "507.jpg"
      ],
      "description": {
        "details": "Godrej HIT Anti Mosquito Racquet is powered by a rechargeable 400 mAh battery, which lasts up to one month with a single charge. No need for a separate charging adapter, no hanging cables, no everyday recharge and no replacing batteries. It comes with a super bright LED light, which helps kill mosquitoes in the dark. Its carefully crafted unique shape ensures better coverage for those unreachable spaces beneath your couch or behind your curtains. It is made from aircraft-grade ABS plastic for strength and long life. The 3,500V DC voltage on the net mesh kills mosquitoes instantly and ensures complete protection from Dengue, Malaria &amp; Zika causing mosquitoes.&nbsp;</p><p>Godrej HIT Anti Mosquito Racquet comes with a 6 months all-India warranty. Simply register your product on the HIT website within 10 days of your purchase to avail the benefits. Caution: Before using it for the first time, charge the HIT Anti Mosquito Racquet for 3-4 hours. Do not touch the mesh even if the device is turned off in order to avoid electric shocks as well as damage to the device. Do not turn on the device while charging to avoid damage to the internal circuit. Keep the device away from children. It should never be used as a toy. The device must always be kept in a dry place. Do not use the device in locations where there are flammable gases or liquids around.",
        "manufacturer": "HIT",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Iveo  100% Melamine Tumbler Set - Yellow, 2 pcs  ",
      "category": "Kitchen & Garden",
      "mrp": "119",
      "image": ["508.jpg", "509.jpg", "510.jpg", "511.jpg", "512.jpg", "513.jpg"],
      "description": {
        "details": "Iveo Melamine products are made from 100% pure melamine which is 100% food-grade in nature. These are heat resistant, break-resistant, freezer safe, stain-resistant, colourfast &amp; scratch resistant. These products can also be used in a microwave oven for the re-heating purpose only. These are stain-resistant products so there will be no food stain mark on it. These are also dishwasher safe.",
        "manufacturer": "Iveo ",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Iveo  Whisky Glass/Juice Tumbler Set, 352 ml (Set of 2) ",
      "category": "Kitchen & Garden",
      "mrp": "119",
      "image": ["514.jpg", "515.jpg", "516.jpg", "517.jpg"],
      "description": {
        "details": "Iveo tumblers are elegant looking made with good quality. These are with high wall thickness, extra strong, food-grade, heavy bottom, dishwash safe, moisture resistant, scratch resistant with no sharp edges and no wobbling. These glasses are ideal for drinking whisky, juice and other beverages.",
        "manufacturer": "Iveo ",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Farm Eggs - Regular, Medium, Antibiotic Residue-Free, Growth Hormone-Free, 6 pcs  ",
      "category": "Non-veg Food",
      "mrp": "",
      "image": ["518.jpg", "519.jpg", "520.jpg", "521.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Seer Fish Large - Steak/Slice, Preservative Free, 6-8 pcs, 500 g (Gross Fish Weight 650-750 g, Net Weight After Cleaning 500 g) ",
      "category": "Non-veg Food",
      "mrp": "",
      "image": ["522.jpg", "523.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Mutton - Curry Cut, From Whole Carcass 8-10 Kgs. Antibiotic Residue-Free, Growth Hormone-Free, 1 kg  ",
      "category": "Non-veg Food",
      "mrp": "1080",
      "image": ["524.jpg", "525.jpg", "526.jpg", "527.jpg", "528.jpg", "529.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Fresho",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Meatzza Krispy Fried Chicken, 500 g  ",
      "category": "Non-veg Food",
      "mrp": "",
      "image": [
        "530.jpg",
        "531.jpg",
        "532.jpg",
        "533.jpg",
        "534.jpg",
        "535.jpg",
        "536.jpg",
        "537.jpg",
        "538.jpg",
        "539.jpg"
      ],
      "description": {
        "details": "Boneless chicken breast, minced and seasoned with spices and other ingredients and formed like natural cut crispy fried chicken, coated and fried. This product can be air fried/baked or deep fried as per customer preference.",
        "manufacturer": "Meatzza",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Hita Farms Eggs - Organic, Farm Fresh, Country, 6 pcs  ",
      "category": "Non-veg Food",
      "mrp": "",
      "image": ["540.jpg", "541.jpg", "542.jpg", "543.jpg", "544.jpg", "545.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Hita Farms",
        "barcode": "",
        "weight": "",
        "exp_date": "",
        "mfg_date": "",
        "calories": ""
      }
    },
    {
      "title": "Fresho Tuna Fish - Steak/Slice, Preservative Free, 6-8 pcs, 500 g (Gross Fish Weight 700-800 g, Net Weight After Cleaning 500 g) ",
      "category": "Non-veg Food",
      "mrp": "",
      "image": ["546.jpg", "547.jpg"],
      "description": {
        "details": "",
        "manufacturer": "Fresho",
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


// if(process.argv[2] === '--add'){
//     addData();
// }
