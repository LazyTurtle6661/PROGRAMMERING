function setup(){
    hentTopPosts("clashofclans");
    // Kalder funktionen 'hentTopPosts' med argumentet "cats" ved programmets start.
}

//async betyder at funktionen kan vente på at ting er færdige f.eks at hente data.
async function hentTopPosts(subreddit) {

    //først sætter vi et response objekt lig metoden fetch som henter noget data
    //det tager noget tid derfor bruger vi await så den venter på svar
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=8`)
        //når vi får det objekt tilbage og hvis response.ok = true
        //Så kan vi bruge metoden .json() til at læse en readable stream
        //den operation tager også noget tid der for skriver vi await for at den venter på det er færdigt.
        const json = await response.json()
            //og så kan vi bruge data fra serveren i .json format.
            console.log(json.data.children)
            
            // Posts er et array med posts fra json objektet
            let posts = json.data.children
            for( p of posts){
                //og nu kan vi logge forskellige egenskaber ved hver post til konsollen
                console.log(p.data.title)
                console.log(p.data.author)
                console.log(p.data.clicked)
                createPost(p.data)
            }
}


function createPost(post){
    // Vi laver først en reference til det html element vi ville sætte posterne ind i
    let rightDiv = select('#page1 .right')
    // lad os give posterne en container
    let container = createDiv().addClass('post')
    // Lad os give den en titel
    let title = createElement('h1', post.title)
    // hver gang jeg har lavet et element skal det ind i container
    container.child(title)


    rightDiv.child(container)
}