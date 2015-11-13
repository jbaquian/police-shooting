var drawMap = function(){
	var map = L.map('map').setView([38, -99], 4);
	var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    layer.addTo(map);
    getData();

}

var getData = function(){
	$.get('data/response.json', customBuild)
}

var customBuild = function(data){
	var dataSet = $.parseJSON(data);

	var maleHit = 0;
	var maleKilled = 0;
	var femaleHit = 0;
	var femaleKilled = 0;

	var male = L.layerGroup([]);
	var female = L.layerGroup([]);

	var layerId = {
		"male":male,
		"female":female
	}

	dataSet.map(function(shooting){
		var x;
		var gender = shooting["Victim's Gender"];
		var outcome = shooting["Hit or Killed"];
		var circleColor;

		if (outcome == "Hit") {
			circleColor = "red";
		} else {
			circleColor = "black";
		}

		var circle = new L.circleMarker([shooting.lat, shooting.lng], {color :  circleColor});
		console.log(circle);

		if(gender == "Male"){
			if(outcome == "Hit"){
				malesHit++;
			} else {
				malesKilled++;
			}
		} else {
			if(outcome =="Hit") {
				femaleHit++;
			} else {
				femaleKilled++;
			}
		}
		console.log(maleHit);
		circle.bindPopup(shooting.Summary);
		circle.addTo(x)
	})

	$("#male").append("<td>" + maleHit +"</td>")
	$("#male").append("<td>" + maleKilled +"</td>")
	$("#female").append("<td>" + femaleHit +"</td>")
	$("#female").append("<td>" + femaleKilled +"</td>")

	male.addTo(map);
	female.addTo(map);

	var layers = {"Male": male, "Female":female}

	L.control.layers(null, layers).addTo(map);
}