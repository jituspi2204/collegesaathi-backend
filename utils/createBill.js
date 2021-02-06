const fs = require("fs");
const pdf = require("pdfkit");
const qrcode = require('qrcode-generator');
var htmlToImage = require('html-to-image');
var typeNumber = 4;
var errorCorrectionLevel = 'L';
var qr = qrcode(typeNumber, errorCorrectionLevel);
class CreatePDf {
  constructor(data) {
    this.data = data;
    this.doc = new pdf();
    qr.addData(data.products[0]._id);
    qr.make();
    this.qrImg = htmlToImage.toPng(qr.createImgTag())
    .then(function (dataUrl) {
      require("downloadjs")(dataUrl, "code.png");
    }).catch(err => {
      console.log(err);
    });;
    

  }
  generateBill() {
    
    this.doc.pipe(fs.createWriteStream(`public/bills/${this.data.products[0]._id}.pdf`));
    this.doc
    .opacity(0.2)
      .image("public/bills/assets/logo-2.png", 0, 0, { width: 610 })
      .opacity(1)
      .moveTo(15,10)
      .lineTo(15,700)
      .lineTo(600,700)
      .lineTo(600,10)
      .lineTo(15,10)
      .moveTo(15,75)
      .lineTo(600,75)
      .moveTo(15,170)
      .lineTo(600,170)
      .moveTo(360,10)
      .lineTo(360,170)
      .moveTo(15,190)
      .lineTo(600,190)
      .moveTo(360,170)
      .lineTo(360,700)
      .moveTo(436,170)
      .lineTo(436,700)
      .moveTo(496,170)
      .lineTo(496,700)
      .moveTo(296,170)
      .lineTo(296,700)
       .moveTo(15,670)
      .lineTo(600,670)
      .stroke()
      .image("public/bills/assets/logo-1.png", 0, 0, { width: 100 })
      .image("public/bills/assets/barcode.png", 100, 30, { width: 250 })
      // .image("public/bills/my-node.png", 420, 78, { width: 90 })
      .fillColor("#111")
      .fontSize(10)
      .text("Shop Name :  " + this.data.shopName, 20, 80)
      .text("Shop Address :", 20, 95)
      .text(this.data.address.address, 20,110)
      .text(this.data.address.city + ", " + this.data.address.state, 20,125)
      .fillColor("black")
      .text(this.data.address.pincode, 20,140)
      .text("Order Id :  " + this.data.products[0].orderId, 20, 155)
      .fontSize(9)
      .text("Reciever Name :  " + this.data.b_name, 370, 15)
      .text("Reciever Address :", 370, 25)
      .text(this.data.address.address + "," + this.data.address.city + ", " + this.data.address.state, 370,35)
      .text(this.data.address.pincode, 370,60)
      .fontSize(10)
      .text("Product", 20,174)
      .text("Quantity", 300,174)
      .text("Price per unit", 370,174)
      .text("Discount", 440,174)
      .text("Amount", 500,174)
      .fontSize(15)
      .text("Total" , 25,680)
      
      let sum = 0.0;
      let discount = 0.0;
      this.data.products.map((item,index) => {
        sum += item.amount;
        discount += item.discount;
        this.doc.fontSize(10)
        .fillColor('#111')
        .text(`${index + 1}. ${item._id}, ${new Date(item.createdAt).toDateString()}`,20, index  * 35 + 200,{lineBreak : true,width : 270})
        .text(`${item.title}`,30,index  * 35 + 215,{lineBreak : true,width : 270})
        .text(`${item.quantity}`,310, index  * 35 + 200,{lineBreak : true,width : 50})
        .text(`${item.price}`,375, index  * 35 + 200,{lineBreak : true,width : 60})
        .text(`${item.discount}`,445, index  * 35 + 200,{lineBreak : true,width : 60})
        .text(`${item.amount}`,505, index  * 35 + 200,{lineBreak : true,width : 60})

      })
      this.doc.fontSize(10)
      .text(`Total Amount Paid`,505, 672,{lineBreak : true,width : 100})
      .text(`Rs ${sum} /-`,505, 685,{lineBreak : true,width : 60})
      .fontSize(9)
      .text(`Total Discount`,438, 672,{lineBreak : true,width : 100})
      .text(`Rs ${discount} /-`,440, 685,{lineBreak : true,width : 60})

      
    this.doc
    .fontSize(12)
    .text("Thank you for shopping",250,705)
    .end();
  }


}

module.exports = CreatePDf;