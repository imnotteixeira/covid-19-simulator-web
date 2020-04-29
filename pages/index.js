import { useRouter } from "next/router";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { ResponsiveLineCanvas } from "@nivo/line";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// This gets called on every request
export const getServerSideProps = () => {
    // Fetch data from external API

    const data = { requestedAt: Date.now() };

    // Pass data to the page via props
    return { props: { data } };
};
const socket = io();

const SimulationState = Object.freeze({
    STOPPED: "STOPPED",
    RUNNING: "RUNNING",
});

const graph_data = [
    {
        "id": "japan",
        "color": "hsl(53, 70%, 50%)",
        "data": [
            {
                "x": 0,
                "y": 27,
            },
            {
                "x": 1,
                "y": 209,
            },
        ],
    },
    {
        "id": "morocco",
        "color": "hsl(3, 20%, 15%)",
        "data": [
            {
                "x": 0,
                "y": 57,
            },
            {
                "x": 1,
                "y": 9,
            },
        ],
    },
];

const MyResponsiveLine = ({ data }) => (
    <ResponsiveLineCanvas
        data={data}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ type: "linear", min: 0, max: "auto"  }}
        yScale={{ type: "linear", stacked: false, min: 0, max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time (Days)",
            legendOffset: 36,
            legendPosition: "middle",
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Individuals",
            legendOffset: -40,
            legendPosition: "middle",
        }}
        enableGridX={false}
        colors={{ scheme: "nivo" }}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={false}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        // gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        // gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
            {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 12,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
    />
);

const App = ({ data }) => {
    const router = useRouter();
    const { name } = router.query;

    const [elapsedTime, setElapsedTime] = useState(0);
    const [simulationState, setSimulationState] = useState(SimulationState.STOPPED);
    const [simulationData, setSimulationData] = useState(null);
    const [metricData, setMetricData] = useState(null);

    useEffect(() => {
        socket.on("step-update", (data) => {
            setSimulationData(data);
        });
    }, [socket]);
    useEffect(() => {
        socket.on("metric-update", (data) => {
            setMetricData(data);
        });
    }, [socket]);
    useEffect(() => {
        socket.on("simulation-end", ({ elapsedTime }) => {
            setSimulationState(SimulationState.STOPPED);
            setElapsedTime(elapsedTime);
        });
    }, [socket]);

    const init = () => {
        setSimulationData(null);
        setMetricData(null);
        setElapsedTime(0);
        setSimulationState(SimulationState.RUNNING);
        socket.emit("init", {
            maxSteps: 1000,
            populationSize: 82369,
            spreadRadius: 3,
            hygieneDisregard: 0.8,
            hospitalEffectiveness: 1,
            hospitalCapacity: 100,
            incubationPeriod: 6,
            infectionPeriod: 41,

        });
    };

    return (
        <div>
            <p>
                {`Hello, ${name}!`}
            </p>
            <p>
                {`Requested at: ${data.requestedAt}`}
            </p>
            <button
                disabled={simulationState === SimulationState.RUNNING}
                onClick={init}
            >
                Init
            </button>
            <p>
                {`Elapsed Time: ${elapsedTime} ms`}
            </p>

            {
                metricData ?

                    <div style={{ height: "500px" }}>
                        <MyResponsiveLine data={metricData}/>
                    </div>
                    : <p>No metrics available yet...</p>
            }

        </div>
    );
};

export default App;
