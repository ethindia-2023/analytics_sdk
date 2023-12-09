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

interface AnalyticsSDKOptions {
  projectId: string;
  URI: string;
}

class AnalyticsSDK {
  private projectId: string;
  private URI: string;
  private constructor(projectId: string, URI: string) {
    this.projectId = projectId;
    this.URI = URI;
  }

  public static async init({
    projectId,
    URI,
  }: AnalyticsSDKOptions): Promise<AnalyticsSDK> {
    const sdk = new AnalyticsSDK(projectId, URI);
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
    const url = this.URI + urlencodedTopic;
    const protoMessage = PageViewMessage.create({
      appId: this.projectId,
      userWallet,
      pageUrl,
    });
    const serialisedMessage = JSON.stringify(protoMessage.toJSON());
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

  public trackTransaction(
    appId: string,
    txHash: string,
    rpc: string,
    addtionalOptions?: Object
  ) {
    const contentTopic = "/waku/2/analytics/tx/index/base64";
    const urlencodedTopic = encodeURIComponent(contentTopic);
    const url = this.URI + urlencodedTopic;
    const serialisedMessage = JSON.stringify({
      appId: appId,
      txHash,
      rpc,
      addtionalOptions,
    });
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
