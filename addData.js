const mongoose = require('mongoose');
const Product = require('./models/productModel');
const expree = require('express');

const data = [
    {
       "title":"CottonTouch™ Newborn Face & Body Lotion",
        "catergory":  "Baby care",
        "mrp":  120,
        "image":["1001.jpeg" , "1002.jpeg"],
        "description":{
            "details" : "Your little love, whose skin is up to 30% thinner, deserves our best. The NEW CottonTouch™ Newborn Face and Body Lotion is made with real cotton, specially designed for, and pH balanced to newborn's sensitive skin. Light & gentle enough from day one, this newborn product provides moisturization that absorbs fast, lasts for 24 hours and leaves baby’s skin incredibly soft.",
            "manufracturer" : "Johnsons",
            "barcode" : "",
            "weight" : "500 ml",
            "exp_date" : "10/10/2020",
            "mfg_date" : "10/10/2020",
            "calories" : ""
        }
    },
    {
        "title":"Himalaya Herbal Extra Moisturizing Baby Soap - 125 gm",
        "catergory":  "Baby care",
         "mrp":  125,
         "image":["1005.jpg","1006.jpg","1007.jpg"],
         "description":{
             "details" : "Soap infused with the power of herbs and goodness of milk & oils,Ideal for use in winter season and for babies with dry skin type; cleanses & moisturizes baby's skin and prevents dryness",
             "manufracturer" : "Himalaya Herbal",
             "barcode" : 89,
             "weight" : "125 gm",
             "exp_date" : "10/10/2020",
             "mfg_date" : "10/10/2020",
             "calories" : ""
         }
     },
     {
        "title":"Chicco - No Tears Shampoo ",
        "catergory":  "Baby care",
         "mrp": 94,
         "image":["1008.jpg","1009.jpg"],
         "description":{
             "details" : "Chicco baby moments no tears shampoo 500ml with rich nourishing formula for soft,smooth tangle free hair. Contains natural active ingredients like pot marigold and glycerine for excellent conditioning, cleansing and nourishing baby delicate hai.",
             "manufracturer" : "Chicco",
             "barcode" : "",
             "weight" : "100 ml",
             "exp_date" : "10/10/2020",
             "mfg_date" : "10/10/2020",
             "calories" : ""
         }
     },
     {
        "title":"Nutella Hazelnut Spread with Cocoa, 350 g Jar",
        "catergory": "Gourment & World Food",
         "mrp": 324,
         "image":["1010.jpg","1011.jpg","1012.jpg"],
         "description":{
             "details" : "Chicco baby moments no tears shampoo 500ml with rich nourishing formula for soft,smooth tangle free hair. Contains natural active ingredients like pot marigold and glycerine for excellent conditioning, cleansing and nourishing baby delicate hai.",
             "manufracturer" : "Nutella",
             "barcode" : "",
             "weight" : "350 gm",
             "exp_date" : "10/10/2020",
             "mfg_date" : "10/10/2020",
             "calories" : "2252 kJ per 100 gm"
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
    for(let i = 1;i < data.length;i++){
        let pd = await Product.create({...data[i]});
        console.log(i + " - " + pd._id);
    }
    res.send('Done');

}


// if(process.argv[2] === '--add'){
//     addData();
// }
