# Lab Notebook

Martin Michalski (martinm6)

### Structure

Titles are dates of meetings or workdays in which our project was worked on. Subsequent text and images
serve to describe work done, design decisions made, or group decisions made as a result of a meeting.

### 2022.08.23

First group meeting. Brainstormed and decided to develop a system for the quick setup of WiFi network.
Discussed the most likely challenges we will face during implementation.

At the conclusion of this meeting we created a post on the Web Board detailing the problem we aim to 
address and a general overview of our proposed system.

### 2022.08.25

Second group meeting. Went into more detail as to potential parts to use for the system nodes and
detailed criterion for success.

At the conclusion of this meeting, we delegated research into subsystems amongst the group members.
 - Mellisa: Sensors
 - Trevor: Battery Management
 - Martin: Routing

Later in the day, I looked into potential ways to provide wireless access to users and route traffic 
through our network, finding potential approaches:
 - Microcontroller + [ESP8266](https://www.espressif.com/en/products/socs/esp8266)
 - [Omega2](https://onion.io/omega2/)
 - [VoCore2](https://vocore.io/v2.html)

After some discussion with the group, we decided to go with one of the computers (Omega2 or VoCore2) due 
their being a bit easier to work with, and comparable in price to the microcontroller option, while
still providing pins to interface with GPS and battery voltage sensors. We chose the Omega2 over VoCore due
to a better level of community support. Price was not a factor, as both chips were rather similarily priced. 
Although we aim to build our system for as cheap as possible, we are more concerned with building a system
that is sure to work and prove our concept due to our only having one semester to complete the system.

### 2022.08.26

Third group meeting. Discussed researched parts and confirmed compatibility in our overall system 
architecture. Drafted and submitted the RFA as a group. 

### 2022.08.29

Fourth group meeting. Discussed important tasks for the week. This week, I will be focusing on:
 - CAD Assignment
 - Frontend for the system monitor

### 2022.09.01

Starting frontend development. Watching a React tutorial to refresh my
knowledge on the topic. Notes on the video can be found below.

React Notes
- Tracks page state via DOM tree, updates only the part of the page that needs updating
- Component-based UI (independent and reusable components)
- Functional components
    - Use any function format present in Javascript
    - Return JSX to render
- Props syntax example  
```javascript
    const Person = (props) => {
        return (
            <>
                <h1>Name: {props.name}</h1>
            </>
        )
    }

    const App = () => {
        return(
            <div className="App">
                <Person name='John' />
            </div>
        )
    }
```
- State in react
    - Have to import: `import { useState } from 'react'`
    - Example declaration of a component state variable: `const [counter, setCounter] = useState(0)`
        - Initial state for the variable is given to the `useState()` function
    - Call the set method as follows: `setCounter((prevCount) => prevCount - 1)`
    - Use the set function, never manipulate state directly
- Reference the [documentation](https://reactjs.org/docs/hello-world.html) for all hooks in react


JSX Notes
- `className` instead of traditional HTML `class`
- Use `{}` to inject javascript values
    - This makes component reactive to data
- `<></>` is an empty fragment
- Always start component names with capital letter

### 2022.09.02

Today I created the general layout for the frontend of the System Monitor. I made an unformatted hamburger menu, as well as
got Google Maps up and running with the styling I wanted.

![Frontend State 2022.09.02](./images/2022_09_02_frontend_state.png)

Also, I met with Trevor to establish a format for the data format from the backend. This is the format for general node
metadata we settled on:

```JSON
{
    <node-id, string>: {
        "id": <node-id, string>,
        "location": {
            "lat": <node-latitude, float>, 
            "lng": <node-longitude, float>
        },
        "voltage": <node-voltage, float>,
        "lastSeen": <node-last-seen-time, unix timestamp>,
        "meshCount": <node-mesh-connections, int>
    }
}
```

We also established a format for getting statistics on "edges" between the nodes:

```JSON
    [
        {
            "ids": [
                <node-id, string>, 
                <node-id, string>
            ], 
            "strength": <connection-strength, float>
        }, ...
    ]
```

### 2022.09.03

Added mock data to the application, and styled the cards in the hamburger menu to display this new data, while including
checks for missing data. 

![Frontend State 2022.09.03](./images/2022_09_03_frontend_state.png)

### 2022.09.09

Created tooltips to display node information right over the nodes icons on the map. Also created state allow 
interactions between the hamburger menu and the maps portion of the site. For example, when a node card is clicked
in the hamburger menu, the map centers on that node and displays its tooltip.

![Frontend State 2022.09.09](./images/2022_09_09_frontend_state.png)

### 2022.09.11

Design validation for the hardware schema Trevor developed. Here I include notes on the circuit subsections
I had time to cover this day.

USB-C Port
- Interface with external power supply, used for the charging of our lithium-ion batteries
- On the issue of grounding, the current design includes a $0 \Omega$ resistor to our battery ground
    - Based on the [discussion](https://electronics.stackexchange.com/questions/389972/usb-shield-to-ground-or-not-to-ground) 
    linked in Trevor's notebook there no one-solution fits all, but participations mention some important considerations
        - Ground on USB slave devices may not be true ground, potentially leading to an unintended induced current between master and slave
            - This is what's referred to as a [ground loop](https://help.campbellsci.com/CR1000X/Content/shared/Maintain/Troubleshooting/ground-loops.htm#:~:text=A%20ground%20loop%20is%20a,potential%20point%20of%20the%20circuit.). This is an issue to be considered
            with our USB design, as with the resistor in place PCB ground is connected to both our local battery 0V, as
            well as the ground of the master charging device. If shielding is connected to ground in both devices, we have a ground loop.
            - The article above recommends leaving the shielding grounded only on one end of the cable
        - In an ideal world, the host should provide the shielding connection to ground, but online discussions serve to prove that
        we do not live in an ideal world
    - Based this [discussion](https://electronics.stackexchange.com/questions/4515/how-to-connect-usb-connector-shield), manufacturers
    give conflicting guidelines.
    - These points in mind, I agree with the $0 \Omega$ resistor option. This was brought up in the discussions as well. It
    affords us flexibility
- Power Specification
    - I read this [discussion](https://electronics.stackexchange.com/questions/511559/type-c-non-negotiated-power-and-20v-protection), no 
    real insight
    - Our device has a UFP (Upstream Facing Port), and will act as a current sink
    - Referring to the [USB spec](https://www.usb.org/document-library/usb-type-cr-cable-and-connector-specification-release-21), 
    Tables 4-25 and 4-24 seem to validate the discussion linked in Trevor's notebook, and the design
- Only potential issue I saw when browsing discussions is that some devices may provide 21V upon connection
    - For this POC, we will make sure to use a charger that does not do this
    - This is out-of-spec, and therefore not worth accounting for
    - We have a fuse in the case of abnormally high current drawn from the host
- NOTE: Make sure to ensure PCB traces can handle the max 15W flow from VBUS

Boost Converter (Old)
- This converter is able to handle $V_{in}$ of up to 24V, therefore the possiblilty of USB providing 24V on connection is not a concern
- Trevor's analysis of $V_{out}$ voltage ranges my independent calculations as well
- Diode selection seems to be in order, with the note that the battery charging cicuit should not draw more than 2A
- This is not the most up to date version of the boost converter
    - Refer to the next section for notes

### 2022.09.22

Implementing the backend. Below are notes written to work with MariaDB database.

Open the database console.
```
mysql -u charm_user -p
```

Opening the database of interest.
```sql
use charm_db;
```

Show all tables in the database.
```
SHOW TABLES;
```

Creation of the nodes table.
```sql
CREATE TABLE nodes (
    id CHAR(9) NOT NULL,
    readable_name VARCHAR(40) NOT NULL
);
```

Add a single row to the nodes table.
```sql
INSERT INTO nodes 
    (id, readable_name) VALUES 
    ('test-1sd4', 'Test Node #2');
```

Remove a row from the nodes table.
```sql
DELETE FROM nodes
    WHERE id='test-1sd4';
```

Creation of the telemetry table.
```sql
CREATE TABLE telemetry (
    id CHAR(9) NOT NULL,
    timestamp INT NOT NULL, 
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL, 
    voltage FLOAT, 
    clientCount TINYINT, 
    meshCount TINYINT
);
```

Add a single row to the telemetry table.
```sql
INSERT INTO telemetry
    (id, timestamp, lat, lon, voltage, clientCount, meshCount) VALUES 
    ('test-1sd4', 1663899605, 40.115041, -88.227480, 6.575421, 2, 3);
```

Altering some columns to be non-null.
```sql
ALTER TABLE telemetry
MODIFY lat
FLOAT NOT NULL;

ALTER TABLE telemetry
MODIFY lon
FLOAT NOT NULL;
```

Adding an index to the timestamp column s.t. querying for the latest telemetry is efficient.
```sql
ALTER TABLE telemetry
ADD INDEX(timestamp);
```

An interesting extension to this scheme would be the addition of a column to track the time
at which the data is received and updated in the server. This would allow for on-the-fly
latency analysis for each node.

In addition to setting up the databases, I implemented an API endpoint to get information
on all of the nodes currently being tracked.

### 2022.09.24

First, I change the type of some columns to double as opposed to float, since we were having some
precision issues.

```sql
ALTER TABLE telemetry
MODIFY lat
DOUBLE NOT NULL;
```

I then implemented the POST request endpoint to store node telemetry to the server's database.
I tested both POST and GET endpoints with Postman, and validated that the state of the database 
changes as expected.

At this point, all that is left to do is integration of the frontend with the backend, with the
frontend polling the backend for new data every x seconds.

### 2022.10.16

Trevor and I assembled a complete board today. Below is 
the procedure I developed for first time Omega2S setup.

**First Time Omega2S+ Setup Procedure**

1. Power on the Omega2S+
2. Connect to the Omega via WiFi (password: `12345678`)
3. SSH into the Omega
    - `ssh -oHostKeyAlgorithms=+ssh-rsa root@omega-ABCD.local` or ssh `root@omega-ABCD.local`
    - Enter the default password `onioneer`
4. Configure the Omega's WiFi connection by running wifisetup
    - If issues occur, run `wifisetup clear` to clear other networks from the wifi driver
5. Update the Omega's firmware by running `oupgrade`
6. Change the root user password to `onionEngineer` with the `passwd` command while logged in as `root`

## 2022.10.19

**Notes**

The `opgs` package on the Omega does not properly parse NMEA sentences. As a result, I will set up
cross-compilation in order to be able to develop on my PC, and then simply download the executable
on the Omega. This should sped the development process. Instructions for how to set up the build system may
be found in the next section of these notes.

**System Setup for Cross-Compilation**
1. Install Docker if not installed on your system
2. Pull the docker image: `docker pull onion/omega2-source`
3. Run the container: `docker run -it onion/omega2-source /bin/bash`
4. Update the onion package feeds `./scripts/feeds update onion`
5. Update all other package feeds: `./scripts/feeds update -a`
6. Update repository code: `git pull`
7. Compile build system: `export GIT_SSL_NO_VERIFY=1 && make -j 33`

Common issue when trying to compule the build system:
```
[src/util]
make: Entering directory '/root/source/build_dir/target-mipsel_24kc_musl/postfix-3.3.0/src/util'
mipsel-openwrt-linux-musl-gcc -DNO_NIS -DUSE_TLS -DUSE_SASL_AUTH -DUSE_CYRUS_SASL -I/root/source/staging_dir/target-mipsel_24kc_musl/usr/include/sasl -DHAS_LDAP -DHAS_CDB -DNO_DB -DHAS_SQLITE -I/root/source/staging_dir/target-mipsel_24kc_musl/usr/include/ -DHAS_PCRE -I/root/source/staging_dir/target-mipsel_24kc_musl/usr/include/ -DNO_EAI -DDEF_DB_TYPE=\"cdb\"  -g -O -I. -DLINUX5 -c alldig.c
cc1: note: someone does not honour COPTS correctly, passed 0 times
In file included from alldig.c:29:0:
./sys_defs.h:1257:2: error: #error "unsupported platform"
 #error "unsupported platform"
  ^~~~~
./sys_defs.h:1320:2: error: #error "define HAS_FCNTL_LOCK and/or HAS_FLOCK_LOCK"
 #error "define HAS_FCNTL_LOCK and/or HAS_FLOCK_LOCK"
  ^~~~~
./sys_defs.h:1324:2: error: #error "define DEF_MAILBOX_LOCK"
 #error "define DEF_MAILBOX_LOCK"
  ^~~~~
./sys_defs.h:1328:2: error: #error "define INTERNAL_LOCK"
 #error "define INTERNAL_LOCK"
  ^~~~~
./sys_defs.h:1336:2: error: #error "define USE_STATFS or USE_STATVFS"
 #error "define USE_STATFS or USE_STATVFS"
  ^~~~~
In file included from alldig.c:29:0:
./sys_defs.h:1347:57: error: unknown type name 'SOCKADDR_SIZE'
 extern const char *inet_ntop(int, const void *, char *, SOCKADDR_SIZE);
                                                         ^~~~~~~~~~~~~
Makefile:187: recipe for target 'alldig.o' failed
make: *** [alldig.o] Error 1
make: Leaving directory '/root/source/build_dir/target-mipsel_24kc_musl/postfix-3.3.0/src/util'
Makefile:92: recipe for target 'update' failed
make[4]: *** [update] Error 1
make[4]: Leaving directory '/root/source/build_dir/target-mipsel_24kc_musl/postfix-3.3.0'
Makefile:265: recipe for target '/root/source/build_dir/target-mipsel_24kc_musl/postfix-3.3.0/.built' failed
make[3]: *** [/root/source/build_dir/target-mipsel_24kc_musl/postfix-3.3.0/.built] Error 2
make[3]: Leaving directory '/root/source/feeds/packages/mail/postfix'
Command exited with non-zero status 2
time: package/feeds/packages/postfix/compile#0.45#0.11#0.83
package/Makefile:107: recipe for target 'package/feeds/packages/postfix/compile' failed
make[2]: *** [package/feeds/packages/postfix/compile] Error 2
make[2]: Leaving directory '/root/source'
package/Makefile:103: recipe for target '/root/source/staging_dir/target-mipsel_24kc_musl/stamp/.package_compile' failed
make[1]: *** [/root/source/staging_dir/target-mipsel_24kc_musl/stamp/.package_compile] Error 2
make[1]: Leaving directory '/root/source'
/root/source/include/toplevel.mk:216: recipe for target 'world' failed
```

The resolution for this issue is using a simpler, minimal configuration. Switch to a simpler config using
the `python scripts/onion-setup-build.py -c .config.O2-minimum` command.

*The above may also be done via Windows GUI for the most part*

**Setting Up Development Environment for our Code**

1. Configure the image SSH keys to be able to update the remote repository
2. Pull our github repository into the Docker image: `git clone git@github.com:CaptnSisko/CHARM.git`
3. Open up the folder in VSCode or editor/IDE of choice
4. Install `sshpass` with command: `apt-get install sshpass`

## 2022.10.21

I finished the ADC telemetry software. Writing software to pull data from the GPS. The GPS is represented
as file `/dev/ttyACM0` on the Omega2S+.

Here is the proper compilation command for reference:

```
sh xCompile.sh -buildroot /root/source -lib "oniondebug -lonioni2c"
```

GPS Output Message formats:

|Message Type|Details|
|:-:|:-:|
|GGA|Time, position, and fix related data|
|GLL|Position, time, and status|
|GSA|GPS DOP and number of satellite fixed|
|GSV|Specific satellite ID numbers, metadata|
|RMC|Position, velocity and time|
|VTG|Tracking information|
|TXT|Human readable information|

The information about GPS message types was sourced from 
this [website](https://receiverhelp.trimble.com/alloy-gnss/en-us/NMEA-0183messages_GGA.html).

**NMEA Notes**
Maximum sentence lenth is [82 bytes](https://gpsd.gitlab.io/gpsd/NMEA.html). This reference is used heavily in the 
development of our NMEA message parser.

## 2022.10.22

Today I am performing validation of the mapping between the ADC observed voltage and the true $V_{\text{batt}}$.

**True Voltage v. Measured Voltages**

We test voltages in 0.1V increments in the safe Lithium-ion operating voltage range. (6.0V - 8.4V)
|$V_{\text{batt}}$|$V_{\text{ADC}}$|
|:-:|:-:|
|6.0|1.609, 1.607, 1.609|
|6.1|1.646, 1.647, 1.646|
|6.2|1.688, 1.686, 1.688|
|6.3|1.734, 1.733, 1.732|
|6.4|1.775, 1.777, 1.778|
|6.5|1.817, 1.817, 1.817|
|6.6|1.851, 1.850, 1.850|
|6.7|1.897, 1.897, 1.897|
|6.8|1.940, 1.940, 1.940|
|6.9|1.982, 1.981, 1.982|
|7.0|2.023, 2.023, 2.023|
|7.1|2.069, 2.069, 2.068|
|7.2|2.104, 2.103, 2.103|
|7.3|2.146, 2.146, 2.146|
|7.4|2.184, 2.186, 2.186|
|7.5|2.230, 2.229, 2.230|
|7.6|2.269, 2.270, 2.269|
|7.7|2.313, 2.312, 2.313|
|7.8|2.357, 2.356, 2.357|
|7.9|2.416, 2.415, 2.416|
|8.0|2.414, 2.424, 2.424|
|8.1|2.471, 2.470, 2.469|
|8.2|2.517, 2.517, 2.517|
|8.3|2.559, 2.559, 2.560|
|8.4|2.603, 2.603, 2.603|

TODO: Include data analysis here