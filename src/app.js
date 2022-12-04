//To learn more about express module -> visit to express.com page In api section to explore
const express = require('express')
const path = require('path') //path is a module to fetch path 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()  //express is a kind of function or module which we assign it to the app variable

// console.log(__dirname)    //used to find the directory name 
// console.log(__filename)  //used to find the path of a file 


//{Define paths for Express config}
const publicDirectoryPath = path.join(__dirname,'../public')    //console.log(publicDirectoryPath)
const viewsPath = path.join(__dirname,"../templates/views") 
const partialsPath = path.join(__dirname,"../templates/partials")


//{setup handlebar engine and views location}
app.set('view engine','hbs')   //to set the handlebars (key,value) //hbs files must be stored in "views" folder (folder name must be 'views')
app.set('views',viewsPath) //Pointing to the templates folder as "views"
hbs.registerPartials(partialsPath) // pointing partials path to the handlers module



//{Setup static Directory to Serve}
app.use(express.static(publicDirectoryPath))   //used to fetch the content from a file based on the name of the file and shows matching with the end point.  
                                            //localhost:3000/about.html
                                            //localhost:3000/help.html



app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Chetan Patidar"
    })      //render is use to access hbs file and we pass file name inside wirhout file extension
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"About Page"
    })      //render is use to access hbs file and we pass file name inside wirhout file extension
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title:"Help",
        name:"Chetan Patidar "
    })      //render is use to access hbs file and we pass file name inside wirhout file extension
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    } 
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send ({error})  //again we use short_hand syntax 
        }

         forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
                 return res.send ({error: error })  //here we have not used short_hand syntax
             }

             res.send({
                forecast: forecastData,
                location,
                address: req.query.address
             })
    })

 })



    // res.send([{
    //     forecast:"It is sunny",
    //     location:"Banglore",
    //     address:req.query.address}
    //     ]
    // )
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({               //here we use retrun to end the function here if we enter into if block beacause we can not use to response method for a single request call.
            error:'Please provide a search term it is mandatory'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{title:"404",
                      name:"chetan",
                    errormessage:"Help article not found" })
})


app.get('*',(req,res)=>{                  //  * it is a wild card character which is refer anything which is not present.
    res.render("404",{title:"404",
                      name:"chetan",
                    errormessage:"Page Not found" })
})

//{Starting the server in our system}
app.listen(3000,()=>{                 //Starting the server in our local machine on port 3000
    console.log("server is up and running!")
})












// app.get('',(req,res)=>{             //Go to any browser and hit this to see result -> localhost:3000
//     res.send("Hello Express")
// })

// app.get('/help',(req,res)=>{                //end point of url --> localhost:3000/help
//     res.send("What kind of help you need ")
// })

// app.get('/about',(req,res)=>{
//     res.send("<h2>About end point<h2>")
// })

// app.get('/weather',(req,res)=>{
//     res.send([{
//         forecast:"sunny",
//         location:"Banglore"},
//         {
//             forecast:"winter",
//             location:"Delhi"
//         }]
//     )
// })

