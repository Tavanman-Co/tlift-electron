import packageJSON from '../../package.json';
import { default as envLocal } from "./env.local";
import { default as envStaging } from "./env.staging";
import { default as envMoradi } from "./env.moradi";
import { default as envProduction } from "./env.production";

export enum enumEnvNames {
    production,
    staging,
    local,
}

export const getEnvName = () => {
    return {
        "tlift-sepehr-asansor": enumEnvNames.production,
        "tlift-production": enumEnvNames.production,
        "tlift-staging": enumEnvNames.staging,
        "tlift-local": enumEnvNames.local,
    }[packageJSON.name];
}

export const getEnv = () => {
    return {
        "tlift-sepehr-asansor": envMoradi,
        "tlift-production": envProduction,
        "tlift-staging": envStaging,
        "tlift-local": envLocal,
    }[packageJSON.name];
}