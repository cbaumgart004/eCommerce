// import models
const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Foreign key in Product
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Foreign key in Product
  onDelete: 'CASCADE', // When a Category is deleted, its Products will be deleted
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Join table
  foreignKey: 'product_id', // Foreign key in ProductTag
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Join table
  foreignKey: 'tag_id', // Foreign key in ProductTag
})

// Export the models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
}
