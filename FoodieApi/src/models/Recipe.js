'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getTags = tags => tags.join(',');
const setTags = tags => {
  if (!Array.isArray(tags)) return tags.split(',').slice(0, 50); // max tags
  return [];
};
const getSteps = steps => steps.join(',');
const setSteps = steps => {
    if (!Array.isArray(steps)) return steps.split(',').slice(0, 50); // max steps
    return [];
  };

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
  steps: { type: [], get: getSteps, set: setSteps },
  image: {
    cdnUri: String,
    files: []
  },
  youtubeLink: { type: String, default: '' },
  userId: { type: Schema.ObjectId, ref: 'User' },
  tags: { type: [], get: getTags, set: setTags },
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