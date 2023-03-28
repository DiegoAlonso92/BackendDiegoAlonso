const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
    this.lastProductId = this.getLastProductId();
  }

  loadProducts() {
    try {
      const productsJson = fs.readFileSync(this.path);
      const products = JSON.parse(productsJson);
      return products;
    } catch (error) {
      return [];
    }
  }

  getLastProductId() {
    if (this.products.length === 0) {
      return 0;
    }
    return this.products[this.products.length - 1].id;
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw Error('Todos los datos son requeridos.');
    }

    if (this.products.some(p => p.code === code)) {
      throw Error('El código de ese producto ya existe.');
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
    this.saveProducts();
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

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error('Id de producto no encontrado.');
      return;
    }
    this.products[productIndex] = { ...updatedProduct, id };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error('Id de producto no encontrado.');
      return;
    }
    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}

const manager = new ProductManager('productos.json');
manager.addProduct({ title: 'Harina 0000.', description: 'Harina de trigo 0000.', price: 80, thumbnail: 'imgHarina0000.jpg', code: 'P001', stock: 500 });
manager.addProduct({ title: 'Aceite de oliva.', description: 'Aceite de oliva extra virgen.', price: 350, thumbnail: 'imgAceiteDeOliva.jpg', code: 'P002', stock: 100 });
console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(2));
manager.updateProduct(1, { title: 'Harina 0000 mejorada', description: 'Harina de trigo 0000 de mayor calidad', price: 100, thumbnail: 'imgHarina0000.jpg', code: 'P001', stock: 400 });
console.log(manager.getProducts());
manager.deleteProduct(2);
console.log(manager.getProducts());