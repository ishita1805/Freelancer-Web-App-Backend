const mongoose = require('mongoose')
    mongoose.connect("mongodb+srv://Ishita:eshankabra1805@development.ehlzh.mongodb.net/freelancer?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
