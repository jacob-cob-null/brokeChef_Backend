import express from 'express'
import cors from 'cors'

import { routerSetup } from './router/routerSetup.js';


const app = express()
app.use(cors())
const PORT = 3000;

routerSetup(app)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});


/*
Usage of this API

Spoonacular API:
http://127.0.0.1:3000/recipe?ingredients=chicken

AI Generated:
http://127.0.0.1:3000/generate?ingredients=chicken

*/