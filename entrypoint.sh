#!/bin/bash

if [ -z "${1}" ]; then
        params+=" --user ${1}"
fi

if [ -z "${2}" ]; then
        params+=" --key ${2}"
fi

if [ -z "${3}" ]; then
        params+=" --tunnelName ${3}"
fi

if [ -z "${4}" ]; then
        params+=" --proxy-host ${4}"
fi

if [ -z "${5}" ]; then
        params+=" --proxy-port ${5}"
fi

if [ -z "${6}" ]; then
        params+=" --proxy-user ${6}"
fi

if [ -z "${7}" ]; then
        params+=" --proxy-pass ${7}"
fi

if [ -z "${8}" ]; then
        params+=" --shared-tunnel"
fi

if [ -z "${9}" ]; then
        params+=" -v"
fi

read lowerport upperport < /proc/sys/net/ipv4/ip_local_port_range
port=$lowerport
while [  $port -lt $upperport ]; do
    ss -lpn | grep -q ":$port " || break
    let port=port+1 
done

params+=" --controller github --infoAPIPort $port"

ls -a
echo "LT $params"
# Run tunnel binary
./LT $params &

# Waits for the tunnel connection to be established with the tunnel server
curl  --silent --retry-connrefused --connect-timeout 5 --max-time 5 --retry 30 --retry-delay 2 --retry-max-time 60 http://127.0.0.1:$port/api/v1.0/info 2>&1 > /dev/null
