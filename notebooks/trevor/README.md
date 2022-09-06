# Lab Notebook

Trevor Wong (txwong2)

## Structure

This markdown file represents a summary of the work I've completed for this project. Each of the sections below represent a notebook entry. Based on the [online rubric](https://courses.physics.illinois.edu/ece445/guidelines/lab-notebook.asp), each entry must contain the following:

1. Date
2. Brief statement of objectives for session
3. Record of what was done

## 2022.08.23

We had our first group meeting. Our goal was to brainstorm ideas and come up with a high-level project idea that would be fun, useful, and fulfill the class requirements.

We came up with the idea of a drone-deployable mesh network and wrote a [post](https://courses.physics.illinois.edu/ece445/pace/view-topic.asp?id=71252) about it. We explored related research papers ([1](https://www.researchgate.net/publication/324776287_Drone_Based_Wireless_Mesh_Network_for_DisasterMilitary_Environment
) [2](https://ieeexplore.ieee.org/document/8796743)) and existing products ([1](https://www.iwtwireless.com/en-us/markets/tunneling/mine-rescue) [2](https://gotenna.com/blogs/newsroom/helitracking-connects-french-search-and-rescue-team-members-using-gotenna-mesh)), but these solutions were either much more expensive than our proposed design or did not offer the same set of features.

## 2022.08.25

We had our second group meeting to discuss design details and assign specific tasks.

After the meeting, we assigned further research as follows:
 - Mellisa: Sensors
 - Trevor: Battery Management
 - Martin: Routing

For the rest of the day and part of the next day, I researched requirements for the BMS and how I could implement it. I found the following components that could be useful in our design:

- [Batteries](https://liionwholesale.com/collections/batteries/products/protected-f1l-3350mah-li-ion-18650-button-top-battery?variant=29045994449) - These batteries are cost effective li-ion cells from a reputable seller that include a built-in protection circuit. While the protected cells are longer than normal ones, we should be able to integrate clips to the PCB that accomodate them.
- [Charging IC](https://ww1.microchip.com/downloads/aemDocuments/documents/APID/ProductDocuments/DataSheets/21823D.pdf) - This is a popular, safe, and widely-used charge controller for LiPo and LIon batteries. An integrated controller like this is likely lot safer than a custom solution, especially considering the time constraints of our project.
- [Buck converter IC](https://datasheet.lcsc.com/lcsc/1810262207_XI-AN-Aerosemi-Tech-MT2492_C89358.pdf) - I researched some other voltage regulators, but they did not provide sufficient current for our design. A buck converter would probably be the best way to provide 3.3v regulation from the battery output, and this IC seems like it would be fairly easy to implement.
- [Boost converter IC](https://datasheet.lcsc.com/lcsc/1811151539_XI-AN-Aerosemi-Tech-MT3608_C84817.pdf) - We would also need a boost converter to convert the 5v USB input to the 12v needed to charge the batteries.

This [blog post](https://circuitdigest.com/electronic-circuits/designing-an-advance-2s-li-ion-li-po-battery-charger-system-using-mcp73844-ic) was helpful in coming up with battery design ideas and learning more about battery charging.

Overall, these ICs all have reference designs in their datasheet that we can adapt to our needs. We will need to carefully design our PCBs to follow the guidelines layed out in the datasheet, provide decoupling and filtering components as necessary, and minimize wasted space. We also need to consider the easy of assembly, since we will likely be soldering these by hand. I summarized my findings in our draft of the RFA.

## 2022.08.26

We had another meeting today with the goal of finalizing and submitting the RFA.

We reviewed our individual work and collaboratively submitted an RFA.

## 2022.08.29

We had a meeting to discuss next steps.

We decided to begin delagating tasks and decided to start working on the monitoring frontend / backend, since that part of our project is largely independent of hardware. I was assigned to create a task board in Github, write boilerplate code for our frontend / API, and set up the cloud infrastructure.

## 2022.08.30

Today I worked on setting up the cloud infrastructure for my team.

For the frontend, I created a react template using `create-react-app`. Next, I set up a project on [Netlify](https://www.netlify.com/). I was already failiar with this CI/hosting platform, and it seemed like the easiest way to deploy our frontend for free. The biggest challenge I ran into was figuring out how to configure the automatic deployment. Considering the master branch might have a large number of commits that don't relate to the frontend, I decided to create a `client-deploy` branch specifically for the netlify integration. Now, to deploy the frontend, we simply open a pull request to the `client-deploy` branch. Netlify automatically generates a preview and publishes the changes to production when we approve the pull request. Netlify can also store secrets such as API keys as environment variables. This will be useful for interacting with Google maps.

For the backend, we decided to use an [AWS Lightsail](https://aws.amazon.com/lightsail/) instance. I installed NodeJS, MariaDB, Nginx, and LetsEncrypt and wrote some sample code to make sure the server worked. I added all team members' SSH keys.

## 2022.09.02

Today we had a team meeting to discuss progress and assign more tasks. 

## 2022.09.03 - 2022.09.05

Over the long weekend, I worked on the schematic for our nodes. The overall node design is split into 2 parts, each of which contain multiple submodules:

Charging circuit: `USB-C Charger input (5v) -> boost converter (9.6v) -> battery charger`

Omega2S circuit: `battery output (~7.4v) -> buck converter (3.3v) -> Omega2 and sensors`

There's a switch between the battery output and Omega2S circuit to allow the user to turn the device off when it is not in use or charging.

### Schematic

![CHARM Schematic](images/draft1_schem.png?raw=true "CHARM Schematic")

Notes on each component:

### USB-C Port

![CHARM Schematic USB-C](images/draft1_usb.png?raw=true "USB-C Schematic")

- Biggest challenges are power negotiation and soldering a 24-pin usb-c connector
- [It's possible to draw power from USB-C without negotiating on the CC pins with only two resistors](https://forum.digikey.com/t/simple-way-to-use-usb-type-c-to-get-5v-at-up-to-3a-15w/7016), which is by far the easiest and cheapest way to implement USB-C power delivery
- Our design is unlikely to draw 3 amps of power
- The tradeoff is that users with unsupported/legacy usb chargers may experience issues, and our design should only be used with usb power supplies that support at least 2.4 amps at 5 volts
- A fuse helps to mitigate safety hazards from accidental short circuits or other malfunctions causing current to be overdrawn
- For ease of soldering, CUI devices has [power-only USB-C connectors](https://www.mouser.com/pdfDocs/intro-to-power-only-usb-type-c_mouser.pdf) with fewer pins

### Boost Converter

![CHARM Schematic Boost Converter](images/draft1_boost.png?raw=true "Boost Converter Schematic")
- MT3608 is an extremely popular boost converter, having been used in this [blog post](https://circuitdigest.com/electronic-circuits/designing-an-advance-2s-li-ion-li-po-battery-charger-system-using-mcp73844-ic) referenced earlier and many [cheap 2A boost converters on Amazon](https://www.amazon.com/Converter-Adjustable-Voltage-Regulator-Compatible/dp/B089JYBF25)
- The biggest change to the "standard" design (aka the reference schematic in the datasheet with the components all the breakout board sellers use) is this one uses a fixed resistor instead of a potentiometer for R8
- A fixed resistor lowers cost and footprint
- As long as the output voltage stays between 8.7 and 12, it is in spec as the input for the battery charge controller, which is all that really matters. This is such a wide range that a potentiometer for percise control is not needed

According to the MT3608 datasheet, the formula for output voltage is 

`Vout = Vref * (1 + R8/R9)`

Vref is typically 0.6V, with a range of 0.588V to 0.612V. If we use resistors with 1% tolerance, then R8 ranges from 49.5kΩ to 50.5kΩ and R9 ranges from 3.267kΩ to 3.333kΩ. Plugging these values in, we have

`min(Vout) = 0.588 * (1 + 49.5 / 3.333) = 9.32 V`

`avg(Vout) = 0.6 * (1 + 50 / 3.3) = 9.69 V`

`max(Vout) = 0.612 * (1 + 50.5 / 3.267) = 10.1 V`

These are all within the acceptable range for our application.

- The datasheet suggests using inductors from 4.7 to 22 uH. All the MT3608 boost converter breakout boards I've seen on [Aliexpress](https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20220906072612&SearchText=MT3608&spm=a2g0o.home.1000002.0), Amazon, etc seem to use a 22 uH inductor, so I selected that value for the inductor 
- The datasheet suggests 22uF capacitors with low ESR, specifically stating X5R and X7R types are preferred
- The datasheet suggests a Schottky diode with a referse breakdown voltage higher than the output voltage and a current rating determined by the formula as follows:

`Id = sqrt(Iout * Ipeak)`

Iout = 0.5, which is the typical charge current for our battery
Ipeak = 2, which is the absolute maximum the battery charging circuit should draw

According to this formula, we should use Schottky diode with a rating of at least 1A. The [SS34](https://www.mouser.com/ProductDetail/onsemi-Fairchild/SS34FA?qs=R26iFe%2FkX%2FK1QUwZdCmBBw%3D%3D) is the most commonly used diode in the premade PCBs online, and this is rated for 3A of current, a 40V breakdown voltage, and a low forward voltage of 0.5V. The current rating might be overkill for our use case, so it might be worth considering alternatives such as the [SS22FA](https://www.mouser.com/ProductDetail/onsemi-Fairchild/SS22FA). It is unclear whether there are any major downsides to using a diode rated for a higher current than what is actually used, and selecting the most widely used component might be the safest option.

### Buck Converter

![CHARM Schematic Buck Converter](images/draft1_buck.png?raw=true "Buck Converter Schematic")

- A voltage regulator is needed to step down the battery voltage to 3.3V for the processor and sensors
- Linear voltage regulators are generally rated for 800mA or less, which would be enough for the Omega2S alone but not for also powering the GPS and ADC
- Using an external antenna on the GPS and Omega2S might also increase the power draw beyond what a linear regulator could provide
- An unstable 3.3v supply could cause reliability issues which are unacceptable in a search and rescue mission
- a buck converter can achieve higher efficiency and much higher current capacity
- the [AP63203WU](https://www.mouser.com/ProductDetail/Diodes-Incorporated/AP63203WU-7?qs=u16ybLDytRZ1JqxbuLkMJw%3D%3D) has an internal 3.3v reference voltage, so there is no need to set external resistor values like with the boost converter
- This buck converter can supply up to 2A, which is plenty
- the passive component selection and layout is identical to the reference schematic provided in the datasheet

### Battery Charge Controller

![CHARM Schematic Battery Charge Controller](images/draft1_bcc.png?raw=true "Battery Charge Controller")

### GPS Module

![CHARM Schematic GPS Module](images/draft1_gps.png?raw=true "GPS Module")


### Battery Monitor

![CHARM Schematic Battery Monitor](images/draft1_bm.png?raw=true "Battery Monitor")


### Omega2S

![CHARM Schematic Omega2S](images/draft1_omega.png?raw=true "Omega2S")

![CHARM Schematic Omega2S](images/draft1_omega_power.png?raw=true "Omega2S")
