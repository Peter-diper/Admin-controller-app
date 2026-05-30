import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteUser, getUsers, queryClient } from "../http";
import { Link } from "react-router-dom";

export default function Users() {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: queryClient.invalidateQueries(),
  });

  function handleDeleteUser(id) {
    mutate(id);
  }

  let content;

  if (isPending)
    content = <p className="text-[15px] text-white">"loading..."</p>;

  if (users) {
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
                  onClick={() => {
                    handleDeleteUser(user.id);
                  }}
                >
                  Delete
                </button>
                <Link to={`users/${user.id}/edit`}> edit</Link>
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
