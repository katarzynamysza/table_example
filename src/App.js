import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { data } from './data';

function App() {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedData, setSelectedData] = useState(data);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const itemsPerPage = 4;

  useEffect(() => {
    renderRows();
  }, []);

  const searchFunc = e => {
    setTimeout(setSearch(e.target.value), 500);
  };

  useEffect(() => {
    renderRows();
  }, [search]);

  const sort = (category, order) => {
    let sortedData;
    sortedData = data.sort((a, b) => {
      let prev = a[category];
      let next = b[category];
      if (order === 'desc') {
        if (prev > next) return -1;
        if (next > prev) return 1;
        else return 0;
      }
      if (order === 'asc') {
        if (prev > next) return 1;
        if (next > prev) return -1;
        else return 0;
      } else return 0;
    });

    setSelectedData(sortedData);
    renderRows();
  };

  const renderRows = () => {
    let renderedRows = selectedData
      ?.filter(({ brand }) =>
        brand.toLowerCase().includes(search.toLowerCase())
      )
      .map(({ id, brand, equipment }, i) => (
        <Tr className='table_row' key={i}>
          <Td>{id}</Td>
          <Td>{brand}</Td>
          <Td>{equipment}</Td>
          <Td className='table_button_cell'>
            <button className='table_button'>
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to cart
            </button>
          </Td>
        </Tr>
      ));

    setRows(renderedRows);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = rows.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rows.length / itemsPerPage);

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % rows.length;
    setItemOffset(newOffset);
  };

  return (
    <div className='App'>
      <div className='search_bar'>
        <input
          placeholder='Search...'
          value={search}
          onChange={e => searchFunc(e)}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div className='table_container'>
        <Table cellSpacing='0'>
          <Thead className='table_header'>
            <Tr>
              <Th>
                <div className='table_header_wrap'>
                  Id
                  <div className='table_buttons_wrap'>
                    <button onClick={() => sort('id', 'asc')}>
                      <FontAwesomeIcon icon={faChevronUp} size={'xs'} />
                    </button>
                    <button onClick={() => sort('id', 'desc')}>
                      <FontAwesomeIcon icon={faChevronDown} size={'xs'} />
                    </button>
                  </div>
                </div>
              </Th>

              <Th>
                <div className='table_header_wrap'>
                  Brand
                  <div className='table_buttons_wrap'>
                    <button onClick={() => sort('brand', 'asc')}>
                      <FontAwesomeIcon icon={faChevronUp} size={'xs'} />
                    </button>
                    <button onClick={() => sort('brand', 'desc')}>
                      <FontAwesomeIcon icon={faChevronDown} size={'xs'} />
                    </button>
                  </div>
                </div>
              </Th>
              <Th>
                <div className='table_header_wrap'>
                  Equipment
                  <div className='table_buttons_wrap'>
                    <button onClick={() => sort('equipment', 'asc')}>
                      <FontAwesomeIcon icon={faChevronUp} size={'xs'} />
                    </button>
                    <button onClick={() => sort('equipment', 'desc')}>
                      <FontAwesomeIcon icon={faChevronDown} size={'xs'} />
                    </button>
                  </div>
                </div>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{currentItems}</Tbody>
        </Table>
      </div>
      <div className='table_pagination'>
        <ReactPaginate
          breakLabel='...'
          nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default App;
