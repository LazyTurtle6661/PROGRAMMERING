let m5NameDiv, m5StatusDiv

// Denne variabel bliver brugt til at håndtere mqtt
let client

function setup() {
    // tag fat i de to HTML elementer vi ville modificerer 
    m5NameDiv = select('#m5_1 header')
    m5StatusDiv = select('#m5_1 .status')

    // Vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i html filen
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    // on er en asynkron EVENT, som kaldes når vi får en besked fra mqtt serveren.
    client.on('connect', function(svar){
        console.log(svar, 'serveren er klar til mqtt kommunikation')
    })


    // nu vi vi gerne subscribe på et emne
    client.subscribe('programmering')

    // og så skal vi sætte den LISTENER op som skal modtage input fra MQTT
    client.on('message', function(emne, besked){
        // emnet kommer som en string
        console.log(emne)
        // beskeden skal vi lige parse før vi kan læse den
        console.log(besked.toString())
        // det vi får fra m5'eren er i det her eksempel JSON format
        let json = JSON.parse(besked.toString())
        // nu kan jeg bruge data fra JSON objektet
        console.log(json.name, 'her er navnet for json objektet')
        // SÅ kan vi opdatere HTML dokumentet
        m5NameDiv.html(json.name)
        m5StatusDiv.html(json.status)

        // hvis STATUS er TRUE, skal vi give klassen "true"
        if(json.status){
            m5StatusDiv.addClass("true")
        }else{
            m5StatusDiv.removeClass("true")
        }
    })
}
