import http from 'node:http'
const PORT = 3000
const server = http.createServer((req, res) => {

    //routes
})
server.listen(PORT, () => {
    console.log("Server is running")
})