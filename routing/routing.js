const { homeRouting } = require("./home")
const { productRouting } = require("./product")
const { logoutRouting } = require("./logout")
const { STATUS_CODE } = require("../constants/statusCode")

function requestRouting(request, response) {
  const { url, method } = request
  console.log(`INFO ${new Date().toUTCString()}: ${method} - ${url}`)
  if (url === "/") {
    return homeRouting(method, response)
  }
  if (url.startsWith("/product")) {
    return productRouting(request, response)
  }
  if (url === "/logout") {
    return logoutRouting(method, response)
  }
  if (url === "/kill") {
    console.log(`PROCESS ${new Date().toUTCString()}: The application will be closed`)
    process.exit()
  }
  response.statusCode = STATUS_CODE.NOT_FOUND
  response.setHeader("Content-Type", "text/html")
  response.write("<html><body><h1>404 - Not Found</h1></body></html>")
  response.end()
  console.warn(`ERROR ${new Date().toUTCString()}: requested url [${url}] does not exist`)
}

module.exports = {
  requestRouting
}
