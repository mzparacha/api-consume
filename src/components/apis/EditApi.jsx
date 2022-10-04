import { useState } from "react";
import { useParams } from "react-router-dom"
import { useApi, useEffectAfterMount, useNotification } from '../../core'
export default function EditApi () {
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);
  const [data, setData] = useState(null);
  const [formDescription, setFormDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { getRequest, putRequest } = useApi();
  const { setNotification } = useNotification();
  // 
  const fetchApi = async () => {
    setLoading(true);
    const result = await getRequest(`apis/${id}`, null)
    if (result) {
      setData(result.data);
      setFormDescription(result.data.description);

    }
    setLoading(false);
  };
  // 
  useEffectAfterMount(() => {
    fetchApi();
  }, [])
  // 
  const updateData = async (newData) => {
    setLoading(true);
    const result = await putRequest(`apis/${id}`, newData);
    if (result) {
      setData(result.data);
      setFormDescription(result.data.description);
      setNotification(`Api with id ${id} updated.`)
    }
    setLoading(false);
  }
  // 
  const submitApiUpdate = async (e) => {
    e.preventDefault();
    const newData = data;
    delete newData.createdAt;
    delete newData.updatedAt;
    setUndo([newData.description, ...undo])
    // 
    newData.description = formDescription;
    await updateData(newData);
  }

  const undoChanges = async () => {
    const [item, ...remaining] = undo;
    setUndo(remaining);
    setRedo([data.description, ...redo]);
    await updateData({ ...data, description: item });
  }
  const redoChanges = async () => {
    const [item, ...remaining] = redo;
    setRedo(remaining);
    setUndo([data.description, ...undo]);
    await updateData({ ...data, description: item });
  }



  return (
    <div>
      {
        loading ?
          <div className="loader__wrapper">
            <div className='loader'></div>
          </div> :
          data ? <>
            {
              undo.length > 0 &&
              <div className="flex justify-end" style={{ padding: "10px" }}>
                <span className="btn" onClick={e => undoChanges()}>
                  Undo Changes
                </span>
              </div>
            }
            {
              redo.length > 0 &&
              <div className="flex justify-end" style={{ padding: "10px" }}>
                <span className="btn" onClick={e => redoChanges()}>
                  Redo Changes
                </span>
              </div>
            }
            <ul className="show-api">
              <li>id: {data.id}</li>
              <li>Name: {data.name}</li>
              <li>Type: {data.type}</li>
              <li>Created At: {data.createdAt}</li>
              <li>Updated At: {data.updatedAt}</li>
              {
                data.operationName && <li>
                  <form onSubmit={submitApiUpdate}>
                    <div className="search">
                      <label className="search__label" htmlFor="desciption">Description:</label>
                      <textarea value={formDescription} className="search__input" type="text" onChange={({ target }) => setFormDescription(target.value)} >
                        {formDescription}
                      </textarea>
                    </div>
                    <div className="flex">
                      <input className="btn ml-auto" type="submit" value="update" />
                    </div>
                  </form>
                </li>
              }
              {
                data.variables && <li>
                  Variables
                  <pre>
                    <code>
                      {JSON.stringify(data.variables)}
                    </code>
                  </pre>
                </li>

              }
              {data.query && <li>
                Query:
                <pre>
                  <code>
                    {data.query}
                  </code>
                </pre>
              </li>}
            </ul>
          </> :
            <div>
              No data
            </div>
      }
    </div >
  )
}
