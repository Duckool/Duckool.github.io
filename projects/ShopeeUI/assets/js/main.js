const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var loginBtn = $('.login-box__submit')
var registerBtn = $('.register-box__submit')
var headerUser = $('.header-user')
show(loginBtn)
show(headerUser)
// APP
const app = {
    //  Database --> Get by Json

    projectList: [
        {
            name: "A little Profile",
            updated: "",
            path: "./projects/myProfile/",
            id: "myProfile",
            avt: "./assets/img/avt.jpg"
        },
        {
            name: "Duck Player",
            updated: "",
            path: "./projects/F8-MusicPlayer",
            id: "DuckPlayer",
            avt: "./assets/img/avt.jpg"
        },
        {
            name: "Shopee UI",
            updated: "",
            path: "./projects/ShopeeUI/",
            id: "shopeeUI",
            avt: "./assets/img/avt.jpg"
        },
        {
            name: "The Band",
            updated: "",
            path: "./projects/w3scBand/",
            id: "theBand",
            avt: "./assets/img/avt.jpg"
        }
    ],

    // RENDER
    render: function() {        
    },
    
    // Handle Events
    handleEvents: function() {
        loginBtn.onclick = function() {
            headerUser.classList.add("present")
        }

        registerBtn.onclick = function() {
            headerUser.classList.add("present")
        }
    },

    // START APP
    start: function() {
        this.render()
        this.handleEvents()
    }
}

app.start()

function show(...list) {
  for(var x of list) console.log(x)
}