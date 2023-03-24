import './App.css';
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import {Routes,Route} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SavePosts from './pages/SavePosts';
import Register from './pages/Register.jsx'
import Login from './pages/Login';
import ExploreUsers from './pages/ExploreUsers';
<<<<<<< HEAD
import Notifications from './pages/Notifications'
=======
import Messages from './pages/Messages';
>>>>>>> b38667fa27761be6f9eeec580da8553ebfe27e59

const queryClient = new QueryClient()

function App() {
  
  let theme = createTheme({
    palette:{
      primary:{
        main:"#0082f4",
        contrastText:"#ffffff"
      },
      Gray:{
        main:"#fefffc",
        contrastText:"#070815"
      }
    },
  })

  const {user} = useSelector((state)=>state.user)
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='' element={user?<Home/>:<Navigate to="login"/>}/>
          <Route path='/user/:id' element={user?<Profile/>:<Navigate to="login"/>}/>
<<<<<<< HEAD
          <Route path='/notifications' element={user?<Notifications/>:<Navigate to="login"/>}/>
=======
          <Route path='/messages' element={user ? <Messages/> : <Navigate to={'/login'}/>}/>
>>>>>>> b38667fa27761be6f9eeec580da8553ebfe27e59
          <Route path='save-posts' element={user?<SavePosts/>:<Navigate to="login"/>}/>
          <Route path='signup' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='explore' element={user?<ExploreUsers/>:<Navigate to="login"/>}/>
        </Routes>
      </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
