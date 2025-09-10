import { getStatus } from "../controller/misc/statusRoute.js";
import { generateRecipe } from "../controller/sonoma/sonomaAPI.js";
import { findByIngredients } from "../controller/spoonacular/spoonacularAPI.js";

export function routerSetup(app) {

    // from spoonacular
    app.get('/recipe', (req, res) => findByIngredients(req, res))

    // generate recipe
    app.get('/generate', (req, res) => generateRecipe(req, res))

    // server status
    app.get('/status', (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send((getStatus(req, res)))
    })

    // welcome message
    app.get('/', (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send(JSON.stringify("Welcome to the BrokeChef API!"));
    });

}