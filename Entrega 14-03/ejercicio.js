

class ProductManager {
    constructor() {
      this.products = [];
      this.lastProductId = 0;
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
  
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw Error ('Todos los datos son requeridos.');
        return;
      }
  
      if (this.products.some(p => p.code === code)) {
        throw Error ('El código de ese producto ya existe.');
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
        console.error('Id de producto no encontrado.');
      }
      return product;
    }
  }
  
  const manager = new ProductManager();
  manager.addProduct({ title: 'Harina 0000.', description: 'Harina de trigo 0000.', price: 80, thumbnail: 'imgHarina0000.jpg', code: 'P001', stock: 500 });
  manager.addProduct({ title: 'Aceite de oliva.', description: 'Aceite de oliva extra virgen.', price: 350, thumbnail: 'imgAceiteDeOliva.jpg', code: 'P002', stock: 100 });
  console.log(manager.getProducts());
  console.log(manager.getProductById(1));
  console.log(manager.getProductById(2));