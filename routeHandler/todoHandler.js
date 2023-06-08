const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const todoSchema=require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema)

router.get('/', async(req, res)=>{
  try{
    const data=await Todo.find({
      "status":"active"
    }).select({
      _id: 0,
      __v: 0
    });
    res.status(200).json({
      result: data,
    })
  }
  catch(err){
    res.status(500).json({
      error: "Server Error"+ err,
    })
  }
})

router.get('/:id', async(req, res)=>{
  try{
    const data=await Todo.find({
      _id:req.params.id
    });
    res.status(200).json({
      result: data,
    })
  }
  catch(err){
    res.status(500).json({
      error: "Server Error"+ err,
    })
  }
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
    try{
      await Todo.insertMany(req.body);
      res.status(200).json({
        Message: "TOdos were inserted",
      })
    }
    catch(err){
      res.status(500).json({
        error: "Server Error"+ err,
      })
    }
})

router.put('/:id', async(req, res)=>{
    try{
      const result = await Todo.findByIdAndUpdate({_id: req.params.id},{
        $set:{
          "status": "inactive",
        }
      },
      {
        new: true,
        useFindAndModify: false
      }
      )
      res.status(200).json({
        Message: "TOdo was updated",
      })
      console.log(result)
    }
    catch(error){
      res.status(500).json({
        error: "Server Error"+ error,
      })
    }
    
})

router.delete('/:id', async(req, res)=>{
  try{
    await Todo.deleteOne({
      _id:req.params.id
    });
    res.status(200).json({
      Message: 'Deletion Successfull',
    })
  }
  catch(err){
    res.status(500).json({
      error: "Server Error"+ err,
    })
  }
})

module.exports=router