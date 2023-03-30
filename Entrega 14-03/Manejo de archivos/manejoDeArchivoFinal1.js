const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.lastProductId = 1;
  }

  async loadProducts() {
    try {
      const productsJson = await fs.readFile(this.path);
      const products = JSON.parse(productsJson);
      this.products = products;
      if (products.length > 0) {
        this.lastProductId = products[products.length - 1].id + 1;
      }
    } catch (error) {
      this.products = [];
      this.lastProductId = 1;
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.error('Error al guardar productos:', error);
    }
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw Error('Todos los datos son requeridos.');
    }

    if (this.products.some(p => p.code === code)) {
      throw Error('El código de ese producto ya existe.');
    }

    const newProduct = {
      id: this.lastProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.lastProductId++;
    this.products.push(newProduct);
    await this.saveProducts();
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

  async updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error('Id de producto no encontrado.');
      return;
    }
    const updatedProductWithId = { ...updatedProduct, id };
    this.products[productIndex] = updatedProductWithId;
    await this.saveProducts();
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error('Id de producto no encontrado.');
      return;
    }
    this.products.splice(productIndex, 1);
    await this.saveProducts();
  }
}

const manager = new ProductManager('productos.json');

async () => {
  // Agregar productos
  await manager.addProduct({ title: 'Harina 0000.', description: 'Harina de trigo 0000.', price: 80, thumbnail: 'imgHarina0000.jpg', code: 'P001', stock: 500 });
  await manager.addProduct({ title: 'Aceite de oliva.', description: 'Aceite de oliva extra virgen.', price: 350, thumbnail: 'imgAceiteDeOliva.jpg', code: 'P002', stock: 100 });
  
  // Obtener todos los productos
  const products = manager.getProducts();
  console.log(products);
  
  // Obtener un producto por ID
  const product1 = await manager.getProductById(1);
  console.log(product1);
  const product2 = await manager.getProductById(2);
  console.log(product2);
  
  // Actualizar un producto
  await manager.updateProduct(1, { title: 'Harina 0000 mejorada', description: 'Harina de trigo 0000 de mayor calidad', price: 100, thumbnail: 'imgHarina0000.jpg', code: 'P001', stock: 400 });
  console.log(await manager.getProductById(1));
  
  // Eliminar un producto
  await manager.deleteProduct(2);
  console.log(manager.getProducts());
};