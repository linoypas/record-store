

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: '/statistics/genresGraph',
    }).done(function(res){
        drawPieChart(res)

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
    
});


$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: '/statistics/pricesGraph',
    }).done(function(res){
        drawHistogram(res)

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
    })
    
});




function drawPieChart(data){
    const width = 550;
    const height = 550;
    const margin = 80;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#pieChart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet2);

    const pie = d3.pie()
      .value(function(d) {return d.value; })
    const data_ready = pie(d3.entries(data));

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const totalProducts = calcTotalProducts(data);

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return( (d.data.value/totalProducts)*100).toFixed(2) })
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 15);

    svg.
       selectAll("mydots")
      .data(Object.keys(data))
      .enter()
      .append("circle")
        .attr("cx", 200)
        .attr("cy", function(d,i){ return -200 + i*25}) 
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})
    
    // Add one dot in the legend for each name.
    svg
      .selectAll("mylabels")
      .data(Object.keys(data))
      .enter()
      .append("text")
        .attr("x", 220)
        .attr("y", function(d,i){ return -200 + i*25}) 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "right")
        .style("alignment-baseline", "middle")

}

function calcTotalProducts(data){
     let totalProducts = 0;
     for(let key in data){
        totalProducts = totalProducts + data[key];
     };
     return totalProducts;
}


function drawHistogram (data){
    const margin = {
          top: 10,
          right: 30,
          bottom: 30,
          left: 40
        },
        width = 550 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;
      
      const svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
      
      const x = d3.scaleLinear()
        .domain([0,  d3.max(data, function(d) { return +d.price })]) 
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      
      const histogram = d3.histogram()
        .value(function(d) {
          return d.price; 
        }) 
        .domain(x.domain()) 
        .thresholds(x.ticks(70)); 
      
      const bins = histogram(data);

      const y = d3.scaleLinear()
        .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) {
        return d.length;
      })]); 
      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
          return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function(d) {
          return height - y(d.length);
        })
        .style("fill", "#69b3a2")
}

