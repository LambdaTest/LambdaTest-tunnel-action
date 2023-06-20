import * as core from "@actions/core";
import crypto from "crypto";
import getPort from "get-port";
import childProcess from "child_process";

/**
 * Name of state that stores port number of the tunnel
 */
const STATE_PORT = "port";

export async function run() {
  // if state is already setup, then kick off the cleanup
  if (!!core.getState(STATE_PORT)) {
    cleanup();
  } else {
    // start the tunnel
    launch();
  }
}

async function launch() {
  try {
    let port: Number = await getPort();
    let name: string = crypto.randomBytes(10).toString("hex");
    let logFileName = name + ".log";
    core.setOutput("port", port);
    core.setOutput("logFileName", logFileName);
    core.saveState(STATE_PORT, port);
    let params: string = (await getTunnelParams(port)).join(" ");

    let dockerPullCmd: string = "docker pull lambdatest/tunnel:latest";
    core.info(dockerPullCmd);
    childProcess.execSync(dockerPullCmd, {
      stdio: "inherit",
    });

    let dockerRunCmd: string = `docker run --name=${name} -d=true --net=host lambdatest/tunnel:latest ${params}`;
    core.info(dockerRunCmd);
    childProcess.execSync(dockerRunCmd, {
      stdio: "inherit",
    });

    let checkTunnelCmd: string = `curl -s --retry-connrefused --connect-timeout 5 --max-time 5 --retry 30 --retry-delay 2 --retry-max-time 60 http://127.0.0.1:${port}/api/v1.0/info`;
    core.info(checkTunnelCmd);
    childProcess.execSync(checkTunnelCmd, { stdio: "inherit" });

    let dockerLogsCmd: string = `docker logs -f ${name} > ${logFileName} 2>&1 &`;
    core.info(dockerLogsCmd);
    childProcess.execSync(dockerLogsCmd, {
      stdio: "inherit",
    });

    core.info("Tunnel is running now");
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

async function getTunnelParams(port: Number) {
  let params = [];

  if (core.getInput("user")) {
    params.push("--user", core.getInput("user"));
  }
  if (core.getInput("accessKey")) {
    params.push("--key", core.getInput("accessKey"));
  }
  if (core.getInput("tunnelName")) {
    params.push("--tunnelName", `"${core.getInput("tunnelName")}"`);
  }
  if (core.getInput("proxyHost")) {
    params.push("--proxy-host", `"${core.getInput("proxyHost")}"`);
  }
  if (core.getInput("proxyPort")) {
    params.push("--proxy-port", `"${core.getInput("proxyPort")}"`);
  }
  if (core.getInput("proxyUser")) {
    params.push("--proxy-user", `"${core.getInput("proxyUser")}"`);
  }
  if (core.getInput("proxyPass")) {
    params.push("--proxy-pass", `"${core.getInput("proxyPass")}"`);
  }
  if (core.getInput("sharedTunnel")) {
    params.push("--shared-tunnel");
  }
  if (core.getInput("ingressOnly")) {
    params.push("--ingress-only");
  }
  if (core.getInput("egressOnly")) {
    params.push("--egress-only");
  }
  if (core.getInput("mitm")) {
    params.push("--mitm");
  }
  if (core.getInput("dns")) {
    params.push("--dns", `"${core.getInput("dns")}"`);
  }
  if (core.getInput("verbose")) {
    params.push("-v");
  }
  if (core.getInput("loadBalanced")) {
    params.push("--load-balanced");
  }
  if (core.getInput("bypassHosts")) {
    params.push("--bypassHosts", `"${core.getInput("bypassHosts")}"`);
  }
  if (core.getInput("basic-auth")){
    params.push("--basic-auth", `"${core.getInput("basicAuth")}"`);
  }
  params.push("--controller", "github", "--infoAPIPort", `${port}`);
  return params;
}

async function cleanup() {
  let port = core.getState(STATE_PORT);
  let stopTunnelCmd: string = `curl -X DELETE http://127.0.0.1:${port}/api/v1.0/stop`;
  core.info("Gracefully close the tunnel:");
  core.info(stopTunnelCmd);
  childProcess.execSync(stopTunnelCmd, { stdio: "inherit" });
}
run();
