const NFT = require("../models/nft");
const Reports = require('../models/reports')


// Create an NFT allocation for a specific wallet
exports.createNftAllocation = async (req, res) => {
  try {
    
    const {
      studentWallet, // Assuming this is the primary recipient wallet
      universityWallet,
      name,
      symbol,
      uri,
      ipfsHash,
      sellerFeeBasisPoints,
    } = req.body;

    if (
      !studentWallet ||
      !universityWallet ||
      !name ||
      !symbol ||
      !uri ||
      !ipfsHash
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields for NFT allocation" });
    }

    const existingAllocation = await NFT.findOne({
      studentWallet,
      universityWallet,
      ipfsHash,
    });

    if (existingAllocation) {
      return res
        .status(409)
        .json({ error: "NFT allocation already exists for this combination" });
    }

    // Create a new NFT document using the Mongoose model
    const newNftAllocation = new NFT({
      name,
      symbol,
      uri,
      ipfsHash,
      universityWallet,
      studentWallet,
      sellerFeeBasisPoints, // Will use schema default if not provided
      allocated: true, // Set allocated to true
      allocatedAt: new Date(), // Set allocation timestamp
      minted: false, // Initially not minted
    });

    // Save the new allocation to the database
    const savedAllocation = await newNftAllocation.save();

    console.log(
      `NFT allocation saved to DB for student wallet: ${studentWallet}`
    );

    res.status(201).json({
      success: true,
      message: "NFT allocation created successfully in database",
      allocation: savedAllocation,
    });
  } catch (error) {
    console.error("Error allocating NFT:", error);
    res.status(500).json({ error: "Failed to allocate NFT" });
  }
};

exports.confirmCredential = async (req, res) => {

  const { walletAddress } = req.body;

  try {
    
    const nft = await NFT.findOne({
      studentWallet: walletAddress, 
      allocated: true,
      minted: false, 
    })

    if(!nft){
      return res.status(404).json({ error: "NFT allocation not found" });
    }

    nft.nftStatus = "CONFIRMED";
    nft.isConfirmed = true;
    nft.confirmedAt = new Date();
    nft.confirmationDeadline = null;
  

    await nft.save();

    res.status(200).json({
      success: true,
      message: "NFT Detalis are confirmed ",
    });

  } catch (error) {
    res.status(500).json({ "Failed to Confirm NFT Data": error });
  }

}

exports.checkAuthorization = async (req, res) => {

  const { walletAddress } = req.params; // Assuming this is the studentWallet

  try {
    const allocation = await NFT.findOne({ studentWallet: walletAddress });

    const existingReport = await Reports.findOne({ studentWallet: walletAddress });

    if (allocation && allocation.allocated && !allocation.minted) {

      res.status(200).json({
        authorized: true,
        existingReport: existingReport ? true : false, // Check if a report exists for this wallet
        nftInfo: {
          // Send relevant info needed for minting
          _id: allocation._id, // Send DB id if needed later
          name: allocation.name,
          symbol: allocation.symbol,
          uri: allocation.uri,
          confirmationStatus : allocation.nftStatus,
          sellerFeeBasisPoints: allocation.sellerFeeBasisPoints,
        },



      });

    } else if (allocation && allocation.minted) {
      
      res.status(200).json({
        authorized: false,
        message: "All NFT has already been minted for this wallet",
      });

    } else {
      res.status(200).json({
        authorized: false,
        message: "No NFT allocation found for this wallet",
      });
    }

    console.log("Authorization api hit ");
  } catch (error) {
    console.error("Error checking authorization:", error);
    res.status(500).json({ error: "Failed to check authorization" });
  }
};


exports.confirmMint = async (req, res) => {

  const { walletAddress, nft_Mint_Address } = req.body; // Assuming this is studentWallet

  try {

    // 1. Find the allocation in the database
    const allocation = await NFT.findOne({
      studentWallet: walletAddress,
      allocated: true,
      minted: false,
    });

    if (!allocation) {
      return res.status(403).json({
        error: "Wallet not authorized or NFT already minted/not allocated",
      });
    }

    // 4. Update the allocation document in the database
    allocation.nftStatus = "MINTED"
    allocation.minted = true;
    allocation.mintedAt = new Date();
    allocation.nftAddress = nft_Mint_Address; // Store the minted NFT address


    await allocation.save();

    res.status(200).json({
      success: true,
      message: "NFT Data Saved Successfully",
    });


  } catch (error) {
    console.error("Error minting NFT:", error);
    // If minting failed, ensure the DB status isn't incorrectly updated
    res.status(500).json({ error: "Failed to mint NFT: " + error.message });
  }
};

// Get all minted NFTs (update to query DB)
exports.getMintedNfts = async (req, res) => {

  const { walletAddress } = req.params; 

  try {
      const mintedNfts = await NFT.find({ minted: true, studentWallet: walletAddress }); // Find all documents where minted is true for the specific wallet
      
      res.status(200).json({ nfts: mintedNfts });
  } catch (error) {
      console.error('Error fetching minted NFTs:', error);
      res.status(500).json({ error: 'Failed to fetch minted NFTs' });
  }
};

exports.createReport = async (req, res) =>{

  const { studentWallet, reportType, reportDetails } = req.body;

  try {
    
    if (!studentWallet || !reportType || !reportDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the report already exists
    const existingReport = await Reports.findOne({
      studentWallet,
      reportType,
    });

    if (existingReport) {
      return res.status(409).json({ error: "Report already exists" });
    }

    // Create a new report document
    const newReport = new Reports({
      studentWallet,
      reportType,
      reportDetails,
      reportedOn: new Date(),
    });

    // Save the new report to the database
    const savedReport = await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report created successfully",
    });


  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Failed to create report" });
  }


}