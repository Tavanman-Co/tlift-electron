import { Builder } from "./builder/builder";

const buildCtl = new Builder();

// buildCtl.addEnv("tlift-sepehr-asansor", "Tlift Sepehr Asansor");
buildCtl.addEnv("tlift-production", "TLift");

buildCtl.run();