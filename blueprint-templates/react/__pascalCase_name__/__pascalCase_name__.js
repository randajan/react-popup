import React from 'react';


import jet from "@randajan/jetpack";


import cssfile from "./{{pascalCase name}}.scss";
import csslib from "../../css.js";
const css = csslib.open(cssfile);


function {{pascalCase name}} (props) {
  const { id, title, className } = props;

  const selfProps = {
    id, title,
    className:css.get("{{pascalCase name}}", className)
  }

  return (
    <div {...selfProps}>

    </div>
  );
}

export default {{pascalCase name}};
