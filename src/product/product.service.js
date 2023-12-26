// Services layer for handling business logic
const { findProduct, findProductById, insertProduct, editProduct, deleteProduct } = require("./product.repository")

const getAllProducts = async () => {
    const products = await findProduct();

    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw Error("product not found");
    }

    return product;
}

const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData)

    return product;
}

const editProductById = async (id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData)

    return product;
}

const deleteProductById = async (id) => {
    await getProductById(id);

    await deleteProduct(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProductById,
    deleteProductById
}