// /**CONVERTS THE CHANNEL SD DAY DATA TO TENSOR AND NORMALIZES
//  */

export function convertToTensor(data) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.
    const inputOption = document.getElementById("inputNames").value
    const outputOption = document.getElementById("outputNames").value
    return tf.tidy(() => {
        // Step 1. Shuffle the data
        // shuffles all data so it is not in the order it was input, 
        // helps because the data is fed to the model in batches, removes bias
        tf.util.shuffle(data);

        // Step 2. Convert data to Tensor
        
        //x values are the inputs and y are lables from 'trainingData' (in 'run.js')
        const inputs = data.map(d => d.x);
        const labels = data.map(d => d.y)

        //tensor has a shape of [number of examples, number of features per example]
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return {
            inputs: normalizedInputs,
            labels: normalizedLabels,
            // Return the min/max bounds so we can use them later.
            inputMax,
            inputMin,
            labelMax,
            labelMin,
        }
    });
}


export default {
    convertToTensor,
}