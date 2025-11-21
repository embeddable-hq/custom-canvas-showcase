import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "em-beddable": {
        "base-url": string;
        token: string;
        "client-context"?: string;
      };
    }
  }
}
