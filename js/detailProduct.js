
const params = new URLSearchParams( window.location.search );
//console.log(window.location.search);
const id = params.get('id');

async function detailProduct () {
   try {
      
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await res.json();

      console.log(product);

   } catch (error) {
      console.log(error);
   }
}

document.addEventListener('DOMContentLoaded', () => {
   detailProduct();
});
