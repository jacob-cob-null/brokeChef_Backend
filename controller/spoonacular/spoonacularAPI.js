import dotenv from 'dotenv'
dotenv.config()

export async function findByIngredients(req, res) {
    try {
        const { ingredients } = req.query
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=1&apiKey=${process.env.SPOONACULAR_KEY}`

        const response = await fetch(url)
        const recipe = await response.json()
        res.json(recipe)
    }
    catch {
        res.status(500).json({ error: "Failed to fetch recipe, try again later" })
    }

}
