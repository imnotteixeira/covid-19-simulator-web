import React from "react";
import { GeneralChart, MatrixHeatMap } from "@imnotteixeira/covid-19-simulator-ui-components";
import { Grid } from "@material-ui/core";

const GENERAL_CHART_METRIC_IDS = [
    "carrier-count",
    "dead-count",
    "cured-count",
    "hospitalized-count",
];

const DataVisualizer = ({ metricData, simulationState }) => {

    const carriersHistory = metricData ? metricData["carriers-history"] : [];

    const printCarrierHistory = (matrix) => {
        let buffer = "";
        matrix.forEach((v) => {
            buffer += v.toString();
            if (buffer.length === Math.round(Math.sqrt(matrix.length))) {
                console.log(buffer);
                buffer = "";
            }
        });
    };

    if (carriersHistory.length > 0 && simulationState.ended) printCarrierHistory(carriersHistory[0]);

    const generalChartMetrics = [];
    if (metricData)
        Object.keys(metricData).forEach((metricId) => {
            if (GENERAL_CHART_METRIC_IDS.includes(metricId)) {
                generalChartMetrics.push({
                    id: metricId,
                    data: metricData[metricId].map((val, i) => ({ x: i, y: val })),
                });
            }
        });

    return (
        <Grid container style={{ height: "500px" }}>
            {metricData ?
                <>
                    <Grid item xs={12} md={6} style={{ height: "500px" }}>
                        <GeneralChart data={generalChartMetrics}/>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ height: "500px" }}>
                        {carriersHistory.length > 0 &&
                        <MatrixHeatMap
                            values={simulationState.ended ?
                                carriersHistory
                                : carriersHistory[carriersHistory.length - 1]
                            }
                            showLatestStep={!simulationState.ended}
                        />
                        }
                    </Grid>
                </>
                : <p>No Metrics yet..</p>
            }
        </Grid>
    );
};


export default DataVisualizer;
