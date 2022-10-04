import PropTypes from 'prop-types'
export default function ApiTablePagination ({
  total,
  currentPage,
  onNext,
  perPage,
  disabled
}) {
  const pages = new Array(Math.ceil(total / perPage)).fill(0).map((_, i) => i + 1)
  return (
    <ul className='pagination'>
      {
        pages.map((page) => (
          <li
            key={`paginate--${page}`}
            className={`pagination-item${currentPage === page ? " active" : ''}${disabled ? ' disabled' : ''}`}
            onClick={e => !disabled ? onNext(page) : null}>
            {page}
          </li>
        ))
      }
    </ul>
  )
}

ApiTablePagination.propTypes = {
  total: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onNext: PropTypes.func,
  disabled: PropTypes.bool
}