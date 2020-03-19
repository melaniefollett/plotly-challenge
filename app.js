//Create function to build horizontal br chart and bubble chart
function buildPlots(patientId) {

    d3.json("samples.json").then((patientData)=> {
        console.log("Unaltered Data:", patientData);
        
        // Filter sample values by id
        let patientSamples = patientData.samples.filter((patient) => patient.id === patientId);
        console.log("Specified Patient Data:", patientSamples);
  
        // Get the top 10 sample values and reverse them
        let sampleValues = patientSamples[0].sample_values;
        console.log("Sample Values:", sampleValues);

        let topTenSamples = sampleValues.slice(0, 10).reverse();
        console.log("Top 10 Sample Values:", topTenSamples);
  
        // Get top 10 OTU ids for the plot and reverse them 
        let otuIds = patientSamples[0].otu_ids;
        console.log("OTU Ids:", otuIds);
            
        let topTenOtuIds = otuIds.slice(0, 10).reverse();
        console.log("Top 10 OTU Ids:", topTenOtuIds);
        
        // Add "OTU" to Id numbers so plot is labelled correctly
        let otuIdsFormatted = topTenOtuIds.map(idNum => "OTU " + idNum);
        console.log("Formatted Top 10 OTU Ids:", otuIdsFormatted);
    
        // Get the top 10 OTU labels for the plot hovertext and reverse them
        let otuLabels = patientSamples[0].otu_labels;
        console.log("OTU Labels:", otuLabels);
        
        let topTenOtuLabels = otuLabels.slice(0, 10).reverse();
        console.log("Top 10 OTU Labels:", topTenOtuLabels);
        
        // Create the horizontal bar plot
        let trace1 = {
            x: topTenSamples,
            y: otuIdsFormatted,
            text: topTenOtuLabels,
            type: "bar",
            orientation: "h"
        };
        
        let chartData1 = [trace1];
        
        let layout1 = {
            title: "Top 10 OTU Samples",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
        Plotly.newPlot('bar', chartData1, layout1);

        //Create the bubble chart
        let trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds
            },
            text: otuLabels
  
        };
  
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        var chartData2 = [trace2];
  
        // create the bubble plot
        Plotly.newPlot("bubble", chartData2, layout2); 
    });
};

