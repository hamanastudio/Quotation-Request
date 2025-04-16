document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quotationForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = new FormData(form);
      const mailtoLink = `mailto:hamanastudios@gmail.com?subject=Quotation%20Request%20–%20Gaiters&body=${
        [...formData.entries()].map(([key, val]) => `${key}: ${val}`).join('%0D%0A')
      }`;
  
      window.location.href = mailtoLink;
      document.getElementById("successMessage").style.display = "block";
      form.reset();
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    // Size: 「Custom」が選ばれたらテキスト入力を表示
    const sizeRadios = document.getElementsByName("sizeOption");
    const sizeCustomInput = document.getElementById("sizeCustomInput");
  
    sizeRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        sizeCustomInput.style.display = (radio.value === "Custom" && radio.checked)
          ? "inline-block"
          : "none";
        if (! (radio.value === "Custom")) {
          sizeCustomInput.value = "";
        }
      });
    });
  
    // Colour: スウォッチをクリックで選択、既存のカラーピッカー選択をクリア
    const swatches = document.querySelectorAll(".colour-swatch");
    const colourPicker = document.getElementById("colourPicker");
  
    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        // 既存の選択をクリア
        swatches.forEach(s => s.classList.remove("selected"));
        colourPicker.value = ""; 
        // 今回のスウォッチを選択
        swatch.classList.add("selected");
        // hidden input に値を設定
        document.querySelector("input[name='colourSwatch']")?.remove();
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "colourSwatch";
        hidden.value = swatch.getAttribute("data-value");
        document.getElementById("quotationForm").appendChild(hidden);
      });
    });
  
    // カラーピッカーを使ったらスウォッチの選択をクリア
    colourPicker.addEventListener("input", () => {
      swatches.forEach(s => s.classList.remove("selected"));
      document.querySelector("input[name='colourSwatch']")?.remove();
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quotationForm");
    const itemsContainer = document.getElementById("itemsContainer");
    const addItemBtn = document.getElementById("addItemBtn");
  
    // 新しい item-group を追加する関数
    function addItemGroup() {
      const template = document.querySelector(".item-group");
      const clone = template.cloneNode(true);
  
      // 各 select/input は空にする
      clone.querySelectorAll("select, input").forEach(el => {
        el.value = "";
      });
  
      // 削除ボタンを追加
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "remove-item";
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", () => {
        clone.remove();
      });
      clone.appendChild(removeBtn);
  
      itemsContainer.appendChild(clone);
    }
  
    addItemBtnHeader.addEventListener("click", addItemGroup);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const data = new FormData(form);

      // メール本文を組み立て
      let bodyLines = [];
      bodyLines.push(`Name: ${data.get("name")}`);
      bodyLines.push(`Email: ${data.get("email")}`);
      bodyLines.push(`Phone: ${data.get("phone")}`);
      bodyLines.push(`Address: ${data.get("address")}`);
      bodyLines.push(""); // 空行
  
      // size[], colour[], quantity[] をまとめる
      const sizes = data.getAll("size[]");
      const colours = data.getAll("colour[]");
      const quantities = data.getAll("quantity[]");
      sizes.forEach((sz, idx) => {
        bodyLines.push(`Item ${idx + 1}: Size=${sz}, Colour=${colours[idx]}, Quantity=${quantities[idx]}`);
      });
  
      const mailtoLink = `mailto:hamanastudios@gmail.com?subject=${encodeURIComponent("Quotation Request – Gaiters")}&body=${encodeURIComponent(bodyLines.join("\r\n"))}`;
  
      window.location.href = mailtoLink;
      document.getElementById("successMessage").style.display = "block";
      form.reset();
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quotationForm");
    const addItemBtn = document.getElementById("addItemBtn");
    const cartItems = document.getElementById("cartItems");
  
    const sizeSelect = document.getElementById("sizeSelect");
    const colourSelect = document.getElementById("colourSelect");
    const quantityInput = document.getElementById("quantityInput");
  
    let itemList = [];
  
    // ADD ITEM
    addItemBtn.addEventListener("click", () => {
      const size = sizeSelect.value;
      const colour = colourSelect.value;
      const quantity = quantityInput.value;
  
      if (!size || !colour || quantity <= 0) {
        alert("Please select size, colour, and quantity.");
        return;
      }
  
      // 保存
      itemList.push({ size, colour, quantity });
  
      // 表示追加
      const div = document.createElement("div");
      div.className = "cart-entry";
      div.textContent = `Size: ${size}, Colour: ${colour}, Quantity: ${quantity}`;
      cartItems.appendChild(div);
  
      // 入力欄をリセット
      sizeSelect.value = "";
      colourSelect.value = "";
      quantityInput.value = 1;
    });
  
    // SUBMIT
    form.addEventListener("submit", function (e) {
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
  
      document.getElementById("successMessage").style.display = "block";
      form.reset();
      cartItems.innerHTML = "";
      itemList = [];
    });
  });
  
  addItemBtn.addEventListener("click", () => {
    console.log("Add Item ボタンがクリックされました！");
    // 以下省略
  });
  document.getElementById("quotationForm").addEventListener("submit", (e) => {
    const summary = itemList.map(item =>
      `Size: ${item.size}, Colour: ${item.colour}, Quantity: ${item.quantity}`
    ).join("\n");
  
    document.getElementById("cartSummary").value = summary;
  });
  