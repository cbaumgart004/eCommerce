const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']], // Sort by id in ascending order
    })
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!tag) {
      return res.status(404).json({ message: 'No tag found with this id!' })
    }

    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(201).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    // First, update the tag by its ID
    const [affectedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )

    // If no tag was found with the given ID, return a 404 error
    if (!affectedRows) {
      return res.status(404).json({ message: 'No tag found with this ID!' })
    }

    // Fetch the updated tag from the database
    const updatedTag = await Tag.findByPk(req.params.id)

    // Return the updated tag
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tag', error: err })
  }
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    })

    res.status(200).json({ message: 'Tag deleted successfully' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
