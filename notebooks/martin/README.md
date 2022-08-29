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

Fourth group meeting.