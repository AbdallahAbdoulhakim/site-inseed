import { MdDelete } from "react-icons/md";

export default function Critieria() {
  return (
    <div>
      <div className="bg-primary-light-hover p-4 rounded-t flex justify-around items-center">
        <h1 className="text-white uppercase font-bold font-roboto-sans">
          Mes critères
        </h1>
        <button className="cursor-pointer group">
          <MdDelete
            size={28}
            className="md:hidden text-third group-hover:text-third/80 active:scale-95"
          />
          <span className="hidden active:scale-95 font-semibold text-base text-default rounded md:block md:p-2 bg-third group-hover:bg-third/90 group-hover:text-default/80">
            Supprimer tous
          </span>
        </button>
      </div>
      <div className="p-5 bg-[#f6f6f6]"></div>
    </div>
  );
}
