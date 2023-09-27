import React, { useState } from 'react';

import jet from "@randajan/react-jetpack";

import Provider from "../Components/Provider/Provider";
import Pop from "./Pop";

class Modal {

    static use() { return Provider.use().Modal; }

    static usePop(props) {
        const modal = Modal.use();
        return useState(_ => modal.addPop(props))[0];
    }

    constructor(Provider) {

        jet.obj.prop.add(this, {
            Provider,
            onChange: jet.rupl(this),
            onUp: jet.rupl(this),
            onDown: jet.rupl(this),
            pops: {}
        }, null, false, true);

        jet.obj.prop.add(this.pops, {
            all: jet.pool(Pop),
            up: jet.pool(Pop),
        }, null, false, true);

        this.onUp.add((scene, pop) => scene.pops.up.add(pop));
        this.onDown.add((scene, pop) => scene.pops.up.rem(pop));

    }

    addPop(props) {
        const { x, transition } = this.Provider.props;
        const { all } = this.pops;
        const pop = Pop.create(this, all.length, {x, transition, ...Pop.validateProps(props)});
        all.add(pop);
        return pop;
    }

    getTop() { return this.pops.up[this.pops.up.length - 1]; }
    isTop(pop) { return this.getTop() === pop; }
    isUp(pop) { return pop ? this.pops.up.has(pop) : !!this.pops.up.length; }

    addOnDomUpdate(callback) { setTimeout(_ => window.requestAnimationFrame(callback)); }
    addOnDomLoad(callback) {
        if (document.readyState === 'complete') { this.addOnDomUpdate(callback); }
        else { window.addEventListener('load', _ => this.addOnDomUpdate(callback)); }
    }

    addOnChange(...any) { this.onChange.add(...any); return _ => this.onChange.rem(...any); }
    addOnUp(...any) { this.onUp.add(...any); return _ => this.onUp.rem(...any); }
    addOnDown(...any) { this.onDown.add(...any); return _ => this.onDown.rem(...any); }

}

export default Modal;
