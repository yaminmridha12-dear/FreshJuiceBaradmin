let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("sales", JSON.stringify(sales));
}

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const stock = Number(document.getElementById("productStock").value);

  if (!name || price <= 0 || stock < 0) {
    alert("Please enter valid product information.");
    return;
  }

  products.push({
    id: Date.now(),
    name: name,
    price: price,
    stock: stock
  });

  saveData();

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";

  displayProducts();
  updateDashboard();
}

function displayProducts() {
  const list = document.getElementById("productList");
  const select = document.getElementById("saleProduct");

  list.innerHTML = "";
  select.innerHTML = "";

  products.forEach(product => {

    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <span>
        <strong>${product.name}</strong><br>
        ৳${product.price} | Stock: ${product.stock}
      </span>
    `;

    list.appendChild(div);

    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} - ৳${product.price}`;

    select.appendChild(option);
  });
}

function makeSale() {

  const productId = Number(
    document.getElementById("saleProduct").value
  );

  const quantity = Number(
    document.getElementById("saleQuantity").value
  );

  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Please add a product first.");
    return;
  }

  if (quantity <= 0) {
    alert("Invalid quantity.");
    return;
  }

  if (product.stock < quantity) {
    alert("Not enough stock!");
    return;
  }

  const total = product.price * quantity;

  product.stock -= quantity;

  sales.push({
    product: product.name,
    quantity: quantity,
    total: total,
    date: new Date().toLocaleString()
  });

  saveData();

  document.getElementById("saleMessage").textContent =
    `Sale successful! Total: ৳${total}`;

  document.getElementById("saleQuantity").value = 1;

  displayProducts();
  displaySales();
  updateDashboard();
}

function displaySales() {

  const list = document.getElementById("salesList");

  list.innerHTML = "";

  sales.slice().reverse().forEach(sale => {

    const div = document.createElement("div");

    div.className = "sale-item";

    div.innerHTML = `
      <strong>${sale.product}</strong><br>
      Quantity: ${sale.quantity}<br>
      Total: ৳${sale.total}<br>
      <small>${sale.date}</small>
    `;

    list.appendChild(div);
  });
}

function updateDashboard() {

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  document.getElementById("todaySales").textContent =
    `৳${totalSales}`;

  document.getElementById("productCount").textContent =
    products.length;

  document.getElementById("orderCount").textContent =
    sales.length;
}

displayProducts();
displaySales();
updateDashboard();
