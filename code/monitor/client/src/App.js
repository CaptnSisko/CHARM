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

// TODO: Remove mock data on the nodes
// TODO: Address issue with validateDOMNesting
// TODO: Maintain node state and last seen updates here
import mockData from './config/mockData'

// Width of the node information sidebar
const drawerWidth = 480;

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
  // Theme state
  const theme  = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: [
        'Dosis'
      ].join(',')
    }
  })

  // Open/close state, setting functions
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Full page
  // TODO: Split into components
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
              <Typography variant='h5' align='center' style={{ width: '50%', margin:'0 auto' }}>System Monitor</Typography>
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
              <Typography variant='h5' align='center' style={{ width: '50%', margin:'0 auto' }}>Node Information</Typography>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {mockData.map((node) => (
              <ListItem key={node.id}  disablePadding>
                <NodeCard node={node}/>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Map */}
        <Main open={open} style={{ padding: '0px' }}>
            <div style={{  height: '100%', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                defaultCenter={mapSettings.northQuad.center}
                defaultZoom={mapSettings.northQuad.zoom}
                options={{ styles: mapStyle }}
              >
                {mockData.map((node) => (
                    <Node
                      key={node.id}
                      lat={node.location.lat}
                      lng={node.location.lng}
                      text={`Node ${node}`}
                      node={node}
                    />
                ))}
              </GoogleMapReact>
            </div>
        </Main>

      </Box>
    </ThemeProvider>
  );
}
