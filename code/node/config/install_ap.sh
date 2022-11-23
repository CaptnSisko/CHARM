# Update packages
echo "-- INSTALLING PACKAGES --"
opkg update
opkg remove wpad-mini
opkg remove wpad-basic
opkg remove wpad-basic-wolfssl
opkg install batctl-full
opkg install kmod-batman-adv
opkg install wpad-mesh-wolfssl
echo "-- DONE INSTALLING PACKAGES --"

# Pull all config files
echo "-- PULLING CONFIG FILES --"
cd /etc/config/
rm *
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/wireless
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/uhttpd 
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/ucitrack
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/ubootenv
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/system
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/rpcd
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/network
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/luci
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/firewall
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/dropbear
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/telemetry-service/code/node/config/ap_config/dhcp
echo "-- DONE PULLING CONFIG FILES --"

# Disable unnecessary services
echo "-- DISABLING SERVICES --"
service dnsmasq stop && service dnsmasq disable
service firewall stop && service firewall disable
service odhcpd stop && service odhcpd disable
echo "-- DONE DISABLING SERVICES --"

# Reminder to change IP
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "REMINDER: Change Node IP"
echo "REMINDER: Change Mesh Password"
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

# TODO: Update links when all config is merged into master
# TODO: Update installation procedure for our custom OS image
# TODO: Update AP SSID, password
