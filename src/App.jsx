// import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import { Provider, useDispatch } from 'react-redux'
import appStore from './utils/appStore'
import { BASE_URL } from './utils/const'
import axios from 'axios'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react'

//to keep the user data in redux even if he refreshes
const App = () => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      dispatch(addUser(res.data))
    } catch (err) {
      console.error(err)
    }
  }
  // const dispatch = useDispatch();
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div>
      {/* to use redux all over application */}
      <Provider store={appStore}>
        <Navbar />
        <Outlet />
      </Provider>
    </div>

  )
}

export default App
