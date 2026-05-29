import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../http";

export default function Users() {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  let content;
  if (isPending)
    content = <p className="text-[15px] text-white">"loading..."</p>;
  if (users) {
    content = (
      <ul>
        {users.data.map((user) => (
          <li className="text-white" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="border border-white px-5  py-8 rounded-xl min-h-[80vh]">
        {content}
      </div>
    </>
  );
}
