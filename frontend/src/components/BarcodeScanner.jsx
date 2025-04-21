import { useEffect, useRef } from "react";
import Quagga from "quagga";

export default function BarcodeScanner({ onDetected }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
      Quagga.stop();
    });

    return () => Quagga.stop();
  }, [onDetected]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div ref={scannerRef} className="w-full h-64 bg-black" />
    </div>
  );
}
