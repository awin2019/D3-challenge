// @TODO: YOUR CODE HERE!

// d3.select(window).on("resize", loadChart);

function loadChart() {

    let svgArea = d3.select("#scatter").select("svg");
  
    if (!svgArea.empty()) {
      svgArea.remove();
    }

// Define SVG area dimensions
    let svgWidth = 900;
    let svgHeight = 500;
  
    let margin = {
      top: 100,
      bottom: 100,
      right: 100,
      left: 100
    };
  
    let height = svgHeight - margin.top - margin.bottom;
    let width = svgWidth - margin.left - margin.right;

    // Append SVG element
    let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    // Append group element
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv").then(function(healthData) {
        // if (error) return console.warn(error);

        console.log(healthData);

        healthData.forEach(function(data) {
          data.smokes = +data.smokes;
          data.age = +data.age;
        });

        // create scales
        let xLinearScale = d3.scaleLinear()
          .domain(d3.extent(healthData, d => d.age))
          .range([0, width]);

        let yLinearScale = d3.scaleLinear()
          .domain([8, d3.max(healthData, d => d.smokes)])
          .range([height, 0]);

        // create axes
        let xAxis = d3.axisBottom(xLinearScale);
        let yAxis = d3.axisLeft(yLinearScale);

        // append axes
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);

        chartGroup.append("g")
          .call(yAxis);

        chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("opacity", ".5");

        chartGroup.append("g").selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("font-size", "10px")
        .attr("fill", "white")

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Median Age");

        chartGroup.append("text")
        .attr("y", 0 - (margin.left / 2))
        .attr("x", 0 - (height / 2))
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .text("Smokers (%)");

    })    

};

// call function loadChart() when the browser loads
loadChart();
