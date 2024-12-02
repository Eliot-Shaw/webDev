var cart = [];

function onLoad()
{  
  loadProducts();

  const clearCartButton = document.getElementById('clearCart');
  clearCartButton.addEventListener('click', function () 
  {
    cart = [];
    // updateCart();

    document.getElementById('cartItems').innerHTML = " ";
    document.getElementById('totalCost').textContent = 0.00;
  });
}

function loadProducts() 
{
  fetch('../data/products.json')
    .then(response => response.json())
    .then(products => 
      {
      let displayedCategories = [];

      products.forEach(product => 
        {
        if (!displayedCategories.includes(product.category)) 
          {
          document.getElementById('productList').innerHTML += 
          `
          <h2>${product.category}</h2>
          <div id="${product.category}" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"></div>
          `
          ;
          displayedCategories.push(product.category);
        }

        document.getElementById(product.category).innerHTML += 
        `
          <div class="card">
            <div class="cardInner">
              <div class="cardFront">
                <img class="cardImg" src="${product.image && product.image.trim() !== '' ? product.image : '../assets/placeholder.jpg'}">
              </div>
              <div class="cardBack">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="addToCart" dataId="${product.id}" dataName="${product.name}" dataPrice="${product.price}">Add to Cart</button>
              </div>
            </div>
          </div>
        `
        ;
      });

      attachAddToCartListeners();
    });

  console.log(document.getElementById('productList').innerHTML);
}


function updateCart() 
{
  var cartItems;
  var totalCost;
  let total = 0;

  cart.forEach(item => 
    {
    total += item.quantity*item.price;
    cartItems += 
`
<li>
  ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
  <button class="increaseQuantity" dataId="${item.id}">+</button>
  <button class="decreaseQuantity" dataId="${item.id}">-</button>
  <button class="removeItem" dataId="${item.id}">Remove</button>
</li>`
    ;
  });

  totalCost = total.toFixed(2);

  document.getElementById('cartItems').innerHTML = cartItems;
  document.getElementById('totalCost').textContent = totalCost;

  attachCartListeners();
}

function addToCart(id, name, price) 
{
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) 
    {
    existingItem.quantity += 1;
  } else 
  {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(id) 
{
  cart = cart.filter(item => item.id !== id);
  if(cart.length == 0)
    
    {
      document.getElementById('cartItems').innerHTML = " ";
      document.getElementById('totalCost').textContent = 0.00;
    }else updateCart();
}

function changeQuantity(id, delta) 
{
  const item = cart.find(item => item.id === id);
  if (item) 
    {
    item.quantity += delta;
    if (item.quantity <= 0) 
      {
      removeFromCart(id);
    } else 
    {
      updateCart();
    }
  }
}


function attachAddToCartListeners() 
{
  const addToCartButtons = document.querySelectorAll('.addToCart');
  addToCartButtons.forEach(button => 
    {
    button.addEventListener('click', function () 
    {
      const id = parseInt(this.getAttribute('dataId'));
      const name = this.getAttribute('dataName');
      const price = parseFloat(this.getAttribute('dataPrice'));
      addToCart(id, name, price);
    });
  });
}

function attachCartListeners() 
{
  const increaseButtons = document.querySelectorAll('.increaseQuantity');
  const decreaseButtons = document.querySelectorAll('.decreaseQuantity');
  const removeButtons = document.querySelectorAll('.removeItem');

  increaseButtons.forEach(button => 
    {
    button.addEventListener('click', function () 
    {
      const id = parseInt(this.getAttribute('dataId'));
      changeQuantity(id, 1);
    });
  });

  decreaseButtons.forEach(button => 
    {
    button.addEventListener('click', function () 
    {
      const id = parseInt(this.getAttribute('dataId'));
      changeQuantity(id, -1);
    });
  });

  removeButtons.forEach(button => 
    {
    button.addEventListener('click', function () 
    {
      const id = parseInt(this.getAttribute('dataId'));
      removeFromCart(id);
    });
  });
}


