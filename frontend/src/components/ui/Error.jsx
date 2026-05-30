export default function Error({ title, message }) {
  return (
    <div className="bg-red-600/50 p-10 w-full">
      <h2 className="mb-4">{title}</h2>
      <p>{message}</p>
    </div>
  );
}
