import { Builder } from "./builder/builder";

const buildCtl = new Builder();

buildCtl.addEnv("tlift-local", "Tlift Local");
buildCtl.addEnv("tlift-staging", "Tlift Staging");
buildCtl.addEnv("tlift-production", "Tlift");
buildCtl.addEnv("tlift-sepehr-asansor", "Tlift Sepehr Asansor");

buildCtl.run();