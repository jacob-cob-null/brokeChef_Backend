export function recipeModel(recipeObj, type) {
    //ingredient array

    const ingredients = recipeObj["extendedIngredients"].map(ing => {

        const name = ing["name"]
        const amount = ing["amount"]
        const unit = ing["unit"] || ""
        return `${amount} ${unit} of ${name}`.trim()


        // return {
        //     "name": ing["name"],
        //     "amount": ing["amount"],
        //     "unit": ing["unit"]
        // }
    })


    const newRecipe = {
        "id": crypto.randomUUID(),
        "type": type,
        "title": recipeObj["title"],
        "prepTime": recipeObj["readyInMinutes"],
        "servings": recipeObj["servings"],
        "isFavorite": false,
        "imageUrl": recipeObj["image"],
        "source": recipeObj["sourceUrl"],
        "ingredients": ingredients,
        "description": recipeObj["summary"].split('.')[0]
    }

    return newRecipe
}