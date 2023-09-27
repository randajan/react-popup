import slib from "@randajan/simple-lib";
import { sassPlugin } from 'esbuild-sass-plugin';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

slib(
    process.env.NODE_ENV !== "dev",
    {
        minify: false,

        loader: {
            ".js": "jsx",
        },
        lib: {
            entries: ["index.js", "index.scss"],
            plugins: [
                sassPlugin({
                    transform: async (source, resolveDir) => {
                        const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 0 })]).process(source, {from: undefined})
                        return css
                    }
                })
            ],

        }
    }
)