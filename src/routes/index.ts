// const path = require('path')
// const fs = require('fs')

// // connect to the "src/routers" directory
// const routersPath = path.join(__dirname, 'routes')

// // read all files in the "/src/routers" directory
// fs.readdirSync(routersPath).forEach((file: any) => {
//   if (file.endsWith('.js')) {
//     // dynamically import the router module
//     const routerModule = require(path.join(routersPath, file))

//     // get the "router" object exported by the router module
//     const router = routerModule.router

//     // register the router
//     app.use(router)
//   }
// })
