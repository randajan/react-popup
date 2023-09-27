import React from "react";
import { createRoot } from 'react-dom/client';

import { info, log } from "@randajan/simple-lib/web";
import jet from "@randajan/jet-core";
import Provider, { PopUp, usePop, cssTranslate } from "../../dist/index.js";
import css from "../../dist/index.css";
import { Pops } from "./Pops.js";

cssTranslate(c=>{
    console.log(c);
    return "x-"+c;
});

const root = document.getElementById("root");

createRoot(root).render(
    <Provider onChange={(...a)=>console.log("PROVIDER CHANGE", ...a)}>
        <Pops/>
    </Provider>
);




window.jet = jet;