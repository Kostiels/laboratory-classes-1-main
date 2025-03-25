const fs = require("fs")
const { STATUS_CODE } = require("../constants/statusCode")

function showAddProductForm(response) {
  response.setHeader("Content-Type", "text/html")
  response.write("<html>")
  response.write("<head><title>Shop – Add product</title></head>")
  response.write("<body>")
  response.write("<h1>Add product</h1>")
  response.write("<nav>")
  response.write('<a href="/">Home</a> | ')
  response.write('<a href="/product/new">Newest product</a> | ')
  response.write('<a href="/logout">Logout</a>')
  response.write("</nav>")
  response.write('<form method="POST" action="/product/add">')
  response.write('<label for="name">Name:</label>')
  response.write('<input type="text" name="name" />')
  response.write("<br/><br/>")
  response.write('<label for="description">Description:</label>')
  response.write('<input type="text" name="description" />')
  response.write("<br/><br/>")
  response.write('<button type="submit">Add product</button>')
  response.write("</form>")
  response.write("</body>")
  response.write("</html>")
  response.end()
}

function addNewProduct(request, response) {
  const body = []
  request.on("data", chunk => {
    body.push(chunk)
  })
  request.on("end", () => {
    const parsedBody = Buffer.concat(body).toString()
    const formFields = parsedBody.split("&")
    const nameValue = decodeURIComponent(formFields[0].split("=")[1])
    const descValue = decodeURIComponent(formFields[1].split("=")[1])
    fs.writeFile("product.txt", `Name: ${nameValue}, Description: ${descValue}`, err => {
      if (err) {
        response.statusCode = 500
        response.end("Server error")
        return
      }
      response.statusCode = STATUS_CODE.FOUND
      response.setHeader("Location", "/product/new")
      response.end()
    })
  })
}

function showNewestProduct(response) {
  response.setHeader("Content-Type", "text/html")
  response.write("<html>")
  response.write("<head><title>Shop – Newest product</title></head>")
  response.write("<body>")
  response.write("<h1>Newest product</h1>")
  response.write("<nav>")
  response.write('<a href="/">Home</a> | ')
  response.write('<a href="/product/add">Add product</a> | ')
  response.write('<a href="/logout">Logout</a>')
  response.write("</nav>")
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err) {
      response.write("<p>No new product</p>")
      response.write("</body></html>")
      response.end()
      return
    }
    response.write(`<p>${data}</p>`)
    response.write("</body></html>")
    response.end()
  })
}

function productRouting(request, response) {
  const { url, method } = request
  if (url === "/product/add" && method === "GET") {
    return showAddProductForm(response)
  }
  if (url === "/product/add" && method === "POST") {
    return addNewProduct(request, response)
  }
  if (url === "/product/new" && method === "GET") {
    return showNewestProduct(response)
  }
  response.statusCode = STATUS_CODE.NOT_FOUND
  response.setHeader("Content-Type", "text/html")
  response.write("<html><body><h1>404 - Not Found</h1></body></html>")
  response.end()
}

module.exports = {
  productRouting
}
