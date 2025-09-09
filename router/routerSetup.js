import { getStatus } from "../controller/misc/statusRoute.js";

export function routerSetup(app) {

    app.get('/status', (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send((getStatus(req, res)))
    })
    app.get("/", (req, res) => {
        res.status(200).set('Content-Type', 'application/json')
        res.send(JSON.stringify("Hello from Express!"));
    });

}