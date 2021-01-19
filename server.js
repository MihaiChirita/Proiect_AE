var express = require("express")
var Sequelize = require("sequelize")
var sequelize = new Sequelize('catalog_produse', 'username', 'password', {
    dialect:'mysql',
    host:'127.0.0.1'
})
sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})
var Produse = sequelize.define('produse', { nume: Sequelize.STRING,
    pret: Sequelize.INTEGER,
    producator: Sequelize.STRING,
    descriere: Sequelize.STRING
})


var app = express()
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       
app.use(express.urlencoded()); 

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.get('/createdata', (req, res) => {
  
})

async function getProduse(request, response) {
    try {
        let produse = await Produse.findAll();
        response.status(200).json(produse)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}
app.get('/produse', getProduse)
app.get('/produse/:id', function(request, response) {
    Produse.findOne({where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
})

app.post('/produse', function(request, response) {
    Produse.create(request.body).then(function(category) {
        response.status(201).send(category)
    })
})

app.put('/produse/:id', function(request, response) {
    Produse.findByPk(request.params.id).then(function(category) {
        if(category) {
            category.update(request.body).then(function(category){
                response.status(201).send(category)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/produse/:id', function(request, response) {
    Produse.findByPk(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
app.listen(8080)
