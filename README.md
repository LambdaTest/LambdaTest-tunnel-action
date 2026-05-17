# Run TestMu AI (Formerly LambdaTest) Tunnel

<p align="center">
  <a href="https://www.testmuai.com/"><img src="https://img.shields.io/badge/MADE%20BY%20TestMu%20AI-000000.svg?style=for-the-badge&labelColor=000" alt="Made by TestMu AI"></a>
  <a href="https://community.testmuai.com/"><img src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&labelColor=000000" alt="Community"></a>
</p>

## Getting Started

[TestMu AI](https://www.testmuai.com/) (Formerly LambdaTest) is the world's first full-stack AI Agentic Quality Engineering platform that empowers teams to test intelligently, smarter, and ship faster. Built for scale, it offers a full-stack testing cloud with 10K+ real devices and 3,000+ browsers. With AI-native test management, MCP servers, and agent-based automation, TestMu AI supports Selenium, Appium, Playwright, and all major frameworks. 

With TestMu AI (Formerly LambdaTest), you can run Selenium tests on 3,000+ browsers for your locally hosted or privately hosted pages using the TestMu AI (Formerly LambdaTest) Tunnel GitHub Action. This action seamlessly integrates the TestMu AI Tunnel with your GitHub Actions workflows.

- [Sign up on TestMu AI](https://www.testmuai.com/register/) (Formerly LambdaTest).
- Follow the [TestMu AI Documentation](https://www.testmuai.com/support/docs/) for the full setup walkthrough.

### Prerequisites

- A TestMu AI (Formerly LambdaTest) account. Sign up here.
- Your TestMu AI Username and Access Key stored as GitHub Secrets (`LT_USERNAME` and `LT_ACCESS_KEY`).
- A GitHub Actions workflow in your repository.

### Setup

1. Clone this repository:
    ```bash
    git clone https://github.com/LambdaTest/LambdaTest-tunnel-action
    cd LambdaTest-tunnel-action
    ```

2. Add your TestMu AI credentials as GitHub Secrets in your repository settings:
    - `LT_USERNAME` — your TestMu AI username
    - `LT_ACCESS_KEY` — your TestMu AI access key

### Run tests

Add the tunnel action to your GitHub Actions workflow:

```yaml
jobs:
    test-tunnel:
        runs-on: ubuntu-latest
        steps:
            # ...
            - name: Start Tunnel
              uses: LambdaTest/LambdaTest-tunnel-action@v2
              id: tunnel
              with:
                user: ${{ secrets.LT_USERNAME }}
                accessKey: ${{ secrets.LT_ACCESS_KEY }}
                tunnelName: "testTunnel"
            - run: npm test
            - name: Export Tunnel Logs for debugging
              uses: actions/upload-artifact@v2
              with:
                name: tunnel_logs
                path: ${{ steps.tunnel.outputs.logFileName }}
            # ...
```

#### Inputs

| Input | Required | Description |
| ----- | -------- | ----------- |
| `user` | Yes | TestMu AI user email |
| `accessKey` | Yes | TestMu AI user Access Key |
| `tunnelName` | Yes | Unique tunnel name to identify your tunnel |
| `proxyHost` | No | Proxy host for tunnel via proxy |
| `proxyPort` | No | Proxy port for tunnel via proxy |
| `proxyUser` | No | Proxy username if authentication enabled |
| `proxyPass` | No | Proxy password if authentication enabled |
| `sharedTunnel` | No | Share tunnel among team members |
| `ingressOnly` | No | Route only incoming traffic via proxy |
| `egressOnly` | No | Route only outgoing traffic via proxy |
| `mitm` | No | Enable Man in the Middle mode |
| `dns` | No | Comma-separated list of DNS servers |
| `verbose` | No | Run tunnel in verbose mode |
| `loadBalanced` | No | Run tunnel in load balanced mode |
| `bypassHosts` | No | Comma-separated list of hosts to bypass |
| `basicAuth` | No | Add basicAuth to hosts (format: `https://USER:PWD@YourWebsite.com`) |

#### Outputs

| Output | Description |
| ------ | ----------- |
| `port` | Port on which tunnel API server is running |
| `logFileName` | Name of the tunnel log file |
| `usePrivateIP` | Tunnel to use system private IP for remote connections |

### Local testing with TestMu AI Tunnel

To test locally hosted apps, set up the TestMu AI tunnel. OS-specific guides:

- [Local Testing on Windows](https://www.testmuai.com/support/docs/local-testing-for-windows/)
- [Local Testing on macOS](https://www.testmuai.com/support/docs/local-testing-for-macos/)
- [Local Testing on Linux](https://www.testmuai.com/support/docs/local-testing-for-linux/)

This GitHub Action automatically manages tunnel setup and teardown within your CI pipeline. Use the `tunnelName` input to uniquely identify your tunnel session, and use `sharedTunnel: true` if multiple jobs need to share a single tunnel.

## Contributions

Contributions are welcome. Open an issue to discuss your idea before submitting a pull request. When reporting bugs, include your Node.js version, OS, and Angular CLI version.

## TestMu AI (Formerly LambdaTest) Community

Connect with testers and developers in the [TestMu AI Community](https://community.testmuai.com/). Ask questions, share what you are building, and discuss best practices in test automation and DevOps.
  
## TestMu AI (Formerly LambdaTest) Certifications

Earn free [TestMu AI Certifications](https://www.testmuai.com/certifications/) for testers, developers, and QA engineers. Validate your skills in Selenium, Cypress, Playwright, Appium, Espresso and more. Industry-recognized, shareable on LinkedIn, and built by practitioners, not marketers.

## Learning Resources by TestMu AI (Formerly LambdaTest)

Learn modern testing through tutorials, guides, videos, and weekly updates:

* [TestMu AI Blog](https://www.testmuai.com/blog/)
* [TestMu AI Learning Hub](https://www.testmuai.com/learning-hub/)
* [TestMu AI on YouTube](https://www.youtube.com/@TestMuAI)
* [TestMu AI Newsletter](https://www.testmuai.com/newsletter/)
  
## LambdaTest is Now TestMu AI

On **January 12, 2026**, [LambdaTest evolved to TestMu AI](https://www.testmuai.com/lambdatest-is-now-testmuai/), the world's first fully autonomous **Agentic AI Quality Engineering Platform**.

Same team. Same infrastructure. Same customer accounts. All existing LambdaTest logins, scripts, capabilities, and integrations continue to work without change.

ð Find the new home for [LambdaTest](https://www.testmuai.com).

### How LambdaTest Evolved into TestMu AI

In 2017, we launched LambdaTest with a simple mission: make testing fast, reliable, and accessible. As LambdaTest grew, we expanded into Test Intelligence, Visual Regression Testing, Accessibility Testing, API Testing, and Performance Testing, covering the full depth of the testing lifecycle.

As software development entered the AI era, testing had to evolve, too. We rebuilt the architecture to be AI-native from the ground up, with autonomous agents that **plan, author, execute, analyze, and optimize tests** while keeping humans in the loop. The platform integrates with your repos, CI, IDEs, and terminals, continuously learning from every code change and development signal.

That evolution earned a new name: **TestMu AI**, built for an AI-first future of quality engineering. TestMu is not a new name for us. It is the name of our annual community conference, which has brought together 100,000+ quality engineers to discuss how AI would reshape testing, long before that became an industry norm. 

What started as a high-performance cloud testing platform has transformed into an AI-native, multi-agent system powering a connected, end-to-end quality layer. That evolution defined a new identity: LambdaTest evolved into TestMu AI, built for an AI-first future of quality engineering.

## Support

Got a question? Email [support@testmuai.com](mailto:support@testmuai.com) or chat with us 24x7 from our chat portal.
