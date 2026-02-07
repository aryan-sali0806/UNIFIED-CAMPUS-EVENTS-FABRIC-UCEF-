import { useState, useRef } from "react";
import { X, Camera } from "lucide-react";
import eventService from "../services/eventService";

const QRCodeScanner = ({ event, onSuccess, onCancel }) => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [manualCode, setManualCode] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setScanning(true);
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Cannot access camera. Please check permissions or use manual entry.");
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const handleSubmitManualCode = async () => {
    if (!manualCode.trim()) {
      setError("Please enter the attendance code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Parse the code: event:{eventId}:token:{token}
      const parts = manualCode.split(":");
      if (parts.length !== 4 || parts[0] !== "event" || parts[2] !== "token") {
        throw new Error("Invalid code format");
      }

      const attendanceToken = parts[3];
      await eventService.verifyQRCodeAttendance(event._id, attendanceToken);

      setSuccess("✅ Attendance marked successfully!");
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      const errorMsg = typeof err === "string" ? err : err.message || "Failed to mark attendance";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Mark Attendance</h2>
          {onCancel && (
            <button
              onClick={() => {
                stopScanning();
                onCancel();
              }}
              className="text-slate-500 hover:text-slate-700 text-2xl"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {!scanning ? (
            <div className="space-y-4">
              <button
                onClick={startScanning}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                <Camera size={20} />
                Scan QR Code
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or enter manually</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Attendance Code
                </label>
                <textarea
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Paste the attendance code here..."
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>

              <button
                onClick={handleSubmitManualCode}
                disabled={loading || !manualCode.trim()}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {loading ? "Verifying..." : "Submit Code"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-slate-900"
              />
              <button
                onClick={stopScanning}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Stop Camera
              </button>
              <p className="text-center text-sm text-slate-600">
                Position the QR code in the camera view
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
