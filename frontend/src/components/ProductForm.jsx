import { useState } from "react";

export default function ProductForm({ codigoBarras }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría llamada al backend
    alert(`Producto añadido:\nNombre: ${nombre}\nCódigo: ${codigoBarras}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto space-y-4">
      <label className="block">
        <span className="text-gray-700">Nombre del producto</span>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </label>
      <div>
        <span className="text-gray-700">Código escaneado:</span>
        <div className="text-blue-600 font-mono">{codigoBarras}</div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Añadir producto
      </button>
    </form>
  );
}
