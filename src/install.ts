import * as tc from "@actions/tool-cache";

// https://downloads.lambdatest.com/tunnel/windows/64bit/ltcomponent.zip
// https://downloads.lambdatest.com/tunnel/linux/64bit/ltcomponent.zip
// https://downloads.lambdatest.com/tunnel/mac/64bit/ltcomponent.zip
//
export async function downloadBinary() {

  let downloadUrl: string = `https://downloads.lambdatest.com/tunnel/${getPlatform()}/64bit/ltcomponent.zip`;
  console.log(`Downloading from ${downloadUrl}`);

}

function getPlatform() {
  switch (process.platform) {
    case "darwin":
      return "mac";
    case "win32":
      return "windows";
    default:
      return "linux";
  }
}
