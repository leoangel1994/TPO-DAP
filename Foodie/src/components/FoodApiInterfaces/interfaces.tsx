// Fake Recipe Data type TODO: replace usage with true one
export interface RecipesListItemType {
  recipeId: number;
  title: string;
  preparationTime: string;
  portions: number;
  image: string;
  tags: string[];
  description: string;
}

// Recipe Data Type
export interface RecipeNutritionalProperties {
  calories: number;
  proteins: number;
  totalFat: number;
}

export interface RecipeSteps {
  calories: number;
  proteins: number;
  totalFat: number;
}

export interface RecipeIngredients {
  name: string;
  amount: string;
  _id: string;
}

export interface RecipeImages{
  url: string;
  imageId: string;
  _id: string;
}

export interface Recipe {
    nutritionalProperties: RecipeNutritionalProperties;
    _id: string;
    title: string;
    description: string;
    preparationTime: string;
    portions: number;
    steps: RecipeSteps[];
    youtubeLink: string;
    profileId: string;
    tags: string[];
    ingredients: RecipeIngredients[];
    images: RecipeImages[];
    createdAt: string;
    __v: number;
}