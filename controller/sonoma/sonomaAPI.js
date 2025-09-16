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
Given these ingredients: ${ingredients}, return a single JSON object with one recipe. 
If ${ingredients} contains any forms of profanity, sensitivity, violence, or other obscene content, 
return a JSON message: { "error": "invalid ingredients" }

The JSON must strictly follow this format (no extra text, no markdown, no escape sequences):

{
  "id": 663748,
  "image": "https://img.spoonacular.com/recipes/663748-556x370.jpg",
  "imageType": "jpg",
  "title": "Traditional Apple Tart",
  "readyInMinutes": 45,
  "servings": 8,
  "sourceUrl": "https://www.foodista.com/recipe/M23CKJZX/traditional-apple-tart",
  "vegetarian": true,
  "vegan": false,
  "glutenFree": false,
  "dairyFree": false,
  "veryHealthy": false,
  "cheap": false,
  "veryPopular": false,
  "sustainable": false,
  "lowFodmap": false,
  "weightWatcherSmartPoints": 13,
  "gaps": "no",
  "preparationMinutes": null,
  "cookingMinutes": null,
  "aggregateLikes": 1,
  "healthScore": 2,
  "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
  "license": "CC BY 3.0",
  "sourceName": "Foodista",
  "pricePerServing": 128.76,
  "extendedIngredients": [
    {
      "id": 1089003,
      "aisle": "Produce",
      "image": "grannysmith-apple.png",
      "consistency": "SOLID",
      "name": "granny smiths",
      "nameClean": "granny smiths",
      "original": "1 1/2 pounds 3 cooking apples such as Bramley or Granny Smiths",
      "originalName": "3 cooking apples such as Bramley or Granny Smiths",
      "amount": 1.5,
      "unit": "pounds",
      "meta": [],
      "measures": {
        "us": {
          "amount": 1.5,
          "unitShort": "lb",
          "unitLong": "pounds"
        },
        "metric": {
          "amount": 680.389,
          "unitShort": "g",
          "unitLong": "grams"
        }
      }
    },
    ...
  ],
  "summary": "You can never have too many dessert recipes, so give Traditional Apple Tart a try. ...",
  "cuisines": [],
  "dishTypes": ["dessert"],
  "diets": ["lacto ovo vegetarian"],
  "occasions": [],
  "instructions": "For the apple compote, heat the butter in a pan...",
  "analyzedInstructions": [
    {
      "name": "",
      "steps": [
        {
          "number": 1,
          "step": "For the apple compote, heat the butter in a pan...",
          "ingredients": [...],
          "equipment": [...],
          "length": { "number": 30, "unit": "minutes" }
        },
        ...
      ]
    }
  ],
  "spoonacularScore": 32.9125633239746,
  "spoonacularSourceUrl": "https://spoonacular.com/traditional-apple-tart-663748"
}
`
                }
            ]
        })
    })

    return response.json()
}
//generate instructions