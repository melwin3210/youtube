import './App.css'
import Head from './components/Head'
import Body from './components/Body'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import StreamVideo from './components/StreamVideo'
import { useSelector } from 'react-redux'

const Layout = () => {
  const navState = useSelector(store => store.navBarStatus.navBarStatus)
  return (
    <>
      <Head />
      <div className='flex h-full'>
        {navState && <Navbar />}
        <Outlet />
      </div>
    </>
  )
}

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Body />,
        },
        {
          path: 'streamVideo',
          element: <StreamVideo />,
        }
      ]
    },
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  )
}

export default App
