import { useApi } from '../../core/';
import { useParams, useNavigate } from 'react-router-dom'
import { useNotification } from '../../core';
import { useState } from 'react';
function DeleteApi () {
  const { setNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteRequest } = useApi();
  // 
  const deleteItem = async () => {
    setLoading(true);
    await deleteRequest(id);
    setLoading(false);
    setNotification(`Api record with id: ${id} was deleted.`)
    navigate('/apis/list');
  }
  // 
  return (
    <div className='flex justify-center flex-col' >
      <span style={{ marginBlock: '40px' }}>Are you sure you want to delete record with id: {id}?</span>
      <div className='flex' style={{ columnGap: '10px' }}>
        {
          loading ?
            <div className="loader__wrapper">
              <div className='loader'></div>
            </div> :
            <>
              <div className='btn' onClick={e => navigate('/apis/list')}>No</div>
              <div className='btn' onClick={e => deleteItem()}>Yes</div>
            </>
        }
      </div>
    </div>
  )
}
export default DeleteApi