// QR Code utility for generating attendance QR codes
export const generateQRCodeData = (eventId, attendanceToken) => {
  // Format: event:{eventId}:token:{attendanceToken}
  return `event:${eventId}:token:${attendanceToken}`;
};

export const parseQRCodeData = (qrData) => {
  try {
    const parts = qrData.split(":");
    if (parts.length === 4 && parts[0] === "event" && parts[2] === "token") {
      return {
        eventId: parts[1],
        attendanceToken: parts[3],
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};

// For generating QR codes, use qrcode library in frontend
// Backend just generates the data string that will be converted to QR code
