export enum RecipeType {
    main_course,
    side_fish,
    dessert,
    appetizer,
    salad,
    bread,
    breakfast,
    soup,
    beverage,
    sauce,
    marinade,
    fingerfood,
    snack,
    drink
}


export  interface RecipeSearch {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

export interface APIResponse<T> {
    results: Array<T>;
    offset: number;
    number: number;
    totalResults: number;
}

export interface Recipe {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: Number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    spoonacularSourceUrl: string;
    pricePerServing: number;
    extendedIngredients: any;
    id: number;
    title: string;
    readyInMinutes: number;
    servings:  number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: Array<string>;
    dishTypes: Array<string>;
    diets: Array<string>;
    occasions: Array<string>;
    winePairing: any;
    instructions: string;
    analyzedInstructions: Array<AnaluzedInstruction>;
    originalId: null;
}

export interface Ingredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: Array<string>;
    measures: Measure;
}

export interface Measure {
    us: MeasureType;
    metric: MeasureType;
}

export interface MeasureType {
    amount: number;
    unitShort: string;
    unitLong: string;
}

export interface AnaluzedInstruction {
    name: string;
    steps: Array<Instruction>;
}

export interface Instruction {
    number: number;
    step: string;
    ingredients: Array<SimpleIngredient>;
}

export interface SimpleIngredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}