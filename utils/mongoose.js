import mongoose from 'mongoose'
//const MONGODB_URI = process.env['MONGODB_URI']
import { MONGODB_URI } from '../config.js'

export async function connectToDB(){
  //await mongoose.connect(MONGODB_URI)
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Waooo182 - MongoDB connected')
  } catch (error) {
    console.err(error)
  }
}