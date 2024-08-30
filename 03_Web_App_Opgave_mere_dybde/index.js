

let currentPage = 2

let pages // Array med alle elementer 
let menuItems // Array med alle menu punkterne

function setup(){
    pages = selectAll('.page')
    menuItems = selectAll('.menuitem')

    //menu items skal reagere ved at skifte side
    for( m of menuItems ){
        m.mousePressed(function(e){
            //e.target er selve html div'en
            console.log(e.target)
            // Slice -1 henter det sidste bogstav i en string
            let nr = e.target.id.slice(-1)
            // Nu kan vi kalde shiftPage som skifter side
            shiftPage(nr)

        })
    }

     // shiftPage er funktionen der tager et tal og skifter til en side
      shiftPage(currentPage)

      //Vent to sekunder og sæt så klassen "hidden" på headeren - så menuen bliver væk
      setTimeout(function(){
        select('header').addClass('hidden')
      }, 2000)
}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }

    if(num == "ArrowRight"){
        num = currentPage + 1
    }




    if(isNaN(num) || num > pages.length || num == 0){
        return
    }
    select("#menu" + currentPage).removeClass('active')
    select("#page" + currentPage).removeClass('visible')
    currentPage = num
    select("#page" + currentPage).addClass('visible')
    select("#menu" + currentPage).addClass('active')

}


function keyPressed(){
    console.log(key)
    shiftPage(key)
}