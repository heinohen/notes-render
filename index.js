
// otetaan käyttöön express, joka on tällä kertaa funktio,
// jota kutsumalla luodaan muuttujaan app sijoitettava Express-sovellusta vastaava olio
require('dotenv').config()
const Note = require('./models/note')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
// Otetaan json-parseri käyttöön
app.use(express.json())


// Määritellään sovellukselle kaksi routea:

// 1) Määrittelee tapahtumankäsittelijän, 
// joka hoitaa sovelluksen juureen eli polkuun '/' tulevia HTTP GET pyyntöjä
/**
 * @param request sisältää kaikki HTTP-pyynnön tiedot
 * @param response määrittelee miten pyyntöön vastataan
 */
// Käytetään response-olion metodia send, jonka kutsumisen seurauksena palvelin vastaa HTTP-pyyntöön
// lähettämällä selaimelle vastaukseksi send:in parametriä olevan merkkijonon.
// KOSKA parametri on merkkijono, asettaa Express vastauksessa Content-Type-headerin arvoksi text/html.
// Statuskoodiksi tulee oletusarvoisesti 200.
app.get('/', (request,response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(n => {
        response.json(n)
    })
})
// Yksittäisen resurssin haku:
// tehdään route,
// muistiinpanon identifioi URL, joka on muotoa /api/notes/10 lopussa oleva luku vastaa resurssin
// muistiinpanon id:tä

// voimme määritellä Expressin routejen poluille parametreja käyttämällä kaksoispistesyntaksia:
// Nyt app.get('/api/notes/:id',...) käsittelee kaikki HTTP GET -pyynnöt jotka ovat muotoa
// api/notes/JOTAIN, jossa JOTAIN on mielivaltainen merkkijono
app.get('/api/notes/:id', (request,response) => {
// Polun parametrin id arvoon päästään käsiksi pyynnön tiedot kertovan olion request kautta
    
    // Täytyy olla Number(...), muuten ei voi verrata id:tä
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

// Resurssin poisto:
// Poisto tapahtuu tekemällä HTTP DELETE pyyntö resurssin urliin
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    // jos poisto onnistuu vastataan statuskoodilla 204 "no content"
    response.status(204).end()
})

// Datan vastaanottaminen:
// Vastaanotto (serverin pääty)
// Generoidaan jokaiselle notelle oma id
const generateId = () => {
    const maxId = notes.length > 0
// notes.map(n => n.id) muodostaa taulukon, joka koostuu
// muistiinpanojen id-kentistä. Math.max palauttaa maksimin sille parametrina annetuista luvuista.
// notes.map(n => n.id) on kuitenkin taulukko joten se ei kelpaa parametriksi komennolle
// Math.max. Taulukko voidaan muuttaa yksittäisiksi luvuiksi käyttäen taulukon spreadia
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {

// Jos vastaanotetulta datalta puuttuu sisältö kentästä
// content, vastataan statuskoodilla 400 bad request
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
// Jos content kentällä on arvo, luodaan muistiinpano
// syötteen perusteella. Jos kenttä important puuttuu
// sille asetetaan oletusarvo false
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note)
    // console.log(note)
    // console.log(request.headers)
    response.json(note)
})

// Palvelimen kuunneltava portti
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is runnin' on port ${PORT}`)
})