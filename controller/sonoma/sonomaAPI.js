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
      model: "nvidia/nemotron-nano-9b-v2:free",
      messages: [
        {
          role: "user",
          content: `You are a recipe generator. 
Given these ingredients: ${ingredients}, return a single JSON object with one recipe. 
If ${ingredients} contains any forms of profanity, sensitivity, violence, or other obscene content, 
return a JSON message: { "error": "invalid ingredients" }

The JSON must strictly follow this format (no extra text, no markdown, no escape sequences):
The type will ALWAYS be 'gpt'
{
  "type": "gpt",
  "title": "All Day Simple Slow-Cooker FALL OFF the BONE Ribs",
  "prepTime": 45,
  "servings": 4,
  "imageUrl": "https://img.spoonacular.com/recipes/632075-556x370.jpg",
  "source": "https://www.foodista.com/recipe/WKSRCLNF/all-day-simple-slow-cooker-fall-off-the-bone-ribs",
  "ingredients": [
    "2  of slabs of pork ribs",
    "0.25 Cup of broth",
    "40 oz of bbq sauce *i didn't need that much but it's what i had and didn't measure but it leaves extra",
    "4 servings of salt"
  ]
}
`
        }
      ]
    })
  })

  return response.json()
}
//generate instructions