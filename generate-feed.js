/**
 * ============================================================
 * NEXPAK SECURITY SOLUTIONS
 * Google Merchant Center Product Feed Generator
 * ============================================================
 *
 * Output:
 *   feed.txt
 *
 * Format:
 *   Google Merchant Center TSV / TXT
 *
 * Website:
 *   https://www.nexpaksolutions.co.za
 *
 * ============================================================
 */

const fs = require("fs");

const BASE_URL = "https://www.nexpaksolutions.co.za";
const STORE_URL = `${BASE_URL}/online-store/online.html`;

/**
 * ------------------------------------------------------------
 * HELPERS
 * ------------------------------------------------------------
 */

function cleanText(value) {
  return String(value || "")
    .replace(/\r?\n|\r/g, " ")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function money(value) {
  return `${Number(value).toFixed(2)} ZAR`;
}

function weight(value) {
  return `${Number(value).toFixed(1)} kg`;
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}

function productLink(path = STORE_URL) {
  if (!path) return STORE_URL;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}

/**
 * ------------------------------------------------------------
 * PRODUCT BUILDER
 * ------------------------------------------------------------
 */

function makeProduct({
  id,
  title,
  description,
  price,
  image,
  weight: shippingWeight,
  brand,
  productType,
  link = STORE_URL
}) {
  return {
    id: String(id),
    title: cleanText(title),
    description: cleanText(description),
    link: productLink(link),
    image_link: imageUrl(image),
    price: money(price),
    availability: "in_stock",
    condition: "new",
    shipping_weight: weight(shippingWeight),
    brand: cleanText(brand || ""),
    product_type: cleanText(productType || "")
  };
}

/**
 * ============================================================
 * NEXPAK PRODUCT CATALOGUE
 * ============================================================
 */

const products = [

  /* ==========================================================
     ESSENTIAL SECURITY RANGE
     ========================================================== */

  makeProduct({
    id: "nexpak-4ch-dvr-kit",
    title: "4 Channel DVR Kit",
    description:
      "4-channel high-definition digital video recorder kit with power supply and accessories.",
    price: 4140,
    image: "images/4chess.png",
    weight: 3.2,
    brand: "Nexpak",
    productType: "Security Kits > CCTV Kits"
  }),

  makeProduct({
    id: "nexpak-8ch-dvr-kit",
    title: "8 Channel DVR Kit",
    description:
      "Complete 8-channel DVR CCTV setup for larger residential and small business security installations.",
    price: 5950,
    image: "images/8chess.png",
    weight: 4.5,
    brand: "Nexpak",
    productType: "Security Kits > CCTV Kits"
  }),

  makeProduct({
    id: "nexpak-4ch-full-color-kit",
    title: "4 Channel Full Color CCTV Kit",
    description:
      "4-channel full-colour CCTV camera kit with automatic pairing for improved night-time visibility.",
    price: 4450,
    image: "images/4ip.png",
    weight: 2.8,
    brand: "Nexpak",
    productType: "Security Kits > CCTV Kits"
  }),

  makeProduct({
    id: "nexpak-8ch-wireless-kit",
    title: "8 Channel Wireless CCTV Kit",
    description:
      "Long-range 8-channel wireless camera package designed for fast wire-free CCTV installation.",
    price: 7500,
    image: "images/8ip.png",
    weight: 4.0,
    brand: "Nexpak",
    productType: "Security Kits > Wireless CCTV Kits"
  }),

  makeProduct({
    id: "nexpak-electric-fence-20m-kit",
    title: "20 Meter Electric Fencing Kit",
    description:
      "Starter electric fencing perimeter kit including posts, wire, insulators and tensioners for a 20 metre installation.",
    price: 2999,
    image: "images/aff6.png",
    weight: 12,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing Kits"
  }),

  makeProduct({
    id: "nexpak-electric-fence-30m-kit",
    title: "30 Meter Electric Fencing Kit",
    description:
      "Extended electric fencing starter kit designed for a 30 metre security perimeter installation.",
    price: 3450,
    image: "images/aff6.png",
    weight: 16.5,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing Kits"
  }),

  makeProduct({
    id: "nexpak-wireless-alarm-kit",
    title: "Wireless Alarm System Kit",
    description:
      "Smart wireless intruder alarm kit with hub, door sensors, motion detector and remotes.",
    price: 2950,
    image: "images/alarmwireless.png",
    weight: 2,
    brand: "Nexpak",
    productType: "Security Kits > Alarm Systems"
  }),

  makeProduct({
    id: "jva-pet-kit-electric-fencing",
    title: "JVA Pet Kit Electric Fencing",
    description:
      "Specialised electric fencing kit designed for animal containment and pet safety.",
    price: 2034,
    image: "images/pet.png",
    weight: 4,
    brand: "JVA",
    productType: "Security Kits > Electric Fencing > Pet Fencing"
  }),

  /* ==========================================================
     NOVA REMOTES
     ========================================================== */

  makeProduct({
    id: "nova-1-button-remote",
    title: "Centurion Nova 1 Button Remote",
    description:
      "Centurion Nova rolling-code 1 button remote for compatible gate automation systems.",
    price: 195,
    image: "images/nova.png",
    weight: 0.1,
    brand: "Centurion",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "nova-2-button-remote",
    title: "Centurion Nova 2 Button Remote",
    description:
      "Centurion Nova rolling-code 2 button remote for compatible gate automation systems.",
    price: 225,
    image: "images/nova.png",
    weight: 0.1,
    brand: "Centurion",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "nova-4-button-remote",
    title: "Centurion Nova 4 Button Remote",
    description:
      "Centurion Nova rolling-code 4 button remote for compatible gate automation systems.",
    price: 265,
    image: "images/nova.png",
    weight: 0.1,
    brand: "Centurion",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "nova-receiver",
    title: "Centurion Nova Receiver",
    description:
      "Compatible receiver for Centurion Nova gate automation systems.",
    price: 450,
    image: "images/nova.png",
    weight: 0.3,
    brand: "Centurion",
    productType: "Gate Automation > Receivers"
  }),

  /* ==========================================================
     SENTRY REMOTES
     ========================================================== */

  makeProduct({
    id: "sentry-learning-1-button",
    title: "Sentry Learning 1 Button Remote",
    description:
      "Sentry learning 1 button remote for compatible gate automation systems.",
    price: 180,
    image: "images/sherlo.png",
    weight: 0.1,
    brand: "Sentry",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "sentry-learning-3-button",
    title: "Sentry Learning 3 Button Remote",
    description:
      "Sentry learning 3 button remote for compatible gate automation systems.",
    price: 220,
    image: "images/sherlo.png",
    weight: 0.1,
    brand: "Sentry",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "sentry-dip-switch-1-button",
    title: "Sentry Dip Switch 1 Button Remote",
    description:
      "Sentry dip-switch 1 button remote for compatible gate automation systems.",
    price: 175,
    image: "images/sherlo.png",
    weight: 0.1,
    brand: "Sentry",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "sentry-dip-switch-3-button",
    title: "Sentry Dip Switch 3 Button Remote",
    description:
      "Sentry dip-switch 3 button remote for compatible gate automation systems.",
    price: 215,
    image: "images/sherlo.png",
    weight: 0.1,
    brand: "Sentry",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "sentry-learning-receiver",
    title: "Sentry 1 Channel Learning Receiver",
    description:
      "Sentry 1 channel learning receiver for compatible gate automation systems.",
    price: 395,
    image: "images/sherlo.png",
    weight: 0.3,
    brand: "Sentry",
    productType: "Gate Automation > Receivers"
  }),

  makeProduct({
    id: "sentry-dip-switch-receiver",
    title: "Sentry 1 Channel Dip Switch Receiver",
    description:
      "Sentry 1 channel dip-switch receiver for compatible gate automation systems.",
    price: 395,
    image: "images/sherlo.png",
    weight: 0.3,
    brand: "Sentry",
    productType: "Gate Automation > Receivers"
  }),

  /* ==========================================================
     ET REMOTES
     ========================================================== */

  makeProduct({
    id: "et-1-button-remote",
    title: "ET 1 Button Remote",
    description:
      "ET 1 button gate motor remote control.",
    price: 185,
    image: "images/etrem.png",
    weight: 0.1,
    brand: "ET",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "et-2-button-remote",
    title: "ET 2 Button Remote",
    description:
      "ET 2 button gate motor remote control.",
    price: 215,
    image: "images/etrem.png",
    weight: 0.1,
    brand: "ET",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "et-4-button-remote",
    title: "ET 4 Button Remote",
    description:
      "ET 4 button gate motor remote control.",
    price: 255,
    image: "images/etrem.png",
    weight: 0.1,
    brand: "ET",
    productType: "Gate Automation > Remotes"
  }),

  makeProduct({
    id: "et-receiver",
    title: "ET Gate Motor Receiver",
    description:
      "ET receiver for compatible automated gate systems.",
    price: 420,
    image: "images/etrem.png",
    weight: 0.3,
    brand: "ET",
    productType: "Gate Automation > Receivers"
  }),

  /* ==========================================================
     12V BATTERIES
     ========================================================== */

  makeProduct({
    id: "battery-7ah-lead-acid",
    title: "7Ah 12V Lead Acid Battery",
    description:
      "12V 7Ah lead acid battery for compatible security and gate automation systems.",
    price: 280,
    image: "images/7amp.png",
    weight: 2.1,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-7ah-gel",
    title: "7Ah 12V Gel Battery",
    description:
      "12V 7Ah gel battery for compatible security and gate automation systems.",
    price: 380,
    image: "images/7amp.png",
    weight: 2.2,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-9ah-lead-acid",
    title: "9Ah 12V Lead Acid Battery",
    description:
      "12V 9Ah lead acid battery for compatible security and gate automation systems.",
    price: 350,
    image: "images/7amp.png",
    weight: 2.5,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-9ah-gel",
    title: "9Ah 12V Gel Battery",
    description:
      "12V 9Ah gel battery for compatible security and gate automation systems.",
    price: 460,
    image: "images/7amp.png",
    weight: 2.6,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-18ah-12v",
    title: "18Ah 12V Battery",
    description:
      "High-capacity 18Ah 12V battery for security and gate automation applications.",
    price: 850,
    image: "images/18amp.png",
    weight: 5.5,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-35ah-12v",
    title: "35Ah 12V Battery",
    description:
      "High-capacity 35Ah 12V battery for security and gate automation applications.",
    price: 1450,
    image: "images/18amp.png",
    weight: 10.2,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-50ah-12v",
    title: "50Ah 12V Battery",
    description:
      "High-capacity 50Ah 12V battery for security and gate automation applications.",
    price: 2100,
    image: "images/18amp.png",
    weight: 14.5,
    brand: "Nexpak",
    productType: "Security Power > Batteries"
  }),

  makeProduct({
    id: "battery-102ah-deep-cycle",
    title: "102Ah 12V Deep Cycle Battery",
    description:
      "102Ah 12V deep cycle battery for high-capacity security and backup power applications.",
    price: 3650,
    image: "images/18amp.png",
    weight: 28,
    brand: "Nexpak",
    productType: "Security Power > Deep Cycle Batteries"
  }),

  /* ==========================================================
     ELECTRIC FENCE KITS
     ========================================================== */

  makeProduct({
    id: "electric-fence-6-line-100m",
    title: "6 Line Square Tube Electric Fence Kit - 100m",
    description:
      "High-grade six-line electric fencing system for domestic perimeter security.",
    price: 8850,
    image: "images/ef6.png",
    weight: 45,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-6l.html"
  }),

  makeProduct({
    id: "electric-fence-6-line-200m",
    title: "6 Line Square Tube Electric Fence Kit - 200m",
    description:
      "High-grade six-line electric fencing system for larger domestic perimeter security installations.",
    price: 12999,
    image: "images/ef6.png",
    weight: 90,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-6l.html"
  }),

  makeProduct({
    id: "electric-fence-8-line-100m",
    title: "8 Line Square Tube Electric Fence Kit - 100m",
    description:
      "Heavy-duty eight-line high-voltage electric fencing system for commercial and residential security.",
    price: 9999,
    image: "images/ef.png",
    weight: 58,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-8l.html"
  }),

  makeProduct({
    id: "electric-fence-8-line-200m",
    title: "8 Line Square Tube Electric Fence Kit - 200m",
    description:
      "Heavy-duty eight-line high-voltage electric fencing system for larger perimeter installations.",
    price: 14999,
    image: "images/ef.png",
    weight: 116,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-8l.html"
  }),

  makeProduct({
    id: "electric-fence-10-line-100m",
    title: "10 Line Square Tube Electric Fence Kit - 100m",
    description:
      "Long-distance ten-line electric fencing system for robust perimeter security.",
    price: 13999,
    image: "images/ef.png",
    weight: 72,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-10l.html"
  }),

  makeProduct({
    id: "electric-fence-10-line-200m",
    title: "10 Line Square Tube Electric Fence Kit - 200m",
    description:
      "Long-distance ten-line electric fencing system for larger robust perimeter security installations.",
    price: 17999,
    image: "images/ef.png",
    weight: 144,
    brand: "Nexpak",
    productType: "Security Kits > Electric Fencing",
    link: "kits/electric-fence-10l.html"
  }),

  /* ==========================================================
     ROBOGUARD
     ========================================================== */

  makeProduct({
    id: "roboguard-2-beam-kit",
    title: "Roboguard Wireless Perimeter Kit - 2 Beam",
    description:
      "Roboguard wireless early-warning perimeter security system with two wireless beam sensors.",
    price: 5999,
    image: "images/robo1.png",
    weight: 4,
    brand: "Roboguard",
    productType: "Security Systems > Wireless Perimeter Security",
    link: "kits/roboguard.html"
  }),

  makeProduct({
    id: "roboguard-4-beam-kit",
    title: "Roboguard Wireless Perimeter Kit - 4 Beam",
    description:
      "Roboguard wireless early-warning perimeter security system with four wireless beam sensors.",
    price: 8999,
    image: "images/robo1.png",
    weight: 6.5,
    brand: "Roboguard",
    productType: "Security Systems > Wireless Perimeter Security",
    link: "kits/roboguard.html"
  }),

  makeProduct({
    id: "roboguard-6-beam-kit",
    title: "Roboguard Wireless Perimeter Kit - 6 Beam",
    description:
      "Roboguard wireless early-warning perimeter security system with six wireless beam sensors.",
    price: 12999,
    image: "images/robo1.png",
    weight: 9,
    brand: "Roboguard",
    productType: "Security Systems > Wireless Perimeter Security",
    link: "kits/roboguard.html"
  }),

  makeProduct({
    id: "roboguard-8-beam-kit",
    title: "Roboguard Wireless Perimeter Kit - 8 Beam",
    description:
      "Roboguard wireless early-warning perimeter security system with eight wireless beam sensors.",
    price: 15999,
    image: "images/robo1.png",
    weight: 11.5,
    brand: "Roboguard",
    productType: "Security Systems > Wireless Perimeter Security",
    link: "kits/roboguard.html"
  }),

  /* ==========================================================
     NICE / ET GATE MOTORS
     ========================================================== */

  makeProduct({
    id: "nice-et500-kit",
    title: "Nice ET500 Gate Motor Kit",
    description:
      "Nice ET500 automated gate motor kit for residential and business gate automation.",
    price: 5999,
    image: "images/nice.png",
    weight: 13,
    brand: "Nice",
    productType: "Gate Automation > Gate Motors",
    link: "kits/et-motors.html"
  }),

  makeProduct({
    id: "nice-drive-1000-kit",
    title: "Nice Drive 1000 Gate Motor Kit",
    description:
      "Nice Drive 1000 automated gate motor kit for residential and business gate automation.",
    price: 14999,
    image: "images/nice.png",
    weight: 19,
    brand: "Nice",
    productType: "Gate Automation > Gate Motors",
    link: "kits/et-motors.html"
  }),

  /* ==========================================================
     DAHUA ANALOG CCTV
     ========================================================== */

  makeProduct({
    id: "dahua-hd-home-8ch",
    title: "Dahua HD CCTV Home Kit - 8 Channel",
    description:
      "Dahua HD CCTV home security kit with eight-channel recording and 1080p camera coverage.",
    price: 7999.99,
    image: "images/16ch.png",
    weight: 8.5,
    brand: "Dahua",
    productType: "CCTV > Dahua HD CCTV Kits",
    link: "kits/cctv.html"
  }),

  makeProduct({
    id: "dahua-hd-home-16ch",
    title: "Dahua HD CCTV Home Kit - 16 Channel",
    description:
      "Dahua HD CCTV security kit with sixteen-channel recording for larger properties.",
    price: 14999.99,
    image: "images/16ch.png",
    weight: 14,
    brand: "Dahua",
    productType: "CCTV > Dahua HD CCTV Kits",
    link: "kits/cctv.html"
  }),

  makeProduct({
    id: "dahua-hd-home-32ch",
    title: "Dahua HD CCTV Home Kit - 32 Channel",
    description:
      "Dahua HD CCTV security kit with thirty-two-channel recording for large installations.",
    price: 29999.99,
    image: "images/16ch.png",
    weight: 26,
    brand: "Dahua",
    productType: "CCTV > Dahua HD CCTV Kits",
    link: "kits/cctv.html"
  }),

  /* ==========================================================
     DAHUA PRO CCTV
     ========================================================== */

  makeProduct({
    id: "dahua-pro-8ch",
        title: "Dahua HD CCTV Pro Kit - 8 Channel",
    description:
      "Dahua professional HD CCTV kit providing expanded visual coverage for corporate, retail and residential security.",
    price: 11999.99,
    image: "images/32ch.png",
    weight: 12,
    brand: "Dahua",
    productType: "CCTV > Dahua Professional CCTV Kits",
    link: "kits/cctv.html"
  }),

  makeProduct({
    id: "dahua-pro-16ch",
    title: "Dahua HD CCTV Pro Kit - 16 Channel",
    description:
      "Dahua professional HD CCTV kit providing expanded visual coverage for larger corporate, retail and residential security installations.",
    price: 21999.99,
    image: "images/32ch.png",
    weight: 21,
    brand: "Dahua",
    productType: "CCTV > Dahua Professional CCTV Kits",
    link: "kits/cctv.html"
  }),

  /* ==========================================================
     DAHUA IP CCTV
     ========================================================== */

  makeProduct({
    id: "dahua-ip-cctv-8-camera",
    title: "Dahua IP CCTV Network Kit - 8 Camera POE",
    description:
      "Dahua IP CCTV network kit with eight POE cameras, remote access and advanced network video security.",
    price: 15999.99,
    image: "images/ip-cctv.png",
    weight: 14,
    brand: "Dahua",
    productType: "CCTV > Dahua IP CCTV Kits",
    link: "kits/ip-cctv.html"
  }),

  makeProduct({
    id: "dahua-ip-cctv-16-camera",
    title: "Dahua IP CCTV Network Kit - 16 Camera POE",
    description:
      "Dahua IP CCTV network kit with sixteen POE cameras, remote access and advanced network video security.",
    price: 29999.99,
    image: "images/ip-cctv.png",
    weight: 25,
    brand: "Dahua",
    productType: "CCTV > Dahua IP CCTV Kits",
    link: "kits/ip-cctv.html"
  }),

  /* ==========================================================
     CENTURION GATE MOTORS
     ========================================================== */

  makeProduct({
    id: "centurion-d3-smart",
    title: "Centurion D3 Smart Gate Motor Kit",
    description:
      "Centurion D3 Smart automated sliding gate motor kit.",
    price: 4999,
    image: "images/d5.png",
    weight: 10,
    brand: "Centurion",
    productType: "Gate Automation > Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-d5-smart",
    title: "Centurion D5 Smart Gate Motor Kit",
    description:
      "Centurion D5 Smart automated sliding gate motor kit.",
    price: 5999,
    image: "images/d5.png",
    weight: 13,
    brand: "Centurion",
    productType: "Gate Automation > Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-d6-smart",
    title: "Centurion D6 Smart Gate Motor Kit",
    description:
      "Centurion D6 Smart automated sliding gate motor kit.",
    price: 7999,
    image: "images/d5.png",
    weight: 15,
    brand: "Centurion",
    productType: "Gate Automation > Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-d10-smart",
    title: "Centurion D10 Smart Gate Motor Kit",
    description:
      "Centurion D10 Smart automated sliding gate motor kit.",
    price: 12999,
    image: "images/d5.png",
    weight: 18,
    brand: "Centurion",
    productType: "Gate Automation > Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-d10-smart-turbo",
    title: "Centurion D10 Smart Turbo Gate Motor Kit",
    description:
      "Centurion D10 Smart Turbo automated sliding gate motor kit.",
    price: 13200,
    image: "images/d5.png",
    weight: 19,
    brand: "Centurion",
    productType: "Gate Automation > Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-sdo-smart",
    title: "Centurion SDO Smart Garage Door Kit",
    description:
      "Centurion SDO Smart automated garage door motor kit.",
    price: 2999,
    image: "images/d5.png",
    weight: 12,
    brand: "Centurion",
    productType: "Gate Automation > Garage Door Motors",
    link: "kits/centurion-motors.html"
  }),

  makeProduct({
    id: "centurion-vantage-smart",
    title: "Centurion Vantage Smart Swing Gate Kit",
    description:
      "Centurion Vantage Smart swing gate automation kit.",
    price: 12999,
    image: "images/d5.png",
    weight: 22,
    brand: "Centurion",
    productType: "Gate Automation > Swing Gate Motors",
    link: "kits/centurion-motors.html"
  }),

  /* ==========================================================
     NEMTEK ENERGIZERS
     ========================================================== */

  makeProduct({
    id: "nemtek-wizord-4",
    title: "Nemtek Wizord 4 Security Energizer",
    description:
      "Nemtek Wizord 4 high-power electric fence security energizer.",
    price: 2499,
    image: "images/nem.png",
    weight: 5.3,
    brand: "Nemtek",
    productType: "Electric Fencing > Energizers",
    link: "kits/nemtek.html"
  }),

  makeProduct({
    id: "nemtek-druid-18",
    title: "Nemtek Druid 18 Security Energizer",
    description:
      "Nemtek Druid 18 high-power electric fence security energizer.",
    price: 4499,
    image: "images/nem.png",
    weight: 6.5,
    brand: "Nemtek",
    productType: "Electric Fencing > Energizers",
    link: "kits/nemtek.html"
  }),

  makeProduct({
    id: "nemtek-druid-25",
    title: "Nemtek Druid 25 Security Energizer",
    description:
      "Nemtek Druid 25 high-power electric fence security energizer.",
    price: 5599,
    image: "images/nem.png",
    weight: 8,
    brand: "Nemtek",
    productType: "Electric Fencing > Energizers",
    link: "kits/nemtek.html"
  }),

  /* ==========================================================
     JVA ENERGIZERS
     ========================================================== */

  makeProduct({
    id: "jva-z11",
    title: "JVA Z11 Security Energizer",
    description:
      "JVA Z11 electric fence security energizer for perimeter protection.",
    price: 2399,
    image: "images/jva-z14.jpg",
    weight: 3.5,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  makeProduct({
    id: "jva-z13",
    title: "JVA Z13 Security Energizer",
    description:
      "JVA Z13 electric fence security energizer for perimeter protection.",
    price: 2599,
    image: "images/jva-z14.jpg",
    weight: 3.8,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  makeProduct({
    id: "jva-z14",
    title: "JVA Z14 Security Energizer",
    description:
      "JVA Z14 electric fence security energizer for perimeter protection.",
    price: 2899,
    image: "images/jva-z14.jpg",
    weight: 4.2,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  makeProduct({
    id: "jva-z18",
    title: "JVA Z18 Security Energizer",
    description:
      "JVA Z18 electric fence security energizer for perimeter protection.",
    price: 3999,
    image: "images/jva-z14.jpg",
    weight: 5,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  makeProduct({
    id: "jva-z28",
    title: "JVA Z28 Security Energizer",
    description:
      "JVA Z28 electric fence security energizer for advanced perimeter protection.",
    price: 4999,
    image: "images/jva-z14.jpg",
    weight: 6,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  makeProduct({
    id: "jva-z114",
    title: "JVA Z114 Security Energizer",
    description:
      "JVA Z114 advanced electric fence security energizer for high-security perimeter protection.",
    price: 6599,
    image: "images/jva-z14.jpg",
    weight: 7.5,
    brand: "JVA",
    productType: "Electric Fencing > Energizers",
    link: "jva.html"
  }),

  /* ==========================================================
     STAFIX ENERGIZERS
     ========================================================== */

  makeProduct({
    id: "stafix-x1",
    title: "Stafix X1 Energizer",
    description:
      "Stafix X1 electric fence energizer for perimeter security.",
    price: 3299,
    image: "images/stafix-x1.jpg",
    weight: 4,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  makeProduct({
    id: "stafix-x2",
    title: "Stafix X2 Energizer",
    description:
      "Stafix X2 electric fence energizer for perimeter security.",
    price: 3899,
    image: "images/stafix-x1.jpg",
    weight: 4.5,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  makeProduct({
    id: "stafix-x3",
    title: "Stafix X3 Energizer",
    description:
      "Stafix X3 electric fence energizer for perimeter security.",
    price: 4299,
    image: "images/stafix-x1.jpg",
    weight: 5.2,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  makeProduct({
    id: "stafix-x6i",
    title: "Stafix X6i Energizer",
    description:
      "Stafix X6i high-power electric fence energizer for perimeter security.",
    price: 5999,
    image: "images/stafix-x1.jpg",
    weight: 6.5,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  makeProduct({
    id: "stafix-x12i",
    title: "Stafix X12i Energizer",
    description:
      "Stafix X12i high-power electric fence energizer for perimeter security.",
    price: 10499,
    image: "images/stafix-x1.jpg",
    weight: 8,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  makeProduct({
    id: "stafix-x18i",
    title: "Stafix X18i Energizer",
    description:
      "Stafix X18i high-power electric fence energizer for perimeter security.",
    price: 13999,
    image: "images/stafix-x1.jpg",
    weight: 9.5,
    brand: "Stafix",
    productType: "Electric Fencing > Energizers",
    link: "kits/stafix.html"
  }),

  /* ==========================================================
     DAHUA HIGH-END CCTV
     ========================================================== */

  makeProduct({
    id: "dahua-tioc-5mp",
    title: "Dahua 5MP TiOC 2.0 Active Deterrence Network Turret",
    description:
      "Dahua 5MP TiOC 2.0 40m 3.6mm active deterrence network turret camera.",
    price: 3499,
    image: "images/dahua-tioc.jpg",
    weight: 1.2,
    brand: "Dahua",
    productType: "CCTV > Dahua IP Cameras",
    link: "kits/tioc.html"
  }),

  makeProduct({
    id: "dahua-ptz-4mp-25x",
    title: "Dahua 4MP 25x Starlight Smart Tracking IP PTZ Camera",
    description:
      "Dahua 4MP 25x Starlight smart tracking IP PTZ camera for advanced surveillance.",
    price: 8500,
    image: "images/dahua-ptz.jpg",
    weight: 3.5,
    brand: "Dahua",
    productType: "CCTV > Dahua PTZ Cameras",
    link: "kits/ptz.html"
  }),

  makeProduct({
    id: "dahua-8ch-4k-ai-nvr",
    title: "Dahua 8 Channel 4K AI Network Video Recorder",
    description:
      "Dahua 8-channel 4K AI network video recorder for advanced CCTV surveillance systems.",
    price: 5999,
    image: "images/dahua-nvr.jpg",
    weight: 2.5,
    brand: "Dahua",
    productType: "CCTV > Dahua NVRs",
    link: "kits/nvr-4k.html"
  }),

  /* ==========================================================
     AJAX WIRELESS SMART ALARM
     ========================================================== */

  makeProduct({
    id: "ajax-hub-2-plus",
    title: "Ajax Hub 2 Plus",
    description:
      "Ajax Hub 2 Plus intelligent wireless security control panel.",
    price: 5999,
    image: "images/ajax.png",
    weight: 1.1,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  }),

  makeProduct({
    id: "ajax-motioncam",
    title: "Ajax MotionCam",
    description:
      "Ajax MotionCam wireless indoor PIR detector with photo verification.",
    price: 2899,
    image: "images/ajax.png",
    weight: 0.5,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  }),

  makeProduct({
    id: "ajax-streetsiren",
    title: "Ajax StreetSiren",
    description:
      "Ajax StreetSiren wireless outdoor high-decibel security siren.",
    price: 2200,
    image: "images/ajax.png",
    weight: 1.5,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  }),

  makeProduct({
    id: "ajax-keypad-plus",
    title: "Ajax KeyPad Plus",
    description:
      "Ajax KeyPad Plus touch-sensitive wireless keypad with contactless card and tag support.",
    price: 1899,
    image: "images/ajax.png",
    weight: 0.4,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  }),

  makeProduct({
    id: "ajax-doorprotect",
    title: "Ajax DoorProtect",
    description:
      "Ajax DoorProtect wireless opening detector for doors and windows.",
    price: 799,
    image: "images/ajax.png",
    weight: 0.2,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  }),

  makeProduct({
    id: "ajax-spacecontrol",
    title: "Ajax SpaceControl",
    description:
      "Ajax SpaceControl four-button wireless key fob with panic button.",
    price: 499,
    image: "images/ajax.png",
    weight: 0.1,
    brand: "Ajax",
    productType: "Alarms > Ajax Wireless Alarm Systems",
    link: "kits/ajax.html"
  })

];

/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */

const requiredFields = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "availability",
  "condition",
  "shipping_weight"
];

const errors = [];

const ids = new Set();

products.forEach((product, index) => {

  requiredFields.forEach(field => {

    if (!product[field]) {

      errors.push(
        `Product ${index + 1} is missing required field: ${field}`
      );

    }

  });

  if (ids.has(product.id)) {

    errors.push(
      `Duplicate product ID: ${product.id}`
    );

  }

  ids.add(product.id);

  if (!product.link.startsWith("https://")) {

    errors.push(
      `${product.id}: invalid product link`
    );

  }

  if (!product.image_link.startsWith("https://")) {

    errors.push(
      `${product.id}: invalid image URL`
    );

  }

  if (!product.price.endsWith(" ZAR")) {

    errors.push(
      `${product.id}: invalid price format`
    );

  }

  if (product.availability !== "in_stock") {

    errors.push(
      `${product.id}: unexpected availability value`
    );

  }

  if (product.condition !== "new") {

    errors.push(
      `${product.id}: unexpected condition value`
    );

  }

});

/**
 * ============================================================
 * STOP IF VALIDATION FAILS
 * ============================================================
 */

if (errors.length > 0) {

  console.error("\n❌ FEED VALIDATION FAILED\n");

  errors.forEach(error => {

    console.error(`- ${error}`);

  });

  console.error(
    `\nTotal errors: ${errors.length}\n`
  );

  process.exit(1);

}

/**
 * ============================================================
 * MERCHANT CENTER TSV
 * ============================================================
 */

const headers = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "availability",
  "condition",
  "shipping_weight",
  "brand",
  "product_type"
];

const rows = products.map(product => {

  return headers
    .map(field => cleanText(product[field]))
    .join("\t");

});

const feed = [
  headers.join("\t"),
  ...rows
].join("\n");

/**
 * ============================================================
 * WRITE FEED FILE
 * ============================================================
 */

fs.writeFileSync(
  "feed.txt",
  feed,
  {
    encoding: "utf8"
  }
);

/**
 * ============================================================
 * REPORT
 * ============================================================
 */

console.log("\n==============================================");
console.log(" NEXPAK MERCHANT CENTER FEED GENERATED");
console.log("==============================================");

console.log(`Products generated: ${products.length}`);
console.log(`Output file: feed.txt`);
console.log(`Store URL: ${STORE_URL}`);

console.log("----------------------------------------------");

console.log("Feed validation: PASSED");
console.log("Format: TSV");
console.log("Currency: ZAR");
console.log("Availability: in_stock");
console.log("Condition: new");

console.log("----------------------------------------------");

console.log("Google Merchant Center ready.");
console.log("==============================================\n");
