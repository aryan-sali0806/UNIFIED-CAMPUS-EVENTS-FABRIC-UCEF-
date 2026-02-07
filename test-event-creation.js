// Test Script - Run in Browser Console to verify event creation
// Location: Open DevTools (F12) → Console → Paste this code

console.log("=== UCEF Event Creation Test ===\n");

// 1. Check localStorage
console.log("1. Checking localStorage...");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");

if (token && role === "organizer") {
  console.log("✅ Authentication OK");
  console.log(`   - Role: ${role}`);
  console.log(`   - User: ${userName}`);
  console.log(`   - Token: ${token.substring(0, 20)}...`);
} else {
  console.error("❌ Authentication Failed");
  console.error(`   - Token: ${token ? "Present" : "MISSING"}`);
  console.error(`   - Role: ${role || "MISSING"}`);
  console.log("   → Action: Re-login as organizer");
}

// 2. Check API connectivity
console.log("\n2. Testing API connectivity...");
fetch("http://localhost:5000/", {
  method: "GET"
})
.then(res => {
  if (res.ok) {
    console.log("✅ Backend is running");
  } else {
    console.error("❌ Backend returned status:", res.status);
  }
})
.catch(err => {
  console.error("❌ Cannot reach backend");
  console.error("   → Make sure backend is running: node server.js");
  console.error("   → Error:", err.message);
});

// 3. Test event retrieval
console.log("\n3. Testing event retrieval...");
if (token) {
  fetch("http://localhost:5000/api/events", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  .then(res => {
    console.log(`   - Response status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log("✅ Events API working");
    console.log(`   - Events count: ${data.data?.length || 0}`);
    if (data.data && data.data.length > 0) {
      console.log("   - Sample event:", data.data[0].title);
    }
  })
  .catch(err => {
    console.error("❌ Events API error:", err.message);
  });
} else {
  console.warn("⚠️  Cannot test events API - no token found");
}

// 4. Create a test event
console.log("\n4. To create a test event manually:");
console.log(`
const testEvent = {
  title: "Test Hackathon",
  description: "A test event for debugging",
  eventType: "hackathon",
  mode: "HYBRID",
  startDate: new Date(Date.now() + 86400000).toISOString(),
  endDate: new Date(Date.now() + 172800000).toISOString(),
  isTeamEvent: false,
  maxTeamSize: 1,
  attendanceMethod: "NONE"
};

fetch("http://localhost:5000/api/events", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${token}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(testEvent)
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log("✅ Event created successfully!", data.data._id);
  } else {
    console.error("❌ Event creation failed:", data.message);
  }
})
.catch(err => console.error("❌ Error:", err.message));
`);

console.log("\n=== Test Complete ===");
console.log("Check the results above to identify any issues");
