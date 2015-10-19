//var server = "http://172.19.5.174:7474";

var query = "match path = ((n)--(match)) return *;";
var server = "http://localhost:7474";
var url = "/db/data/transaction/commit"
var post_data = {"statements":[{
	"statement":query,
    "resultDataContents" : ["graph"]
	}]};


function idIndex(a, id) {
	for (var i = 0; i < a.length; i++) {
		if (a[i].id == id)
			return i;
	}
	return null;
}

function prepData(data) {
	var nodes = [],
	links = [];
	data.results[0].data.forEach(function (row) {
		row.graph.nodes.forEach(function (n) {
			if (idIndex(nodes, n.id) == null)
				nodes.push({
					id : n.id,
					label : n.labels[0],
					class : n.properties.hasOwnProperty('class') ? 
						n.properties.class : 
						n.labels[0].toLowerCase(),
					name : n.properties.name,
					title : n.properties.title,
					properties : n.properties
				});
		});
		links = links.concat(row.graph.relationships.map(function (r) {
					return {
						source : idIndex(nodes, r.startNode),
						target : idIndex(nodes, r.endNode),
						type : r.type.replace("_", " "),
						id : r.id,
						properties : r.properties
					};
				}));
	});
	graph = {
		nodes : nodes,
		links : links
	};
	return graph;
}

function getDataJson(){
	$.ajax({
	  type: "POST",
	  accept: "application/json",
	  contentType:"application/json; charset=utf-8",
	  url: server + url,
	  data: JSON.stringify(post_data),
	  success: function(data, textStatus, jqXHR){
		buildSvg(prepData(data));
		},
	  failure: function(msg){console.log("failed")}
	});
	return;
}

function getDataLocal(){
	var json = {"results":[{"columns":["match","n","path"],"data":[{"graph":{"nodes":[{"id":"0","labels":["system","website"],"properties":{"name":"Veeam Web site","location":"Cloud","code":"WWW-VC","status":"OK","vendor":"Veeam BES","description":"www.veeam.com, the main site","geo":"US","owner":"GIM"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"2","type":"HOSTED","startNode":"0","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"1","labels":["platform"],"properties":{"name":"Salesforce","location":"Cloud","code":"SFDC","status":"OK","vendor":"Salesforce","support":"salesforce@veeam.com"}},{"id":"24","labels":["system"],"properties":{"name":"Order processing","code":"SFDC-OP","status":"OK","vendor":"Veeam BES","support":"salesforce@veeam.com"}}],"relationships":[{"id":"26","type":"BUILT_ON","startNode":"24","endNode":"1","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["system","website"],"properties":{"name":"Customer Support Portal","location":"Cloud","code":"CP","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"Customer Support"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"15","type":"HOSTED","startNode":"17","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"16","labels":["system","website"],"properties":{"name":"SF Sync","location":"Cloud","code":"SFSYNC","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"14","type":"HOSTED","startNode":"16","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"15","labels":["system","website"],"properties":{"name":"Resource Library","location":"Cloud","code":"RES","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"13","type":"HOSTED","startNode":"15","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"14","labels":["system","website"],"properties":{"name":"Veeam ID","location":"Cloud","code":"SSO","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"12","type":"HOSTED","startNode":"14","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"13","labels":["system","website"],"properties":{"name":"ProPartner","location":"Cloud","code":"pp","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"11","type":"HOSTED","startNode":"13","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"8","labels":["system","website"],"properties":{"name":"Veeam Careers","location":"Cloud","code":"WWW-CAR","status":"OK","vendor":"Veeam BES","description":"careers.veeam.com, global Veeam careers web site","geo":"US","owner":"HR"}}],"relationships":[{"id":"3","type":"HOSTED","startNode":"8","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"0","labels":["system","website"],"properties":{"name":"Veeam Web site","location":"Cloud","code":"WWW-VC","status":"OK","vendor":"Veeam BES","description":"www.veeam.com, the main site","geo":"US","owner":"GIM"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"2","type":"HOSTED","startNode":"0","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"3","labels":["system"],"properties":{"name":"Auto LK","location":"On-premises","code":"AULK","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","description":"Service generates license key signatures for license bodies","geo":"Baar HQ","owner":"Head of BES"}},{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}}],"relationships":[{"id":"0","type":"HOSTED","startNode":"3","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"3","labels":["system"],"properties":{"name":"Auto LK","location":"On-premises","code":"AULK","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","description":"Service generates license key signatures for license bodies","geo":"Baar HQ","owner":"Head of BES"}},{"id":"4","labels":["process"],"properties":{"name":"License Key Generation","code":"P-LKGEN","support":"salesforce@veeam.com","description":"License keys are generated based on customer's contract information.","owner":"Head of BES"}}],"relationships":[{"id":"1","type":"SUPPORTS","startNode":"3","endNode":"4","properties":{}}]}},{"graph":{"nodes":[{"id":"3","labels":["system"],"properties":{"name":"Auto LK","location":"On-premises","code":"AULK","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","description":"Service generates license key signatures for license bodies","geo":"Baar HQ","owner":"Head of BES"}},{"id":"4","labels":["process"],"properties":{"name":"License Key Generation","code":"P-LKGEN","support":"salesforce@veeam.com","description":"License keys are generated based on customer's contract information.","owner":"Head of BES"}}],"relationships":[{"id":"1","type":"SUPPORTS","startNode":"3","endNode":"4","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"4","labels":["process"],"properties":{"name":"License Key Generation","code":"P-LKGEN","support":"salesforce@veeam.com","description":"License keys are generated based on customer's contract information.","owner":"Head of BES"}}],"relationships":[{"id":"24","type":"SUBPROCESS_OF","startNode":"4","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"21","labels":["system"],"properties":{"name":"eBridge Server","code":"EBRS","description":"Hosted application server to retrieve data from eBridge application portal and store to SF."}},{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}}],"relationships":[{"id":"20","type":"HOSTED","startNode":"21","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"20","labels":["process"],"properties":{"name":"Task Management","code":"P-TM","description":"Task and project management."}},{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}}],"relationships":[{"id":"18","type":"HOSTED","startNode":"20","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"3","labels":["system"],"properties":{"name":"Auto LK","location":"On-premises","code":"AULK","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","description":"Service generates license key signatures for license bodies","geo":"Baar HQ","owner":"Head of BES"}},{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}}],"relationships":[{"id":"0","type":"HOSTED","startNode":"3","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"6","labels":["system"],"properties":{"name":"Marketo","code":"MKTO"}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"16","type":"HOSTED","startNode":"6","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"9","type":"HOSTED","startNode":"7","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"12","labels":["process"],"properties":{"name":"Applicant Tracking","code":"P-AT","description":"Supports all steps of an applicant becoming a Veemer"}}],"relationships":[{"id":"10","type":"SUPPORTS","startNode":"7","endNode":"12","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"8","labels":["system","website"],"properties":{"name":"Veeam Careers","location":"Cloud","code":"WWW-CAR","status":"OK","vendor":"Veeam BES","description":"careers.veeam.com, global Veeam careers web site","geo":"US","owner":"HR"}}],"relationships":[{"id":"5","type":"DATA_FLOW","startNode":"7","endNode":"8","properties":{"name":"Job postings","description":"List of job postings specific to global region"}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"8","labels":["system","website"],"properties":{"name":"Veeam Careers","location":"Cloud","code":"WWW-CAR","status":"OK","vendor":"Veeam BES","description":"careers.veeam.com, global Veeam careers web site","geo":"US","owner":"HR"}}],"relationships":[{"id":"3","type":"HOSTED","startNode":"8","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"8","labels":["system","website"],"properties":{"name":"Veeam Careers","location":"Cloud","code":"WWW-CAR","status":"OK","vendor":"Veeam BES","description":"careers.veeam.com, global Veeam careers web site","geo":"US","owner":"HR"}}],"relationships":[{"id":"5","type":"DATA_FLOW","startNode":"7","endNode":"8","properties":{"name":"Job postings","description":"List of job postings specific to global region"}}]}},{"graph":{"nodes":[{"id":"22","labels":["system"],"properties":{"name":"eBridge Portal","code":"EBRP","status":"OK","vendor":"eBridge","description":"eBridge portal and EDI Gateway to process EDI transactions with distributors."}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"22","type":"HOSTED","startNode":"22","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"6","labels":["system"],"properties":{"name":"Marketo","code":"MKTO"}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"16","type":"HOSTED","startNode":"6","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"9","type":"HOSTED","startNode":"7","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"7","labels":["system"],"properties":{"name":"iCims","location":"Cloud","code":"ICIMS","status":"OK","geo":"US","owner":"Veeam HR"}},{"id":"12","labels":["process"],"properties":{"name":"Applicant Tracking","code":"P-AT","description":"Supports all steps of an applicant becoming a Veemer"}}],"relationships":[{"id":"10","type":"SUPPORTS","startNode":"7","endNode":"12","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"13","labels":["system","website"],"properties":{"name":"ProPartner","location":"Cloud","code":"pp","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"11","type":"HOSTED","startNode":"13","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"14","labels":["system","website"],"properties":{"name":"Veeam ID","location":"Cloud","code":"SSO","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"12","type":"HOSTED","startNode":"14","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}},{"id":"15","labels":["system","website"],"properties":{"name":"Resource Library","location":"Cloud","code":"RES","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}}],"relationships":[{"id":"13","type":"HOSTED","startNode":"15","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"16","labels":["system","website"],"properties":{"name":"SF Sync","location":"Cloud","code":"SFSYNC","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"GIM"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"14","type":"HOSTED","startNode":"16","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"17","labels":["system","website"],"properties":{"name":"Customer Support Portal","location":"Cloud","code":"CP","status":"OK","vendor":"Veeam BES","support":"helpdesk@veeam.com","geo":"US","owner":"Customer Support"}},{"id":"2","labels":["platform"],"properties":{"name":"Amazon Web Services","location":"Cloud","code":"AWS","status":"OK","vendor":"Amazon"}}],"relationships":[{"id":"15","type":"HOSTED","startNode":"17","endNode":"2","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}},{"id":"22","labels":["system"],"properties":{"name":"eBridge Portal","code":"EBRP","status":"OK","vendor":"eBridge","description":"eBridge portal and EDI Gateway to process EDI transactions with distributors."}}],"relationships":[{"id":"21","type":"SUPPORTS","startNode":"22","endNode":"18","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}},{"id":"21","labels":["system"],"properties":{"name":"eBridge Server","code":"EBRS","description":"Hosted application server to retrieve data from eBridge application portal and store to SF."}}],"relationships":[{"id":"19","type":"SUPPORTS","startNode":"21","endNode":"18","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}}],"relationships":[{"id":"17","type":"SUBPROCESS_OF","startNode":"18","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"24","labels":["system"],"properties":{"name":"Order processing","code":"SFDC-OP","status":"OK","vendor":"Veeam BES","support":"salesforce@veeam.com"}}],"relationships":[{"id":"27","type":"SUPPORTS","startNode":"24","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"4","labels":["process"],"properties":{"name":"License Key Generation","code":"P-LKGEN","support":"salesforce@veeam.com","description":"License keys are generated based on customer's contract information.","owner":"Head of BES"}}],"relationships":[{"id":"24","type":"SUBPROCESS_OF","startNode":"4","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}}],"relationships":[{"id":"17","type":"SUBPROCESS_OF","startNode":"18","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}},{"id":"20","labels":["process"],"properties":{"name":"Task Management","code":"P-TM","description":"Task and project management."}}],"relationships":[{"id":"18","type":"HOSTED","startNode":"20","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"21","labels":["system"],"properties":{"name":"eBridge Server","code":"EBRS","description":"Hosted application server to retrieve data from eBridge application portal and store to SF."}},{"id":"5","labels":["platform"],"properties":{"name":"Veeam Infrastructure","location":"On-premises","code":"IT","status":"OK","vendor":"Veeam IT"}}],"relationships":[{"id":"20","type":"HOSTED","startNode":"21","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}},{"id":"21","labels":["system"],"properties":{"name":"eBridge Server","code":"EBRS","description":"Hosted application server to retrieve data from eBridge application portal and store to SF."}}],"relationships":[{"id":"19","type":"SUPPORTS","startNode":"21","endNode":"18","properties":{}}]}},{"graph":{"nodes":[{"id":"22","labels":["system"],"properties":{"name":"eBridge Portal","code":"EBRP","status":"OK","vendor":"eBridge","description":"eBridge portal and EDI Gateway to process EDI transactions with distributors."}},{"id":"11","labels":["platform"],"properties":{"name":"Other Web","code":"3D"}}],"relationships":[{"id":"22","type":"HOSTED","startNode":"22","endNode":"11","properties":{}}]}},{"graph":{"nodes":[{"id":"18","labels":["process"],"properties":{"name":"Order processing via EDI","code":"P-EDI","description":"Processing purchase orders submitted via EDI."}},{"id":"22","labels":["system"],"properties":{"name":"eBridge Portal","code":"EBRP","status":"OK","vendor":"eBridge","description":"eBridge portal and EDI Gateway to process EDI transactions with distributors."}}],"relationships":[{"id":"21","type":"SUPPORTS","startNode":"22","endNode":"18","properties":{}}]}},{"graph":{"nodes":[{"id":"19","labels":["process"],"properties":{"name":"Order processing","code":"P-OP","description":"Processing purchase orders submitted by distributors."}},{"id":"24","labels":["system"],"properties":{"name":"Order processing","code":"SFDC-OP","status":"OK","vendor":"Veeam BES","support":"salesforce@veeam.com"}}],"relationships":[{"id":"27","type":"SUPPORTS","startNode":"24","endNode":"19","properties":{}}]}},{"graph":{"nodes":[{"id":"1","labels":["platform"],"properties":{"name":"Salesforce","location":"Cloud","code":"SFDC","status":"OK","vendor":"Salesforce","support":"salesforce@veeam.com"}},{"id":"24","labels":["system"],"properties":{"name":"Order processing","code":"SFDC-OP","status":"OK","vendor":"Veeam BES","support":"salesforce@veeam.com"}}],"relationships":[{"id":"26","type":"BUILT_ON","startNode":"24","endNode":"1","properties":{}}]}}]}],"errors":[]};
	buildSvg(prepData(json));
	return;
}
