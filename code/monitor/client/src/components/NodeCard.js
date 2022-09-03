// React imports
import { useState, useEffect } from 'react'

// App styles
import '../styles/style.css'

// Material UI
import { ListItemIcon } from '@mui/material'
import RouterIcon from '@mui/icons-material/Router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// Functions to help with formatting
import voltageColor from '../utils/voltageColor'

// Separator
const Separator = () => <div className='inline-child'>&nbsp;&#8226;&nbsp;</div>

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

// Format time difference
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

const NodeCard = (props) => {
  // Component state
  const [timeDiff, setTimeDiff] = useState()

  // Update component every 1/4 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(new Date() - new Date(props.node.lastSeen*1000))
    }, 250)
    return () => clearInterval(interval)
  }, [props.node.lastSeen])

  // Component card formatting
  return (
    <ListItemButton>
      <ListItemIcon>
        <RouterIcon />
      </ListItemIcon>
      <ListItemText 
        primary={`Node: ${props.node.id}`} 
        secondary={
          <div>
            <Voltage voltage={props.node.voltage} />
            <Separator />
            <PluralString count={props.node.clientCount} unitString='client' />
            <Separator />
            <PluralString count={props.node.meshCount} unitString='mesh connection' />
            <Separator />
            <TimeDelta timeDelta={timeDiff} />
          </div>
        } />
    </ListItemButton> 
  )
}

export default NodeCard
