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
  try {
    // Update the product data
    const [affectedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    // If no product was found with the given ID, return a 404 error
    if (!affectedRows) {
      return res.status(404).json({ message: 'No product found with this ID!' })
    }

    // If tagIds are provided in the request, update the associated tags
    if (req.body.tagIds && req.body.tagIds.length) {
      // Find all existing tags for this product
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      })

      // Get the current tag IDs associated with the product
      const productTagIds = productTags.map(({ tag_id }) => tag_id)

      // Create a filtered list of new tag IDs to be added
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }))

      // Identify tags that should be removed
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id)

      // Perform both actions: remove outdated tags and add new ones
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ])
    }

    // Fetch the updated product along with its associated tags and category
    const updatedProduct = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category }, { model: Tag }],
    })

    // Return the updated product
    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update product', error: err })
  }
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
