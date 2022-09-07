// React imports
import { useState, useEffect } from 'react'

// App styles
import '../styles/style.css'

// Material UI
import { ListItemIcon } from '@mui/material'
import RouterIcon from '@mui/icons-material/Router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// Custom components
import { Voltage, PluralString, Separator, TimeDelta } from './Info'

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

export {NodeCard, Separator, Voltage, PluralString, TimeDelta}
