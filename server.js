/*
==========================================================
This Node.js Service retrives NAV History Data (JSON)
From https://api.mfapi.in/mf/ and Parse the Latest NAV

To run in local:
npm install express ejs node-fetch
node server

Need to pass the Mutual Fund Code of AMFI from https://www.mfapi.in/

To Check Latest NAV of ICICI Prudential 
Technology Fund Direct Plan (Growth Option):
http://localhost:8080/mf/120594

Live at Heroku:
https://mf-service.herokuapp.com/mf/120594
==========================================================
*/
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.set('view engine', 'ejs');

app.get("/mf/:id", function(req, res) {
	let settings = { 
		method: "GET",
		headers: {'Content-Type': 'application/json'} 
	};
	fetch('https://api.mfapi.in/mf/'+req.params.id, settings)
		.then(response => response.json())
		.then((json) => { res.send(json['data'][0].nav); })
		.catch(err => {	res.send("0") });
});

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("HTTPS Server Listening at http://%s:%s", host, port)	
});


/*	
==========================================================
Async Approach-1 (Not Working)
==========================================================
	const get_data = async url => {
		try {
			const response = await fetch(url, settings);
			const json = await response.json();
			res.send(json['data'][0].nav);
		} catch (error) {
			console.log(error);
		}
	};

==========================================================
Async Approach-2 (Not Working)
==========================================================
	(async () => {
		try {
			const response = fetch('https://api.mfapi.in/mf/'+req.params.id, settings);
			const json = await response.json();
    		res.send(json['data'][0].nav);
		} catch (err) {
			console.log(err.message); 
		}
	})();
*/