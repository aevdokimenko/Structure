function buildSvg(graph) {
	var svg = d3.select("body").append("svg");
	defineSvg(svg);

	// force layout setup
	var width = 800,
		height = 400;

	var force = d3.layout.force()
		.charge(-500)
		.linkDistance(80)
		.friction(0.3)
		.size([width, height]);

	var drag = force.drag()
    	.on("dragstart", dragstart);

	force.nodes(graph.nodes).links(graph.links).start();

	// render relationships as lines

	var links = svg.selectAll(".link").data(graph.links).enter()
		.append("g")
		.attr("class", "link");

	var	link_path = links.append("path")
			.attr("id", function(d){return "i" + d.id;})
		    // .style("marker-end",  "url(#end)") // Modified line 
		.on("mouseover", function(d){ mouseoverLink(d); tip.show(d);})
		.on("mouseout", function() {mouseout(); tip.hide();})


	var link_text = links.append("text")
			.attr("dy", -5)
 			.on("mouseover", mouseoverLink)
 			.on("mouseout", mouseout)
			.append("textPath")
			.attr("xlink:href", function(d){return "#i" + d.id;})
			.attr("startOffset", "50%")
			.text(function (d) {
				return d.type;
			});
			

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-15, 0])
		.html(function(d) {
			var html = "<span class='header'>" + d.label +":</span> <span class='name'>" + d.name +"</span>";
			for(key in d.properties) 
				{ if(key != "name")
					html += "<br /><span class='propertyName'>" + key + 
						":</span><span class='property'>" + d.properties[key] + "</span>"; } 
		    return html;
	  	})
  	svg.call(tip);

			// render nodes as circles, css-class from label
	var nodes = svg.selectAll(".node").data(graph.nodes)
		.enter()
		.append("g")
			.attr("class", function (d) {
				return "node " + d.class;
			})
		.call(drag);

	nodes.filter(":not(.process)")
	.append("circle")
		.attr("r",function(d){return 5 + Math.min(d.weight,8)})
		.attr("ry",5)
		.attr("width",20)
		.attr("height",16)
		.on("mouseover", function(d){ mouseoverNode(d); tip.show(d);})
		.on("mouseout", function() {mouseout(); tip.hide();})
		.on("dblclick", dblclick);

	nodes.filter(":not(.process)")
		.append("text")
		.attr("dx", function(d){ return -5 - Math.min(d.weight,8)})
		.attr("dy", function(d){ return 15 + Math.min(d.weight,8)})
		.text(function (d) {
			return d.name
		});

	nodes.filter(".process")
	.append("rect")
		.attr("rx",5)
		.attr("ry",5)
		.attr("width",20)
		.attr("height",16)
		.on("mouseover", function(d){ mouseoverNode(d); tip.show(d);})
		.on("mouseout", function() {mouseout(); tip.hide();})
		.on("dblclick", dblclick);

	nodes.filter(".process")
		.append("text")
		.attr("dx", 2)
		.attr("dy", 28)
		.text(function (d) {
			return d.name
		});

	force.on("tick", function () {
		link_path.attr("d", function(d){
			var source, target;
			source = arrowDirection(d) ? d.source : d.target;
			target = arrowDirection(d) ? d.target : d.source;
			return "M" + source.x + "," + source.y + " L"+ target.x + "," + target.y})
		.style("marker-end", function(d){return arrowDirection(d) ? "url(#end)" : null })
		.style("marker-start", function(d){return arrowDirection(d) ? null: "url(#start)" });
		nodes.attr("transform", function (d) {
			return d.class == 'process' ? "translate(" + (d.x - 10) + "," + (d.y -8) + ")" : 
			"translate(" + d.x + "," + d.y + ")"  ;
		});
	});

}

function mouseoverNode(z) {
	var neighbors = {};
	neighbors[z.index] = true;

	d3.selectAll(".link")
		.filter(function (d) {
			return (d.source == z) ||(d.target == z)})
		.each(function(d) {
			neighbors[d.target.index] = true;
			neighbors[d.source.index] = true;
			return})
		.classed("selected", true);

	d3.selectAll(".node").filter(function (d) {
			return neighbors[d.index]})
		.classed("selected", true);
}

function arrowDirection(d){
	return d.source.x <= d.target.x
}

function mouseoverLink(z){
	d3.selectAll(".node").filter(function (d) {return (z.source == d) ||(z.target == d)})
		.classed("selected", true);
	d3.select(this.parentNode).classed("selected", true);
}

function mouseout(d){
  d3.selectAll(".selected").classed("selected", false);
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

function defineSvg(svg){
	svg.attr("width", "100%").attr("height", "100%")
		.attr("pointer-events", "all")
		.append("defs").selectAll("marker")
	    .data(["end", "start"])
	  .enter()
  		.append("marker")
	    .attr("id", function(d) { return d; })
	    .attr("viewBox", "0 -5 10 10")
	    .attr("refX", function(d){return d=="end"?35:-25})
	    .attr("refY", 0)
	    .attr("markerWidth", 6)
	    .attr("markerHeight", 6)
	    .attr("orient", "auto")
	  .append("path")
	    .attr("d", function(d){
	    	return d == "end" ? 
	    		"M0,-5 L10,0 L0,5 L5,0 L0,-5 " :
	    		"M10,-5 L0,0 L10,5 L5,0 L10,-5 "})
	    .style("stroke", "#666")
	    .style("opacity", "0.9");
	// d3.selectAll("defs").append("filter")
	// 	.attr("id", "offset")
	// 	.append("feOffset")
	// 	.attr("dx", -10)
	// 	.attr("dy", -8);
}