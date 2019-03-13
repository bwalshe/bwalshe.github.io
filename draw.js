function signalId(i) {
    return `signal_${i}`
}
function drawSignals() {
    let svgSelection = d3.select("svg")
    const width = svgSelection.node().getBoundingClientRect().width
    const height = svgSelection.node().getBoundingClientRect().height
    const head = 50
    const workingHeight = height - head

    svgSelection.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "black");

    const signals = d3.text("signals.csv", (lines) => {
        const parsedLines = d3.csvParseRows(lines);
        const yStepSize = workingHeight /(parsedLines.length + 1);
        const xStepSize = width / (parsedLines[0].length - 1);
        svgSelection.selectAll("g")
            .data(parsedLines)
            .enter()
            .append("svg:g")
            .attr("id", (_, i) => signalId(i))
            .attr("fill","black")
            .attr("transform", (d, i) => 
                `translate(0,  ${head + (i + 1 ) * yStepSize}) scale(1,-1)`
            )

        svgSelection.selectAll("g")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", yStepSize)
            .attr("y", -yStepSize + 1)
            .attr("stroke", "none")

        svgSelection.selectAll("g")
            .append("polyline")
            .attr("points", (d, _) => 
                d.map((y, i) => `${i * xStepSize}, ${y * 10 * yStepSize}`).join(" ")
            )
            .attr("stroke", "white")
            .attr("stroke-width", "2")
        
        svgSelection.selectAll("g")
            .on("mouseover", (_, i) => {
                d3.select("#" + signalId(i))
                    .transition()
                    .duration(50)
                    .style("fill", "grey")
            })
            .on("mouseout", (_, i) => {
                d3.select('#' + signalId(i))
                    .transition()
                    .duration(300)
                    .style("fill", "black")
            })
   
    })
}