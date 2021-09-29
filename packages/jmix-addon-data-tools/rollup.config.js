import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import packageJson from "./package.json";

const plugins = [
  peerDepsExternal({
    includeDependencies: true
  }),
  postcss({
    extract: false,
    modules: true,
  }),
  resolve(),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true }),
  json({compact: true})
]

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "commonjs",
      },
      {
        file: packageJson.module,
        format: "es",
      }
    ],
    plugins
  }
];
