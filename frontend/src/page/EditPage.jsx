import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../components/ui/Input";
import { editUser, getUser, queryClient } from "../http";
import Error from "../components/ui/Error";

export default function AddUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
    retry: false,
  });

  const {
    data,
    isPending: pendingUserData,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: ({ signal }) => getUser({ id, signal }),
    retry: (failureCount) => failureCount < 3,
  });

  function hanldeSubmit(e) {
    e.preventDefault();

    const fm = new FormData(e.target);
    const data = Object.fromEntries(fm.entries());
    mutate({ userData: data, userId: id });
    e.target.reset();
  }
  if (pendingUserData) {
    return <p>laoding...</p>;
  } else if (userIsError) {
    return (
      <Error
        title={"could not fetch data"}
        message={userError?.message || "failde to get user data"}
      />
    );
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
      {isError && (
        <Error
          title={"failde to edit data"}
          message={error?.message || "faild message"}
        />
      )}
    </form>
  );
}
