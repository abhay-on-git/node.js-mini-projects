var express = require('express');
var router = express.Router();
const propertySchema = require('../models/propertySchema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/form', function(req, res, next) {
  res.render('form');
});
router.post('/create-data', async function(req, res, next) {
  console.log(req.body)
try {
  await propertySchema.create(req.body)
  res.redirect('/listed-properties');
} catch (error) {
  res.send(error.message);
}
});
router.get('/listed-properties', async function(req, res, next) {
  try {
    const propertyCards = await propertySchema.find({})
  res.render('listed-properties',{propertyCards});
  } catch (error) {
    console.log(error.message)
  }
});
router.get('/update/:id', async function(req, res, next) {
  const id = req.params.id;
  try {
    const propertyCard = await propertySchema.findById(id);
    res.render('update', { propertyCard });
  } catch (error) {
    console.log(error.message);
    res.status(500).render('error', { message: 'An error occurred', error: error.message });
  }
});

router.post('/update/:id', async function(req, res, next) {
  const id = req.params.id
  const updatedData = req.body
  try {
  await propertySchema.findByIdAndUpdate(id,updatedData,{new : true})
  res.redirect('/listed-properties');
  } catch (error) {
    console.log(error.message)
  }
});
router.get('/delete/:id', async function(req, res, next) {
  const id = req.params.id
  try {
    await propertySchema.findByIdAndDelete(id)
  res.redirect('listed-properties');
  } catch (error) {
    console.log(error.message)
  }
});

module.exports = router;
