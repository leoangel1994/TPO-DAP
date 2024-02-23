// Recipe Data Type
export interface RecipeNutritionalProperties {
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
    steps: string[];
    youtubeLink: string;
    profileId: string;
    tags: string[];
    ingredients: RecipeIngredients[];
    images: RecipeImages[];
    createdAt: string;
    __v: number;
}

export interface User {
    _id: string;
    profileId: string;
    userName: string;
    name: string;
    familyName: string;
    email: string;
    photo: string;
}