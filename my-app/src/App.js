import { useEffect, useState } from "react";
import "./App.css";



const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const remoteData = await response.json();
        setData(remoteData);
      } catch (error) {
        console.error("Error fetching data:" + error);
      }
    };
    fetchData();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = data.slice(firstPostIndex, lastPostIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table id="table">
        <tr id="one">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>

        {currentPost.map((data) => {
          return (
            <tr bgcolor="white">
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
            </tr>
          );
        })}
      </table>
      <div id="nano">
        <button onClick={handlePrevPage} disabled={currentPage <= 1}>
          Previous{" "}
        </button>
        <span>{currentPage}</span>

        <button onClick={handleNextPage} disabled={currentPage >= 5}>
          next
        </button>
      </div>
    </div>
  );
}
