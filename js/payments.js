// Payment placeholders: PayFast (recommended for SA) and EFT flow

function startPayFastCheckout(order){
  // Fill these in on your server or environment — do not expose secrets in client JS for production.
  const PAYFAST = {
    merchant_id: '', // <<-- YOUR PAYFAST MERCHANT ID
    merchant_key: '' // <<-- YOUR PAYFAST MERCHANT KEY
  };

  if(!PAYFAST.merchant_id || !PAYFAST.merchant_key){
    alert('PayFast is not configured. Please use EFT or configure PayFast keys in your server.');
    return;
  }

  // In production, create payment signature on server and redirect securely to PayFast.
  // This is a client-side placeholder that should be replaced with a server-side integration.
  const pfUrl = 'https://www.payfast.co.za/eng/process';
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = pfUrl;
  form.innerHTML = `<input name="merchant_id" value="${PAYFAST.merchant_id}"> <input name="merchant_key" value="${PAYFAST.merchant_key}"> <input name="amount" value="${order.total}"> <input name="item_name" value="Order ${order.id}">`;
  document.body.appendChild(form);
  form.submit();
}

function startEFTFlow(order){
  const bankDetails = {
    accountName: "Nexpak Security Solutions",
    bank: "FNB",
    branchCode: "250655",
    accountNumber: "",
    reference: order.id || `NP-${Date.now()}`
  };
  alert(`Please pay via EFT to:\n\n${bankDetails.accountName}\nBank: ${bankDetails.bank}\nBranch: ${bankDetails.branchCode}\nAcc: ${bankDetails.accountNumber || 'ACCOUNT_NUMBER_NOT_SET'}\nReference: ${bankDetails.reference}\n\nOnce paid, email proof of payment to info@nexpaksecurity.co.za`);
}
