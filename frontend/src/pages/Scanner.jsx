import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import ProductForm from "../components/ProductForm";

export default function Scanner() {
  const [codigo, setCodigo] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Escanear producto</h2>
      {!codigo ? (
        <BarcodeScanner onDetected={setCodigo} />
      ) : (
        <ProductForm codigoBarras={codigo} />
      )}
    </div>
  );
}
