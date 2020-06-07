import React from "react";
import { GeneralChart, MatrixHeatMap } from "@imnotteixeira/covid-19-simulator-ui-components";
import { Grid } from "@material-ui/core";

const DataVisualizer = ({ metricData, simulationState }) => {

    const carriersHistory = metricData
        ? metricData.find((m) => m.id === "carriers-history").data.map((s) => s.y)
        : [];

    const generalChartMetrics = metricData
        ? metricData.filter((a) => [
            "carrier-count",
            "dead-count",
            "cured-count",
            "hospitalized-count",
        ].includes(a.id))
        : [];

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
