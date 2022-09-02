// Material UI
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const NodeCard = (props) => {
  return(
    <ListItemButton style={{ display: 'block' }}>
      <ListItemText primary={props.name} />
      <ListItemText primary={props.name} />
    </ListItemButton>
  )
}

export default NodeCard
