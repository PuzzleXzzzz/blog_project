let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if (!port) {
    console.log('请指定端口号')
    process.exit(1)
}

let server = http.createServer(
    function (request, response) {
        let parseURL = url.parse(request.url, true)
        let path = request.url
        let query = ''
        if (path.indexOf('?') >= 0) {
            query = path.substring(path.indexOf('?'))
        }
        let pathQuery = parseURL.pathname
        let queryObject = parseURL.query
        let method = request.method


        console.log(`路径为${path}`)
        console.log(`查询字符串为${query}`)
        console.log(`不包含查询字符串的路径为${pathQuery}`)

        /*作出的响应  访问的文件的后缀是没有用的 */
        if (path == '/') {
            response.write('HI')
            response.end()  // 结束响应
        } else if (path == '/index') {
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            /*变成了网页;字符集设置为utf-8*/
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="/style">
                    <title>Document</title>
                </head>
                <body>
                    <h1>Hello,Node.js!</h1>
                    <script src="/script"></script>
                </body>
                </html>
`           )
            response.end()
        } else if (path == '/style') {
            response.setHeader('Content-Type', 'text/css;charset=utf-8')
            response.write(`
                body{
                    background-color:#ddd;
                }
                h1{
                    color:red;
                }
            `)
            response.end()
        } else if (path == '/script') {
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            response.write(`
                alert('这是JS执行的')
            `)
            response.end()
        }
        else {
            response.statuCode = 404
            response.end()
        }

    }
)

server.listen(port)
console.log(`监听${port}成功\n请打开http://localhost:${port}`)
