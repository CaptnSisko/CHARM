// React imports
import { useState, useEffect } from 'react'

// Material UI
import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import RouterIcon from '@mui/icons-material/Router'

// Custom imports
import { Voltage, TimeDelta, Separator } from './NodeCard'


// Popup component
// TODO: Code linting
const NodePopup = (props) => {

    const [timeDiff, setTimeDiff] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDiff(new Date() - new Date(props.node.lastSeen*1000))
        }, 250)
        return () => clearInterval(interval)
    }, [props.node.lastSeen])

    return (
      <>
            <Typography variant='subtitle1'>{props.node.id}</Typography>
            <div style={{ width: '140px' }}>
                <Voltage voltage={props.node.voltage} />
                <Separator />
                <TimeDelta timeDelta={timeDiff} />
            </div>
            <Typography variant='body2'>&#8203;</Typography>
            {/* This zero-width space is a very hacky way of rendering the popup properly
                if this were to go into production this should be fixed */}
      </>
    )
}

const Node = (props) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  };

  const handleOpen = () => {
    setOpen(true)
  };

  return (
    <Tooltip 
      open={open} 
      onClose={handleClose} 
      onOpen={handleOpen} 
      title={<NodePopup {...props} />}
      placement='top'
      arrow
    >
      <RouterIcon />
    </Tooltip>
  ); 
}

export default Node