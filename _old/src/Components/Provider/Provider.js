import React, { Component, useContext} from 'react';

import { TransitionGroup, CSSTransition } from "react-transition-group";

import jet from "@randajan/react-jetpack";

import Modal from "../../Mods/Modal";
import Pop from "../../Mods/Pop";

import cssfile from "../../pu.scss";
import csslib from "../../css";

const css = csslib.open(cssfile);

const CNTransitions = {};
["appear", "appearActive", "appearDone", "enter", "enterActive", "enterDone", "exit", "exitActive", "exitDone"].map(v=>
  CNTransitions[v] = css.get(v).toString()
);

class Provider extends Component {

  static Context = React.createContext();

  static use() { return useContext(Provider.Context); }

  static defaultProps = {
    transition:800,
    list:false,
    x:"✖"
  }

  static defaultFlags = {
    up:p=>p.Modal.isUp(),
    load:p=>p.state.load,
    modal:p=>!p.props.list,
    list:p=>p.props.list,   
  };

  constructor(props) {
    super(props);
    jet.obj.prop.add(this, "Modal", new Modal(this, props));
    this.cleanUp = jet.rupl();
    this.state = {
      load:true,
    }
  }

  actualize(direction) {
    this.cleanUp.run();
    if (direction !== false) { 
      const { onChange, onUp, onDown } = this.props;
      this.cleanUp.flush();
      this.cleanUp.add(
        this.Modal.addOnChange(_ => this.forceUpdate(), onChange), 
        this.Modal.addOnUp(onUp), 
        this.Modal.addOnDown(onDown)
      );
    }
  }

  componentDidMount() {
    this.actualize(true);
    this.Modal.addOnDomLoad(_ => this.setState({load:false}));
  }

  componentDidUpdate() { this.actualize(); }
  componentWillUnmount() { this.actualize(false); }

  setState(state) {
    const { onLoad } = this.props;
    const { load } = this.state;
    const to = {...this.state, ...state};

    if (jet.map.compare(this.state, to).length) {
      super.setState(to);
      if (load !== to.load && !to.load) { jet.fce.run(onLoad, this.Modal); }
    }
  }

  fetchSelfProps() {
    const props = {...this.props};
    const { className, flags } = props;

    ["children", "flags", "list", "x", "transition", "onChange", "onUp", "onDown", "onLoad"].map(p=>delete props[p]);
    return {
      ...props, 
      ref:body=>this.body =body,
      className:css.get("Modal", className),
      "data-flags":jet.rele.flags({...Provider.defaultFlags, ...flags}, this)
    }
  }


  fetchPopsProps() {
    return {
      className:css.get("pops"),
      children: this.state.load ? undefined : this.fetchPops()
    }
  }

  fetchPops() {
    return Array.from(this.Modal.pops.up).map(this.fetchPop.bind(this));
  }


  fetchPop(pop) {
    const { id, className, title, transition, x, flags } = pop.props;
    const { lock, children } = pop.state;

    return (
      <CSSTransition key={pop.key} timeout={transition} classNames={CNTransitions} appear>
        <div {...{
          id, className, title,
          className:css.get("Pop", className),
          "data-flags":jet.rele.flags({...Pop.defaultFlags, ...flags}, pop)
        }}>
          <nav className={css.get("nav")}>
            <div className={css.get("bogdown")} onClick={lock?null:pop.down.bind(pop)}>{x}</div>
          </nav>
          <div className={css.get("content")}>
            {children}
          </div>
          <div className={css.get("mist")} />
        </div>
      </CSSTransition>
    )
  }

  render() {

    return (
      <Provider.Context.Provider value={this}>
        <div {...this.fetchSelfProps()}>
          {this.props.children}
          <div className={css.get("cover")}>
            <div className={css.get("mist")}/>
            <TransitionGroup {...this.fetchPopsProps()}/>
          </div>
        </div>
      </Provider.Context.Provider>
    );
  }
}

export default Provider;
