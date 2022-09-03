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
    return (
      <div className='inline-child'>?V</div>
    )
}

// Format time difference
function formatTimeDelta(timeDelta) {
    timeDelta = timeDelta / 1000
    const hours = Math.floor(timeDelta / 3600)
    timeDelta -= hours * 3600
    const mins = Math.floor(timeDelta / 60)
    timeDelta -= mins * 60
    timeDelta = Math.round(timeDelta)
    return `${hours}h ${mins}m ${timeDelta}s`
}

const NodeCard = (props) => {
  // Component state
  const [timeStr, setTimeStr] = useState('UNK time')

  // Update component every 1/4 second
  useEffect(() => {
      const interval = setInterval(() => {
          setTimeStr(formatTimeDelta(new Date() - new Date(props.node.lastSeen*1000)))
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
            <div className='inline-child'>{`${props.node.clientCount} client${props.node.clientCount === 1 ? '' : 's'}`}</div>
            <Separator />
            <div className='inline-child'>{`${props.node.meshCount} mesh connection${props.node.meshCount === 1 ? '' : 's'}`}</div>
            <Separator />
            <div className='inline-child'>{`Seen ${timeStr} ago`}</div>
          </div>
        } />
    </ListItemButton> 
  )
}

export default NodeCard
