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
            <TimeDelta timeDelta={props.time - (props.node.lastSeen*1000)} />
          </div>
        } />
    </ListItemButton> 
  )
}

export {NodeCard, Separator, Voltage, PluralString, TimeDelta}
