// Repository layer for communicate with database
const prisma = require("../db");

const findProduct = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });

    return product;
}

const insertProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        }
    })

    return product;
}

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    });

    return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id: id,
        }
    });
}

module.exports = {
    findProduct,
    findProductById,
    insertProduct,
    editProduct,
    deleteProduct
}