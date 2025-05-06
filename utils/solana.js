// const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
// const { createSignerFromKeypair, keypairIdentity, publicKey } = require('@metaplex-foundation/umi');
// const { mplTokenMetadata } = require('@metaplex-foundation/mpl-token-metadata');
// const { Keypair } = require('@solana/web3.js');
// const bs58 = require('bs58');
// const { walletAdapterIdentity } = require('@metaplex-foundation/umi-signer-wallet-adapters');
// const { useMemo } = require('react');
// const { useWallet } = require('@solana/wallet-adapter-react');


  
//   const secretKey = bs58.decode(process.env.ADMIN_SECRET_KEY);
//   return Keypair.fromSecretKey(secretKey);
// }
  
  

//   const cluster = process.env.SOLANA_CLUSTER || 'devnet';
//   const endpoint = cluster === 'mainnet' 
//   ? 'https://api.mainnet-beta.solana.com'
//   : 'https://api.devnet.solana.com';
  
//   // const umi = createUmi(endpoint);
  
//   // const umi = useMemo(() => {

//   //  const { wallet } = useWallet();
//   //   const umi = createUmi(endpoint);

//   //   if (wallet.publicKey) {
//   //     // Use walletAdapterIdentity instead of signerIdentity
//   //     return umi.use(walletAdapterIdentity(wallet));
//   //   }

//   //   return umi;
//   // }, [   ]);




//   // umi.use(mplTokenMetadata());
  
  
//   // return { umi };
// }

// module.exports = {
//   getAdminKeypair,
//   createUmiInstance
// };