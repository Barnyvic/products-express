import express from 'express'
import {
    createProduct,
    allProducts,
    UpdateProduct,
    deleteProduct,
} from '../controllers/ProductController'
const ProductRoutes = express.Router()

ProductRoutes.route('/').get(allProducts).post(createProduct)
ProductRoutes.route('/:id').put(UpdateProduct).delete(deleteProduct)

export default ProductRoutes
