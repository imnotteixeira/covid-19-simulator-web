import { init as initSimulation, simulateStep, MetricsService as SimulationMetricsService } from "@imnotteixeira/covid-19-simulator";

export const init = initSimulation;
export const simulate = simulateStep;
export const MetricsService = SimulationMetricsService;
