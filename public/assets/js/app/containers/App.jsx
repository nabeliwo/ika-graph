import * as React from "react";
import { Flux } from "flumpt";

export default class App extends Flux {
  subscribe() {
    // this.on("increment", () => {
    //   this.update(state => {
    //     return {};
    //   });
    // });
  }

  render(state: {}) {
    return <div>{state.memo}</div>;
  }
}
