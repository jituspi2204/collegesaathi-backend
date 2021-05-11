var pdf = require('./utils/createFront');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bills/');
    },
    filename: function (req, file, cb) {
        req.userfile = 'collegesaathi' + Date.now() + '.pdf';
        cb(null, req.userfile); //Appending .jpg
    },
});

const multerFilter = (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype.endsWith('pdf')) {
        cb(null, true);
    } else {
        cb(new Error('Not a image upload only image'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserFile = upload.single('notes');



// new pdf({
//     type: 'notes',
//     semester: 2,
//     subject: 'ETMA-202',
//     subjectName: 'Microprocessors and Microcontrollers',
//     unit: 1,
//     description: 'Unit 2 Notes',
//     year: '2017',
//     cat: 'First Term',
//     syllabus1: `8086 Microprocessor: 8086 Architecture, difference between 8085 and 8086 architecture, generation of physicaladdress, PIN diagram of 8086, Minimum Mode and Maximum mode, Bus cycle, Memory Organization, MemoryInterfacing, Addressing Modes, Assembler Directives, Instruction set of 8086, Assembly Language Programming,Hardware and Software Interrupts.`,
//     syllabus2: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
//     syllabus3: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
//     syllabus4: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
// }).generateNotes();


