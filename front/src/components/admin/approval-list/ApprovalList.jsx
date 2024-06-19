export default function ApprovalList(props) {
  return (
    <div className={props.className}>
      <h2>Approve New Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => {
            if (user.approved || user.admin) {
              return null;
            }
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <i className="btn btn-success bi bi-check-square" onClick={()=>{props.approve(user.id)}}></i>
                </td>
                <td>
                  <i className="btn btn-danger bi bi-x-square" onClick={()=>{props.reject(user.id)}}></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}