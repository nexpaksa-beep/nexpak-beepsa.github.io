/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE
 online-data.js
 PART 1

 MASTER PRODUCT DATABASE

 IMPORTANT:
 This file contains ONLY product data.
 No HTML.
 No CSS.
 No cart functions.
 No checkout functions.

 All other online-store files will read from this database.
=========================================================*/


const ONLINE_PRODUCTS = [

    /*=====================================================
      GATE AUTOMATION
    =====================================================*/

    {
        id: "D5EVO-KIT",
        name: "Centurion D5 Evo Smart Gate Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "sliding-gate-motors",

        price: 8999.00,
        oldPrice: 9499.00,
        discount: 5,

        image: "images/products/d5evo-kit.jpg",

        badge: "Popular",

        rating: 4.8,
        reviews: 24,

        stock: true,

        shortDescription:
            "Complete Centurion D5 Evo Smart sliding gate motor kit.",

        description:
            "A professional sliding gate automation solution suitable for residential and light commercial applications.",

        featured: true,

        configurable: true
    },


    {
        id: "D5SMART-KIT",
        name: "Centurion D5 Smart Gate Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "sliding-gate-motors",

        price: 9999.00,
        oldPrice: 10499.00,
        discount: 5,

        image: "images/products/d5smart-kit.jpg",

        badge: "Smart",

        rating: 4.9,
        reviews: 18,

        stock: true,

        shortDescription:
            "Smart Centurion sliding gate motor kit with advanced access features.",

        description:
            "Smart gate automation package designed for modern residential and commercial security applications.",

        featured: true,

        configurable: true
    },


    {
        id: "D10SMART-KIT",
        name: "Centurion D10 Smart Gate Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "sliding-gate-motors",

        price: 12999.00,
        oldPrice: 13999.00,
        discount: 7,

        image: "images/products/d10smart-kit.jpg",

        badge: "Heavy Duty",

        rating: 4.9,
        reviews: 16,

        stock: true,

        shortDescription:
            "Heavy-duty Centurion D10 Smart sliding gate motor kit.",

        description:
            "High-performance sliding gate automation designed for demanding residential and commercial installations.",

        featured: true,

        configurable: true
    },


    {
        id: "D10TURBO-SMART-KIT",
        name: "Centurion D10 Turbo Smart Gate Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "sliding-gate-motors",

        price: 14999.00,
        oldPrice: 15999.00,
        discount: 6,

        image: "images/products/d10-turbo-smart-kit.jpg",

        badge: "Premium",

        rating: 5.0,
        reviews: 9,

        stock: true,

        shortDescription:
            "Premium high-speed Centurion D10 Turbo Smart gate motor kit.",

        description:
            "High-speed, heavy-duty gate automation for demanding security applications.",

        featured: true,

        configurable: true
    },


    {
        id: "SD04-SMART-KIT",
        name: "Centurion SD04 Smart Garage Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "garage-motors",

        price: 6999.00,
        oldPrice: 7499.00,
        discount: 7,

        image: "images/products/sd04-smart-kit.jpg",

        badge: "Smart",

        rating: 4.8,
        reviews: 11,

        stock: true,

        shortDescription:
            "Centurion SD04 Smart automated garage door motor kit.",

        description:
            "Smart garage automation solution for residential garage doors.",

        featured: false,

        configurable: true
    },


    {
        id: "VANTAGE-SWING-KIT",
        name: "Centurion Vantage Swing Gate Motor Kit",
        brand: "Centurion",
        category: "gate-automation",
        subcategory: "swing-gate-motors",

        price: 8999.00,
        oldPrice: 9499.00,
        discount: 5,

        image: "images/products/vantage-swing-kit.jpg",

        badge: "Popular",

        rating: 4.7,
        reviews: 13,

        stock: true,

        shortDescription:
            "Complete Centurion Vantage swing gate motor automation kit.",

        description:
            "Professional swing gate automation solution for residential and commercial properties.",

        featured: false,

        configurable: true
    },


    /*=====================================================
      HD CCTV
    =====================================================*/

    {
        id: "DAHUA-8CH-HD-KIT",
        name: "Dahua 8 Channel HD CCTV Kit",
        brand: "Dahua",
        category: "cctv",
        subcategory: "hd-cctv-kits",

        price: 4999.00,
        oldPrice: 5499.00,
        discount: 9,

        image: "images/products/dahua-8ch-hd-kit.jpg",

        badge: "Best Seller",

        rating: 4.8,
        reviews: 31,

        stock: true,

        shortDescription:
            "Complete Dahua 8-channel HD CCTV surveillance kit.",

        description:
            "Professional HD CCTV package suitable for homes, offices and small businesses.",

        featured: true,

        configurable: true
    },


    {
        id: "DAHUA-16CH-HD-KIT",
        name: "Dahua 16 Channel HD CCTV Kit",
        brand: "Dahua",
        category: "cctv",
        subcategory: "hd-cctv-kits",

        price: 6999.00,
        oldPrice: 7499.00,
        discount: 7,

        image: "images/products/dahua-16ch-hd-kit.jpg",

        badge: "Popular",

        rating: 4.8,
        reviews: 22,

        stock: true,

        shortDescription:
            "Dahua 16-channel HD CCTV surveillance package.",

        description:
            "Scalable CCTV solution for larger homes, offices and commercial properties.",

        featured: true,

        configurable: true
    },


    {
        id: "DAHUA-32CH-HD-KIT",
        name: "Dahua 32 Channel HD CCTV Kit",
        brand: "Dahua",
        category: "cctv",
        subcategory: "hd-cctv-kits",

        price: 9999.00,
        oldPrice: 10999.00,
        discount: 9,

        image: "images/products/dahua-32ch-hd-kit.jpg",

        badge: "Professional",

        rating: 4.9,
        reviews: 14,

        stock: true,

        shortDescription:
            "Professional Dahua 32-channel HD CCTV system.",

        description:
            "Large-scale HD surveillance solution for commercial and industrial environments.",

        featured: true,

        configurable: true
    },


    {
        id: "IP-CCTV-KIT",
        name: "Professional IP CCTV Security Kit",
        brand: "Nexpak",
        category: "cctv",
        subcategory: "ip-cctv-kits",

        price: 6999.00,
        oldPrice: 7499.00,
        discount: 7,

        image: "images/products/ip-cctv-kit.jpg",

        badge: "IP CCTV",

        rating: 4.8,
        reviews: 17,

        stock: true,

        shortDescription:
            "Professional IP network CCTV kit with NVR recording.",

        description:
            "Network-based CCTV surveillance system suitable for modern security installations.",

        featured: true,

        configurable: true
    },


    {
        id: "PTZ-IP-CAMERA",
        name: "PTZ IP Security Camera",
        brand: "Dahua",
        category: "cctv",
        subcategory: "ptz-ip-cameras",

        price: 4499.00,
        oldPrice: 4999.00,
        discount: 10,

        image: "images/products/ptz-ip-camera.jpg",

        badge: "PTZ",

        rating: 4.7,
        reviews: 12,

        stock: true,

        shortDescription:
            "Motorised PTZ IP surveillance camera.",

        description:
            "Remote-controlled pan, tilt and zoom IP security camera for advanced surveillance.",

        featured: false,

        configurable: false
    },


    {
        id: "PTZ-HD-CAMERA",
        name: "PTZ HD CCTV Camera",
        brand: "Dahua",
        category: "cctv",
        subcategory: "ptz-hd-cameras",

        price: 3299.00,
        oldPrice: 3699.00,
        discount: 11,

        image: "images/products/ptz-hd-camera.jpg",

        badge: "PTZ",

        rating: 4.6,
        reviews: 10,

        stock: true,

        shortDescription:
            "High-definition PTZ camera for professional CCTV systems.",

        description:
            "Motorised pan, tilt and zoom HD surveillance camera.",

        featured: false,

        configurable: false
    },


    /*=====================================================
      ROBOGUARD
    =====================================================*/

    {
        id: "ROBOGUARD-KIT2",
        name: "Roboguard Kit 2",
        brand: "Roboguard",
        category: "roboguard",
        subcategory: "roboguard-kits",

        price: 5999.00,
        oldPrice: 6499.00,
        discount: 8,

        image: "images/products/roboguard-kit2.jpg",

        badge: "Popular",

        rating: 4.8,
        reviews: 19,

        stock: true,

        shortDescription:
            "Roboguard perimeter protection starter kit.",

        description:
            "Wireless perimeter security solution for residential properties.",

        featured: true,

        configurable: true
    },


    {
        id: "ROBOGUARD-KIT4",
        name: "Roboguard Kit 4",
        brand: "Roboguard",
        category: "roboguard",
        subcategory: "roboguard-kits",

        price: 8999.00,
        oldPrice: 9499.00,
        discount: 5,

        image: "images/products/roboguard-kit4.jpg",

        badge: "Popular",

        rating: 4.9,
        reviews: 15,

        stock: true,

        shortDescription:
            "Roboguard perimeter security kit with four detectors.",

        description:
            "Expandable wireless perimeter security package.",

        featured: true,

        configurable: true
    },


    {
        id: "ROBOGUARD-KIT8",
        name: "Roboguard Kit 8",
        brand: "Roboguard",
        category: "roboguard",
        subcategory: "roboguard-kits",

        price: 14999.00,
        oldPrice: 15999.00,
        discount: 6,

        image: "images/products/roboguard-kit8.jpg",

        badge: "Professional",

        rating: 4.9,
        reviews: 8,

        stock: true,

        shortDescription:
            "Large Roboguard perimeter protection package.",

        description:
            "Professional wireless perimeter protection system for larger properties.",

        featured: true,

        configurable: true
    },


    /*=====================================================
      ALARM SYSTEMS
    =====================================================*/

    {
        id: "AJAX-ALARM-KIT",
        name: "Ajax Security Alarm Kit",
        brand: "Ajax",
        category: "alarm-systems",
        subcategory: "wireless-alarms",

        price: 6999.00,
        oldPrice: 7499.00,
        discount: 7,

        image: "images/products/ajax-alarm-kit.jpg",

        badge: "Smart Alarm",

        rating: 4.9,
        reviews: 21,

        stock: true,

        shortDescription:
            "Smart wireless Ajax security alarm starter kit.",

        description:
            "Modern wireless alarm solution with smart security management.",

        featured: true,

        configurable: true
    },


    {
        id: "IDS-805-KIT",
        name: "IDS 805 Alarm Kit",
        brand: "IDS",
        category: "alarm-systems",
        subcategory: "wired-alarms",

        price: 3499.00,
        oldPrice: 3799.00,
        discount: 8,

        image: "images/products/ids-805-kit.jpg",

        badge: "Popular",

        rating: 4.7,
        reviews: 16,

        stock: true,

        shortDescription:
            "IDS 805 alarm security starter kit.",

        description:
            "Reliable alarm system suitable for residential and small commercial installations.",

        featured: true,

        configurable: true
    },


    {
        id: "IDS-X64-KIT",
        name: "IDS X64 Alarm Kit",
        brand: "IDS",
        category: "alarm-systems",
        subcategory: "wired-alarms",

        price: 4499.00,
        oldPrice: 4899.00,
        discount: 8,

        image: "images/products/ids-x64-kit.jpg",

        badge: "Professional",

        rating: 4.8,
        reviews: 13,

        stock: true,

        shortDescription:
            "IDS X64 professional alarm system kit.",

        description:
            "Expandable alarm solution for larger residential and commercial installations.",

        featured: false,

        configurable: true
    },


    /*=====================================================
      ACCESS CONTROL
    =====================================================*/

    {
        id: "ACCESS-CONTROL-KIT",
        name: "Complete Access Control Kit",
        brand: "Nexpak",
        category: "access-control",
        subcategory: "access-control-kits",

        price: 2999.00,
        oldPrice: 3299.00,
        discount: 9,

        image: "images/products/access-control-kit.jpg",

        badge: "Complete Kit",

        rating: 4.7,
        reviews: 14,

        stock: true,

        shortDescription:
            "Complete electronic access control starter kit.",

        description:
            "Access control package for controlled entry into homes, offices and commercial premises.",

        featured: true,

        configurable: true
    },


    /*=====================================================
      INTERCOM
    =====================================================*/

    {
        id: "INTERCOM-KIT",
        name: "Video Intercom Security Kit",
        brand: "Nexpak",
        category: "intercom",
        subcategory: "video-intercom",

        price: 3999.00,
        oldPrice: 4499.00,
        discount: 11,

        image: "images/products/intercom-kit.jpg",

        badge: "Video",

        rating: 4.8,
        reviews: 12,

        stock: true,

        shortDescription:
            "Complete video intercom security kit.",

        description:
            "Video communication and controlled visitor access solution.",

        featured: true,

        configurable: true
    },


    /*=====================================================
      ELECTRIC FENCING
    =====================================================*/

    {
        id: "EF-100M-FLAT-6LINE",
        name: "Electric Fence 100m 6-Line Flat Bar Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "flat-bar-kits",

        price: 3999.00,
        oldPrice: 4299.00,
        discount: 7,

        image: "images/products/ef-100m-flat-6line.jpg",

        badge: "Starter Kit",

        rating: 4.8,
        reviews: 18,

        stock: true,

        shortDescription:
            "100m six-line electric fencing kit with flat bar components.",

        description:
            "Complete electric fencing starter package for perimeter protection.",

        featured: true,

        configurable: true
    },


    {
        id: "EF-100M-SQUARE-6LINE",
        name: "Electric Fence 100m 6-Line Square Tube Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "square-tube-kits",

        price: 4499.00,
        oldPrice: 4799.00,
        discount: 6,

        image: "images/products/ef-100m-square-6line.jpg",

        badge: "Popular",

        rating: 4.8,
        reviews: 15,

        stock: true,

        shortDescription:
            "100m six-line square tube electric fencing kit.",

        description:
            "Durable electric perimeter fencing package for residential applications.",

        featured: true,

        configurable: true
    },


    {
        id: "EF-100M-SQUARE-8LINE",
        name: "Electric Fence 100m 8-Line Square Tube Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "square-tube-kits",

        price: 4999.00,
        oldPrice: 5399.00,
        discount: 7,

        image: "images/products/ef-100m-square-8line.jpg",

        badge: "8-Line",

        rating: 4.8,
        reviews: 11,

        stock: true,

        shortDescription:
            "100m eight-line square tube electric fencing kit.",

        description:
            "Expanded electric fencing solution for enhanced perimeter protection.",

        featured: true,

        configurable: true
    },


    {
        id: "EF-100M-10LINE",
        name: "Electric Fence 100m 10-Line Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "multi-line-kits",

        price: 5799.00,
        oldPrice: 6199.00,
        discount: 6,

        image: "images/products/ef-100m-10line.jpg",

        badge: "10-Line",

        rating: 4.8,
        reviews: 9,

        stock: true,

        shortDescription:
            "100m ten-line electric fencing security kit.",

        description:
            "High-security electric fencing package with ten electrified lines.",

        featured: false,

        configurable: true
    },


    {
        id: "EF-100M-12LINE",
        name: "Electric Fence 100m 12-Line Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "multi-line-kits",

        price: 6499.00,
        oldPrice: 6999.00,
        discount: 7,

        image: "images/products/ef-100m-12line.jpg",

        badge: "12-Line",

        rating: 4.9,
        reviews: 7,

        stock: true,

        shortDescription:
            "100m twelve-line electric fencing security kit.",

        description:
            "High-security perimeter fencing solution for demanding applications.",

        featured: false,

        configurable: true
    },


    /*=====================================================
      AGRICULTURAL ELECTRIC FENCING
    =====================================================*/

    {
        id: "AGRI-100M-KIT",
        name: "Agricultural Electric Fence 100m Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "agricultural",

        price: 2999.00,
        oldPrice: 3299.00,
        discount: 9,

        image: "images/products/agri-100m-kit.jpg",

        badge: "Agricultural",

        rating: 4.7,
        reviews: 8,

        stock: true,

        shortDescription:
            "100m agricultural electric fencing starter kit.",

        description:
            "Electric fencing package designed for agricultural and smallholding applications.",

        featured: true,

        configurable: true
    },


    {
        id: "AGRI-500M-KIT",
        name: "Agricultural Electric Fence 500m Kit",
        brand: "Nexpak",
        category: "electric-fencing",
        subcategory: "agricultural",

        price: 8999.00,
        oldPrice: 9499.00,
        discount: 5,

        image: "images/products/agri-500m-kit.jpg",

        badge: "500m",

        rating: 4.8,
        reviews: 6,

        stock: true,

        shortDescription:
            "500m agricultural electric fencing package.",

        description:
            "Extended agricultural perimeter protection system for farms and smallholdings.",

        featured: true,

        configurable: true
    }

];



/*=========================================================
 PRODUCT DATABASE HELPERS
=========================================================*/


function getOnlineProductById(id){

    return ONLINE_PRODUCTS.find(product => product.id === id);

}


function getOnlineProductsByCategory(category){

    if(!category || category === "all"){

   
