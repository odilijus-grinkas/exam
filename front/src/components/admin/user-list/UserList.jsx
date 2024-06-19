export default function (props) {
  return (
    <div className={props.className}>
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  {user.admin ? (
                    <></>
                  ) : (
                    <i
                      className="btn btn-danger bi bi-trash"
                      onClick={() => props.delete(user.id)}
                    ></i>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
