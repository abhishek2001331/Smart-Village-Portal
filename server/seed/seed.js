const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Scheme = require('../models/Scheme');
const Announcement = require('../models/Announcement');
const Job = require('../models/Job');
const HealthService = require('../models/HealthService');
const School = require('../models/School');
const AgricultureInfo = require('../models/AgricultureInfo');
const EmergencyContact = require('../models/EmergencyContact');
const VillageService = require('../models/VillageService');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing database collections...');
    await User.deleteMany({});
    await Complaint.deleteMany({});
    await Scheme.deleteMany({});
    await Announcement.deleteMany({});
    await Job.deleteMany({});
    await HealthService.deleteMany({});
    await School.deleteMany({});
    await AgricultureInfo.deleteMany({});
    await EmergencyContact.deleteMany({});
    await VillageService.deleteMany({});

    console.log('Seeding Users...');
    const admin = await User.create({
      name: 'Panchayat Admin Officer',
      email: 'admin@smartvillage.gov.in',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210',
      village: 'Kalyanpur Gram Panchayat',
      wardNo: 'Main Panchayat Office',
      address: 'Panchayat Bhavan, Kalyanpur',
      aadharNo: '9999-8888-7777',
      occupation: 'Village Administrative Officer'
    });

    const citizen1 = await User.create({
      name: 'Ramesh Singh',
      email: 'citizen@smartvillage.gov.in',
      password: 'citizen123',
      role: 'citizen',
      phone: '+91 91234 56789',
      village: 'Kalyanpur',
      wardNo: 'Ward 3',
      address: 'House No. 42, Near Primary School, Kalyanpur',
      aadharNo: '1234-5678-9012',
      occupation: 'Organic Farmer'
    });

    const citizen2 = await User.create({
      name: 'Sunita Devi',
      email: 'sunita@gmail.com',
      password: 'password123',
      role: 'citizen',
      phone: '+91 98111 22233',
      village: 'Kalyanpur',
      wardNo: 'Ward 1',
      address: 'Plot 14, Main Road, Kalyanpur',
      aadharNo: '4321-8765-2109',
      occupation: 'Handicraft Artisan'
    });

    console.log('Seeding Government Schemes...');
    await Scheme.insertMany([
      {
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        category: 'Agriculture',
        description: 'Financial support of ₹6,000 per year provided in three equal installments directly to landholding farmers\' bank accounts.',
        eligibility: 'All small and marginal landholding farmer families having cultivable landholding up to 2 hectares.',
        benefits: 'Direct Cash Transfer of ₹6,000 annually into bank account.',
        requiredDocuments: 'Aadhar Card, Land Ownership Documents (Khatauni), Bank Passbook, Mobile Number.',
        applicationProcess: 'Register online at pmkisan.gov.in or visit Gram Panchayat CSC center.',
        officialLink: 'https://pmkisan.gov.in',
        status: 'Active'
      },
      {
        name: 'Jal Jeevan Mission (Har Ghar Jal)',
        category: 'Infrastructure',
        description: 'Providing functional household tap connection (FHTC) to every rural household with safe and adequate drinking water.',
        eligibility: 'All unserved rural households in the Gram Panchayat.',
        benefits: 'Piped potable water supply inside home premise with 55 liters per capita daily.',
        requiredDocuments: 'Aadhar Card, Electricity Bill/Proof of Residence.',
        applicationProcess: 'Submit application form to Gram Panchayat Water & Sanitation Committee.',
        officialLink: 'https://jaljeevanmission.gov.in',
        status: 'Active'
      },
      {
        name: 'Mahatma Gandhi NREGA (MGNREGA)',
        category: 'Employment',
        description: 'Guarantees at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.',
        eligibility: 'Rural households with adult members willing to do manual labor.',
        benefits: 'Guaranteed wage rate of ₹230+ per day for 100 days with direct bank credit.',
        requiredDocuments: 'Job Card Application, Aadhar Card, Bank Account Details, Passport Photo.',
        applicationProcess: 'Apply at Gram Panchayat office for Job Card issuance.',
        officialLink: 'https://nrega.nic.in',
        status: 'Active'
      },
      {
        name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
        category: 'Housing',
        description: 'Financial assistance to pucca house construction for homeless and families living in kutcha or dilapidated houses.',
        eligibility: 'Families identified under SECC socio-economic survey having no pucca house.',
        benefits: '₹1,20,000 financial aid for construction plus 90 days MGNREGA labor wages and toilet subsidy.',
        requiredDocuments: 'Aadhar Card, BPL Card, Bank Account, Land Ownership proof.',
        applicationProcess: 'Gram Sabha approval & registration via AwaasSoft mobile app by Panchayat Assistant.',
        officialLink: 'https://pmayg.nic.in',
        status: 'Active'
      },
      {
        name: 'Ayushman Bharat - PM-JAY Health Card',
        category: 'Health',
        description: 'World\'s largest health insurance scheme giving health cover of ₹5 Lakh per family per year for secondary and tertiary hospitalization care.',
        eligibility: 'Low-income rural families listed in SECC database.',
        benefits: 'Cashless treatment up to ₹5 Lakh in all empanelled government & private hospitals.',
        requiredDocuments: 'Ration Card, Aadhar Card, Mobile Number.',
        applicationProcess: 'Generate Ayushman Card at Primary Health Center or CSC Village Kiosk.',
        officialLink: 'https://pmjay.gov.in',
        status: 'Active'
      },
      {
        name: 'Sukanya Samriddhi Yojana (SSY)',
        category: 'Women & Child',
        description: 'Government backed small savings scheme for girl child education and marriage with high tax-free interest rates.',
        eligibility: 'Girl child below 10 years of age.',
        benefits: 'High interest rate (8.2%), compounding yearly with tax exemption under Section 80C.',
        requiredDocuments: 'Girl child Birth Certificate, Guardian Aadhar & Address proof.',
        applicationProcess: 'Open account at Village Post Office or empanelled bank branch.',
        officialLink: 'https://indiapost.gov.in',
        status: 'Active'
      },
      {
        name: 'PM Fasal Bima Yojana (PMFBY)',
        category: 'Agriculture',
        description: 'Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest stages.',
        eligibility: 'All farmers growing notified crops in notified areas including sharecroppers.',
        benefits: 'Full financial risk cover against flood, drought, pest attacks with minimal premium (1.5% to 2%).',
        requiredDocuments: 'Sowing Certificate, Land Records, Aadhar, Bank Passbook.',
        applicationProcess: 'Enroll via PMFBY online portal or localized Kisan CSC operator.',
        officialLink: 'https://pmfby.gov.in',
        status: 'Active'
      },
      {
        name: 'PM Ujjwala Yojana 2.0',
        category: 'General',
        description: 'Free LPG gas connection with first refill and stove to women from low-income households.',
        eligibility: 'Adult women belonging to SC/ST, PMAY households, or BPL families.',
        benefits: 'Deposit-free LPG connection + free gas stove + 1st refill cylinder.',
        requiredDocuments: 'Aadhar of Applicant & Family Members, Ration Card, Bank Account.',
        applicationProcess: 'Submit Ujjwala form to nearest Indane/Bharat/HP Gas agency distributor.',
        officialLink: 'https://pmuy.gov.in',
        status: 'Active'
      },
      {
        name: 'Pradhan Mantri Gram Sadak Yojana (PMGSY)',
        category: 'Infrastructure',
        description: 'All-weather road connectivity to unconnected rural habitations across the Gram Panchayat.',
        eligibility: 'Unconnected habitations with population 500+ (250+ in hill areas).',
        benefits: 'Bituminous paved all-weather roads connecting village to main district highway.',
        requiredDocuments: 'Gram Sabha Resolution.',
        applicationProcess: 'Managed directly by Rural Development Department.',
        officialLink: 'https://omms.nic.in',
        status: 'Active'
      },
      {
        name: 'National Social Assistance Program (Indira Gandhi Pension)',
        category: 'Pension',
        description: 'Monthly financial assistance to elderly, widows, and disabled persons from BPL families.',
        eligibility: 'Senior Citizens (60+ yrs), Widows (40+ yrs), Differently abled persons (80%+ disability).',
        benefits: 'Monthly pension ranging from ₹500 to ₹1,500 transferred directly to bank account.',
        requiredDocuments: 'Age Certificate / Disability Certificate / Death Certificate of Spouse, BPL Card, Aadhar.',
        applicationProcess: 'Apply at Tehsil Office or Gram Panchayat Secretary desk.',
        officialLink: 'https://nsap.nic.in',
        status: 'Active'
      }
    ]);

    console.log('Seeding Village Announcements...');
    await Announcement.insertMany([
      {
        title: 'Gram Sabha Public General Meeting Scheduled',
        titleHi: 'ग्राम सभा की जन बैठक का आयोजन',
        description: 'All village residents are cordially invited to attend the quarterly Gram Sabha meeting to discuss village infrastructure budget, road repair plans, and MGNREGA works.',
        descriptionHi: 'समस्त ग्रामवासियों को सूचित किया जाता है कि पंचायत भवन परिसर में त्रैमासिक ग्राम सभा बैठक का आयोजन किया जाएगा।',
        category: 'Government',
        isUrgent: true,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Free Health Check-Up & Eye Screening Camp',
        titleHi: 'निःशुल्क स्वास्थ्य जाँच एवं नेत्र शिविर',
        description: 'Primary Health Center Kalyanpur in collaboration with District Hospital will organize a free medical health camp with specialist doctors, free medicines, and eye testing.',
        descriptionHi: 'प्राथमिक स्वास्थ्य केंद्र कल्याणपुर द्वारा निःशुल्क स्वास्थ्य जांच व नेत्र जांच शिविर आयोजित किया जा रहा है।',
        category: 'Health',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Subsidized Organic Fertilizer & Seed Distribution',
        titleHi: 'सब्सिडी पर जैविक खाद एवं उन्नत बीज वितरण',
        description: 'High-yielding wheat and mustard seeds along with organic compost are now available at 50% subsidy at the Agriculture Cooperative Depot.',
        descriptionHi: 'कृषि सहकारी डिपो में 50% सब्सिडी पर उन्नत किस्म के गेहूं और सरसों के बीज उपलब्ध हैं।',
        category: 'Agriculture',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Scheduled Electricity Transformer Maintenance Maintenance',
        titleHi: 'विद्युत ट्रांसफॉर्मर आवश्यक रखरखाव सूचना',
        description: 'Power supply in Ward 2 and Ward 3 will remain temporarily suspended tomorrow from 10:00 AM to 2:00 PM due to high-voltage line upgrading.',
        descriptionHi: 'वार्ड 2 और 3 में कल सुबह 10 से दोपहर 2 बजे तक बिजली आपूर्ति बंद रहेगी।',
        category: 'Emergency',
        isUrgent: true,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Kisan Credit Card (KCC) Special Drive Camp',
        titleHi: 'किसान क्रेडिट कार्ड विशेष आवेदन शिविर',
        description: 'Farmers can now obtain instant low-interest crop loans up to ₹3 Lakh under the KCC drive. Bring land documents and Aadhar card.',
        descriptionHi: 'केसीसी अभियान के तहत ₹3 लाख तक का आसान फसल ऋण प्राप्त करने हेतु विशेष शिविर।',
        category: 'Agriculture',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Admissions Open at Government Secondary School',
        titleHi: 'राजकीय माध्यमिक विद्यालय में प्रवेश प्रारंभ',
        description: 'Enrollment for Class 1 to 10 for the academic session 2026-27 is open. Free textbooks, uniforms, and Mid-Day Meal provided.',
        descriptionHi: 'सत्र 2026-27 के लिए कक्षा 1 से 10 तक निःशुल्क दाखिला जारी है।',
        category: 'Education',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Solar Street Light Installation Drive Complete',
        titleHi: 'सोलर स्ट्रीट लाइट स्थापना अभियान संपन्न',
        description: '50 new LED solar streetlights have been installed across major village crossroads and street junctions for improved night security.',
        descriptionHi: 'गांव के मुख्य चौराहों पर 50 नई सोलर स्ट्रीट लाइटें लगाई गई हैं।',
        category: 'Government',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Recruitment Drive: Gram Panchayat Computer Operator',
        titleHi: 'ग्राम पंचायत कंप्यूटर ऑपरेटर भर्ती',
        description: 'Applications invited from eligible local youth (12th Pass with computer diploma) for Panchayat Computer Assistant post.',
        descriptionHi: 'पंचायत सहायक/कंप्यूटर ऑपरेटर पद हेतु स्थानीय युवाओं से आवेदन आमंत्रित।',
        category: 'Employment',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Water Pipeline Flushing & Sanitation Campaign',
        titleHi: 'जल पाइपलाइन सफाई एवं स्वच्छता अभियान',
        description: 'Main overhead water tank will be chlorinated and cleaned this Sunday. Water supply will resume normally by evening.',
        descriptionHi: 'इस रविवार मुख्य ओवरहेड पानी की टंकी की क्लोरीनेशन सफाई की जाएगी।',
        category: 'General',
        isUrgent: false,
        publishedDate: new Date(),
        createdBy: admin._id
      },
      {
        title: 'Pulse Polio Vaccination Drive for Children Under 5',
        titleHi: '5 वर्ष तक के बच्चों हेतु पल्स पोलियो अभियान',
        description: 'Ensure 2 drops of life for all children below 5 years at nearest Anganwadi center or PHC booth on coming Sunday.',
        descriptionHi: 'आगामी रविवार को सभी 5 वर्ष तक के बच्चों को पोलियो रोधी खुराक अवश्य पिलाएं।',
        category: 'Health',
        isUrgent: true,
        publishedDate: new Date(),
        createdBy: admin._id
      }
    ]);

    console.log('Seeding Sample Complaints...');
    await Complaint.insertMany([
      {
        complaintId: 'CMP-20260913-W892',
        citizen: citizen1._id,
        citizenName: citizen1.name,
        phone: citizen1.phone,
        category: 'Water',
        subject: 'Low Water Pressure in Ward 3 Tap Pipeline',
        description: 'Drinking water pressure in main street pipeline has dropped significantly for past 4 days. Morning supply lasts only 15 minutes.',
        location: 'Near Old Water Tank, Ward 3, Kalyanpur',
        priority: 'High',
        status: 'In Progress',
        adminResponse: 'Panchayat plumber team inspected the line. Valve repair work currently in progress.'
      },
      {
        complaintId: 'CMP-20260912-E410',
        citizen: citizen2._id,
        citizenName: citizen2.name,
        phone: citizen2.phone,
        category: 'Street Lights',
        subject: 'Flickering Solar Light Near Primary School Gate',
        description: 'The solar street light post opposite the primary school main gate stops working after dusk, creating safety issues for school children.',
        location: 'Primary School Road, Ward 1',
        priority: 'Medium',
        status: 'Pending',
        adminResponse: ''
      },
      {
        complaintId: 'CMP-20260910-R119',
        citizen: citizen1._id,
        citizenName: citizen1.name,
        phone: citizen1.phone,
        category: 'Roads',
        subject: 'Large Potholes on Canal Connecting Road',
        description: 'Monsoon rainfall damaged 200 meters of link road near canal bridge. Heavy tractor movement is risky.',
        location: 'Canal Road, East Crossing',
        priority: 'Urgent',
        status: 'Resolved',
        adminResponse: 'Gravel filling completed by MGNREGA road crew. Bitumen patch work completed on Sep 12.'
      },
      {
        complaintId: 'CMP-20260908-S551',
        citizen: citizen2._id,
        citizenName: citizen2.name,
        phone: citizen2.phone,
        category: 'Sanitation',
        subject: 'Garbage Accumulation near Weekly Haat Bazaar',
        description: 'Waste left behind after weekly Wednesday market needs immediate clearance to prevent odor and pest breeding.',
        location: 'Weekly Market Field, Kalyanpur',
        priority: 'Medium',
        status: 'Resolved',
        adminResponse: 'Sanitation team dispatched. Field cleared and disinfected with bleaching powder.'
      }
    ]);

    console.log('Seeding Local Jobs...');
    await Job.insertMany([
      {
        jobTitle: 'Gram Panchayat Computer Operator / Assistant',
        organization: 'Kalyanpur Gram Panchayat Administration',
        location: 'Gram Panchayat Office, Kalyanpur',
        description: 'Data entry, maintaining citizen records, issuing online certificates, and updating Panchayat portal.',
        qualification: '12th Pass with CCC / Diploma in Computer Applications',
        salary: '₹12,500 / month',
        jobType: 'Contractual',
        lastDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        applicationLink: 'https://smartvillage.gov.in/jobs/apply'
      },
      {
        jobTitle: 'Asha Health Worker (Community Health)',
        organization: 'National Health Mission / PHC Kalyanpur',
        location: 'Kalyanpur Ward 2 & Ward 4',
        description: 'Maternal care outreach, immunization awareness, distributing health kits to pregnant women.',
        qualification: '10th Pass (Resident female candidates preferred)',
        salary: '₹8,500 / month + Incentives',
        jobType: 'Full Time',
        lastDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        applicationLink: 'https://nhm.gov.in'
      },
      {
        jobTitle: 'Anganwadi Helper / Worker',
        organization: 'Integrated Child Development Services (ICDS)',
        location: 'Anganwadi Center 2, Kalyanpur',
        description: 'Assisting pre-school children education, distributing supplementary nutrition meals, record keeping.',
        qualification: '10th / 12th Standard',
        salary: '₹9,000 / month',
        jobType: 'Full Time',
        lastDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        applicationLink: 'https://icds.gov.in'
      },
      {
        jobTitle: 'Water Supply Valve Operator',
        organization: 'Gram Jal & Swachhata Samiti',
        location: 'Overhead Tank Facility, Kalyanpur',
        description: 'Managing daily water pump operations, tank chlorination, inspecting distribution pipeline leaks.',
        qualification: '8th Pass with basic plumbing knowledge',
        salary: '₹8,000 / month',
        jobType: 'Part Time',
        lastDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        applicationLink: '#'
      },
      {
        jobTitle: 'MGNREGA Field Works Supervisor (Mate)',
        organization: 'Gram Panchayat Kalyanpur',
        location: 'Panchayat Project Sites',
        description: 'Supervising daily MGNREGA labor attendance, measuring earthwork excavation, uploading photos on NREGA app.',
        qualification: '10th Pass',
        salary: '₹270 / day wage',
        jobType: 'Daily Wage',
        lastDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        applicationLink: '#'
      }
    ]);

    console.log('Seeding Health Services...');
    await HealthService.insertMany([
      {
        name: 'Primary Health Center (PHC) Kalyanpur',
        serviceType: 'Primary Health Center',
        doctorInCharge: 'Dr. Alok Verma (MBBS)',
        contactNumber: '+91 94150 11223',
        emergencyNumber: '108',
        address: 'Hospital Road, Near Block Office, Kalyanpur',
        timing: '8:00 AM - 2:00 PM & 4:00 PM - 6:00 PM (Emergency 24x7)',
        servicesOffered: 'Outpatient Care (OPD), Vaccination, Maternity & Childcare, Free Blood Testing, Emergency First Aid.',
        healthCamps: 'Monthly Immunization & Antenatal Checkup every Wednesday.'
      },
      {
        name: 'Government 108 Emergency Ambulance Unit',
        serviceType: 'Ambulance',
        doctorInCharge: 'Paramedic Team Alpha',
        contactNumber: '108',
        emergencyNumber: '108 / 112',
        address: 'Stationed at PHC Kalyanpur Main Gate',
        timing: '24 Hours x 7 Days Service',
        servicesOffered: 'Instant emergency patient transportation to District Hospital with basic life support system.',
        healthCamps: 'Zero cost emergency pickup service.'
      },
      {
        name: 'Jan Aushadhi Kendra (Generic Pharmacy)',
        serviceType: 'Pharmacy',
        doctorInCharge: 'Pharmacist Suresh Chandra',
        contactNumber: '+91 98390 55443',
        emergencyNumber: 'N/A',
        address: 'Panchayat Market Complex, Shop No. 5',
        timing: '8:00 AM - 8:00 PM',
        servicesOffered: 'High quality generic medicines, surgical items, and health supplements at 50%-90% discount rates.',
        healthCamps: 'Free BP & Sugar screening every Saturday.'
      }
    ]);

    console.log('Seeding Schools...');
    await School.insertMany([
      {
        schoolName: 'Government Secondary School Kalyanpur',
        address: 'School Tola, Main Highway Road, Kalyanpur',
        headmaster: 'Shri Rajendra Prasad Sharma (M.A., B.Ed.)',
        contactPhone: '+91 94501 88776',
        availableClasses: 'Class 1 to Class 10 (Co-Education Hindi/English Medium)',
        facilities: 'Computer Lab, Science Laboratory, Smart Classroom with Projector, Playground, Mid-Day Meal Dining Hall, Library.',
        totalStudents: 380,
        announcements: 'Free Cycle Distribution for Class 8 Girls on Friday.'
      },
      {
        schoolName: 'Kasturba Gandhi Balika Vidyalaya (KGBV)',
        address: 'Ward 4, Near Panchayat Bhavan, Kalyanpur',
        headmaster: 'Smt. Anita Srivastava',
        contactPhone: '+91 98381 22334',
        availableClasses: 'Class 6 to Class 8 (Residential School for Girls)',
        facilities: 'Hostel facility, Free Lodging, Uniforms, Sports Equipment, Vocational Skill Center.',
        totalStudents: 150,
        announcements: 'Sports Meet & Annual Cultural Function next week.'
      },
      {
        schoolName: 'Model Anganwadi Learning Center 1',
        address: 'Ward 2 Near Temple, Kalyanpur',
        headmaster: 'Smt. Kamla Devi (Supervisor)',
        contactPhone: '+91 91400 33445',
        availableClasses: 'Pre-School / Early Child Care (Ages 3-6)',
        facilities: 'Toys, Pre-Primary Activity Charts, Clean Drinking Water, Hot Cooked Meals.',
        totalStudents: 65,
        announcements: 'Poshan Maah Healthy Baby Competition this Friday.'
      }
    ]);

    console.log('Seeding Agriculture Advisories...');
    await AgricultureInfo.insertMany([
      {
        title: 'PM-KISAN 17th Installment KYC Mandatory Notice',
        category: 'Government Scheme',
        description: 'All farmers receiving PM-KISAN benefits must complete their e-KYC via OTP or Biometric at nearest CSC center to ensure timely credit of ₹2,000.',
        season: 'All Season',
        contactPhone: '1800-180-1551 (Kisan Call Center)'
      },
      {
        title: 'Wheat Sowing Management & High Yielding Seed Varieties',
        category: 'Crop Info',
        description: 'Recommended seed varieties DBW-187 and HD-3226 for Rabi season. Seed treatment with Trichoderma recommended to prevent soil-borne fungal diseases.',
        season: 'Rabi',
        contactPhone: '+91 522 245100 (Krishi Vigyan Kendra)'
      },
      {
        title: 'Soil Health Card Testing Campaign',
        category: 'Farming Tip',
        description: 'Get free soil testing done at Block Soil Lab before sowing to balance NPK fertilizer ratio and reduce cultivation cost by up to 25%.',
        season: 'All Season',
        contactPhone: '+91 94150 99887'
      },
      {
        title: 'Mandi Daily Commodity Rates (Kalyanpur Mandi)',
        category: 'Market Rates / Mandi',
        description: 'Current Mandi Prices: Paddy (Dhan) Common: ₹2,183/quintal; Wheat: ₹2,275/quintal; Mustard: ₹5,650/quintal; Potato: ₹1,400/quintal.',
        season: 'All Season',
        contactPhone: '0522-261234'
      }
    ]);

    console.log('Seeding Emergency Contacts...');
    await EmergencyContact.insertMany([
      {
        department: 'Police Helpline & Kalyanpur Outpost',
        contactPerson: 'Station House Officer (SHO)',
        phoneNumber: '112 / +91 94544 00100',
        alternatePhone: '+91 94544 00101',
        address: 'Police Chowki, Kalyanpur Highway',
        availability: '24x7 Emergency Patrol',
        priorityOrder: 1
      },
      {
        department: '108 Medical Emergency Ambulance',
        contactPerson: 'National Health Mission Emergency Unit',
        phoneNumber: '108',
        alternatePhone: '102 (Maternal Ambulance)',
        address: 'PHC Campus, Kalyanpur',
        availability: '24x7 Ambulance Response',
        priorityOrder: 2
      },
      {
        department: 'Fire & Rescue Station',
        contactPerson: 'Fire Safety Officer',
        phoneNumber: '101 / +91 94544 04000',
        alternatePhone: '112',
        address: 'Tehsil Fire Headquarters',
        availability: '24x7 Emergency Response',
        priorityOrder: 3
      },
      {
        department: 'Women Helpline & Safety Cell',
        contactPerson: 'Women Protection Officer',
        phoneNumber: '1090 / 181',
        alternatePhone: '+91 94544 02020',
        address: 'District Women Help Desk',
        availability: '24x7 Confidential Counseling & Protection',
        priorityOrder: 4
      },
      {
        department: 'Electricity Fault Repair Helpline',
        contactPerson: 'Junior Engineer (JE Power Supply)',
        phoneNumber: '1912 / +91 94159 00112',
        alternatePhone: '+91 94159 00113',
        address: '33/11 KV Substation Kalyanpur',
        availability: '6:00 AM - 10:00 PM',
        priorityOrder: 5
      },
      {
        department: 'Gram Panchayat Administrative Helpline',
        contactPerson: 'Village Pradhan & Panchayat Secretary',
        phoneNumber: '+91 98765 43210',
        alternatePhone: '+91 91234 56789',
        address: 'Panchayat Bhavan, Kalyanpur',
        availability: '9:00 AM - 5:00 PM (Mon-Sat)',
        priorityOrder: 6
      }
    ]);

    console.log('Seeding Village Services...');
    await VillageService.insertMany([
      {
        serviceName: 'Clean Drinking Water Supply (Jal Jeevan Mission)',
        serviceNameHi: 'पेयजल आपूर्ति (जल जीवन मिशन)',
        department: 'Water Supply & Sanitation Department',
        description: 'Piped drinking water distribution supplied twice daily (Morning 6-8 AM, Evening 5-7 PM).',
        status: 'Available',
        fees: '₹50 / month maintenance fee',
        processingTime: 'Instant / Daily Supply',
        contactPerson: 'Panchayat Valve Operator',
        formLink: '#'
      },
      {
        serviceName: 'Rural Electricity Grid & Solar Street Lighting',
        serviceNameHi: 'ग्रामीण विद्युत ग्रिड एवं सोलर स्ट्रीट लाइट',
        department: 'State Electricity Board & Renewable Energy Dept',
        description: '24x7 domestic power supply & automated solar street lights along public roads.',
        status: 'Available',
        fees: 'As per meter reading',
        processingTime: 'Same Day Repair',
        contactPerson: 'JE Power Supply',
        formLink: '#'
      },
      {
        serviceName: 'Birth & Death Certificate Issuance',
        serviceNameHi: 'जन्म एवं मृत्यु प्रमाण पत्र निर्गमन',
        department: 'Gram Panchayat Revenue Office',
        description: 'Registration and official certificate issuing for births and deaths occurring within Gram Panchayat jurisdiction.',
        status: 'Available',
        fees: 'Free within 21 days',
        processingTime: '3 to 5 Working Days',
        contactPerson: 'Gram Sachiv (Panchayat Secretary)',
        formLink: '#'
      },
      {
        serviceName: 'Residence & Income Certificate Verification',
        serviceNameHi: 'निवास एवं आय प्रमाण पत्र सत्यापन',
        department: 'Tehsil Revenue Department',
        description: 'Primary verification of residency and annual family income certificates for scholarships and schemes.',
        status: 'Available',
        fees: '₹15 Official Fee',
        processingTime: '7 Working Days',
        contactPerson: 'Lekhpal / Revenue Inspector',
        formLink: 'https://edistrict.gov.in'
      },
      {
        serviceName: 'Solid Waste Management & Door-to-Door Collection',
        serviceNameHi: 'ठोस कचरा प्रबंधन एवं घर-घर कचरा संग्रहण',
        department: 'Swachh Bharat Mission Gramin',
        description: 'Daily morning collection of segregated dry and wet household waste using Panchayat e-rickshaws.',
        status: 'Available',
        fees: 'Free Community Service',
        processingTime: 'Daily Morning Collection',
        contactPerson: 'Sanitation Supervisor',
        formLink: '#'
      },
      {
        serviceName: 'High Speed BharatNet Village Wi-Fi Hotline',
        serviceNameHi: 'भारतनेट हाई-स्पीड ग्राम वाई-फाई हॉटस्पॉट',
        department: 'Telecommunications & IT Department',
        description: 'Free 1 GB daily Wi-Fi internet access at Panchayat Bhavan and Village Public Library premises.',
        status: 'Under Maintenance',
        fees: 'Free 1 GB Daily per citizen',
        processingTime: 'Instant Connect',
        contactPerson: 'CSC VLE Operator',
        formLink: '#'
      }
    ]);

    console.log('Database seeding successfully completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
