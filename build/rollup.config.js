import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/entry.js', // Path relative to package.json
    output: {
        name: 'UIComponent',
        exports: 'named',
    },
    plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
  };
  
  // Only minify browser (iife) version
  if (argv.format === "iife") {
      config.plugins.push(uglify());
    }
  
    export default config;

  