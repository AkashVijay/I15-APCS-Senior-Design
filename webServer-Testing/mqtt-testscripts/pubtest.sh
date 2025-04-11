#!/bin/bash

while true; do
    mosquitto_sub -h broker.hivemq.com -t  "/seniorDesign/s2c"
done


