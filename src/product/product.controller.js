// Controller layer for handling request, response, and validation

const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductById, createProduct, editProductById, deleteProductById } = require("./product.service");

const router = express.Router();

// Get all products

router.get("/", async (request, response) => {
    const products = await getAllProducts();

    response.send(products);
});

// Get product by id

router.get("/:id", async (request, response) => {
    try {

        const productId = parseInt(request.params.id);

        if (isNaN(productId)) {
            throw Error("ID is not a number");
        }
    
        const product = await getProductById(productId);
    
        response.send(product);
    } catch (error) {
        response.status(400).send(error.message)
    }
});

// Insert product

router.post("/", async (request, response) => {

    try {
        const newProductData = request.body;
    
        const product = await createProduct(newProductData);
    
        response.send({
            data: product,
            message: "create product success",
        });
    } catch (error) {
        response.status(400).send(error.message)
    }
});

// Put product (update all product table column)

router.put("/:id", async (request, response) => {
    try {
        const productId = parseInt(request.params.id);

        const productData = request.body;
    
        if (!(productData.name && productData.price && productData.description && productData.image)) {
            return response.status(400).send("some fields are missing");
        }
    
        const product = await editProductById(productId, productData);
    
        response.send({
            data: product,
            message: "product updated"
        });
    } catch (error) {
        response.status(400).send(error.message)
    }
});

// Patch product (update one product table column)

router.patch("/:id", async (request, response) => {
    try {
        const productId = parseInt(request.params.id);
    
        const productData = request.body;
    
        const product = await editProductById(productId, productData);
    
        response.send({
            data: product,
            message: "product updated"
        });
    } catch (error) {
        response.status(400).send(error.message)
    }
})

// Delete product

router.delete("/:id", async (request, response) => {
    try {
        const productId = parseInt(request.params.id);

        if (isNaN(productId)) {
            throw Error("ID is not a number");
        }
    
        await deleteProductById(productId);
    
        response.send("product deleted");
    } catch (error) {
        response.status(400).send(error.message)
    }
});

module.exports = router;