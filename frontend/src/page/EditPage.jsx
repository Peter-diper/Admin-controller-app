import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Input from "../components/ui/Input";
import { editUser, getUser, queryClient } from "../http";

export default function AddUser() {
  const { id } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { data, isPending: pending } = useQuery({
    queryKey: ["users", id],
    queryFn: ({ signal }) => getUser({ id, signal }),
  });

  function hanldeSubmit(e) {
    e.preventDefault();

    const fm = new FormData(e.target);
    const data = Object.fromEntries(fm.entries());
    mutate({ userData: data, userId: id });
    e.target.reset();
  }
  if (pending) {
    return <p>laoding...</p>;
  }
  return (
    <form
      onSubmit={hanldeSubmit}
      className="flex flex-col gap-28 justify-between"
    >
      <div className="">
        <Input
          defaultValue={data.data.name}
          id={"username"}
          name="name"
          label={"Username"}
          required
          type="text"
        />
        <Input
          defaultValue={data.data.email}
          id={"email"}
          name="email"
          required
          label={"Email"}
          type="email"
        />
      </div>
      <button
        disabled={isPending}
        className="max-w-35 border w-full py-1.5 rounded-md mx-auto cursor-pointer"
      >
        {isPending ? "Pending..." : "Submit"}
      </button>
    </form>
  );
}
