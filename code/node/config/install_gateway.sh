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

# Reminder to change mesh password
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "REMINDER: Change Mesh Password"
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

# TODO: Update links when all config is merged into master
# TODO: Update installation procedure for our custom OS image
# TODO: Update WWAN password, SSID for demo
