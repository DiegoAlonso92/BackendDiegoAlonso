
// class ProductManager {

//     constructor(){
//     this.products = [];
// }

//     getProducts() {
//         return this.products;
//     }

//     addProduct(product) {
//     this.products.push(product);

//     this.idAuto = this.idAuto + 1;
//     };

//     getProductById(productId) {
// const product = this.product.find((product) => product.id === productId);

// if (!product)
// {
//     throw Error('El producto no existe.');
// }

// };
// }

class ProductManager {
    constructor() {
      this.products = [];
      this.lastProductId = 0;
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
  
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los datos son requeridos.');
        return;
      }
  
      if (this.products.some(p => p.code === code)) {
        console.error('El código de ese producto ya existe.');
        return;
      }
  
      this.lastProductId++;
      const newProduct = {
        id: this.lastProductId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error('Not found');
      }
      return product;
    }
  }
  
  // Example usage
  const manager = new ProductManager();
  manager.addProduct({ title: 'Product 1', description: 'Desc 1', price: 10, thumbnail: 'img1.jpg', code: 'P001', stock: 5 });
  manager.addProduct({ title: 'Product 2', description: 'Desc 2', price: 20, thumbnail: 'img2.jpg', code: 'P002', stock: 10 });
  console.log(manager.getProducts());
  console.log(manager.getProductById(1));
  console.log(manager.getProductById(3));