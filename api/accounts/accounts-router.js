const router = require('express').Router();
const accountsModel = require("./accounts-model");
const mw = require("./accounts-middleware");



router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAcounts = await accountsModel.getAll(req.query.limit,req.query.sortBy,req.query.sortDir);
    res.json(allAcounts);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', mw.checkAccountId,(req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.existAccount);
  } catch (error) {
    next(error);
  }
})



router.post('/',mw.checkAccountPayload,mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const insertAccountModel = {
      name:req.body.name,
      budget:req.body.budget
    }
    const insertedAccount = await accountsModel.create(insertAccountModel);
    res.status(201).json(insertedAccount);
  } catch (error) {
    next(error);
  }
})

router.put('/:id',mw.checkAccountId,mw.checkAccountPayload,mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const updateAccountModel = {
      name:req.body.name,
      budget:req.body.budget
    }
    const updatedAccount = await accountsModel.updateById(req.params.id,updateAccountModel);
    res.status(200).json(updatedAccount);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json({message:`${req.params.id} 'li kayıt silindi.`});
  } catch (error) {
    next(error);
  }
})




module.exports = router;