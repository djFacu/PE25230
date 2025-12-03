
const params = new URLSearchParams(window.location.search);
//console.log(window.location.search);
const id = params.get('id');

//async function detailProduct () {
const detailProduct = async () => {
   try {

      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const prod = await res.json();

      //console.log(product);
      //document.write(`El producto seleccionado es: ${product.title}`);

      const container = document.getElementById('description');

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
            <h4>${prod.title}</h4>
            <img src="${prod.thumbnail}" alt="${prod.title}">
            <p>${prod.description}</p>
            <p>Precio: <span>$${prod.price}</span></p>
            <button>Añadir</button>
      `;

      container.appendChild(card);


   } catch (error) {
      console.log(error);
   }
}

/*
const detailProduct = async() => {
   try {
      
      const res = await axios.get(`https://dummyjson.com/products/${id}`);

      console.log(res);

   } catch (error) {
      console.log(error);
   }
}
*/

document.addEventListener('DOMContentLoaded', () => {
   detailProduct();
});
