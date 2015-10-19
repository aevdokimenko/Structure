function tooltip(d){
 
 //Update the tooltip position and value
 d3.select("#tooltip")
   .style("left", (d3.event.pageX+10) + "px")
   .style("top", (d3.event.pageY-10) + "px")
   .select("#value");
    
 //Show the tooltip
 d3.select("#tooltip").classed("hidden", false);
 return;
/*if (d.movie.length==0 && d.tv.length==0 && d.people.length==0) {
   d3.select("#tooltip").classed("hidden", true);
} 
*/
}