import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import UsersList from './pages/userList/usersList'
import NewUser from './pages/newUser/newUser'
import ViewUser from './pages/viewUser/viewUser'
import Points from './pages/points/Points'
import Rewards from './pages/rewards/rewards'
import NewReward from './pages/newReward/newReward'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<UsersList />}/> 
      <Route path='/new' element={<NewUser />}/> 
      <Route path='/:id' element={<ViewUser />}/> 
      <Route path='/:id/p5' element={<Points />}/> 
      <Route path='/:id/rewards' element={<Rewards />}/> 
      <Route path='/:id/rewards/new' element={<NewReward />}/> 
    </Routes>
    </>
  )
}

export default App
