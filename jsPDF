// ======================================================
// MODULE 7B-1 - PDF QUOTATION
// START OF downloadQuotation()
// ======================================================

function downloadQuotation() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const orderNumber = generateOrderNumber();

    const today = new Date().toLocaleDateString("en-ZA");

    // -----------------------------
    // CUSTOMER DETAILS
    // -----------------------------

    const customerName =
        document.getElementById("customerName")?.value.trim() || "";

    const customerPhone =
        document.getElementById("customerPhone")?.value.trim() || "";

    const customerEmail =
        document.getElementById("customerEmail")?.value.trim() || "";

    const customerAddress =
        document.getElementById("customerAddress")?.value.trim() || "";

    // =====================================================
    // COMPANY HEADER
    // =====================================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("NEXPAK SOLUTIONS", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text("Industrial Packaging | PPE | Safety Equipment", 20, 28);
    doc.text("Quotation", 20, 36);

    doc.setFontSize(10);

    doc.text("Order No:", 140, 18);
    doc.text(orderNumber, 165, 18);

    doc.text("Date:", 140, 24);
    doc.text(today, 165, 24);

    // =====================================================
    // CUSTOMER DETAILS
    // =====================================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("Customer Details", 20, 50);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text("Name: " + customerName, 20, 58);
    doc.text("Phone: " + customerPhone, 20, 64);

    if (customerEmail !== "") {

        doc.text("Email: " + customerEmail, 20, 70);

    }

    doc.text("Address:", 20, 78);

    const addressLines =
        doc.splitTextToSize(customerAddress, 120);

    doc.text(addressLines, 20, 84);

    // =====================================================
    // TABLE HEADER
    // =====================================================

    let y = 110;

    doc.setFillColor(18, 91, 160);
    doc.rect(20, y, 170, 8, "F");

    doc.setTextColor(255,255,255);
    doc.setFont("helvetica","bold");
    doc.setFontSize(10);

    doc.text("Item",22,y+5);
    doc.text("Qty",118,y+5);
    doc.text("Price",140,y+5);
    doc.text("Total",170,y+5);

    doc.setTextColor(0,0,0);

    y += 14;

    let subtotal = 0;

    // =====================================================
    // PRODUCT LOOP STARTS HERE...
    // Continue with Module 7B-2
    // =====================================================
      // =====================================================
    // PRODUCT LIST
    // =====================================================

    cart.forEach(item => {

        const lineTotal = item.price * item.quantity;

        subtotal += lineTotal;

        // Add a new page if needed
        if (y > 265) {

            doc.addPage();

            y = 20;

            doc.setFillColor(18, 91, 160);
            doc.rect(20, y, 170, 8, "F");

            doc.setTextColor(255,255,255);
            doc.setFont("helvetica","bold");
            doc.setFontSize(10);

            doc.text("Item",22,y+5);
            doc.text("Qty",118,y+5);
            doc.text("Price",140,y+5);
            doc.text("Total",170,y+5);

            doc.setTextColor(0,0,0);

            y += 14;

        }

        let description = item.name;

        if (item.size) {
            description += "\nSize: " + item.size;
        }

        if (item.colour) {
            description += "\nColour: " + item.colour;
        }

        if (item.specs) {
            description += "\n" + item.specs;
        }

        const lines = doc.splitTextToSize(description, 90);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text(lines, 22, y);

        doc.text(
            String(item.quantity),
            120,
            y
        );

        doc.text(
            money(item.price),
            140,
            y
        );

        doc.text(
            money(lineTotal),
            170,
            y
        );

        y += (lines.length * 5) + 6;

    });

    // Leave some space before totals

    y += 8;

    // =====================================================
    // TOTALS CONTINUE IN MODULE 7B-3
    // =====================================================
      // =====================================================
    // TOTALS
    // =====================================================

    const vat = subtotal * VAT_RATE;

    const delivery =
        subtotal >= FREE_DELIVERY_OVER
            ? 0
            : DELIVERY_FEE;

    const grandTotal =
        subtotal +
        vat +
        delivery;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text("Subtotal:", 130, y);
    doc.text(money(subtotal), 170, y, { align: "right" });

    y += 7;

    doc.text("VAT (15%):", 130, y);
    doc.text(money(vat), 170, y, { align: "right" });

    y += 7;

    doc.text("Delivery:", 130, y);
    doc.text(
        delivery === 0 ? "FREE" : money(delivery),
        170,
        y,
        { align: "right" }
    );

    y += 9;

    doc.setFontSize(13);

    doc.text("TOTAL:", 130, y);
    doc.text(money(grandTotal), 170, y, { align: "right" });

    // =====================================================
    // BANKING DETAILS
    // =====================================================

    y += 18;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("EFT PAYMENT DETAILS", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text("Bank: Capitec", 20, y);

    y += 6;

    doc.text("Account Number: 2517857594", 20, y);

    y += 6;

    doc.text("Branch Code: 470010", 20, y);

    y += 6;

    doc.text("Reference: " + orderNumber, 20, y);

    y += 12;

    doc.setFont("helvetica", "italic");

    doc.text(
        "Please use the Order Number as your EFT reference.",
        20,
        y
    );

    y += 8;

    doc.text(
        "Email or WhatsApp your proof of payment to NexPak Solutions.",
        20,
        y
    );

    // =====================================================
    // FOOTER
    // =====================================================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text(
        "Thank you for choosing NexPak Solutions.",
        20,
        285
    );

    doc.text(
        "Quotation generated automatically.",
        20,
        290
    );

    // =====================================================
    // SAVE PDF
    // =====================================================

    doc.save("NexPak-Quotation-" + orderNumber + ".pdf");

}

console.log("Module 7B Loaded Successfully");
