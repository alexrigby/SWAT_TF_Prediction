import { run } from "./modules/run.js";
import {getData, getOptionNames } from "./modules/getData.js"

await getOptionNames('data/basin_wb_day.csv', "inputNames")
await getOptionNames('data/channel_sd_day.csv', "outputNames")

// document.addEventListener('DOMContentLoaded', await getData());
document.getElementById("run").addEventListener("click", () => {
   
    run()
})
// document.getElementById("outputNames").addEventListener("change", run())











