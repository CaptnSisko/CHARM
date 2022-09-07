// Separator
const Separator = () => <div className='inline-child'>&nbsp;&#8226;&nbsp;</div>

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

// Voltage display
const Voltage = (props) => {
  // Render
  if (typeof props.voltage !== 'undefined') {
    // Get voltage color and format voltage string
    const vColor = voltageColor(props.voltage, 2)
    const vString = props.voltage.toFixed(2)

    return (
      <div className='inline-child' style={{ color: vColor }}>{vString}V</div>
    )
  }
  // UNK
  return (
    <div className='inline-child'>?V</div>
  )
}

// Plural string component
const PluralString = (props) => {
  // Render
  if (typeof props.count !== 'undefined') {
    const plural = props.count !== 1
    return (
      <div className='inline-child'>{props.count} {props.unitString}{plural ? 's' : ''}</div>
    )
  }
  // UNK
  return (
    <div className='inline-child'>? {props.unitString}s</div>
  )
}

// Time difference component
const TimeDelta = (props) => {
    // Render
    if (typeof(props.timeDelta) !== 'undefined' && !isNaN(props.timeDelta)) {
      // Format the time
      let timeDelta = props.timeDelta
      timeDelta = timeDelta / 1000
      const hours = Math.floor(timeDelta / 3600)
      timeDelta -= hours * 3600
      const mins = Math.floor(timeDelta / 60)
      timeDelta -= mins * 60
      timeDelta = Math.round(timeDelta)
      const tString = `${hours}h ${mins}m ${timeDelta}s`

      return (
        <div className='inline-child'>{`Seen ${tString} ago`}</div>
      )
    }
    // UNK 
    return (
      <div className='inline-child'>{`Seen ?h ?m ?s ago`}</div>
    )
}

export {Separator, Voltage, PluralString, TimeDelta}
