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
  images: {type: [{url:String, imageId:String}], get: defaulImgIfEmpty},
  youtubeLink: { type: String, default: '' },
  profileId: String,
  tags: [String],
  ingredients: [IngredientSchema],
  nutritionalProperties: {
    calories: Number,
    proteins: Number,
    totalFat: Number
  }, 
  rating: [{
    rate: { type: Number, min: 0, max: 5, default: 0 },
    userId: { type: String }
  }],
    createdAt: { type: Date, default: Date.now }
  },{ toJSON: { getters: true } });

  function defaulImgIfEmpty(images){
    if(images.length == 0){
      return [{url: 'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg', imageId: 'dish-image-no.jpg'}];
    }
    return images;
  }
  return images;
}
/**
 * Validations
 */
RecipeSchema.path('title').required(true, 'Recipe title cannot be blank');
RecipeSchema.path('description').required(true, 'Recipe description cannot be blank');
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;