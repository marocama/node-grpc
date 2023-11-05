const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

// Dados estáticos para teste
const users = [
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Isabella' },
]

const packageDefs = protoLoader.loadSync('./data.proto')
const dataProto = grpc.loadPackageDefinition(packageDefs)

const gRpcServer = new grpc.Server()
gRpcServer.addService(dataProto.DataService.service, {
  
  insert: (_, callback) => { 
    const user = _.request
    users.push(user)
    callback(null, { id: user.id, name: user.name })
  },

  find: (_, callback) => { 
    const user = users.find(i => i.id == _.request.id)
    if (user) { 
      callback(null, { id: user.id, name: user.name }) 
    } else {
      callback({ code: grpc.status.NOT_FOUND, message: 'Not found.' })
    }
  },

  findAll: (_, callback) => { 
    callback(null , { users }) 
  },
})

gRpcServer.bind('localhost:9000', grpc.ServerCredentials.createInsecure())

gRpcServer.start()

console.log('-> http://localhost:9000')