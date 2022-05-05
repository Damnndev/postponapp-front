import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { useEffect } from 'react'
import { startCheking } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch])

  if(checking) {
    return (<h5>Espere...</h5>)
  }
  return (

    <Router>
        <Routes>
          <Route
            path="/login"
            element={
                      <PublicRoute>
                          <LoginScreen />
                      </PublicRoute>
                    }
          />

          <Route
            path="/*"
            element ={
                      <PrivateRoute>
                          <CalendarScreen/>
                      </PrivateRoute>
                    }
          />
          {/* <Route path="*" element={<CalendarScreen />} />   */}

        </Routes>
    </Router>






    // <Router>
    //    <Routes>
    //       <Route path='/login' element={<LoginScreen />} />
    //       <Route path='/' element={<CalendarScreen />} />

    //       <Route path='*' element={<Navigate replace to='/' />} />
    //   </Routes>
    // </Router>
  // <Router>
  //   <div>
  //     <Switch>
  //         <PublicRoute
  //           exact
  //           path='/login'
  //           component={ LoginScreen }
  //           isAuthenticated={ !!uid }
  //         />

  //         <PrivateRoute
  //           exact
  //           path='/'
  //           element={ CalendarScreen }
  //           isAuthenticated={ !!uid }
  //         />

  //         <Redirect to="/" />
  //     </Switch>
  //   </div>
  // </Router>
  )
}
