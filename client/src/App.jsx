// import { useState } from 'react'
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { ColosseumProvider } from './utils/ColosseumContext';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = sessionStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ColosseumProvider>
      <div className='app'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ColosseumProvider>
  )
}

export default App;
