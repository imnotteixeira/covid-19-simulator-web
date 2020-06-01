import React, { useState, useRef } from "react";
import SimulationController from "../components/HomePage/SimulationController";
import DataVisualizer from "../components/HomePage/DataVisualizer";
import InputView from "../components/HomePage/InputView";
import ProgressSteps from "../components/HomePage/InputView/ProgressSteps";
import { Dialog, Typography, Button, DialogTitle, DialogContent } from "@material-ui/core";

const HomePage = () => {
    const [simulationState, setSimulationState] = useState(null);
    const [metricData, setMetricData] = useState(null);
    const [maxSteps, setMaxSteps] = useState(null);
    const onInputReady = useRef(() => {});


    const [showInput, setShowInput] = useState(false);
    const [viewStep, setViewStep] = useState(0);

    const onSimulationReady = (simulationState) => {
        onInputReady.current = () => setSimulationState(simulationState);
        setShowInput(false);
        setViewStep(1);
    };

    const onSimulationEnded = () => {
        setViewStep(2);
    };


    return (
        <>
            <Dialog
                open={showInput}
                fullScreen
                onExited={onInputReady.current}
            >
                <DialogTitle>
                    <ProgressSteps activeStep={viewStep}/>
                </DialogTitle>
                <DialogContent>
                    <InputView
                        activeStep={viewStep}
                        setActiveStep={setViewStep}
                        onSimulationReady={onSimulationReady}
                        maxSteps={maxSteps}
                        setMaxSteps={setMaxSteps}
                    />
                </DialogContent>
            </Dialog>
            {viewStep === 0 && !showInput &&
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ProgressSteps activeStep={viewStep}/>

                    <Typography>
                        Select your initial inputs first, so you can start the simulation.
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => setShowInput(true)}
                    >
                        Open Input Dialog
                    </Button>
                </div>
            }
            {viewStep === 1 &&
                <SimulationController
                    autoStart
                    autoPlay
                    simulationState={simulationState}
                    setSimulationState={setSimulationState}
                    maxSteps={maxSteps}
                    setMetricData={setMetricData}
                    onSimulationEnded={onSimulationEnded}
                />
            }
            {viewStep > 0 &&
                <>
                    <ProgressSteps activeStep={viewStep}/>
                    <DataVisualizer simulationState={simulationState} metricData={metricData}/>
                </>
            }
        </>
    );
};

export default HomePage;
