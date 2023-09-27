import React from "react";

import jet from "@randajan/react-jetpack";


class Pop {

  static defaultFlags = {
    top:p=>p.isTop(),
    lock:p=>p.state.lock
  }

  constructor(Modal, key, props) {

    jet.obj.prop.add(this, { Modal, key }, null, false, true);

    this.props = Pop.validateProps(props);
    this.state = this.fetchState();
  }

  fetchState(state) {
    return {...this.props, ...this.state, ...Pop.validateProps(state)}
  }

  setState(state, call) {
    const { up } = this.state;
    const to = this.fetchState(state);

    if (up !== to.up) {
      if (to.up) { this.fetchRunPool("onUp", to).run(); }
      else { this.fetchRunPool("onDown", to).run(...call); }
    }

    const changes = jet.map.compare(this.state, to);
    if (changes.length) {
      this.state = to;
      this.fetchRunPool("onChange", to).run(changes);
    }

    return changes;
  }

  isUp() { return this.state.up; }
  isLock() { return this.state.lock; }
  isTop() { return this.Modal.isTop(this); }

  up(state) { return this.setState({...Pop.validateProps(state), up:true}); }
  down(...call) { return this.setState({up:false}, call); }
  lock(lock) { return this.setState({lock}); }
  unlock(lock) { return this.setState({lock:lock === false}); }

  fetchRunPool(key, state) {
    const pool = jet.rupl(this);
    pool.add(this.Modal[key].run.bind(this.Modal[key]), this.props[key], state[key]);
    return pool;
  }

  static create(...args) {
      return new Pop(...args)
  }

  static validateProps(props) {
    return (jet.str.is(props) || jet.rele.is(props)) ? { children: props } : jet.obj.tap(props);
  }

}

export default Pop;
