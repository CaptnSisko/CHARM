// Return a color based on the voltage of a battery
function voltageColor(voltage, cellCount) {
    // Critical battery level
    if (voltage > (4.2*cellCount) || voltage < (3.2*cellCount)) {
        return '#c90a00'
    }

    // Sub-optimal battery level
    if (voltage < (3.4*cellCount)) {
        return '#c98d00'
    }

    // Optimal battery level
    return '#2ca600'
}

export default voltageColor