import React from "react";
import { GeneralChart } from "@imnotteixeira/covid-19-simulator-ui-components";

const DataVisualizer = ({ metricData }) => (
    <div style={{ height: "500px" }}>
        {metricData ?
            <GeneralChart data={metricData}/>
            : <p>No Metrics yet..</p>
        }
    </div>
);


export default DataVisualizer;
