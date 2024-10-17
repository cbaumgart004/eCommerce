const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
      order: [['id', 'ASC']], // Sort by id in ascending order
    })
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    })

    if (!product) {
      return res.status(404).json({ message: 'No product found with this id!' })
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  // Destructure tagIds from req.body to handle separately
  const { tagIds, ...productData } = req.body

  try {
    // First, create the product
    const newProduct = await Product.create(productData)

    // If there are tagIds, handle the association with ProductTag
    if (tagIds && tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        }
      })
      // Bulk create the product tag associations
      await ProductTag.bulkCreate(productTagIdArr)
    }

    // Return the newly created product with associated tags
    const productWithTags = await Product.findOne({
      where: { id: newProduct.id },
      include: [{ model: Category }, { model: Tag }],
    })

    res.status(201).json(productWithTags)
  } catch (err) {
    console.error(err)
    res.status(400).json(err)
  }
})

// update product
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id)
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              }
            })

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id)
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ])
        })
      }

      return res.json(product)
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err)
    })
})

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    })

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
