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

const queryClient = new QueryClient()

function App() {
  
  let theme = createTheme({
    palette:{
      primary:{
        main:"#0082f4",
        contrastText:"#ffffff"
      }
    },
  })

  const {user} = useSelector((state)=>state.user)
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/user/:id' element={<Profile/>}/>
          <Route path='save-posts' element={<SavePosts/>}/>
          <Route path='signup' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
        </Routes>
      </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
