const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require('next');
const dev = process.env.NODE_ENV !== 'development';
const app = next({ dir:".", dev });
const handle = app.getRequestHandler();


const CONFIG = require('./config');

app.prepare()
   .then(() => {
       const app = express();
       app.use(bodyParser.json());
       app.use(bodyParser.urlencoded({extended:false}));
       app.use(cors());

       app.get('/api/beers/:page', (req, res) => {
         let page = req.params.page;
         let apiAddr = `${CONFIG.APIAddr}beers?key=${CONFIG.APIKey}&p=${page}`;

         axios.get(apiAddr).then(response => {
           res.send(response.data);
         }).catch(err => {
           console.log(err);
           res.send(500).send("error");
         });
       });

       app.get('/api/beer/:beerId', (req, res) => {
         let beerId = req.params.beerId;
         let beerApiAddr = `${CONFIG.APIAddr}beer/${beerId}?key=${CONFIG.APIKey}`;

         axios.get(beerApiAddr).then(response => {
           res.send(response.data)
         })
         .catch(err => {
           console.log(err);
           res.sendStatus(500);
         });
       });

       app.get("*", (req, res) => {
           return handle(req, res)
       });

       app.listen(CONFIG.PORT, (err) => {
           if(err) throw err;
           console.log(`> Ready on ${CONFIG.PORT}`);
       })
   })
   .catch(exception => {
       console.error(exception.stack);
       process.exit(1);
   });