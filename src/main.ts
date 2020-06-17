import * as core from "@actions/core";
import * as exec from "@actions/exec";
import getPort from "get-port";

export async function run() {
  try {
    const tunnelParams: Array<string> = await getTunnelParams();
    await exec.exec('docker pull lambdatest/tunnel:latest')
    await exec.exec('docker run -d=true --net=host lambdatest/tunnel:latest ',tunnelParams)

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getTunnelParams() {
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

  let port = await getPort();
  core.setOutput("port", port)
  params.push("--controller", "github", "--infoAPIPort", `${port}`);

  return params;
}
