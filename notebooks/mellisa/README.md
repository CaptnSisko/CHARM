8/23/2022 - 8/25/2022
- looking into ideas on drone, mesh, wireless, existing product, features to add on the idea 
	- existing product, [mine rescue] (https://www.iwtwireless.com/en-us/markets/tunneling/mine-rescue ) 
	- research papermesh network https://www.researchgate.net/publication/324776287_Drone_Based_Wireless_Mesh_Network_for_DisasterMilitary_Environment 
	- [IEEE search and rescue operation with mesh networked robot] (https://ieeexplore.ieee.org/document/8796743)
	- [news on search and rescue team] (https://gotenna.com/blogs/newsroom/helitracking-connects-french-search-and-rescue-team-members-using-gotenna-mesh)
	- Wifi Module ESP8266 (which i do have), ESP8266 Breakout board  https://www.adafruit.com/product/2471 
	- [solar pannel for charging the battery tutorials] (https://tutorials-raspberrypi.com/nodemcu-supply-esp8266-with-solar-cell-and-battery-with-power/ 
)
- solidifying features and limit down 
	- base ideas: mesh network, battery 
	- how to charge battery: solar (x), typical charging/out of box (x), usb-c (o) 
	- sensors: gps(o), accelerometer (x), gyro
		- does the microcontroller itself has any sensor? is there any limitation with communication protocol? 
	- drone??   
	
9/3/2022 
- as Trevor is designing PCB, i'm simutanously validating the design 

9/6/2022 
- learned and search about the electrical chip (or the lack of) 
- MT3608, 
9/6/2022 
- continue to learn the pcb parts 
- learn about ECE budget/logistic 
    - searching if there is any available useful parts (USB Dev Board, GPS) in the ECE closet 
9/10/2022
- continue to search for GPS chip 
  - been looking into the ones from Adafruit/Development Board as they have more support, example, and maximum flexibilities 
  - for example: chipset MTK3339 https://www.adafruit.com/product/746 
  1. 22 satellites, 66 channels, LED, 3.3 V 
9/12/2022
- ECE purchase 
- DigiKey, purchased [Onion Omega GPIO Interface Dev Board] (https://www.digikey.com/en/products/detail/onion-corporation/OM-D-EXP/9922963) and 5 [Omega2] (https://www.digikey.com/en/products/detail/onion-corporation/OM-O2P/9922962?s=N4IgTCBcDaIPIFkC0cwAUQF0C%2BQ) through ECE My Purchase
- total of $141.55, ECE Budget left $8.45

9/13/2022 
- drafting email to send for a pcb peer review 
- more GPS searches, NEO-N8M

9/14/2022 
- regarding previous order: the omega2 from digikey order wasn't available and it doesn't have a backordered data 
  - so the alternatives are :
  1. Omega2+ surface mount: Pro: original design, more memory
  2. Omega2 through holes: through holes design for dev board and easy development time (without soldering), might not have enough memory  
 
- purchased 5 Omega2s, [Onion OM-O2SP](https://www.mouser.com/ProductDetail/Onion/OM-O2SP?qs=w%2Fv1CP2dgqo3pBil8lMPNg%3D%3D) through ECE My Purchase
- total of $117.60, ECE Budget left

9/15/2022 
- we met with an advisor Jack to learn about some industry perspective 
-  talked to machine shop to get details on logistics 
> use Polycase.com \
> They don't count this box within the ECE budget (150$) \
> prob plastic enclosure \
>  Make sure the tolerance is good cause inside is smaller has screw holes\
>  to attach it on the box: stands off \
>  they can cut slots and holes in the box\
>  we can borrow the box to see if the signal go through \
>   would much rather to be making 3 box instead of 5  (should talk to prof about requirement) \
>   good and consistent layout for mounting holes\
>   when designing pcb, have mounting 8th in diameter holes\
>   if need to communicate any dimension, communicate in Inches

<img width="236" alt="image" src="https://user-images.githubusercontent.com/15053702/206376440-8e1680d2-8b77-4054-a871-4bf1df3d165e.png">

9/19/2022 
- picked up Omega2s !!! 
-
9/21/2022 
- purchased the second Omega Dev Board through Digikey 
- picked up Omega2 Devboard 

9/25/2022 
- verifying the boost converter and buck converter pcb design
	- basically checking the datasheet 
9/27/2022
- verify pcb gps, omega2s/router, and battery monitor pcb design 
- overleaf multi-player!

9/28/2022 
- finish verifying pcb 

9/29/2022 	
- settled on Wc-34 enclosure 

9/24/2022 
- working on design doc 
- developed and worked on Ethic and Safety Section (reading from IEEE)

9/25/2022 
- realizing the gps module internal circuit's design doesn't work with our intended UART communication 
- gps module's communication port (UART, SPI, I2C and USB) all have internal pull-up resistor
- omega2's GPIO port needs to be 'floating or pulled down' at boot time 
- a little bit of research and  

9/29/2022
- wrote Cost Aalysis (all the PCB Parts and labor), google sheet 
- wrote battery safety and sensor subsystem  

10/5/2022 - 10/7/2022 
- passive and active antenna research 
	- https://www.rfvenue.com/blog/2014/12/15/active-v-passive-anntennas#:~:text=Active%20antennas%20are%20any%20antennas,simply%20includes%20an%20onboard%20amplifier. 
- u.fl and sma https://learn.sparkfun.com/tutorials/three-quick-tips-about-using-ufl/all

- result: buying two different antenna (both u.fl) : 
	- passive antenna: https://www.mouser.com/ProductDetail/SparkFun/GPS-15246?qs=Zz7%252BYVVL6bESmbU5J3nwZA%3D%3D 
	- active antenna: https://www.mouser.com/ProductDetail/Pulse-Electronics/GPSMOD1315?qs=COJyYuYQspuQLpYSJ8kfJQ%3D%3D

10/10/2022 
CHARM Frontend Mobile Support 
- issues: 
1) when the webpage first load, it zoom in to the full map view (not show website)
- this cause issue because, if user try to access menu/node info one can't close it because the close button is not visible unless user zoom out

10/13/2022 
- we realized with the original enclosure we wanted to order (WC-34 https://www.polycase.com/wc-34) does not fit the first PCB design 
	- this is because there is some miscalculation with the pcb mounting hole dimension 
	- different ideas on if we wanted to order new pcb (new holes, better design, more cost) or new box (heavier, too big)
		- we needed the box to still satisfy our requirement (weights and volume) and fits everything
	- we settled on new pcb design (new footprint, better esthetic, white board, !) and bigger box (that still fits our requirement)

10/12/2022 
- working on prototype board 
	- the buck converter burns? very hot? -> need a heat sink .....resarch on size  

10/14/2022 
- talked to Machine shop to place order 
- 5 https://www.polycase.com/wc-40, and 100 pcb mounting screws 
- total of $201.47, not count towards our ECE budget
- verified the PCB board dimension 

10/18/2022 
- WC-40 Box arrived and picked up from Machine Shop
- initial on field (north quad) &  speed testing 
	-  internet speed tested: 15.0 Mbps, 12.8 Upload Mbps, Latency 8ms

- CHARM Frontend Mobile Support 
	- looking into the code for potential
	- react, download all the package, try to run it on local 

10/25/2022 
- helped look into the USB/Serial converter for development 
- compared the ST-Link STM8/STM32
- mini USPS run to check a shipment with development board 

10/27/2022 
- understood and learned about the current prototype board set up for future
- soldering the USB-C section, to get a hang of soldering, test, 


10/29/2022 -10/30/2022 
- start of soldering, adding modular testing in the soldering document 
- the soldering process: organize the components, follow the order, solder, tested 

- board 2 done
	- roughly 7 hours, gps module soldering has issue 
	- was salvagable and were able to get location as not all of it is used   
- board 3 done 
	- 3 hours 
	- it's easier and faster with a reference board 
- board 4 done 
- 	- 3 hours 
- board 5
 	- 2 and a half 
	- missing capacitors and green led for omega

DONEEEE
![all boards](https://user-images.githubusercontent.com/15053702/206522108-1d289198-8fbf-4e23-8cde-d57a827ee6f9.jpg)

- overall: all board can 1)USBC lights up, 2) boost converter/12 V, 3) buck converter 3.3V, 4) connect up to omega wifi 
- missing some components
	- green LED, for D7 
	- 4.7k ohm resistor, for R15
	- 100nf capacitor, for C11 

11/04/2022 -11/05/2022
- reported issue 
	- short on 3.3v rail on board 3 (soldered board 2) -> u.fl pins 
	- gps lock? 
		- all u.fl pins are soldered wrong, like there are two sides of it and one side is grounded 
		- ![example u.fl pins] (https://user-images.githubusercontent.com/15053702/206527431-3c269318-4d2e-4c6e-af9d-c6548617395a.png)

11/20/2022-11/23/2022 
- continue to research and debug the mobile support 
- looked into sidebar size 
	- instead of fix size (480px), it would be 1/3 of the screen 
- postpone on developing a new page that shows the network telemetry and information 
	- have to update the backend and node code for data 
11/28/2022 
- final demo plans 
- reliability issue and reach issue with wifi 
- tried moving antenna outside the box -> works 
- asked machine shop to drill holes on the box
- to maintain water-resistence we hot glued
