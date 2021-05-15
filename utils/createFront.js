const fs = require('fs');
const pdf = require('pdfkit');
const qrcode = require('qrcode-generator');
var htmlToImage = require('html-to-image');

class CreatePDf {
    constructor(data) {
        this.data = data;
        this.doc = new pdf();
    }
    generateNotes() {
        let amount = 0;
        let discount = 0;
        let price = 0;
        let qty = 0;
        let bamount = 0;
        let bprice = 0;
        let bdiscount = 0;
        let bqty = 0;
        this.doc.pipe(
            fs.createWriteStream(
                `public/bills/${this.data.semester}/${this.data.type}_${this.data.subjectName}_${this.data.unit}.pdf`
            )
        );
        this.doc
            .rect(0, 0, 700, 50)
            .fill('#000')
            .roundedRect(480, 7.5, 120, 35, 4)
            .fill('#ffc404')
            .image('public/bills/assets/logo.png', 230, 10, { width: 200 })
            .image('public/bills/assets/ic.png', 180, 0, { width: 50 })
            .image('public/bills/assets/bg_4.png', 0, 100, { width: 620 })
            .opacity(1)
            .fill('#000')
            .fontSize(18)
            .text('Notes', 490, 15, {
                width: 100,
                align: 'center',
            })
            .fontSize(16)
            .text(this.data.subject + '-' + this.data.subjectName, 20, 80, {
                width: 580,
                align: 'center',
            })
            .fontSize(13)
            .text('Semester - ' + this.data.semester, 20, 100, { width: 580, align: 'center' })
            .text(this.data.description, 20, 120, {
                width: 580,
                align: 'center',
            })
            .fontSize(14)
            .text('UNIT - ' + this.data.unit + '   Syllabus', 20, 530, {
                width: 580,
            })
            .moveTo(10, 600)
            .lineJoin('round')
            .roundedRect(20, 550, 570, 150, 10)
            .stroke()
            .fontSize(12)
            .text(this.data.syllabus, 25, 570, { width: 560, align: 'justify' })
            .text('To Download App  -   https://collegesaathi-india.web.app', 20, 705, {
                width: 580,
                align: 'center',
            })
            .end();
        return `bills/${this.data.semester}/${this.data.type}_${this.data.subjectName}_${this.data.unit}.pdf`;
    }

    generatePaper() {
        let amount = 0;
        let discount = 0;
        let price = 0;
        let qty = 0;
        let bamount = 0;
        let bprice = 0;
        let bdiscount = 0;
        let bqty = 0;
        this.doc.pipe(
            fs.createWriteStream(
                `public/bills/${this.data.semester}/paper_${this.data.year}_${this.data.subjectName}_${this.data.cat}.pdf`
            )
        );

        this.doc
            .rect(0, 0, 700, 50)
            .fill('#000')
            .roundedRect(480, 7.5, 120, 35, 4)
            .fill('#ffc404')
            .image('public/bills/assets/logo.png', 230, 10, { width: 200 })
            .image('public/bills/assets/ic.png', 180, 0, { width: 50 })
            .image('public/bills/assets/bg_1.png', 0, 100, { width: 620 })
            .opacity(1)
            .fill('#000')
            .fontSize(18)
            .text('Paper', 490, 15, {
                width: 100,
                align: 'center',
            })
            .fontSize(16)
            .text(this.data.subject + '-' + this.data.subjectName, 20, 80, {
                width: 580,
                align: 'center',
            })
            .fontSize(16)
            .text('Semester - ' + this.data.semester, 20, 110, { width: 580, align: 'center' })
            .text(this.data.cat + ' - ' + this.data.year, 20, 610, {
                width: 580,
                align: 'center',
            })
            .fontSize(16)
            .text(this.data.description, 20, 640, {
                width: 580,
                align: 'center',
            })
            .fontSize(12)
            .text('To Download App  -   https://collegesaathi-india.web.app', 20, 705, {
                width: 580,
                align: 'center',
            })
            // .addPage()
            // .fontSize(18)
            // .text('Syllabus', 25, 20, { width: 560, align: 'justify' })
            // .fontSize(12)
            // .text('Unit - 1', 25, 45, { width: 560, align: 'justify' })
            // .lineJoin('round')
            // .roundedRect(20, 60, 570, 130, 10)
            // .stroke()
            // .text(this.data.syllabus1, 25, 65, { width: 560, align: 'justify' })
            // .text('Unit - 2', 25, 200, { width: 560, align: 'justify' })
            // .lineJoin('round')
            // .roundedRect(20, 220, 570, 130, 10)
            // .stroke()
            // .text(this.data.syllabus2, 25, 230, { width: 560, align: 'justify' })
            // .text('Unit - 3', 25, 360, { width: 560, align: 'justify' })
            // .lineJoin('round')
            // .roundedRect(20, 380, 570, 130, 10)
            // .stroke()
            // .text(this.data.syllabus3, 25, 385, { width: 560, align: 'justify' })
            // .text('Unit - 4', 25, 520, { width: 560, align: 'justify' })
            // .lineJoin('round')
            // .roundedRect(20, 540, 570, 130, 10)
            // .stroke()
            // .text(this.data.syllabus4, 25, 545, { width: 560, align: 'justify' })
            // .text('To Download App  -   https://collegesaathi-india.web.app', 20, 705, {
            //     width: 580,
            //     align: 'center',
            // })
            .end();
        return `bills/${this.data.semester}/paper_${this.data.year}_${this.data.subjectName}_${this.data.cat}.pdf`;
    }

    generateFile() {
          let amount = 0;
          let discount = 0;
          let price = 0;
          let qty = 0;
          let bamount = 0;
          let bprice = 0;
          let bdiscount = 0;
          let bqty = 0;
          this.doc.pipe(
              fs.createWriteStream(
                  `public/bills/${this.data.semester}/labfiles_${this.data.subjectName}_${this.data.description}.pdf`
              )
          );

          this.doc
              .rect(0, 0, 700, 50)
              .fill('#000')
              .roundedRect(480, 7.5, 120, 35, 4)
              .fill('#ffc404')
              .image('public/bills/assets/logo.png', 230, 10, { width: 200 })
              .image('public/bills/assets/ic.png', 180, 0, { width: 50 })
              .image('public/bills/assets/bg_1.png', 0, 100, { width: 620 })
              .opacity(1)
              .fill('#000')
              .fontSize(18)
              .text('Lab Files', 490, 15, {
                  width: 100,
                  align: 'center',
              })
              .fontSize(16)
              .text(this.data.subject + '-' + this.data.subjectName, 20, 80, {
                  width: 580,
                  align: 'center',
              })
              .fontSize(16)
              .text('Semester - ' + this.data.semester, 20, 110, { width: 580, align: 'center' })
              .fontSize(16)
              .text(this.data.description, 20, 640, {
                  width: 580,
                  align: 'center',
              })
              .fontSize(12)
              .text('To Download App  -   https://collegesaathi-india.web.app', 20, 705, {
                  width: 580,
                  align: 'center',
              })
             
              .end();
          return `bills/${this.data.semester}/labfiles_${this.data.subjectName}_${this.data.description}.pdf`;
    }
}

module.exports = CreatePDf;
