import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRCodeDisplay = ({ eventId, attendanceToken, eventTitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (eventId && attendanceToken && canvasRef.current) {
      const qrData = `event:${eventId}:token:${attendanceToken}`;
      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 300,
        margin: 10,
        color: { dark: "#000000", light: "#FFFFFF" },
      }).catch((err) => console.error("QR code generation error:", err));
    }
  }, [eventId, attendanceToken]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg border border-slate-200">
      <div>
        <h3 className="text-lg font-semibold mb-2">{eventTitle}</h3>
        <p className="text-sm text-slate-600">Attendance QR Code</p>
      </div>
      {eventId && attendanceToken ? (
        <div className="p-4 bg-slate-50 rounded-lg">
          <canvas ref={canvasRef}></canvas>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          ⚠️ QR code will be displayed after event is published
        </div>
      )}
      <p className="text-xs text-slate-500 text-center">
        Students can scan this code to mark attendance
      </p>
    </div>
  );
};

export default QRCodeDisplay;
