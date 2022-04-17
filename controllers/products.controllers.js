import Product from '../models/product.model.js'
import { uploadImage, deleteImage } from "../utils/cloudinary.js"
import fs from 'fs-extra'


//Listar Productos
export const getProducts = async (req,res) => {
  //res.send('Waooo182 - Controllers Getting products 👁️‍🗨️🛍️🛒🎁')
  try {
    const products = await Product.find()
    res.json(products)  
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  
}

//Crear Producto
export const createProduct = async (req,res) => {
  //res.send('Waooo182 - Controllers Getting products ✨🛍️🛒🎁')
  try {
    const { name, description, price } = req.body
    //console.log(req.body)
    //console.log(name, description, price)
    console.log(req.files)
    console.log('hello Waoooo')
    
    const product = new Product({
      name,
      description,
      price
    })
    
    if(req.files?.image) {
      //const tempFilePath = req.files.image.tempFilePath
      //subo la imagen
      const result = await uploadImage(req.files.image.tempFilePath)

      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      //Elimina imagen temporal de replit
      fs.unlink(req.files.image.tempFilePath)
      console.log(result)
    }
  
    await product.save()
    
    res.json('Waooo182 - received ok')
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

//Actualizar un Producto
export const updateProduct = async (req, res) => {
  //res.send('Waooo182 - Controllers Updating products 📤🛍️🛒🎁')

  try {
    const {id} = req.params
    const productxput = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    })
    console.log('id', id)
  
    console.log(req.body)
    
    return res.json(productxput)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }  
}

//Eliminar un Producto
export const deleteProduct = async (req,res) => {
  //res.send('Waooo182 - Controllers deleting products ❌🛍️🛒🎁')
  //console.log(req.params)

  try {
    const productx = await Product.findByIdAndDelete(req.params.id)

    if(!productx) return res.status(404).json({
      message: 'Waooo182 - Product does not exists'
    })

    if(productx.image?.public_id){
      //Eliminamos la imagen de Cloudinary
      const result = await deleteImage(productx.image.public_id)
      console.log(result)  
    }    
    
    return res.json(productx)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  
  //return res.send('Waooo182 - deleting product target ❌🛍️🛒🎁')
}

//Obtener un Producto
export const getProduct = async (req,res) => {
  //res.send('Waooo182 - Controllers deleting products ❌🛍️🛒🎁')
  //console.log(req.params)

  try {
    const productx = await Product.findById(req.params.id)

    if(!productx) return res.status(404).json({
      message: 'Waooo182 - Product does not exists'
    })
  
    
    return res.json(productx)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  
  //return res.send('Waooo182 - deleting product target ❌🛍️🛒🎁')
}
