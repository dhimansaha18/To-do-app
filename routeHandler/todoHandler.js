const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const todoSchema=require('../schemas/todoSchema');
const userSchema=require('../schemas/userSchema');
const Todo = new mongoose.model('Todo', todoSchema);
const checkLogin = require('../middlewares/checkLogin');

router.get('/', checkLogin, async(req, res)=>{
  try{
    const data=await Todo.find().populate("user", "name userName -_id").
    select({
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
});

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
});

router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
});

router.get("/js", async (req, res) => {
  const data = await Todo.findJs();
  res.status(200).json({
    data,
  });
});

router.get("/bylanguage", async (req, res) => {
  const data = await Todo.find().findByLanguage("angular");
  res.status(200).json({
    data,
  });
});

router.get("/active-callback", (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    res.status(200).json({
      data,
    });
  });
}); 

router.post('/', checkLogin, async(req, res)=>{
  const newTodo = new Todo({
    ...req.body,
    user: req.userId
  });
    try {
        await newTodo.save();
        res.status(200).json({
          Message: "Todo Was Inserted Successfully",
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
          error: "Server Side Error" + error,
        });
      }
});

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
});

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
    
});

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
});

module.exports=router