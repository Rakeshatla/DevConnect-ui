// import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

const App = () => {
  return (
    <div>
      {/* to use redux all over application */}
      <Provider store={appStore}>
        <Navbar />
        <Outlet />
        <Footer />
      </Provider>
    </div>

  )
}

export default App
