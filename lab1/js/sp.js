function sp() {

  var self = this; // for internal d3 functions

  var spDiv = $("#sp");

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width  = spDiv.width() - margin.right - margin.left,
      height = spDiv.height() - margin.top - margin.bottom;

  //initialize color scale
  var color = ["#87ceeb", "#000000"];

  //initialize tooltip
  var tooltip = d3.select("#sp").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var x = d3.scale.linear()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var svg = d3.select("#sp").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Load data
  d3.csv("data/OECD-better-life-index-hi.csv", function (error, data) {
    self.data = data;

    //define the domain of the scatter plot axes
    x.domain([0, d3.max(data, function (d) {
      return d["Household income"];
    })]);

    y.domain([0, d3.max(data, function (d) {
      return d["Life satisfaction"];
    })]);


    draw();

  });

  function draw() {

    // Add x axis and title.
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width - 20)
      .attr("y", -6)
      .text("Household income");

    // Add y axis and title.
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(0)")
      .attr("y", 1)
      .attr("x", 3)
      .attr("dy", ".71em")
      .text("Life satisfaction");

    // Add the scatter dots.
    svg.selectAll(".dot")
      .data(self.data)
      .enter().append("circle")
      .attr("class", "dot")
      //Define the x and y coordinate data values for the dots
      .attr("cx", function (d) {
        return x(d["Household income"]);
      })
      .attr("cy", function (d) {
        return y(d["Life satisfaction"])
      })
      .attr("r", 5)
      //tooltip
      .on("mousemove", function (d) {
        tooltip.transition()
          .duration(150)
          .style("opacity", 0.85);
        tooltip.html(d["Country"])
          .style("left", (d3.event.pageX - 50) + "px")
          .style("top", (d3.event.pageY - 100) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition()
          .duration(150)
          .style("opacity", 0);
      })
      .on("click", function (d) {
        sp1.selectDot(d["Country"]);
        selFeature(d["Country"]);
      });
  }

  //method for selecting the dot from other components
  this.selectDot = function (value) {
    d3.selectAll(".dot")
      .style("fill", function(d) {
        if( value.indexOf(d["Country"]) != -1 )
          return color[0];
        else
          return color[1];
      })
  };

  //method for selecting features of other components
  function selFeature(value) {
    pc1.selectLine(value);
    //map.selectCountry(value);
  }

}




