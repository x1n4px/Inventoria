import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Inventario</h1>
      <button
        onClick={() => navigate("/scanner")}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600"
      >
        Escanear producto
      </button>
      <button
        onClick={() => navigate("/inventario")}
        className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600"
      >
        Ver inventario
      </button>
    </div>
  );
}
