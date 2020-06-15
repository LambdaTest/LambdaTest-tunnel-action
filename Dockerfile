FROM lambdatest/tunnel:latest

LABEL version="0.0.0"
LABEL repository="http://github.com/LambdaTest/lambdatest-tunnel-actions"
LABEL homepage="http://github.com/LambdaTest/lambdatest-tunnel-actions"
LABEL maintainer="Rishabh Arya <rishabha@lambdatest.com.com>"
LABEL "com.github.actions.name"="LambdaTest Tunnel Action"
LABEL "com.github.actions.description"="A GitHub action to launch LambdaTest Tunnel"

RUN apt-get install -y curl iproute2

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]