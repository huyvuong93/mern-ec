import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Info = (props) => (
  <tr>
    <td>{props.info.email}</td>
    <td>{props.info.name}</td>
    <td>{props.info.address}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.info._id}`}>Edit</Link> |
    </td>
  </tr>
);

export default function Profile() {
  const [info, setInfo] = useState([]);

  // This method fetches the Infos from the database.
  useEffect(() => {
    async function getInfo() {
      const response = await fetch(`http://localhost:3080/User/detail/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const info = await response.json();
      setInfo(info);
    }

    getInfo().then(r => console.log(r));


  }, [info.length]);

  // This method will map out the Infos on the table
  function InfoList() {
      return (
        <Info
          info={info}
        />
      )
  }

  // This following section will display the table with the Infos of individuals.
  return (
    <div>
      <h3>Info List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>{InfoList()}</tbody>
      </table>
    </div>
  );
}