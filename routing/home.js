function homeRouting(method, response) {
    response.setHeader("Content-Type", "text/html")
    response.write("<html>")
    response.write("<head><title>Shop – Home</title></head>")
    response.write("<body>")
    response.write("<h1>Home</h1>")
    response.write("<nav>")
    response.write('<a href="/product/add">Add product</a> | ')
    response.write('<a href="/product/new">Newest product</a> | ')
    response.write('<a href="/logout">Logout</a>')
    response.write("</nav>")
    response.write("</body>")
    response.write("</html>")
    response.end()
  }
  
  module.exports = {
    homeRouting
  }
  