import type { Config } from "tailwindcss"
import sharedConfig from "config"

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./components/**/*.svelte"],
  presets: [sharedConfig],
}

export default config