const core = require("@actions/core");
const exec = require("@actions/exec");
const getPort = require("get-port");

function getTunnelParams() {
    let params = [];

    if (core.getInput("user")) 
        params.push("--user", core.getInput("user"));
    if (core.getInput("accessKey"))
        params.push("--key", core.getInput("accessKey"));
    if (core.getInput("tunnelName"))
        params.push("--tunnelNamer", core.getInput("tunnelName"));
    if (core.getInput("proxyHost"))
        params.push("--proxy-host", core.getInput("proxyHost"));
    if (core.getInput("proxyPort"))
        params.push("--proxy-port", core.getInput("proxyPort"));
    if (core.getInput("proxyUser"))
        params.push("--proxy-user", core.getInput("proxyUser"));
    if (core.getInput("proxyPass"))
        params.push("--proxy-pass", core.getInput("proxyPass"));
    if (core.getInput("sharedTunnel")) 
        params.push("--shared-tunnel");
    if (core.getInput("verbose")) 
        params.push("-v");

    let port = getPort();
    core.saveState("port", port);
    params.push("--controller", "github", "--infoAPIPort", port);

    return params;
}
try {
    // `who-to-greet` input defined in action metadata file
    const tunnelParams = getTunnelParams();

    exec.exec('/')

    // Get the JSON webhook payload for the event that triggered the workflow
} catch (error) {
    core.setFailed(error.message);
}

// const options = {};
// options.listeners = {
//   stdout: (data: Buffer) => {
//     myOutput += data.toString();
//   },
//   stderr: (data: Buffer) => {
//     myError += data.toString();
//   }
// };
// options.cwd = './lib';

// await exec.exec('node', ['index.js', 'foo=bar'], options);