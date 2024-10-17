// import models
const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

// Products belong to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Foreign key in Product table
  onDelete: 'CASCADE', // If a Category is deleted, associated Products are deleted
  onUpdate: 'CASCADE', // If Category ID is updated, update related Product records
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Foreign key in Product table
  onDelete: 'CASCADE', // When a Category is deleted, its Products will be deleted
  onUpdate: 'CASCADE', // Update related Products when the Category ID is updated
})

// Products belong to many Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // The join table for many-to-many relationship
  foreignKey: 'product_id', // Foreign key in ProductTag table pointing to Product
  onDelete: 'CASCADE', // Deleting a Product will remove its related ProductTag records
  onUpdate: 'CASCADE', // Updating Product ID will update related ProductTag records
})

// Tags belong to many Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // The join table for many-to-many relationship
  foreignKey: 'tag_id', // Foreign key in ProductTag table pointing to Tag
  onDelete: 'CASCADE', // Deleting a Tag will remove its related ProductTag records
  onUpdate: 'CASCADE', // Updating Tag ID will update related ProductTag records
})

// Export the models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
}
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
