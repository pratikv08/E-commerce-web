// Load Product button click event
const btn = document
  .getElementById("loadProductBtn")
  .addEventListener("click", getProduct);

//Function to fetch product from the Api
async function getProduct() {
  const apiEndpoint = "https://interveiw-mock-api.vercel.app/api/getProducts";
  let options = {
    methods: "GET",
  };

  try {
    const loadButton = document.getElementById("loadProductBtn");
    loadButton.innerHTML = "Loading...";

    let responseData = await fetch(apiEndpoint, options);
    let fetchedProduct = await responseData.json();
    let productArr = fetchedProduct.data;
    console.log(responseData);
    if (responseData.status === 200) {
      //Making Load Product button disappear
      document.getElementById("loadProductBtnContainer").style.display = "none";
    }
    //  Calling render product function after Api success
    renderProducts(productArr);
  } catch (error) {
    // Logging error details to the console
    console.error("Error fetching products:", error);

    // Showing error message to the user
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Failed to load products. Please try again later.";
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";

    const container = document.getElementById("loadProductBtnContainer");
    container.appendChild(errorMessage);
  }
}

// Function to render products with little animation
function renderProducts(productArr) {
  const container = document.getElementById("productContainer");

  //Iterating product from productArr using forEach method
  productArr.forEach((prod, i) => {
    //Each product will render in the screen after 300ms from its previous product
    setTimeout(() => {
      //Creating a dynamic div container for each product
      const productDiv = document.createElement("div");
      productDiv.className = "product-item";
      productDiv.innerHTML = `
          <img src=${prod.product.image.src} alt=${prod.product.image.alt} class="product-image" />
          <h3>${prod.product.title}</h3>
          <p>RS. 657.8</p>
          <button class="add-to-cart-btn">
            <i class="cart-icon">🛒</i> ADD TO CART
          </button>
        `;
      productDiv.style.opacity = 0;

      //Appending productDiv to the container
      container.appendChild(productDiv);

      setTimeout(() => {
        productDiv.style.opacity = 1;
        productDiv.style.transform = "translateY(0)";
      }, 50);
    }, i * 300);
  });
}
