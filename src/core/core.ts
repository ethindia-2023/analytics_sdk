import {
    RelayNode,
    Protocols,
    createEncoder,
    createLightNode,
    createRelayNode,
    waitForRemotePeer,
  } from "@waku/sdk";
  import { PageViewMessage } from "./proto";
  import "axios";
  import axios from "axios";
  
  const URI = "http://127.0.0.1:8645/relay/v1/messages/";
  
  interface AnalyticsSDKOptions {
    projectId: string;
  }
  
  class AnalyticsSDK {
    private projectId: string;
    private constructor(projectId: string) {
      this.projectId = projectId;
    }
  
    public static async init({
      projectId,
    }: AnalyticsSDKOptions): Promise<AnalyticsSDK> {
      const sdk = new AnalyticsSDK(projectId);
      return sdk;
    }
  
    public trackPageView({
      userWallet,
      pageUrl,
    }: {
      userWallet: string;
      pageUrl: string;
    }) {
      const contentTopic = "/waku/2/analytics/page/count/base64";
      const urlencodedTopic = encodeURIComponent(contentTopic);
      const url = URI + urlencodedTopic;
      const protoMessage = PageViewMessage.create({
        appId: this.projectId,
        userWallet,
        pageUrl,
      });
      const serialisedMessage = JSON.stringify(protoMessage.toJSON())
      axios.post(
        url,
        {
          payload: Buffer.from(serialisedMessage).toString("base64"),
          contentTopic: contentTopic,
        },
        {
          headers: {
            "content-type": "text/plain",
          },
        }
      );
    }
  }
  
  export default AnalyticsSDK;
  