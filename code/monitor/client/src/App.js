import * as React from 'react'

// Material UI
import { createTheme, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import { ThemeProvider } from '@emotion/react'

// Google Maps
import mapStyle from './styles/mapStyle'
import GoogleMapReact from 'google-map-react'
import mapSettings from './config/mapSettings'

// Custom components
import Node from './components/Node'
import { NodeCard } from './components/NodeCard'

console.log(process.env.REACT_APP_GOOGLE_MAPS_KEY)
// Querying 
//import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
//const queryClient = new QueryClient()

//change here 
const mockData = require('./config/mockData.json')

// Width of the node information sidebar
const drawerWidth = ((Monitor.width) / 3) ; //change side bar length to 1/3 of the screen size

// Transition settings for the main screen
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

// Transition settings for the App Bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styling for the header of the sidebar
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  // Full page
  return (
      <Monitor />
  )
}

function Monitor() {
  // Theme state
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: [
        'Dosis'
      ].join(',')
    }
  })

  // Open/close state for drawer, setting functions
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // State for the current time
  const [currTime, setCurrTime] = React.useState(new Date())
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date())
    }, 100)
    return () => clearInterval(interval)
  }, [currTime])

  // State for the currently selected node
  const [selectedNode, setSelectedNode] = React.useState(null)
  const handleNodeClick = (nodeId) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId)
  }
  const [centerCoord, setCenterCoord] = React.useState(mapSettings.northQuad.center)
  const handleCardClick = (nodeId, coords) => {
    // Tooltip on map
    if (selectedNode !== nodeId) {
      handleNodeClick(nodeId)
    }

    // Center the map on the pin
    setCenterCoord(coords)
  }

  // Data and querying state
  // const [nodeData, setNodeData] = React.useState({})
  // const nodeQuery = useQuery('nodes', async () => {
  //   // TODO: Change this to the production domain
  //   const res = await fetch('http://charm.twong.dev/nodes')
  //   if (!res.ok) {
  //     setNodeData({})
  //     throw new Error('Failed to fetch node data!')
  //   }
  //   const resJson = await res.json()
  //   setNodeData(resJson)
  //   return resJson
  // }, {
  //   refetchInterval: 750,
  //   refetchIntervalInBackground: false
  // })

  // Query error handling
 // if (nodeQuery.error) return `Error! See message: ${nodeQuery.error.message}`

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ width: '100%' }}>
              <Typography variant='h5' align='center' style={{ width: '50%', margin: '0 auto' }}>System Monitor</Typography>
            </div>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader >
            <div style={{ width: '100%' }}>
              <Typography variant='h5' align='center' style={{ width: '50%', margin: '0 auto' }}>Node Information</Typography>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Object.entries(mockData).map(([id, node]) => ( //nodeData
              <ListItem key={id} disablePadding>
                <NodeCard
                  node={node}
                  time={currTime}
                  forceOpen={id === selectedNode}
                  handleClick={handleCardClick}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Map */}
        <Main open={open} style={{ padding: '0px' }}>
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
              defaultCenter={mapSettings.northQuad.center}
              defaultZoom={mapSettings.northQuad.zoom}
              options={{ styles: mapStyle }}
              center={centerCoord}
            >
              {Object.entries(mockData).map(([id, node]) => (
                <Node
                  key={id}
                  lat={node.location.lat}
                  lng={node.location.lng}
                  text={`Node ${node}`}
                  node={node}
                  time={currTime}
                  forceOpen={id === selectedNode}
                  handleClick={handleNodeClick}
                />
              ))}
            </GoogleMapReact>
          </div>
        </Main>
      </Box>
    </ThemeProvider>
  )
}
