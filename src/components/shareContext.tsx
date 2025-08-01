import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Share } from "../types/share";

// eslint-disable-next-line react-refresh/only-export-components
export const useShareState = (initial: Share) => useState<Share>(initial);

// eslint-disable-next-line react-refresh/only-export-components
export const ShareContext = createContext<ReturnType<
  typeof useShareState
> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useShare = () => {
  const share = useContext(ShareContext);

  if (!share) {
    throw new Error("useShare must be used inside ShareProvider");
  }
  return share;
};

const ShareProvider = ({
  share: initialShare,
  children,
}: {
  share: Share;
  children: ReactNode;
}) => {
  const [share, setShare] = useShareState(initialShare);

  return (
    <ShareContext.Provider value={[share, setShare]}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareProvider;
