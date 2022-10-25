while :
do 
    GPS_DATA=$(./telemetry)
    TIMESTAMP=$(date +%s)
    if [ "$GPS_DATA" = "F" ]; then
        echo "Failure to POST!"
    else
        curl -XPOST -v "https://charm.twong.dev/telemetry?key=727c8d46-50ae-457e-b3fe-b57aa87a4af5&timestamp=${TIMESTAMP}${GPS_DATA}"
    fi

    sleep 5
done
