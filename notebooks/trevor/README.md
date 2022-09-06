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

