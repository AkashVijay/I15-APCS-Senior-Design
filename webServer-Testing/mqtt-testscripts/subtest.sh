#!/bin/bash

while true; do
    # Publish a test message to the Mosquitto test broker
    mosquitto_pub -h test.mosquitto.org -t "/seniorDesign/c2s" -m "1,3,5,7,9,11,30,100"
    sleep 1 # Send one message per second
done
