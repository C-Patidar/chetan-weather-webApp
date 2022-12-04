
console.log("Client side javascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


 messageOne.textContent = 'From JavaScript'
 messageTwo.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()  

    const location = search.value

    messageOne.textcontent = "Loading...."
    messageTwo.textcontent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
         response.json().then((data)=>{
             if(data.error){
                messageOne.textcontent = data.error
                //console.log(data.error)
            }else{

                messageOne.textcontent = data.location
                messageTwo.textcontent = data.forecast

                  console.log(data.location)
                  console.log(data.forecast)
                  }
         })
    })

}) 