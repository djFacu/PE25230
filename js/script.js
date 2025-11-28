
let cart = [];
let totalPrice = 0;


function agregarBotonDinamico() {
   const cards = document.querySelectorAll('.card');

   cards.forEach(card => {

      const button = card.querySelector('button');
      const titleProduct = card.querySelector('h4').textContent;
      const priceProduct = card.querySelector('p:last-child span').textContent.slice(1);

      button.addEventListener('click', () => {
         //event.preventDefault();
         const product = {
            title: titleProduct,
            price: priceProduct,
            count: 1,
         };

         console.log(product);
         //condicion que verifica si el producto ya existeen el carrito, sumamos la cantidad y valor
         cart.push(product);
         totalPrice += parseFloat(product.price);

         localStorage.setItem('productos', JSON.stringify(cart));
         localStorage.setItem('total', totalPrice.toString(2));

         document.querySelector('.count').textContent = cart.length;
      });
   });
}


function handleCart() {
   const cart = JSON.parse(localStorage.getItem('productos')) || [];

   const total = JSON.parse(localStorage.getItem('total')) || 0;

   const carritoProduct = document.getElementById('itemProducts');

   if (!carritoProduct) return;

   if (cart.length === 0) {
      carritoProduct.innerHTML = '<p>El carrito está vacío</p>';
      return;
   }

   const tabla = document.createElement('table');
   tabla.classList.add('name-class-tabla');

   let encabezado = `
      <thead>
         <th>
            <td>Nombre del Producto</td>
            <td>Precio</td>
            <td>Cantidad</td>
         </th>
      </thead>
   `;

   let cuerpo = '<tbody>';

   cart.forEach(producto => {
      cuerpo += `
         <tr>
            <td>${producto.title}</td>
            <td>$${producto.price}</td>
            <td>${producto.count}</td>
         </tr>
      `;
   });

   cuerpo += '</tbody>';

   tabla.innerHTML = encabezado + cuerpo;

   carritoProduct.appendChild(tabla);
}


function limpiarCarrito() {

   //if(cart.length != 0) {localStorage.removeItem('productos');}

   if (confirm('¿Estás seguro de vaciar el carrito?')) {
      cart = [];
      totalPrice = 0;
      document.querySelector('.count').textContent = 0;
      localStorage.removeItem('productos');
      localStorage.removeItem('total');
      location.reload();
   }

}

// traer los productos de mi API
async function loadProduct() {
   try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      //console.log(data)

      printProducts(data.products);

   } catch (error) {
      console.log('Error al cargar products', error);
   }
}

function printProducts(products) {
   const container = document.getElementById('product-list');

   products.forEach(product => {

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
            <a href="./pages/descripcion.html?id=${product.id}">
               <h4>${product.title}</h4>
               <img src="${product.thumbnail}" alt="${product.title}">
               <p>${product.description}</p>
               <p>Precio: <span>$${product.price}</span></p>
            </a>
            <button>Añadir</button>
      `;

      container.appendChild(card);
   })

   agregarBotonDinamico();
}


//window.onload = handleCart;
document.addEventListener('DOMContentLoaded', () => {
   loadProduct();
   handleCart();
});





