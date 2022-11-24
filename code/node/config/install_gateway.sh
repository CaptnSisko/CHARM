# Pull all config files
echo "-- PULLING CONFIG FILES --"
cd /etc/config/
rm *
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/wireless
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/uhttpd 
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/ucitrack
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/ubootenv
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/system
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/rpcd
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/network
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/luci
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/firewall
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/dropbear
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/gateway_config/dhcp
echo "-- DONE PULLING CONFIG FILES --"

# Install Onion software packages required for the telemetry script
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/liboniondebug_0.9-1_mipsel_24kc.ipk
opkg install liboniondebug_0.9-1_mipsel_24kc.ipk
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/libonioni2c_0.9-1_mipsel_24kc.ipk
opkg install libonioni2c_0.9-1_mipsel_24kc.ipk
rm libonion*
opkg update
opkg install curl

# Reminder to change mesh password
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "REMINDER: Change Mesh Password"
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

# TODO: Update links when all config is merged into master
# TODO: Update installation procedure for our custom OS image
# TODO: Update WWAN password, SSID for demo
