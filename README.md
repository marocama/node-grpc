# node-grpc

Exemplo de uso de comunicação gRPC manipulando uma lista de usuários estáticos.

`
service DataService {
  rpc Insert (User) returns (User) {}
  rpc Find (UserId) returns (User) {}
  rpc FindAll (Empty) returns (UserList) {}
}
`

## Servidor

`node server` 

## Cliente

`node client`