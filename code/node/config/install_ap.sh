# Pull all config files
echo "-- PULLING CONFIG FILES --"
cd /etc/config/
rm *
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/wireless
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/uhttpd 
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/ucitrack
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/ubootenv
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/system
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/rpcd
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/network
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/luci
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/firewall
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/dropbear
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/config/ap_config/dhcp
echo "-- DONE PULLING CONFIG FILES --"

# Directory for all the scripts
cd /root

# Install Onion software packages required for the telemetry script
echo "-- INSTALLING TELEMETRY PACKAGES --"
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/liboniondebug_0.9-1_mipsel_24kc.ipk
opkg install liboniondebug_0.9-1_mipsel_24kc.ipk
wget http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/libonioni2c_0.9-1_mipsel_24kc.ipk
opkg install libonioni2c_0.9-1_mipsel_24kc.ipk
rm libonion*
opkg update
opkg install curl
echo "-- DONE INSTALLING TELEMETRY PACKAGES --"

# Download the telemetry script
echo "-- DOWNLOADING TELEMETRY SCRIPTS --"
wget https://github.com/CaptnSisko/CHARM/raw/master/code/node/sensing/telemetry
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/sensing/adc_params.txt
wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/sensing/post_script.sh
echo "-- DONE DOWNLOADING TELEMETRY SCRIPTS --"

# Configure the telemetry script to run on startup
echo "-- CONFIGURING TELEMETRY TO RUN ON START --"
chmod +x ./telemetry
chmod +x ./post_script.sh
echo "/root/post_script.sh &" > /etc/rc.local
echo "exit 0" >> /etc/rc.local
echo "-- DONE CONFIGURING TELEMETRY TO RUN ON START --"

# Disable unnecessary services
echo "-- DISABLING SERVICES --"
service dnsmasq stop && service dnsmasq disable
service firewall stop && service firewall disable
service odhcpd stop && service odhcpd disable
echo "-- DONE DISABLING SERVICES --"

# Reminder to change IP
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "REMINDER: Populate /root/.key"
echo "REMINDER: Change Node IP"
echo "REMINDER: Change Mesh Password"
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
