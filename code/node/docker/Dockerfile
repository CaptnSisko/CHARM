# Ubuntu image base
FROM ubuntu:22.04

# Configure system
WORKDIR /root
RUN apt-get update && apt-get -y install \
 build-essential clang flex g++ gawk gcc-multilib gettext \
 git libncurses5-dev libssl-dev python3-distutils rsync \
 unzip zlib1g-dev wget file

# Clone repository
RUN git clone https://git.openwrt.org/openwrt/openwrt.git
WORKDIR /root/openwrt

# Get proper version of OpenWRT build
RUN git pull && \
 git branch -a && \
 git tag && \
 git checkout v22.03.2

# Update feeds
RUN ./scripts/feeds update -a
RUN ./scripts/feeds install -a

# Download all configuration files
RUN wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/compiling/.config
RUN wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/compiling/config-5.10
RUN wget https://raw.githubusercontent.com/CaptnSisko/CHARM/master/code/node/compiling/mt7628an_onion_omega2p.dts

# Move configuration files to proper locations
RUN mv config-5.10 /root/openwrt/target/linux/ramips/mt76x8/config-5.10
RUN mv mt7628an_onion_omega2p.dts /root/openwrt/target/linux/ramips/dts/mt7628an_onion_omega2p.dts
