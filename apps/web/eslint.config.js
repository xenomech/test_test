import { reactConfig } from "@workspace/eslint-config/react";
import pluginRouter from "@tanstack/eslint-plugin/plugin";

export default [...pluginRouter.configs["flat/recommended"], ...reactConfig];
