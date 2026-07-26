declare module "web-push" {
  interface PushSubscription {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }

  interface SendResult {
    statusCode: number;
    body: string;
  }

  function setVapidDetails(
    email: string,
    publicKey: string,
    privateKey: string
  ): void;

  function sendNotification(
    subscription: PushSubscription,
    payload: string | Buffer
  ): Promise<SendResult>;

  function generateVapidKeys(): {
    publicKey: string;
    privateKey: string;
  };

  export default {
    setVapidDetails,
    sendNotification,
    generateVapidKeys,
  };
}
