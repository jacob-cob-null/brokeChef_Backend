
export function getStatus(req, res) {
    const status = {
        name: "BrokeChef API",
        description: "A dedicated express app for BrokeChef, recipe generating website build from Nemotron LLM and Spoonacular API",
        status: "ok",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        time: new Date().toISOString()
    }
    return status
}