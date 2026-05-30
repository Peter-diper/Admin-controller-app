import { useMutation } from "@tanstack/react-query";

import Input from "./ui/Input";
import { createUser } from "../http";
import Error from "./ui/Error";

export default function AddUser() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createUser,
  });

  function hanldeSubmit(e) {
    e.preventDefault();

    const fm = new FormData(e.target);
    const data = Object.fromEntries(fm.entries());
    mutate(data);
    e.target.reset();
  }

  return (
    <form
      onSubmit={hanldeSubmit}
      className="flex flex-col gap-28 justify-between"
    >
      <div className="">
        <Input
          id={"username"}
          name="name"
          label={"Username"}
          required
          type="text"
        />
        <Input
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
        {isPending ? (
          <p className="animate-pulse text-blue-300">laoding...</p>
        ) : (
          "Submit"
        )}
      </button>
      {isError && (
        <Error
          title={"faild to add "}
          message={error?.message || "failde to fetch"}
        />
      )}
    </form>
  );
}
