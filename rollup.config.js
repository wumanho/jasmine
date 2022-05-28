import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import config from "./package.json"

export default {
    input: "./src/index.ts",
    output: [
        {
            format: "cjs",
            file: config.main
        },
        {
            format: "es",
            file: config.module
        }
    ],
    external:['axios'],
    plugins: [
        typescript(),
        commonjs({
            include: 'node_modules/**',
            sourceMap: false,
        })
    ]
}
