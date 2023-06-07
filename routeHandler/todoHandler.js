const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const todoSchema=require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema)

router.get('/', async(req, res)=>{

})

router.get('/:id', async(req, res)=>{
    
})

router.post('/', async(req, res)=>{
    const newTodo = new Todo(req.body);
    try {
        await newTodo.save();
        res.status(200).json({
          Message: "Todo Was Inserted Successfully",
        });
      } catch (error) {
        res.status(500).json({
          error: "Server Side Error" + error,
        });
      }
    
})

router.post('/all', async(req, res)=>{
    
})

router.put('/:id', async(req, res)=>{
    
})

router.delete('/:id', async(req, res)=>{
    
})

module.exports=router