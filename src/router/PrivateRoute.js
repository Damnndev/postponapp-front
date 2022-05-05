import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const PrivateRoute = ({children}) => {

const {uid} = useSelector(state => state.auth)
    return (
        uid
        ?   children
        :  <Navigate to="/login" />
    )
}






// import PropTypes from 'prop-types';

// import { Route, Redirect } from 'react-router-dom';


// export const PrivateRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
// }) => {

//     return (
//         <Route { ...rest }
//             component={ (props) => (
//                 ( isAuthenticated )
//                     ? ( <Component { ...props } /> )
//                     : ( <Redirect to="/login" /> )
//             )}

//         />
//     )
// }

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }
