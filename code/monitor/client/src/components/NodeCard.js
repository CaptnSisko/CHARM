// App styles
import '../styles/style.css'

// Material UI
import { ListItemIcon } from '@mui/material'
import RouterIcon from '@mui/icons-material/Router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// Custom components
import { Voltage, PluralString, Separator, TimeDelta } from './Info'

// Node card present in the sidebar of the application
const NodeCard = (props) => {
  // Component card formatting
  return (
    <ListItemButton onClick={() => {props.handleClick(props.node.id, props.node.location)}}>
      <ListItemIcon>
        <RouterIcon fontSize='large' />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <div style={{ fontSize: 'medium' }}>
            {`Node: ${props.node.id}`}
          </div>
        }
        secondary={
          <div style={{ fontSize: 'small' }}>
            <Voltage voltage={props.node.voltage} />
            <Separator />
            <PluralString count={props.node.clientCount} unitString='client' />
            <Separator />
            <PluralString count={props.node.meshCount} unitString='mesh connection' />
            <Separator />
            <TimeDelta timeDelta={props.time - (props.node.lastSeen * 1000)} />
          </div>
        } />
    </ListItemButton>
  )
}

export { NodeCard, Separator, Voltage, PluralString, TimeDelta }
