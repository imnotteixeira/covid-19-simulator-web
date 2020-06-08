import React from "react";
import { VisualizationsLayout } from "@imnotteixeira/covid-19-simulator-ui-components";


const DataVisualizer = ({ metricData, simulationState }) => (
    <VisualizationsLayout
        metricData={metricData}
        simulationState={simulationState}
    />
);


export default DataVisualizer;
