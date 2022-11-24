# Get Node ID
ID="id=node-$(cat /sys/class/net/wlan0/address | cut -d":" -f5- | tr -d :)"
echo $ID

# Get sensor data from telemetry script
SENSOR_DATA=$(./telemetry)
echo $SENSOR_DATA

# Get mesh connection count 
NEIGHBORS="meshCount=$(batctl bat0 n | tail -n +3 | wc -l)"
echo $NEIGHBORS

# Get client count for AP nodes
if [ ! "$ID" = "node-a390" ]
then
    iw dev wlan0-1 station dump
fi

# Timestamp
TIMESTAMP=$(date +%s)

# Post the data to the backend with CURL
if [ "$SENSOR_DATA" = "F" ]; then
    echo "Failure to POST!"
else
    echo "https://charm.twong.dev/telemetry?key=727c8d46-50ae-457e-b3fe-b57aa87a4af5&timestamp=${TIMESTAMP}&${SENSOR_DATA}"
    # curl -XPOST -v "https://charm.twong.dev/telemetry?key=727c8d46-50ae-457e-b3fe-b57aa87a4af5&timestamp=${TIMESTAMP}&${SENSOR_DATA}"
fi
