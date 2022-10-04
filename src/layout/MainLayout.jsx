import { Outlet } from 'react-router-dom';
import { Nav } from '../components';
import { useNotification } from '../core/useNotification'
function MainLayout () {
  const { notification } = useNotification();
  return (
    <div>
      <Nav />
      <div className='container' style={{ paddingBlock: '20px' }}>
        {
          notification && notification
        }
      </div>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout