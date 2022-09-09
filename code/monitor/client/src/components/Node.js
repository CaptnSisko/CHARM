// React imports
import { useState } from 'react'

// Material UI
import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import RouterIcon from '@mui/icons-material/Router'

// Custom imports
import { Voltage, TimeDelta, Separator } from './NodeCard'

// Popup component
const NodePopup = (props) => {

  return (
    <>
      <Typography variant='subtitle1'>{props.node.id}</Typography>
      <div style={{ width: '140px' }}>
        <Voltage voltage={props.node.voltage} />
        <Separator />
        <TimeDelta timeDelta={props.time - (props.node.lastSeen * 1000)} />
      </div>
      <Typography variant='body2'>&#8203;</Typography>
      {/* This zero-width space is a very hacky way of rendering the popup properly
                if this were to go into production this should be fixed */}
    </>
  )
}

// Node on the map
const Node = (props) => {
  // State for node hover
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Tooltip
      open={open || props.forceOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      title={<NodePopup {...props} />}
      placement='top'
      arrow
    >
      <RouterIcon style={{ cursor: 'pointer' }} onClick={() => {props.handleClick(props.node.id, true)}}/>
    </Tooltip>
  )
}

export default Node