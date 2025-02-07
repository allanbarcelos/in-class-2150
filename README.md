# In Class APP

# Docker

## Build image

```shell
docker build -t <username>/<image name>:tag .
```

## Run container

```shell
# -d for running in backgroud
docker run -p <port of host>:<port exposed image> -d <username>/<image name>:tag
```