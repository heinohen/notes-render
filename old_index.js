
// ottaa käyttöön Noden sisäänrakennetun
// web-palvelimen määrittelevän moduulin.
// Kyse on käytännössä samasta asiasta kuin mihin olemme selainpuolen koodissa tottuneet,
// mutta syntaksiltaan hieman erilaisessa muodossa:
const http = require('http')


let notes = [
        {
        id: 1,
        content: "HTML is easy",
        important: true
        },     
        {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
        },
        {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
        }
    ]

// Koodi luo http-moduulin metodilla createServer web-palvelimen,
// jolle se rekisteröi tapahtumankäsittelijän,
// joka suoritetaan jokaisen osoitteen http://localhost:3001 alle tulevan HTTP-pyynnön yhteydessä.
// Koska tällä kurssilla palvelimen rooli on pääasiassa tarjota frontille JSON-muotoista "raakadataa",
//  muutetaan palvelinta siten, että se palauttaa kovakoodatun listan JSON-muotoisia muistiinpanoja:
// Headerin content-type arvolla application/json kerrotaan, että kyse on JSON-muotoisesta datasta.
// Muuttujassa notes oleva taulukko muutetaan JSON-muotoon metodilla "JSON.stringify"
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})

// Viimeiset rivit sitovat muuttujaan app
// sijoitetun http-palvelimen kuuntelemaan porttiin 3001 tulevia HTTP-pyyntöjä:
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)