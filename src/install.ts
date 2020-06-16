import * as tc from "@actions/tool-cache";
import os from "os";
import fs from "fs";
import path from "path";
import * as exec from "@actions/exec";

export async function downloadBinary() {
  let cachedPath: string;

  try {
    let downloadUrl: string = `https://downloads.lambdatest.com/tunnel/${getPlatform()}/64bit/ltcomponent.zip`;
    console.log(`Downloading from ${downloadUrl}`);

    const tunnelZip = await tc.downloadTool(downloadUrl);
    const tunnelExtracted = await tc.extractZip(tunnelZip);

    cachedPath = await tc.cacheFile(
      path.join(tunnelExtracted, "ltcomponent"),
      "LT",
      "tunnel",
      "v2"
    );

    fs.chmodSync(path.join(cachedPath,"LT"), "0755");

  } catch (error) {
    throw new Error(`Failed to download tunnel: ${error}`);
  }

  return path.join(cachedPath,"LT");
}

function getPlatform() {
  switch (os.platform()) {
    case "darwin":
      return "mac";
    case "win32":
      return "windows";
    default:
      return "linux";
  }
}
