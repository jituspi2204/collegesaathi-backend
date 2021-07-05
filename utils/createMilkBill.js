const fs = require('fs');
const pdf = require('pdfkit');
const qrcode = require('qrcode-generator');
var htmlToImage = require('html-to-image');

class CreatePDf {
    constructor(data) {
        this.data = data;
        this.doc = new pdf();
    }
    generateBill() {
        let xx = 160;
        let yy = 340;
        this.doc.pipe(fs.createWriteStream(`public/bills/test.pdf`));
        for (let i = 0; i < 3; i++) {
            this.doc
                .moveTo(0 + i * xx + 10, 10)
                .image('public/bills/assets/milk.jpg', 0 + i * xx + 10, 10, { width: 30 })
                .lineWidth(0.4)
                .lineTo(xx + 10 + i * xx, 0 + 10)
                .lineTo(xx + 10 + i * xx, yy + 10)
                .lineTo(0 + 10 + i * xx, yy + 10)
                .lineTo(0 + 10 + i * xx, 0 + 10)
                .stroke()
                .fontSize(9)
                .text(this.data.dairyName.toUpperCase(), i * xx, 15, {
                    align: 'center',
                    width: xx + 20,
                })
                .fontSize(7)
                .text(this.data.address, i * xx, 25, {
                    align: 'center',
                    width: xx + 20,
                    columns: 1,
                })
                .text('Phone - ' + this.data.phoneNumber, i * xx, 32, {
                    align: 'center',
                    width: xx + 20,
                    columns: 1,
                })
                .fontSize(8)
                .text(
                    `Bill no- ${this.data.month}/${this.data.year}/${this.data.billno}`,
                    i * xx,
                    50,
                    {
                        align: 'center',
                        width: xx + 20,
                        columns: 1,
                    }
                )
                .fontSize(7.5)
                .moveTo(0 + i * xx + 10, 60)
                .lineTo(xx + i * xx + 10, 60)
                .text(`Name - ${this.data.userName}`, 15 + i * xx, 62, {
                    width: xx - 10,
                })
                .text(`Phone - ${this.data.userPhoneNumber}`, 15 + i * xx, 72, {
                    width: xx - 10,
                })
                .text(`Address - ${this.data.userAddress}`, 15 + i * xx, 82, {
                    width: xx - 10,
                })
                .moveTo(0 + i * xx + 10, 110)
                .lineTo(xx + i * xx + 10, 110)
                .text(`Milk History of this month`, 15 + i * xx, 115, {
                    width: xx - 10,
                    align: 'center',
                });

            for (let j = 0; j < 8; j++) {
                this.doc
                    .moveTo(0 + i * xx + 10, 130 + j * 20)
                    .lineTo(xx + i * xx + 10, 130 + j * 20);
            }
             for (let j = 0; j < 5; j++) {
                 this.doc
                     .moveTo(xx *i + 10 + j * 32, 130)
                     .lineTo(xx * i + 10 + j * 32, 130 + 140);
             }
            this.doc.fontSize(9);
            Object.keys(this.data.milk).forEach((dd) => {
                dd = parseInt(dd);
                let x = parseInt(dd / 5);
                let y = dd % 7;
                 this.doc.fontSize(6).text(`${dd}`, 8 + i * xx + x * 32 + 5, 130 + y * 20 + 2, {
                     width: 30,
                 }).fontSize(10).text(`${this.data.milk[dd]}`, 15 + i * xx + x * 32 + 5, 130 + y * 20 + 8, {
                     width: 30,
                 });
             });
        }
        for (let i = 0; i < 3; i++) {
            this.doc
                .moveTo(0 + i * xx + 10, yy + 10)
                .lineWidth(0.4)
                .lineTo(xx + 10 + i * xx, yy + 0 + 10)
                .lineTo(xx + 10 + i * xx, 2 * yy + 10)
                .lineTo(0 + 10 + i * xx, 2 * yy + 10)
                .lineTo(0 + 10 + i * xx, yy + 0 + 10)
                .stroke();
        }
       
        this.doc
            .opacity(1)

            // // .image("public/bills/assets/barcode.png", 100, 50, { width: 250 })
            // .fontSize(15)
            .end();
    }
}

module.exports = CreatePDf;
