# Install Onion software packages required for the telemetry script
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/liboniondebug_0.9-1_mipsel_24kc.ipk
opkg install liboniondebug_0.9-1_mipsel_24kc.ipk
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/libonioni2c_0.9-1_mipsel_24kc.ipk
opkg install libonioni2c_0.9-1_mipsel_24kc.ipk
rm libonion*