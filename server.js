'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const redis = require("redis");
const client = redis.createClient();

const position_limit = 10000
const publisher_limit = 10000

client.on("error", function(error) {
  console.error(error);
});

let campaign_prices = new Array(100);
let position_campaigns = new Array(position_limit); 
let publisher_campaigns = new Array(publisher_limit);
var open_positions = [];
var open_publishers = [];

function find_max_campaign(position, publisher, res) {
	if (position<=10000 && publisher<=10000) {
		var all_campaigns = position_campaigns[position].concat(open_positions,publisher_campaigns[publisher],open_publishers);
		var available_campaigns = all_campaigns.filter((e, i, a) => a.indexOf(e) !== i) // Get duplicates

		var campaign = null;
		var max_cpm = 0;
		for (var i=0; i<available_campaigns.length; i++) {
			if(campaign_prices[available_campaigns[i]]>max_cpm){
				max_cpm = campaign_prices[available_campaigns[i]];
				campaign = available_campaigns[i];
			}
		}
		res.status(200).json({"price":max_cpm});
	} else {
		res.status(204).send();
	}
}

client.hvals("testcampaigns#", function(err, values){
	// We can get away with using HVALS to extract the data instead of HSCAN (incremental iterations) since we only have 79 rows
	for (var i=0; i<values.length; i++) {
		var campaign = JSON.parse(values[i]);
		campaign_prices[campaign['id']]=campaign['cpm'];
		if (campaign.hasOwnProperty('publishers')) {
			for (var j=0; j<campaign['publishers'].length; j++) {
				if (publisher_campaigns[campaign['publishers'][j]]==null){
					publisher_campaigns[campaign['publishers'][j]] = [campaign['id']];
				} else {
					publisher_campaigns[campaign['publishers'][j]].push(campaign['id']);
				}
			}
		} else {
			open_publishers.push(campaign['id']);
		}
		if (campaign.hasOwnProperty('positions')) {
			for (var k=0; k<campaign['positions'].length; k++) {
				if (position_campaigns[campaign['positions'][k]['position']]==null){
					position_campaigns[campaign['positions'][k]['position']] = [campaign['id']];
				} else {
					position_campaigns[campaign['positions'][k]['position']].push(campaign['id']);
				}
			}
		} else {
			open_positions.push(campaign['id']);
		}
	}
});

// App
const app = express();
app.get('/bid', (req, res) => {
  find_max_campaign(req.query.position, req.query.publisherid, res);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

