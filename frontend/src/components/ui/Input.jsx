export default function Input({ id, label, ...props }) {
  return (
    <p className="flex flex-col ">
      <label htmlFor={id}>{label}</label>
      <input
        className="border rounded-md p-1.5 mt-2"
       
        {...props}
        id={id}
        
      />
    </p>
  );
}
