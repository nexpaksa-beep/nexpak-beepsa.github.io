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
    title: "Dahua HD CC
