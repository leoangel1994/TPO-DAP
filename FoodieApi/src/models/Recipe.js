'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Recipe Schema
 */
const IngredientSchema = new Schema({
    ingredientId: Schema.ObjectId,
    name: String,
    amount: String});
const RecipeSchema = new Schema({
  recipeId: { type: Schema.ObjectId, ref: 'Recipe' },
  title: { type: String, default: '', trim: true, maxlength: 400 },
  description: { type: String, default: '', trim: true, maxlength: 1500 },
  preparationTime: { type: String, default: '', trim: true, maxlength: 400 },
  portions: { type: Number, min: 0, },
  steps: [String],
  image: {
    cdnUri: String,
    files: []
  },
  youtubeLink: { type: String, default: '' },
  profileId: String,
  tags: [String],
  ingredients: [IngredientSchema],
  nutritionalProperties: {
    calories: Number,
    proteins: Number,
    totalFat: Number
  }, 
  createdAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */
RecipeSchema.path('title').required(true, 'Recipe title cannot be blank');
RecipeSchema.path('description').required(true, 'Recipe description cannot be blank');
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;