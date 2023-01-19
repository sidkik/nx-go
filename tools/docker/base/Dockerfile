FROM node:17-buster AS BUILDER
ARG GITHUB_TOKEN

WORKDIR /workspace

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y git make tar 

RUN wget https://dl.google.com/go/go1.19.4.linux-amd64.tar.gz && tar -C /usr/local -xzf go1.19.4.linux-amd64.tar.gz

ENV PATH /usr/local/go/bin:$PATH
ENV GOPATH /usr/local/go

RUN go install gotest.tools/gotestsum@latest

COPY *.json .

## delete the nx cache with contains sockets - kaniko ingores and then fails when it can't find
RUN echo @sidkik:registry=https://gitlab.com/api/v4/projects/38581281/packages/npm/ >> .npmrc && npm i && npm i @sidkik/nx-go && rm -rf /workspace/node_modules/.cache/nx/d

FROM node:17-buster-slim

WORKDIR /workspace
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y git wget curl && rm -rf /var/lib/apt/lists/*
COPY --from=BUILDER /workspace/node_modules ./node_modules
COPY --from=BUILDER /usr/local/go /usr/local/go

ENV PATH /usr/local/go/bin:$PATH
ENV GOPATH /usr/local/go
ENV CGO_ENABLED=0

ENTRYPOINT ["/bin/bash"]
