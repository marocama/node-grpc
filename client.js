const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefs = protoLoader.loadSync('./data.proto')
const dataProto = grpc.loadPackageDefinition(packageDefs)

const clientgRPC = new dataProto.DataService('localhost:9000', grpc.credentials.createInsecure())

// Insere novo usuário
clientgRPC.insert({ id: 3, name: 'Cacau' }, (err, user) => { console.log(`\nInsert:\n`, err ? 'ERROR' : user) })
// Busca usuário 1 (Marcus)
clientgRPC.find({ id: 1 }, (err, user) => { console.log(`\nFind:\n`, err ? 'ERROR' : user) })
// Busca usuário 4 (Não existe)
clientgRPC.find({ id: 4 }, (err, user) => { console.log(`\nFind:\n`, err ? 'ERROR' : user) })
// Busca todos usuários
clientgRPC.findAll({}, (err, users) => { console.log(`\nFindAll:\n`, err ? 'ERROR' : users) })