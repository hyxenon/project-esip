import resolveConfig from "tailwindcss/resolveConfig";
import tailwindCOnfig from "@/tailwind.config";

const twConfig = resolveConfig(tailwindCOnfig);
const mdBreakpoint = Number.parseInt(twConfig.theme.screens.lg);

export { mdBreakpoint };
