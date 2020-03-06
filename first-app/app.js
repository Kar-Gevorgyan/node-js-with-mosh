// const EventEmitter = require('events')

// const Logger = require('./logger');
// const logger = new Logger()

// logger.on('messageLogged', function(eventArg){
//     console.log('listener called', eventArg)
// })

// logger.log('message')

const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello world!!!')
        res.end()
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3,4]))
        res.end()
    }
})

const port = process.env.PORT || 3000

server.listen(port)

console.log(`Listening on port ${port}...`)