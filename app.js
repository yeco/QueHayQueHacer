var _ = require('underscore'),
    request = require('request'),
    qs = require('querystring'),
    express = require('express'),
    app = express()

var intros = [
    'Deberíamos ir a',
    'Maaae.',
    'Y si vamos a',
    'Que tal',
    'Tal vez',
    'GET ME SOME FUCKING',
    'Sabe qué sería bueno?',
    'Hoy estamos como para',
    'Hmm... y',
    'Hace rato no vamos a',
    'Creo que Fede quiere ir a',
    'Creo que Adrian quiere ir a',
    'Creo que Yeco quiere ir a'
];

var venues;

(function() {
    var query = qs.stringify({
        client_id: process.env.FOURSQUARE_CLIENT_ID,
        client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
        v: '20131103'
    });

    var listID = '55396bc5498e18351b0a106c';

    request('https://api.foursquare.com/v2/lists/' + listID + '/?' + query, function(error, response, body) {
        venues = _.map(JSON.parse(body).response.list.listItems.items, function(item) {
            return item.venue.name;
        });
    });
}());

app.use(express.static('public'));

app.get('/random', function(request, response) {
    response.json({
        intro: _.sample(intros),
        venue: _.sample(venues)
    });
});

app.get('/', function(request, response) {
    response.render('index.html');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Listening on port " + port);
});