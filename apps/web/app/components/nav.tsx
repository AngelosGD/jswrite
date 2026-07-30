"use client";

export default function nav() {
  return (
    <div>
      <nav className="w-full border-b-2 border-gray-200 items-center flex p-5">
        <p className="font-serif text-2xl text-gray-800 pl-5">JsWrite</p>
        <p className="pl-15 font-serif">
          cualquier <span className="font-bold">nota</span> en tu navegador,
          solo <span className="font-bold">escribelo</span> o dictalo por voz
        </p>

        <div className="items-end flex pl-[40%]">
          <button className="border border-gray-400 p-2 w-25 mr-3 transition duration-280 ease hover:bg-black hover:text-white">Github</button>
          <button className="bg-black border border-black text-white p-2 w-25 transition duration-280 ease hover:bg-white hover:text-black hover:border-black">Escritorio</button>
        </div>
      </nav>
    </div>
  );
}
