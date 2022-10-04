import { PropTypes } from 'prop-types'

const Sortable = ({ sortable, name, sort, direction, changeDirection, changeSort }) => {
  if (!sortable) {
    return <span>{name}</span>
  };
  if (name === sort) {
    return <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={e => changeDirection(direction === 'asc' ? 'desc' : 'asc')}>
      {name}
      {direction === 'asc' && <>&#8593;</>}
      {direction === 'desc' && <>&#8595;</>}
    </span>
  }
  return <span
    style={{ cursor: 'pointer', textDecoration: 'underline' }}
    onClick={e => changeSort(name)}
  >{name}</span>
}

export default function ApiTableHead ({ columns, sort, direction, changeSort, changeDirection }) {
  return (
    <thead className='tbl__head'>
      <tr>{
        columns.map(({ key, sortable }, index) => (
          <th className="tbl__head__th" key={`head-${index}`}>
            <Sortable sortable={sortable} name={key} sort={sort} direction={direction} changeDirection={changeDirection} changeSort={changeSort} />
          </th>
        ))
      }
      </tr>
    </thead>
  )
}
ApiTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  changeDirection: PropTypes.func.isRequired,
}