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
//     semester: 8,
//     subject: 'ETIT-402',
//     subjectName: 'Mobile Computing',
//     unit: 4,
//     description: 'Unit 4 Notes',
//     year: '2017',
//     cat: 'First Term',
//     syllabus: `Support for Mobility: Data bases, data hoarding, Data dissemination, UA Prof and Caching, Service discovery,Data management issues, data replication for mobile computers, adaptive clustering for mobile wireless networks,Mobile devices and File systems, Data Synchronization, Sync ML.Introduction to Wireless Devices and Operating systems: Palm OS, Windows CE, Symbion OS, Android, MobileAgents. Introduction to Mobile application languages and tool kits.`,
//     syllabus2: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
//     syllabus3: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
//     syllabus4: `Mobile Physical Layer: Review of generation of mobile services, overview of wireless telephony, cellular concept, GSM: air-interface, channel structure, location management: HLR-VLR, hierarchical, handoffs, channel allocation in cellular systems, CDMA, GPRS.
// Mobile Computing Architecture: Issues in mobile computing, three tier architecture for mobile computing, design considerations, Mobile file systems, Mobile databases. WAP: Architecture, protocol stack, Data gram protocol, Wireless transport layer security, Wireless transaction protocol, wireless session protocol, application environment, and applications.`,
// }).generateNotes();


