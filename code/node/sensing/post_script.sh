# Timestamp
TIMESTAMP=$(date +%s)
DATA_FIELDS="timestamp=${TIMESTAMP}"

# Get Node ID
ID="node-$(cat /sys/class/net/wlan0/address | cut -d":" -f5- | tr -d :)"
DATA_FIELDS="${DATA_FIELDS}&id=${ID}"

# Get sensor data from telemetry script
SENSOR_DATA=$(./telemetry)
if [ ! $? = 0 ]; then
    echo "Failed to read from sensors."
    exit
fi
DATA_FIELDS="${DATA_FIELDS}&${SENSOR_DATA}"

# Get mesh connection count 
NEIGHBORS=$(batctl bat0 n | tail -n +3 | wc -l)
DATA_FIELDS="${DATA_FIELDS}&meshCount=${NEIGHBORS}"

# Get client count for AP nodes
if [ ! "$ID" = "node-a390" ]; then
    CLIENTS=$(iw dev wlan0-1 station dump | grep -c "^Station")
    DATA_FIELDS="${DATA_FIELDS}&clientCount=${CLIENTS}"
fi

# Post the data to the backend with CURL
curl -XPOST -v "https://charm.twong.dev/telemetry?key=$(cat .key)&${DATA_FIELDS}"
