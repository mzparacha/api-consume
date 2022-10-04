import { useState } from 'react';
import { useApi, useDebounce, useEffectAfterMount } from '../core/'
import ApiTablePagination from "../components/apis/ApiTablePagination";
import ApiTable from './apis/ApiTable';

function ApiList () {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [recount, setRecount] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [direction, setDirection] = useState('asc');
  const { getRequest } = useApi();
  const debounceText = useDebounce(searchText, 500, () => {
    setRecount(true);
    setCurrentPage(1);
  });
  // 
  const getCount = async () => {
    const result = await getRequest('apis', { search: debounceText !== '' ? debounceText : undefined });
    if (result && result.data) {
      setCount(result.data.length);
      setRecount(false);
    }
  }
  // 
  const fetchResults = async () => {
    setFetching(true);
    if (recount) {
      await getCount();
    }
    const result = await getRequest('apis', {
      limit: 10,
      page: currentPage,
      sortBy: sort,
      order: direction,
      search: debounceText !== '' ? debounceText : undefined
    });
    setFetching(false);
    if (result) {
      const { data } = result;
      setData(data)
    }
  }
  // 
  useEffectAfterMount(() => {
    fetchResults();
  }, [currentPage, sort, direction, debounceText]);
  // 
  const onChangeText = ({ target }) => {
    setSearchText(target.value);
  }
  // 
  const nextPage = async (page) => {
    setCurrentPage(page);
  }
  return (
    <div>
      <div className='search'>
        <label className='search__label' htmlFor="searchText">Search</label>
        <input className="search__input" disabled={fetching} type="text" name="searchText" id="searchText" value={searchText} onChange={onChangeText} />
      </div>
      <ApiTable
        data={data}
        loading={fetching}
        headerProps={{
          sort,
          changeSort: d => setSort(d),
          direction,
          changeDirection: (b) => setDirection(b),
        }}
      />
      <ApiTablePagination
        total={count}
        perPage={10}
        currentPage={currentPage}
        onNext={nextPage}
        disabled={fetching}
      />
    </div>
  )
}
export default ApiList