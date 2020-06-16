import * as core from "@actions/core";
import * as exec from "@actions/exec";
import getPort from "get-port";
import childProcess from 'child_process';
import * as installer from "./install";

export async function run() {
  try {
    const tunnelBinaryPath: string = await installer.downloadBinary();
    const tunnelParams: Array<string> = await getTunnelParams();
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

    const tunnelProcess = childProcess.spawn(tunnelBinaryPath, tunnelParams, {
        shell: true,
        detached: true,
      });
      tunnelProcess.stdout.on('data', data => {
       console.log(data.toString())
      });
      tunnelProcess.stderr.on('data', data => {
        console.log(data.toString())
      });
      tunnelProcess.unref()

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
  core.saveState("port", port);
  params.push("--controller", "github", "--infoAPIPort", `${port}`);

  return params;
}
