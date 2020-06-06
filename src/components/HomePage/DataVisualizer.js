import React from "react";
import { GeneralChart, MatrixHeatMap } from "@imnotteixeira/covid-19-simulator-ui-components";

const DataVisualizer = ({ metricData }) => {

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
        <div style={{ height: "500px" }}>
            {metricData ?
                <>
                    <GeneralChart data={generalChartMetrics}/>
                    {carriersHistory.length > 0 &&
                        <MatrixHeatMap values={carriersHistory} />
                    }
                </>
                : <p>No Metrics yet..</p>
            }
        </div>);
};


export default DataVisualizer;
