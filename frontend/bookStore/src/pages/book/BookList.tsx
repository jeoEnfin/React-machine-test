import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../utils/services";
import moment from 'moment';

interface SearchData {
  search: string;
  pageNumber: string;
  limit: string;
  fromDate: string;
  toDate: string;
  minPrice: string;
  maxPrice: string;
}

type Props = {}

function BookList({ }: Props) {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState<number[]>([]);
  const { LogoutUser }: any = useContext(AuthContext);
  const [bookData, setBookData] = useState([]);
  const [searchData, setSearchData] = useState<SearchData>({
    search: "",
    pageNumber: "1",
    limit: "3",
    fromDate: "",
    toDate: "",
    minPrice: "",
    maxPrice: ""
  });


  useEffect(() => {
    getBooks();
    console.log(searchData)
  }, [searchData]);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleDateChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newState = { ...searchData };
    if (name == 'fromDate') {
      newState.fromDate = value;
      setSearchData(newState);
    }
    if (name == 'toDate') {
      newState.toDate = value;
      setSearchData(newState);
    }
  };

  const handlePriceChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newState = { ...searchData };
    if (name == 'minPrice') {
      newState.minPrice = value;
      setSearchData(newState);
    }
    if (name == 'maxPrice') {
      newState.maxPrice = value;
      setSearchData(newState);
    }
  };

  const handleLimitChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newState = { ...searchData };
    if (name == 'limit') {
      newState.limit = value;
      setSearchData(newState);
    }
  };

  const getBooks = async () => {
    const user_token: any = localStorage.getItem('User');
    const userData = JSON.parse(user_token);
    const accessToken = userData.accessToken;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(searchData)
      })

      if (response.status === 200) {
        const arr: number[] = [];
        const data = await response.json();
        setBookData(data.result);
        console.log(data.result);
        for (let i = 0; i < data.totalPage; i++) {
          arr[i] = i + 1;
        }
        setPageCount(arr);
        console.log(arr)
      }

    }
    catch (err: any) {
      console.log(err.message)
    }
  };

  const handleDelete = async (item: any, e: any) => {
    e.preventDefault();
    const user_token: any = localStorage.getItem('User');
    const userData = JSON.parse(user_token);
    const accessToken = userData.accessToken;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const response = await fetch(`${baseUrl}/api/books/${item._id}`, {
        method: "DELETE",
        headers: myHeaders,
      })

      if (response.status === 200) {
        console.log(response);
        getBooks();
      }

    }
    catch (err: any) {
      console.log(err.message)
    }
    console.log('delete', item)
  }

  const handleEdit = async (item: any, e: any) => {
    e.preventDefault();
    console.log(item._id)
    navigate(`/editBook/${item._id}`)
  }

  const handlePageChanger = async (item: any, e: any) => {
    e.preventDefault();
    const newState = { ...searchData };
    newState.pageNumber = item
    setSearchData(newState);
  }

  const convertToCSV = (data: any) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  };



  const handleDownload = async (e: any) => {
    e.preventDefault();
    const newState = { ...searchData };
    newState.pageNumber = ""
    newState.limit = ""
    const user_token: any = localStorage.getItem('User');
    const userData = JSON.parse(user_token);
    const accessToken = userData.accessToken;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    try {
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newState)
      })

      if (response.status === 200) {
        const data = await response.json();

        const csv = convertToCSV(data.result);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

    }
    catch (err: any) {
      console.log(err.message)
    }

  }

  return (
    <>
      <div className="row align-items-center my-4 p-3">
        <div className="col">
          <h2 className="h3 mb-0 page-title">Book Store</h2>
        </div>
        <div className="col-auto">
          <button onClick={() => { navigate('/addNew') }} type="button" className="btn btn-primary">
            Add Book
          </button>
          <button onClick={() => LogoutUser()} type="button" className="btn btn-danger m-2">
            Logout
          </button>
        </div>
      </div>
      <div className="col-md-12 my-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="toolbar">
              <form className="form">
                <div className="form-row">
                  <div className="form-group col-md-1 mr-auto">
                    <label
                      className="my-1 mr-2 sr-only"
                      htmlFor="inlineFormCustomSelectPref1"
                    >
                      Show
                    </label>
                    <input type="number"
                      name="limit"
                      className="form-control datetimes"
                      placeholder='limit'
                      value={searchData.limit}
                      onChange={handleLimitChange}
                    />
                  </div>
                  <div className="form-group col-md-1">
                    <div className="form-group">
                      <input type="number"
                        name="minPrice"
                        className="form-control datetimes"
                        placeholder='min price'
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  <p>_</p>
                  <div className="form-group col-md-1">
                    <div className="form-group">
                      <input type="number"
                        name="maxPrice"
                        className="form-control datetimes"
                        placeholder='max price'
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  <div className="form-group col-auto">
                    <div className="form-group">
                      <input type="date"
                        name="fromDate"
                        className="form-control datetimes"
                        onChange={handleDateChange} />
                    </div>
                  </div>
                  <p>_</p>
                  <div className="form-group col-auto">
                    <div className="form-group">
                      <input type="date"
                        name="toDate"
                        className="form-control datetimes"
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div className="form-group col-auto">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="search1"
                      defaultValue=""
                      placeholder="Search"
                      name='search'
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="form-group col-auto">
                    <button type="button"
                      onClick={handleDownload}
                      className="btn mb-2 btn-secondary">
                      <span className="fe fe-download fe-16">
                        <span />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* table */}
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Publish Date</th>
                  <th>Image</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {bookData && bookData?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p className="mb-0 text-muted">
                          <strong>{item.name}</strong>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 text-muted">
                          <strong>{item.description}</strong>
                        </p>
                      </td>
                      <td className="text-muted">{moment(item.publishDate).format('YYYY-MM-DD')}</td>
                      <td className="text-muted">{item.image}</td>
                      <td className="text-muted">{item.price}</td>
                      <td>
                        <button
                          className="btn btn-sm dropdown-toggle more-horizontal"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="text-muted sr-only">Action</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" onClick={handleEdit.bind(null, item)}>
                            Edit
                          </a>
                          <a className="dropdown-item" onClick={handleDelete.bind(null, item)} >
                            Remove
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
            <nav aria-label="Table Paging" className="mb-0 text-muted">
              <ul className="pagination justify-content-center mb-0">

                {pageCount && pageCount?.map((item, index) => {
                  return (
                    <li key={index} className="page-item">
                      <a className="page-link" onClick={handlePageChanger.bind(null, item)}>
                        {item}
                      </a>
                    </li>
                  )
                })}

              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>

  )
}

export default BookList