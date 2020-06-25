import { init as initSimulation, simulateStep, MetricsService as SimulationMetricsService } from "@imnotteixeira/covid-19-simulator";


export const init = initSimulation;
export const simulate = simulateStep;
export const MetricsService = SimulationMetricsService;

MetricsService.subscribe("carrier-absolute-count");
MetricsService.subscribe("dead-absolute-count");
MetricsService.subscribe("cured-absolute-count");
MetricsService.subscribe("hospitalized-count");
MetricsService.subscribe("confirmed-carrier-cumulative-count");

MetricsService.subscribe("carriers-history");

MetricsService.subscribe("r0");
MetricsService.subscribe("r");

MetricsService.subscribe("positive-test-count");
MetricsService.subscribe("total-test-count");
