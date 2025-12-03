
class Product {
   constructor({id, title, price, description, thumbail}) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.thumbail = thumbail;
   }
}

class ProductService {

   constructor(apiURL) {
      this.apiURL = apiURL;
   }

   getAllProducts = async() => {
      try {
         const response = await fetch(this.apiURL);
         const res = await response.json();
         return res.data.products.map(p => new Product(p));
      } catch (error) {
         console.error("Mensaje de error: ", error);
      }
   }

   getProductId = async(id) => {
      try {
         const response = await fetch(`${this.apiURL}/${id}`);
         const res = await response.json();
         return new Product(res.data);
      } catch (error) {
         console.error("Mensaje de error: ", error);
      }
   }
}