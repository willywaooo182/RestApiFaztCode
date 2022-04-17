import { Router } from 'express'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} from '../controllers/products.controllers.js'

const router = Router()
import fileUpload from 'express-fileupload'

router.get('/products', getProducts)

router.post('/products', fileUpload({ useTempFiles : true, tempFileDir : './uploads'}), createProduct)

router.put('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)

router.get('/products/:id', getProduct)

export default router