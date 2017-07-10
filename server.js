const path = require("path")
const express = require("express")
const compression = require("compression")
const {readdir} = require("fs")

const webpackConfig = require("../webpack/webpack.config.js")
const webpack = require("webpack")

const app = express()
app.use(compression({level: 9}))
const compiler = webpack(webpackConfig)

compiler.run((error, stats) => {
  if (error) {
    return console.error(error)
  }

  const PROTOCOL = process.env.HOST_PROTOCOL
  const HOST = process.env.HOST_ADDRESS
  const PORT = process.env.HOST_PORT

  const readStaticFiles = path =>
    new Promise((resolve, reject) => {
      readdir(path, (error, files) => {
        return error ? reject(error) : resolve(files)
      })
    })

  const staticFilesPath = path.resolve(__dirname, "dist")

  readStaticFiles(staticFilesPath)
    .then(components => {
      console.log("AVAILABLE ASSETS", components)

      app.use(`/:componentName`, (request, response, next) => {
        const {componentName} = request.params
        const queriedFileName = !!componentName ? componentName : "index"

        const file = components.find(fileName =>
          new RegExp(queriedFileName).exec(fileName)
        )

        return file
          ? response.sendFile(path.resolve(staticFilesPath, file))
          : response.status(404).send("Resource not found.")
      })

      app.listen(PORT, HOST, error => {
        if (error) {
          console.log(error)
          return
        }

        console.info("🚧 Now available at %s://%s:%s", PROTOCOL, HOST, PORT)
      })
    })
    .catch(console.error)
})
