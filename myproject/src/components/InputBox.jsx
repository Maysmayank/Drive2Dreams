export function InputBox({ placeholder, label ,onChange,type}) {
  return (
    <div className="py-2">
      <div className=" text-sm text-black font-medium text-left pb-1.5">{label}</div>
      <input 
        onChange={onChange}
        type={type}
        className="rounded-sm p-1 px-2 w-[100%] outline-none border border-slate-300"
        placeholder={placeholder}
      />
    </div>
  );
}
