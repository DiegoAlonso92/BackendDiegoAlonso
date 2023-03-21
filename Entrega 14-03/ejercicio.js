
class ProductManager {
    products = [];

    idAuto = 1;

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = code,
            this.stock = stock
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
    this.products.push(product);

    this.idAuto = this.idAuto + 1;
    };

    getProductById(productId) {
const product = this.product.find((product) => product.id === productId);

if (!product)
{
    throw Error('El producto no existe.');
}

};
}

