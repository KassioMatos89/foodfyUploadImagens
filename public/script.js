// Lógica para menu ativo
const currentPage = location.pathname
const menuItems = document.querySelectorAll(".header a")

for( item of menuItems ) {
    if( currentPage.includes(item.getAttribute("href")) ) {
        item.classList.add("activeMenu")
    }
}

// Lógica para lista de receitas, quando uma for clicada, será direcionado para o front de detalhes da receita (recipes.njk)
const cards = document.querySelectorAll('.view-recipe')

for(let card of cards){
    card.addEventListener('click', function(){
        const recipeId = card.getAttribute('id')
        window.location.href = `/admin/recipes/${recipeId}`
    })
}

// Lógica para esconder/mostrar os detalhes da receita

const buttons = document.querySelectorAll('h4')
const contents = document.querySelectorAll('.topic-content')

var i = 0

for(let button of buttons){    
    
    const content = contents[i]
    button.addEventListener('click', function(){    

        if (button.innerHTML === 'ESCONDER'){
            button.innerHTML = 'MOSTRAR'
            content.classList.remove('show')
            content.classList.add('hide')
            
        } else {
            button.innerHTML = 'ESCONDER'
            content.classList.remove('hide')
            content.classList.add('show')
            
        }
    })
    i += 1
}

// Add fields ingredients on create.njk
function addIngredient(){
    
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    //Realiza um clone do último ingrediente adicionado.
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode( true )

    //Não adiciona um input se o ultimo tem um valor vazio.
    if(newField.children[0].value == "") return false

    //Deixa o valor do imput vazio
    newField.children[0].value = ""
    ingredients.appendChild(newField)

}

if (document.querySelector(".add-ingredient")) {
    document
    .querySelector(".add-ingredient")
    .addEventListener('click', addIngredient)
}

// Add fields preparation on create.njk
function addPreparation(){

    const preparation_itens = document.querySelector("#preparation-itens")
    const fieldContainer = document.querySelectorAll(".preparation")

    //Realiza um clone do último ingrediente adicionado.
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode( true )

    //Não adiciona um input se o ultimo tem um valor vazio.
    if(newField.children[0].value == "") return false

    //Deixa o valor do imput vazio
    newField.children[0].value = ""
    preparation_itens.appendChild(newField)

}

if(document.querySelector(".add-preparation")){
    document
    .querySelector(".add-preparation")
    .addEventListener('click', addPreparation)
}

//Paginate

function paginate(selectedPage, totalPages) {
    let  pages = [],
         oldPage

    for ( let currentPage = 1; currentPage <= totalPages; currentPage++ ) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if ( firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage ) {
            
            if ( oldPage && currentPage - oldPage > 2 ) {
                pages.push("...")
            }

            if ( oldPage && currentPage - oldPage == 2 ) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
            
        }
    }
    
    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total

const pages = paginate(page, total)

let elements = ""

for ( let page of pages ) {
    if( String(page).includes("...")) {
        elements += `<span>${page}</span>`    
    } else {
        elements += `<a href="?page=${page}">${page}</a>`
    }
}

pagination.innerHTML = elements
