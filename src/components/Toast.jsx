export default function Toast({ message, visible }) {
  return (
    <div className={`absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-aub text-white 
      px-6 py-2.5 rounded-3xl text-sm font-medium z-40 pointer-events-none font-body
      transition-transform duration-200 ${visible ? 'scale-100' : 'scale-0'}`}>
      {message}
    </div>
  );
}
