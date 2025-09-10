import dotenv from 'dotenv'
dotenv.config()

export async function generateRecipe(req, res) {
    try {
        const { ingredients } = req.query
        const data = await fetchSonoma(ingredients)
        const recipeText = data.choices[0].message.content

        // Try parsing JSON safely
        let recipe
        try {
            recipe = JSON.parse(recipeText)
        } catch (err) {
            return res.status(500).json({ error: "Invalid JSON returned from model", raw: recipeText })
        }

        res.json(recipe)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to generate recipe, try again later" })
    }
}

// fetch from sonoma api
async function fetchSonoma(ingredients) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.SONOMA_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openrouter/sonoma-dusk-alpha",
            messages: [
                {
                    role: "user",
                    content: `You are a recipe generator. 
Given these ingredients: ${ingredients}, return a JSON array of possible recipes.

The JSON should follow this structure (no extra text, no markdown, no escape sequences):

[
  {
    "id": 12345,
    "title": "Lemon Paprika Chicken",
    "image": "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    "imageType": "jpg",
    "usedIngredientCount": 3,
    "missedIngredientCount": 2,
    "missedIngredients": [
      {
        "id": 11215,
        "amount": 2.0,
        "unit": "tablespoons",
        "unitLong": "tablespoons",
        "unitShort": "Tbsp",
        "aisle": "Spices and Seasonings",
        "name": "olive oil",
        "original": "2 tablespoons olive oil",
        "originalName": "olive oil",
        "meta": ["for cooking"],
        "extendedName": "olive oil",
        "image": "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg"
      }
    ],
    "usedIngredients": [],
    "unusedIngredients": [],
    "likes": 456
  }
]`
                }
            ]
        })
    })

    return response.json()
}
