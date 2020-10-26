const router = require('express').Router();
let Product = require('../models/product.model');

  /* GET Products page. */
router.route('/').get((req, res) => {
    Product.find()
      .then(products => res.json(products))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  /* GET Product */
router.route('/:id').get((req,res) => {
    Product.findById(req.params.id)
     .then(product => res.json(product))
     .catch(err => res.status(400).json('Error: ' + err));
});

  /* ADD new Product */
router.route('/add').post((req, res) => {
    const invProductName = req.body.productName;
    const invSKU =req.body.SKU;
    const invSupplier = req.body.supplier;
    const invPrice = Number(req.body.price);
    const invCurentStock = Number(req.body.curentStock);
    const invOnOrder = Number(req.body.onOrder);
    const invRoyalty = Number(req.body.royalty);
    const invWooID = Number(req.body.wooID);
    const invSalePrice = Number(req.body.salePrice);

    const newProduct = new Product({
      invProductName,
      invSKU,
      invSupplier,
      invPrice,
      invCurentStock,
      invOnOrder,
      invRoyalty,
      invWooID,
      invSalePrice,
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
    
  /* DELETE Product */
router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  /* UPDATE Product */
router.route('/update/:id').post((req, res) => {
    Product.findByIdAndUpdate(req.params.id)
      .then(product => {
        product.invProductName = req.body.invProductName;
        product.invSKU =req.body.invSKU;
        product.invSupplier = req.body.invSupplier;
        product.invPrice = Number(req.body.invPrice);
        product.invCurentStock = Number(req.body.invCurentStock);
        product.invOnOrder = Number(req.body.invOnOrder);
        product.invRoyalty = Number(req.body.invRoyalty);
        product.invWooID = Number(req.body.invWooID);
        product.invSalePrice = Number(req.body.invSalePrice);
        
        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
// Export Module
module.exports = router;