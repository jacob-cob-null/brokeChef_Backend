import { getStatus } from "../controller/misc/statusRoute.js";
import { findByIngredients } from "../controller/spoonacular/spoonacularAPI.js";

export function routerSetup(app) {

    app.get('/status', (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send((getStatus(req, res)))
    })
    app.get('/', (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send(JSON.stringify("Welcome to the BrokeChef API!"));
    });
    app.get('/recipe', (req, res) => findByIngredients(req, res))

}