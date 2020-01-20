const w = 1900;
const h = 900;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then(response => response.json())
  .then(data => {
    const dataset = data.data;
    let dates = [];
    let values = [];
    dataset.forEach(e => {
      dates.push(e[0]);
      values.push(e[1]);
    });
    const xScale = d3
      .scaleBand()
      .domain([100, 1000])
      .range([50, w - 100]);
    xScale.domain(
      dates.map(function(d) {
        return d;
      })
    );
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(values), d3.max(values)])
      .range([h / 2, 0]);
    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    svg.append("title").attr("id", "title");

    svg
      .append("g")
      .attr("transform", "translate(50, 10)")
      .attr("id", "y-axis")
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", "translate(0,460)")
      .attr("id", "x-axis")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", d => {
        return d[0];
      })
      .attr("data-gdp", d => {
        return d[1];
      })
      .attr("y", 435)
      .attr("x", (d, i) => {
        return i * 15;
      })
      .attr("width", 10)
      .attr("height", (d, i) => {
        return h / 2 - i * 2;
      });
  });
