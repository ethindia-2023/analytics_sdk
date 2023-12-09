import { useEffect } from "react";
import AnalyticsSDK from "../core/core";

interface RequireType {
  pageTitle: string;
  element: JSX.Element;
  sdk: AnalyticsSDK;
}

function TrackableComponent({
  element,
  sdk,
  pageTitle,
}: RequireType): JSX.Element {
  useEffect(() => {
    console.log("AnalRoute");
    console.log(element);
    // @ts-ignore
    if (window.ethereum && window.ethereum.isConnected()) {
      // @ts-ignore
      window.ethereum
        .request({
          method: "eth_accounts",
          params: [],
        })
        .then((accounts: string[]) => {
          sdk.trackPageView({
            pageUrl: pageTitle,
            userWallet: accounts[0],
          });
        });
    } else {
      sdk.trackPageView({
        pageUrl: pageTitle,
        userWallet: "",
      });
    }
    return () => {
      // cleanup function
    };
  }, [
    //props
    element,
  ]);

  return element;
}

export default TrackableComponent;
