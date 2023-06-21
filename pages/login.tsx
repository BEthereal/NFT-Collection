import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Login.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Login: NextPage = () => {
  const { program } = useProgram("GGakWqrm8XHS9knk943YuEEEciXTnhFgn9EPeR4ES29q", "nft-drop");
  const { mutateAsync: claim, isLoading} = useClaimNFT(program);
  const { data: conditions, isLoading: conditionIsLoading} = useClaimConditions(program);
  // const { data: metadata, isLoading: metadataIsLoading } = useProgramMetadata(program);
  const { publicKey } = useWallet();

  return (
    <div className={styles.page}>
      <div className={styles.header}><WalletMultiButtonDynamic /></div>
      <br/>
      <div>
        <Image
          width={200}
          height={200}
          src="/logo.png"
          className={styles.icon}
          alt="logo"
        />
        <h1 className={styles.h1}>Welcome to NFT Collection</h1>
        {!publicKey ? (<p>Connect Your Wallet.</p>) : (
          <>
          {/* <div> <button className={styles.btn} onClick={() => {}}>Login</button> <p>You can only login if you own an NFT.</p> </div> */}
        <button className={styles.btn} disabled={isLoading} onClick={() => claim({amount: 1})}>Claim 1 NFT</button>
        {conditionIsLoading ? (<p>?/?</p>) : (
        <p>{conditions?.totalAvailableSupply}/{conditions?.claimedSupply}</p>)}
        </>
        )}
      </div>
    </div>
  );
};

export default Login;