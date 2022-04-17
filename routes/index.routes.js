import { Router } from 'express'

const router = Router()


//routes
router.get('/',(req, res) => res.send('Waooo182 - hello World desde replit.com con routes'))

//test ping pong
router.get('/ping',(req, res) => res.send('Waooo182 - Pong 🔥'))

export default router