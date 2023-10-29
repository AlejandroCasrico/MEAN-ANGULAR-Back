
    const mongoose = require('mongoose');
    var app = require('./app');
    var port = 3100;
    mongoose.connect('mongodb://localhost:27017/Portabfolio')
                .then(()=>{
            console.log('connection successfully ')
            //create server
                    app.listen(port,()=>{
                        console.log('server running on localhost:3100');
                    });
        })
        .catch( error=>{
            console.log('connection failed',error)
        });

        