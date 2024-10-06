// WalletLayout.tsx
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import WalletSection from "../main/WalletSection";

const WalletLayout = () => {
  return (
    <TonConnectUIProvider manifestUrl="https://jade-many-cricket-911.mypinata.cloud/ipfs/QmPfm6ZNMZFmJTYtdethfDgHj23ybDWwkjEu8s5JaBr7Ey">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <WalletSection />
      </div>
    </TonConnectUIProvider>
  );
};

export default WalletLayout;
