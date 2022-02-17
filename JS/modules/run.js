//COMPILES ALL FUNCTIONS TO INITIATE THE MODEL RUNNING AND DISPLAY RESULTS


import { getData } from "./getData.js"
import { createModel } from "./createModel.js"
import { convertToTensor } from "./converToTensor.js"
import { trainModel } from "./trainModel.js"
import { testModel } from "./testModel.js"


export async function run() {
    // Loads the cleaned data
const trainingData = await getData();
  
const inputOption = document.getElementById("outputNames").value
    //adds the values to an object (x and y) to plot
    const values = trainingData.map(d => ({
        x: d[inputOption],
        y: d.flow,
    }));
    
    tfvis.visor().surface({name:"SWAT", styles:{width:1000}})
    // renders a scatterplot of the origional trining data
    tfvis.render.scatterplot(
        { name: `training data` },
        { values },
        {
            xLabel: `${inputOption}`,
            yLabel: 'Flow',
            height: 300
        }
    );

    // Create the model
    const model = createModel();

    //modelSummary gives a table to the layers in the model
    tfvis.show.modelSummary({ name: 'Model Summary' }, model);
    // Convert the data to a form we can use for training.
    const tensorTrainingData = convertToTensor(trainingData);
    
    //extracts inputs and lables created in convertToTensor function
    const { inputs, labels } = tensorTrainingData;

    // Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training');

    // Make some predictions using the model and compare them to the
    // original data
    testModel(model, trainingData, tensorTrainingData);
}

export default {
    run,
}