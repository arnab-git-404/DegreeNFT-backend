
const NFT = require("../models/nft");


// Check if API key is valid (simple example)
exports.checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  try {
    
  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  // In production, compare with securely stored keys
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();

} catch (error) {
  console.log("Admin Authentication Failed: "+error )
  res.status(500).json( { error: "Internal Server Error, Try Again !!!" } )   
}

};

// Middleware to protect admin routes
exports.adminAuth = (req, res, next) => {
  // Simple admin auth check
  const adminToken = req.headers["admin-token"];

try{

  if (!adminToken) {
    return res.status(401).json({ error: "Admin token is required" });
  }

  // In production, use a proper authentication system
  if (adminToken !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(403).json({ error: "Invalid admin token" });
  }

  next();

} catch (error) {
    console.log("Error in Admin Auth :"+error);
    return res.status(500).json( { error: "Internal Server Error, Try Again !!!" } )
}


};

exports.checkIsAdmin = (req, res, next) => {
  res.status(200).json({ message: "You are an admin!" });
}

exports.check_Is_Registered_student = (req, res, next) => {
  res.status(200).json({ message: "You are a user!" });
}

exports.checkIsUniversityAccount = (req, res, next) => {

  const userType = req.headers["user-type"];
  const { WalletAddress } = req.req;
  console.log("Wallet Address: ", WalletAddress);
  console.log("User Type: ", userType);


  if (!userType) {
    return res.status(401).json({ error: "User type is required" });
  }

  const validUserTypes = ["university"];

  if (!validUserTypes.includes(userType)) {
    return res.status(403).json({ error: "Invalid user type" });
  }

  // In production, use a proper authentication system
  const validWalletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Example address

  res.status(200).json({ message: "You are a university account!" });
}

