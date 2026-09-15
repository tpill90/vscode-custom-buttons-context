// TODO this is so absurdly complicated for no reason.
// TODO enable minification/prod build?
// TODO what is the performance impact of having a 10mb vscode extension
// TODO look into vite

const esbuild = require("esbuild");
const isWatch = process.argv.includes("--watch");

const options = {
    entryPoints: ["src/extension.ts"],
    bundle: true,
    outfile: "out/extension.js",
    external: ["vscode"],
    format: "cjs",
    platform: "node",
    sourcemap: true,
    minify: false
};

async function build()
{
    if (!isWatch)
    {
        await esbuild.build(options);
        console.log("Build complete.");
        return;
    }

    const context = await esbuild.context(options);
    await context.watch();
    console.log("Watching for changes...");
}
build().catch(() => process.exit(1));