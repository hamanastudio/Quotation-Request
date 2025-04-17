document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quotationForm");
    const addItemBtn = document.getElementById("addItemBtn");
    const cartItems = document.getElementById("cartItems");
    const sizeSelect = document.getElementById("sizeSelect");
    const colourSelect = document.getElementById("colourSelect");
    const quantityInput = document.getElementById("quantityInput");
    const continueBtn = document.getElementById("continueBtn");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const orderSummary = document.getElementById("orderSummary");
    const cartSummary = document.getElementById("cartSummary");
    const sizeRadios = document.getElementsByName("sizeOption");
    const sizeCustomInput = document.getElementById("sizeCustomInput");
    const swatches = document.querySelectorAll(".colour-swatch");
    const colourPicker = document.getElementById("colourPicker");
    const successMessage = document.getElementById("successMessage");
  
    let itemList = [];
  
    // サイズカスタム入力表示
    sizeRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        sizeCustomInput.style.display = (radio.value === "Custom" && radio.checked) ? "inline-block" : "none";
        if (radio.value !== "Custom") {
          sizeCustomInput.value = "";
        }
      });
    });
  
    // カラー選択（スウォッチ & カラーピッカー）
    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        swatches.forEach(s => s.classList.remove("selected"));
        swatch.classList.add("selected");
        colourPicker.value = "";
  
        document.querySelector("input[name='colourSwatch']")?.remove();
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "colourSwatch";
        hidden.value = swatch.getAttribute("data-value");
        form.appendChild(hidden);
      });
    });
  
    colourPicker.addEventListener("input", () => {
      swatches.forEach(s => s.classList.remove("selected"));
      document.querySelector("input[name='colourSwatch']")?.remove();
    });
  
    // 商品追加
    addItemBtn.addEventListener("click", () => {
      const size = sizeSelect.value;
      const colour = colourSelect.value;
      const quantity = parseInt(quantityInput.value);
  
      if (!size || !colour || quantity <= 0) {
        alert("Please select size, colour, and quantity.");
        return;
      }
  
      itemList.push({ size, colour, quantity });
  
      const div = document.createElement("div");
      div.className = "cart-entry";
      div.textContent = `Size: ${size}, Colour: ${colour}, Quantity: ${quantity}`;
      cartItems.appendChild(div);
  
      sizeSelect.value = "";
      colourSelect.value = "";
      quantityInput.value = 1;
    });
  
    // 次ページに進む
    continueBtn.addEventListener("click", () => {
      if (itemList.length === 0) {
        alert("Please add at least one item to the cart.");
        return;
      }
  
      orderSummary.innerHTML = "";
      itemList.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = `Size: ${item.size}, Colour: ${item.colour}, Quantity: ${item.quantity}`;
        orderSummary.appendChild(itemDiv);
      });
  
      cartSummary.value = itemList.map(item =>
        `Size: ${item.size}, Colour: ${item.colour}, Quantity: ${item.quantity}`
      ).join("\n");
  
      page1.style.display = "none";
      page2.style.display = "block";
    });
  
    // 2ページ目でのフォーム送信
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      if (itemList.length === 0) {
        alert("Please add at least one item.");
        return;
      }
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
  
      let body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;
      itemList.forEach((item, index) => {
        body += `Item ${index + 1}: Size=${item.size}, Colour=${item.colour}, Quantity=${item.quantity}\n`;
      });
  
      const subject = "Quotation Request – Gaiters";
      const mailtoLink = `mailto:hamanastudios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.location.href = mailtoLink;
  
      successMessage.style.display = "block";
      form.reset();
      cartItems.innerHTML = "";
      itemList = [];
    });
  
    // フォーム送信時に summary hidden に格納
    form.addEventListener("submit", () => {
      const summary = itemList.map(item =>
        `Size: ${item.size}, Colour: ${item.colour}, Quantity: ${item.quantity}`
      ).join("\n");
      cartSummary.value = summary;
    });
  });
  document.getElementById('submitBtn').addEventListener('click', function(event) {
    document.getElementById('quotationForm').submit();
});
window.onload = function() {
    if (sessionStorage.getItem("showSubmitButton") === "true") {
        document.getElementById('submitBtn').style.display = 'inline-block';
        // この時点でボタンが表示されるので、クリック処理を追加
        document.getElementById('submitBtn').addEventListener('click', function(event) {
            document.getElementById('quotationForm').submit();
        });
    }
};
continueBtn.addEventListener("click", () => {
    if (itemList.length === 0) {
      alert("Please add at least one item before continuing.");
      return;
    }
  
    // 注文概要表示
    orderSummary.innerHTML = "";
    itemList.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = `Size: ${item.size}, Colour: ${item.colour}, Quantity: ${item.quantity}`;
      orderSummary.appendChild(itemDiv);
    });
  
    page1.style.display = "none";
    page2.style.display = "block";
  
    // ✅ submitボタンを表示
    document.getElementById("submitBtn").style.display = "inline-block";
  });