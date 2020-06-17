import * as core from "@actions/core";
import * as exec from "@actions/exec";
import getPort from "get-port";

export async function run() {
  try {
    let port = await getPort();
    core.setOutput("port", port);
    const tunnelParams: Array<string> = await getTunnelParams(port);
    const options: exec.ExecOptions = {};
    let myOutput = "";
    let myError = "";
    options.listeners = {
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
      stderr: (data: Buffer) => {
        myError += data.toString();
      },
    };

    await exec.exec("docker pull lambdatest/tunnel:latest", undefined, options);
    await exec.exec(
      "docker run -d=true --net=host lambdatest/tunnel:latest ",
      tunnelParams,
      options
    );

    await exec.exec(
      `curl -s --retry-connrefused --connect-timeout 5 --max-time 5 --retry 30 --retry-delay 2 --retry-max-time 60 http://127.0.0.1:${port}/api/v1.0/info`,
      undefined,
      options
    );
    console.log('Tunnel is running now')
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getTunnelParams(port: Number) {
  let params = [];

  if (core.getInput("user")) params.push("--user", core.getInput("user"));
  if (core.getInput("accessKey"))
    params.push("--key", core.getInput("accessKey"));
  if (core.getInput("tunnelName"))
    params.push("--tunnelName", core.getInput("tunnelName"));
  if (core.getInput("proxyHost"))
    params.push("--proxy-host", core.getInput("proxyHost"));
  if (core.getInput("proxyPort"))
    params.push("--proxy-port", core.getInput("proxyPort"));
  if (core.getInput("proxyUser"))
    params.push("--proxy-user", core.getInput("proxyUser"));
  if (core.getInput("proxyPass"))
    params.push("--proxy-pass", core.getInput("proxyPass"));
  if (core.getInput("sharedTunnel")) params.push("--shared-tunnel");
  if (core.getInput("verbose")) params.push("-v");
  params.push("--controller", "github", "--infoAPIPort", `${port}`);

  return params;
}
