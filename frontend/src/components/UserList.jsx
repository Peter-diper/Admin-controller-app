import { useRef, useState } from "react";
import Input from "./ui/Input";

export default function UserList({ users, children }) {
  const timer = useRef();
  const [searchTerms, setSearchTerms] = useState("");

  console.log(users);

  const userFilterdResult = users.filter((user) =>
    JSON.stringify(user)
      .toLowerCase()
      .includes(searchTerms.toLocaleLowerCase()),
  );

  function handleSearch(e) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setSearchTerms(e.target.value);
    }, 500);
  }

  return (
    <div className="bg-gray-400/30 p-5 rounded-2xl">
      <Input
        label={"Serach Users"}
        
        onChange={handleSearch}
      />

      <ul className="grid gap-4">
        {userFilterdResult.map((user) => (
          <li key={user.id}>{children(user)}</li>
        ))}
      </ul>
    </div>
  );
}
