#!/bin/bash

while true; do
  # Publish a test message to the broker
  mosquitto_pub -h broker.hivemq.com -t "/seniorDesign/c2s" -m "freaky mesg"
  sleep 1  # Add a 5-second delay to avoid flooding the broker
done

