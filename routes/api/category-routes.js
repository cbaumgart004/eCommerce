const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']], // Sort by id in ascending order
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!category) {
      return res
        .status(404)
        .json({ message: 'No category found with this id!' })
    }

    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    // First, update the category by its ID
    const [affectedRows] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    )

    // If no category was found with the given ID, return a 404 error
    if (!affectedRows) {
      return res
        .status(404)
        .json({ message: 'No category found with this ID!' })
    }

    // Fetch the updated category from the database
    const updatedCategory = await Category.findByPk(req.params.id)

    // Return the updated category
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category', error: err })
  }
})

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    })

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ message: 'No category found with this id!' })
    }

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
