# @randajan/react-popup

> Simple modal windows for react

[![NPM](https://img.shields.io/npm/v/@randajan/react-popup.svg)](https://www.npmjs.com/package/@randajan/react-popup) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



## Install

```bash
npm install --save @randajan/react-popup
```

## Purpose

* Handle multiple PopUp window with css animation and single blurry background
* Handle multiple frames with PopUps in one application
* Create hook for rise accessibility and customizability


## Usage

First wrap your app into provider

```jsx

import ModalProvider, { PopUp } from '@randajan/react-popup'; 
import '@randajan/react-popup/css'; //default css

class App extends Component {
  render () {
    return (
      <ModalProvider>
        <MyComponents />
      <ModalProvider />
    )
  }
}
```

Then use it anywhere inside as element,

```html

<PopUp>
    <div>Content of PopUp window</div>
</PopUp>

```

as hook with static content

```jsx

function PopUp() {
    const Pop = ModalProvider.usePop(<div>Content of PopUp window</div>);

    useEffect(_ => Pop.up());

    return null;
}

```

or as hook with dynamic content

```jsx

function PopUp() {
    const Pop = ModalProvider.usePop();

    useEffect(_ => Pop.up(<div>Content of PopUp window</div>));

    return null;
}

```

or as hook with custom control

```jsx

function PopUpCustomButton() {
    const pop = ModalProvider.usePop({lock:true, onDown: (pop, custom) => alert(custom)});

    useEffect(_ =>{ pop.up(
        <div>
            <p>Content of PopUp window</p>
            <button onClick={_ => pop.down(true)}>Yes</button>
            <button onClick={_ => pop.down(false)}>No</button>
        </div>
    )});

    return null;
}

```



The props for __PopUp__ React Element, __Modal.usePop__ hook and open function __Pop.up__ are 1:1

## Details


### Export
name | type | arguments | return | use
--- | --- | --- | --- | ---
Provider _(default)_ | React Element | props | div container | Provider
PopUp | React Element | props | null | PopUp window occurs immidiately after render this element 
usePop | React Hook | props _or_ ReactElement | Pop | Return Pop instance !not React Component!
useModal | React Hook | - | Modal | Return Modal instance !not React Component!
cssTranslate | static | translator | - | cssTranslate(defaultClassName=>customClassName) can be used to change all default classNames


### Provider props
prop | type | use
--- | --- | ---
onChange | Function | Will be called after every change
onUp | Function | Called after any Pop was opened
onDown | Function | Called after any Pop was closed
list | Boolean | Order of Pops will be ignored
transition | Number _or_ Object | Will be passed to CSSTransition.props.timeout
closeButton | any | the default close button of every Pop
id | String | will be passed to div
title | String | will be passed to div
className | String | will be passed to div
flags | Object | on every key there should be a function. The props and state will be passed before render. When the function return true, the key will appears as part of data-flags attribute 


### Modal.usePop(props) / <PopUp {...props}/>

prop | type | use
--- | --- | ---
children* | ReactElement | Content of PopUp window
lock | Boolean | On __TRUE__ the PopUp window can't be closed manually
transition | Number _or_ Object | Will be passed to CSSTransition.props.timeout
closeButton | any | close button for the Pop
onChange | Function | Will be called after every change
onUp | Function | Called after the frame was opened
onDown | Function | Called after the frame was closed
flags | Object | _same as at provider_

_* if the children is the only argument of __usePop__ or __popUp__ it could be passed without wraping in object_

### The Pop instance
name | type | arguments | return | use
--- | --- | --- | --- | ---
Pop.up | Function | state | changelist | Will apply state changes and rise Pop window
Pop.down | Function | null | Will close the Pop window and pass any arguments to the onBogDown where you can catch them.
Pop.lock | Function | null | Will lock the Pop window
Pop.unlock | Function | null | Will unlock the Pop window

### Custom attribute "data-flags"
There are some custom attributes that will be appended to the div container. It's mirroring the state of PopUp provider
parent | name | purpose
--- | --- | ---
Modal | mounting | Waiting before first render
Modal | up | When there is at least 1 Pop pending
Modal | modal | When the list is false
Modal | list | When the list is true
Pop | lock | When the Pop is locked
Pop | top | When the Pop is the top one

_* you can specify your own flags by passing to props the flags object_



## License

MIT © [randajan](https://github.com/randajan)
