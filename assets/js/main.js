const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var products = $('.products')
var projects = $('.projects')

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
        var htmls = this.projectList.map( (project,index) => `
        <div class="product">
            <a href="${project.path}" class="product-link">
                <div class="product-avt">
                    <img src="${project.avt}" alt="">
                </div>

                <div class="product-name">
                    ${project.name}
                </div>
            </a>

            <div class="where">
                <a href="${project.path}">New tab</a>
                <a href="#${project.id}">On the page</a>
            </div>
        </div>`)

        var html = htmls.join('\n')

        products.innerHTML = html

        htmls = this.projectList.map( (project,index) => `
        <div class="project" id="${project.id}">
            <iframe src="${project.path}"></iframe>
         </div>`)

        html = htmls.join('\n')

        projects.innerHTML = html
        
    },
    
    // Handle Events
    handleEvents: function() {
    },

    // START APP
    start: function() {
        this.render()
    }
}

app.start()

function show(...list) {
  for(var x of list) console.log(x)
}