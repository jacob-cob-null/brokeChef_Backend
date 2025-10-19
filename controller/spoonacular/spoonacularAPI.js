import { recipeModel } from '../../model/recipeModel.js'
import dotenv from 'dotenv'
dotenv.config()

export async function findByIngredients(req, res) {
    try {
        const { ingredients } = req.query
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=1&apiKey=${process.env.SPOONACULAR_KEY}`

        const response = await fetch(url)
        const recipe = await response.json()
        const id = recipe[0]['id']
        const rawRecipe = await searchById(id)

        //return recipe model
        const finalRecipe = recipeModel(rawRecipe, "spoonacular")
        res.json(finalRecipe)
    }
    catch {
        res.status(500).json({ error: "Failed to fetch recipe, try again later" })
    }

}

async function searchById(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_KEY}`

    const response = await fetch(url)
    const recipe = await response.json()

    return recipe
}