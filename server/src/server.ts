import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors()); // dessa forma permite q todas as urls acessem, em dev pode deixar assim, em prod preencher a prop origin
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando no sistema (users)

// const users = [
//     'Marcos',
//     'Lauro',
//     'William'
// ];

// app.get('/users', (request, response) => {

//     // console.log('listagem de usuarios');

//     let search: string = String(request.query.search);


//     const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

//     return response.json(filteredUsers);
// });

// app.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user);
// });

// app.post('/users', (request, response) => {
//     const dados = request.body;

//     const user = {
//         name: dados.name,
//         email: dados.email
//     };

//     return response.json(user);
// });

app.use(errors());

app.listen(3333);

// parei na aula 2 - 01:34:00