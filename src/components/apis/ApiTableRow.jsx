import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TableCell from './TableCell';

function ApiTableRow ({
  columns,
  data
}) {
  const [showMore, setShowMore] = useState(false);
  const allKeys = columns.map(({ key }) => key);
  const dataKeys = Object.keys(data);
  const haveMore = dataKeys.filter(x => !allKeys.includes(x))
  return (
    <>
      <tr className="tbl__row" >
        {
          allKeys.map((key, index) => (
            <TableCell
              key={`${data.id}-${key}-${index}`}
              name={key}
              showMore={showMore}
              haveMore={haveMore.length > 0}
              setShow={(v) => setShowMore(v)}>
              {
                key !== 'actions' && data[key]
              }
              {
                key === 'actions' && <div className='flex flex-col'>
                  <Link to={`/apis/${data.id}`}>Edit</Link>
                  <Link to={`/apis/${data.id}/delete`}>Delete</Link>
                </div>
              }
            </TableCell>
          ))
        }

      </tr>
      {
        haveMore.length > 0 && showMore &&
        <tr className="tbl__row">
          <td className="tbl__cell" colSpan={'100%'}>
            <ul style={{ listStyle: 'none', rowGap: "10px", display: 'flex', flexDirection: 'column', paddingLeft: "20px", borderLeft: '1px solid black' }}>
              {
                haveMore.map((n, idx) => <li key={`${n}-${idx}`}>
                  <b style={{ display: "block", paddingBlock: "10px" }}>{n}:</b>
                  {(data[n] instanceof Object) ?
                    JSON.stringify(data[n])
                    :
                    n === 'query' ?
                      <pre>
                        <code>
                          {data[n]}
                        </code>
                      </pre>
                      : data[n]
                  }
                </li>
                )
              }
            </ul>
          </td>
        </tr>
      }
    </>

  )
}

ApiTableRow.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any
}
export default ApiTableRow;