import { Waveform } from "@uiball/loaders";

import React from "react";

const Loader = () => {
  return (
    <div>
      <Waveform size={30} lineWeight={3.5} speed={1} color="black" />
    </div>
  );
};

export default Loader;
