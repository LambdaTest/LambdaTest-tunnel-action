![LAMBDATEST Logo](http://labs.lambdatest.com/images/fills-copy.svg)
# LambdaTest Tunnel Action

![Test Tunnel](https://github.com/LambdaTest/lambdatest-tunnel-action/workflows/Test%20Tunnel/badge.svg)

This action seamlessly integrates LambdaTest Tunnel and
run Selenium tests on 2000+ browsers for your locally hosted or
privately hosted pages with LambdaTest Selenium Grid.

## Example usage

```yaml
jobs:
    test-tunnel:
        runs-on: ubuntu-latest
        steps:
            # ...
            -name: Start Tunnel
             uses: actions/lambdatest-tunnel-action@v1.0.0
             id: tunnel
             with:
               user: ${{ secrets.LT_EMAIL }}
               accessKey: ${{ secrets.LT_ACCESS_KEY }}
               tunnelName: "testTunnel"
            - run: npm test
              
            # Gracefully close the tunnel  
            - name: Stop Tunnel
              run: curl  -X DELETE http://127.0.0.1:${{ steps.tunnel.outputs.port }}/api/v1.0/stop

            - name: Export Tunnel Logs for debugging
              uses: actions/upload-artifact@v2
              with:
                name: tunnel_logs
                path: ${{ steps.tunnel.outputs.logFileName }}
            # ...
```

## Inputs

### `user`

**Required** LambdaTest user email.

### `accessKey`

**Required** LambdaTest user Access Key.

### `tunnelName`

**Required** Tunnel name to uniquely identify your tunnel on LambdaTest platform.

### `proxyHost`

Proxy host if connecting tunnel via proxy.

### `proxyPort`

Proxy port if connecting tunnel via proxy.

### `proxyUser`

Proxy username if connecting tunnel via proxy that has authentication enabled.

### `proxyPass`

Proxy password if connecting tunnel via proxy that has authentication enabled.

### `sharedTunnel`

Sharing tunnel among team members.

### `ingressOnly`

Routes only incoming traffic via the proxy specified.

### `dns`

Comma separated list of dns servers.

### `verbose`

Run tunnel in verbose mode.

## Outputs

### `port`

Port on which tunnel api server is running.

### `logFileName`

Name of log file of tunnel.
