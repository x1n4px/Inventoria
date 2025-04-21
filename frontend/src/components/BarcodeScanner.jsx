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
                        facingMode: "environment", // o prueba "user"
                    },
                },
                decoder: {
                    readers: [
                        "code_128_reader",
                        "ean_reader",
                        "ean_8_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                    ]

                },
                locate: true, // <- esto ayuda con la localización del código
                debug: {
                    drawBoundingBox: true,
                    showPattern: true,
                    drawScanline: true,
                    showCanvas: true,
                },
            },
            (err) => {
                if (err) {
                    console.error("Quagga init error:", err);
                    return;
                }
                console.log("Quagga initialized");
                Quagga.start();
            }
        );

        Quagga.onProcessed((result) => {
            const drawingCtx = Quagga.canvas.ctx.overlay;
            const drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                    result.boxes
                        .filter((box) => box !== result.box)
                        .forEach((box) => {
                            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                                color: "green",
                                lineWidth: 2,
                            });
                        });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                        color: "#00F",
                        lineWidth: 2,
                    });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, {
                        color: "red",
                        lineWidth: 3,
                    });
                }
            }
        });


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
