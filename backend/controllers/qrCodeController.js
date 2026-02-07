import { verifyQRCodeAttendance } from "../services/attendanceService.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleGuard from "../middleware/roleGuard.js";

export const verifyQRCodeController = async (req, res) => {
  try {
    const { eventId, attendanceToken } = req.body;
    const userId = req.user.id;

    if (!eventId || !attendanceToken) {
      return res.status(400).json({
        success: false,
        message: "Event ID and attendance token are required",
      });
    }

    const result = await verifyQRCodeAttendance(eventId, userId, attendanceToken);

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQRCodeDataController = async (req, res) => {
  try {
    const { eventId } = req.params;

    // This endpoint just returns the QR code data
    // The frontend will convert this to a QR code image
    res.status(200).json({
      success: true,
      message: "QR code data retrieved",
      data: {
        eventId,
        // The actual QR data will be constructed by frontend as: event:{eventId}:token:{token}
        // The token will be fetched from the event object
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
