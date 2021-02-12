const fs = require("fs");
const pdf = require("pdfkit");
const qrcode = require('qrcode-generator');
var htmlToImage = require('html-to-image');


class CreatePDf {
  constructor(data) {
    this.data = data;
    this.doc = new pdf();
  }
  generateBill() {
    let amount = 0;
    let discount = 0;
    let price = 0;
    let qty = 0;
    let bamount = 0;
    let bprice = 0;
    let bdiscount = 0;
    let bqty = 0;
    this.doc.pipe(fs.createWriteStream(`public/bills/${this.data.orderId}.pdf`));
    this.doc
    .opacity(0.3)
      .image("public/bills/assets/logo-2.png", 0, 0, { width: 610 })
      .opacity(1)
      .moveTo(15,10)
      .lineTo(15,100)
      .lineTo(600,100)
      .lineTo(600,10)
      .lineTo(15,10)
      .moveTo(380,10)
      .lineTo(380,100)
      .lineWidth(0.4)    
      .stroke()
      .image("public/bills/assets/logo-1.png", 0, 15, { width: 100 })
      // .image("public/bills/assets/barcode.png", 100, 50, { width: 250 })
      .fontSize(15)
      .text("INVOICE" , 180,40)
      .fontSize(12)
      .text("Order ID:  " + this.data.orderId , 150,60)
      .fontSize(10)
      .text("Order Time:   " + new Date(Date.now()).toLocaleString(), 390, 15,{width : 200})
      .text("Reciever Name:   " + this.data.u_name, 390, 30,{width : 200})
      .text("Reciever Address:   " + this.data.u_address.address + ", " + this.data.u_address.city + 
      ", "+ this.data.u_address.state +", "+ this.data.u_address.pincode, 390, 45,{width : 200})
      .text("Phone Number:   " + this.data.u_phoneNumber, 390, 85,{width : 200})
      .fontSize(12)
      .text("Thank you for shopping with near.daily!! Visit Again",200,750,{height : 100})
      .text("https://www.neardaily.com",260,762,{height : 100})
      .fontSize(10)
      let start = 110
      this.data.shops.forEach((item,i) => {
       
        let y = start % 700;
        let yend = (item.products.length + 4) * 20;
        if(((item.products.length + 4) * 20) > (680 - y)){
          this.doc.addPage({margins : {bottom : 20}})
          .opacity(0.2)
          .image("public/bills/assets/logo-2.png", 0, 0, { width: 610 })
          .opacity(1)
          .fontSize(12)
          .text("Thank you for shopping with near.daily!! Visit Again",200,750,{height : 100})
          .text("https://www.neardaily.com",260,762,{height : 100})
          .fontSize(10)
          start = 10;
          y = 10;
        }
        this.doc
        .moveTo(15,y )
        .lineTo(600, y)
        .lineTo(600, y + (item.products.length + 4) * 20)
        .lineTo(15,y + (item.products.length + 4) * 20)
        .lineTo(15, y)
        .moveTo(15,y + 40 )
        .lineTo(600, y + 40)
        .moveTo(15,y + 60 )
        .lineTo(600, y + 60)
        .moveTo(300,y + 40)
        .lineTo(300, y + yend + 30)
        .moveTo(340,y + 40)
        .lineTo(340, y + yend + 30)
        .moveTo(440,y + 40)
        .lineTo(440, y + yend + 30)
        .moveTo(520,y + 40)
        .lineTo(520, y + yend  + 30)
        .moveTo(15,y + yend)
        .lineTo(15,y + yend + 30)
        .lineTo(600,y + yend + 30)
        .lineTo(600,y + yend)
        .stroke()
        .text("Shop Name:  " + item.shopName,20,y + 5,{width : 250})
        .text("Shop ID:  " + item.shop_id,20,y + 30,{width : 250})
        .text("Shop Address:   " + item.address.address + ", " + item.address.city + 
          ", "+ item.address.state +", "+ item.address.pincode, 260, y + 5,{width : 200})
        .text("GSTIN :  " + 1243242344,480,y + 5,{width : 100})
        .text("Ph:  "+item.shop_phoneNumber,480,y + 20,{width : 100})
        .text("Product", 20,y + 45)
        .text("Quantity", 300,y + 45)
        .text("Price per unit", 350,y + 45)
        .text("Discount", 450,y + 45,{width : 80})
        .text("Amount", 530,y + 45,{width : 80})

        bamount = 0;
        bdiscount=0;
        bprice=0;
        bqty=0;
        item.products.forEach((product, index) => {
          let st = y + 65
          this.doc
          .fontSize(9)
          .text((index + 1) + ". "+product._id+", "+ product.title, 25,st + index * 25,{width : 270})
          .text(product.quantity, 320,st + index * 25,{width : 40})
          .text(product.price, 350,st + index * 25,{width : 80})
          .text(product.discount, 450,st + index * 25,{width : 80})
          .text(product.amount, 530,st + index * 25,{width : 80})
          .fontSize(10)
          bamount += product.amount;
          bdiscount += product.discount;
          bqty += product.quantity;
          bprice += product.price;
        })
        this.doc
        .fontSize(12)
        .text("Total", 20, y + yend + 9,{width : 300})
        .text(bqty, 320, y + yend + 9,{width : 40})
        // .text("Rs " + bprice, 350, y + yend + 9,{width : 80})
        .text("Rs " + bdiscount, 450, y + yend + 9,{width : 80})
        .text("Rs " + bamount, 530, y + yend + 9,{width : 80})
        .fontSize(10)
        start += yend + 50;
        amount += bamount;
        qty += bqty;
        bdiscount += discount; 
        // console.log(item.products.length);
      })
     
      let y = start % 700;
      let yend = 100;
      if(100 > (680 - y)){
        this.doc.addPage({margins : {bottom : 20}})
        .opacity(0.2)
        .image("public/bills/assets/logo-2.png", 0, 0, { width: 610 })
        .opacity(1)
        .fontSize(12)
        .text("Thank you for shopping with near.daily!! Visit Again",200,750,{height : 100})
        .text("https://www.neardaily.com",260,762,{height : 100})
        .fontSize(10)
        start = 10;
        y = 10;
      }
      
    this.doc
    .fontSize(12)
    .fillColor("#eb3434")
    .text("NOTE: This is computer generated invoice, no need of signature",20,y,{width : 600})
    .fillColor("#111")
    .text("Total Amount Payed:      Rs " + amount, 400, y + 10,{width : 300})
    .text("Total Quantity :       "+qty, 400, y + 25,{width : 300})
    .text("Total Savings:      Rs  "+ discount,400, y + 40,{width : 300})
    .text("Mode of Payment: " +this.data.method, 20, y + 15,{width : 300})
    .text(this.data.method !== 'COD' ?"Transaction ID : " + this.data.transactionId : "",20,y + 30)
    .fontSize(10)
    .end();
  }


}

module.exports = CreatePDf;