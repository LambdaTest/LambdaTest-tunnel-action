import * as core from "@actions/core";
import crypto from "crypto";
import getPort from "get-port";
import childProcess from "child_process";

export async function run() {
  try {
    let port: Number = await getPort();
    let name: string = crypto.randomBytes(10).toString("hex");
    core.setOutput("port", port);
    core.setOutput("logFileName", name);
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

    let dockerLogsCmd: string = `docker logs -f ${name} > ${name} 2>&1 &`;
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
  if (core.getInput("dns")) {
    params.push("--dns", `"${core.getInput("dns")}"`);
  }
  if (core.getInput("verbose")) {
    params.push("-v");
  }

  params.push("--controller", "github", "--infoAPIPort", `${port}`);
  return params;
}
