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
    - USE SET function
- Reference the [documentation](https://reactjs.org/docs/hello-world.html) for all hooks in react


JSX Notes
- `className` instead of traditional HTML `class`
- Use `{}` to inject javascript values
    - This makes component reactive to data
- `<></>` is an empty fragment
- Always start component names with captial letter

### 2022.10.16

Trevor and I assembled a complete board today. Below is 
the procedure I developed for first time Omega2S setup.

<bold>First Time Omega2S+ Setup Procedure</bold>

1. Power on the Omega2S+
2. Connect to the Omega via WiFi (password: 12345678)
3. SSH into the Omega
 - `ssh -oHostKeyAlgorithms=+ssh-rsa root@omega-ABCD.local` or `ssh root@omega-ABCD.local`
 - Enter the default password `onioneer`
4. Configure the Omega's WiFi connection by running `wifisetup`
 - If issues occur, run `wifisetup clear` to clear other networks from the wifi driver
5. Update the Omega's firmware by running `oupgrade`
