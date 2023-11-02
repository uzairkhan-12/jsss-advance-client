export default function Banner() {
  return (
    <div className="rounded-xl bg-primary-dark border border-gray-500 w-full h-60 flex justify-start items-center mb-3 p-10">
      <div>
        <h1 className="text-2xl uppercase text-gray-100 font-bold tracking-widest">
          admin dashboard
        </h1>
        <p className="uppercase text-gray-200 font-extralight tracking-widest">
          Command Hub: Your Administrative Control Center
        </p>
      </div>
    </div>
  );
}
