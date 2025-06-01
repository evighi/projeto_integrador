import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import routesLogin from './routes/login'
import routesAdmins from './routes/admins'
import routesClientes from './routes/clientes'
import routesRevendas from './routes/revendas'
import routesEventos from './routes/eventos'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use('/clientes', routesClientes);
app.use('/login', routesLogin); 
app.use('/admins', routesAdmins); 
app.use('/revendas', routesRevendas)
app.use('/eventos', routesEventos)

app.get('/', (req, res) => {
  res.send('API: Good Ticket')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})