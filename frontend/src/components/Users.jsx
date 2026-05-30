import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers, queryClient } from "../http";
import { Link } from "react-router-dom";
import Error from "./ui/Error";
import { useState } from "react";

export default function Users() {
  const [userIdDeleted, setUserIdDeleted] = useState(null);

  const {
    data: users,
    isLoading,
    isError: getUsersIsError,
    error: getUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    retry: false,
  });

  function handleDeleteUser(id) {
    setUserIdDeleted(id);
    mutate(id);
  }

  let content;

  if (isLoading) {
    content = <p className="text-[15px] text-white">"loading..."</p>;
  } else if (getUsersIsError) {
    content = (
      <Error
        title={"Error Accoierd !"}
        message={getUsersError?.message || "failed to get the data"}
      />
    );
  } else if (users) {
    content = (
      <ul className="space-y-15">
        {users.data.map((user) => (
          <li className="text-white" key={user.id}>
            <div className="">
              <h3>Username: {user.name}</h3>
              <p>Email: {user.email}</p>
              <div className="mt-4">
                <button
                  className="bg-gray-600/50 px-3 py-1 mt-2 cursor-pointer rounded-xl"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  {isPending && userIdDeleted === user.id
                    ? "deleting..."
                    : "delete"}
                </button>
                {isError && userIdDeleted === user.id && (
                  <Error
                    title={"failde to delete "}
                    message={error?.message || " falide to send request"}
                  />
                )}
                <Link to={`users/${user.id}/edit`}>Edit</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="">{content}</div>
    </>
  );
}
