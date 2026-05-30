import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers, queryClient } from "../http";
import { Link } from "react-router-dom";
import Error from "./ui/Error";
import { useId, useState } from "react";
import UserList from "./UserList";

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
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users", userId] });
      // to get prev and handle the error
      const prevUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users", userId], (oldData) => {
        if (!oldData) return oldData;
        return oldData.filter((u) => u.id !== useId);
      });

      return { prevUsers };
    },
    onError: (error, userId, context) => {
      queryClient.setQueryData("users", context.prevUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
      <>
        <ul className="space-y-3 bg-gray-400/10 p-5 rounded-2xl">
          {users.data.map((user) => (
            <li className="text-white" key={user.id}>
              <div className="">
                <h3>Username: {user.name}</h3>
                <p>Email: {user.email}</p>
                <div className="mt-4 space-x-2">
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
      </>
    );
  }

  return (
    <div className="space-y-10">
      {users && (
        <>
          {users.data.length < 1 && (
            <div className="flex flex-col gap-1.5">
              <p className="animate-bounce">no users add yest ...</p>
              <Link
                className="bg-gray-600/50 px-3 text-xs mt-2 cursor-pointer rounded-xl max-w-30 text-center py-2"
                to={"/add"}
              >
                ADD
              </Link>
            </div>
          )}
          <UserList users={users.data}>
            {(item) => (
              <div className="space-y-2">
                <h2>{item.name}</h2>
                <p>{item.email}</p>
              </div>
            )}
          </UserList>
        </>
      )}
      {content}
    </div>
  );
}
