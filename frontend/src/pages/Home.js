import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query getAllUsers {
    getAllUsers {
      name
      email
    }
  }
`;

function Home() {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  const { session } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!session) {
      history.push("/signin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    history.push("/signin");
  };

  return (
    <div className="mx-2">
      <div className="my-3 flex justify-between items-center">
        <p className=" text-3xl font-semibold text-blue-600">All users</p>
        <button
          className=" px-2 py-1  bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {data?.getAllUsers.map((user) => (
          <div className="p-2 border bg-white rounded shadow">
            <p>{user.name}</p>
            <p className="truncate">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
