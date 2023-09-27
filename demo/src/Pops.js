import React, { useState, useEffect } from 'react'


import ModalProvider, { usePop, useModal, PopUp } from '../../dist/index';

export const Pops = ()=>{

    return (
        <ModalProvider id="TEST" onMount={_=>console.log("TEST")}>

            <PopUpElementLocked/>
            <PopUpElement/>
            <PopUpCustomButton />
            <PopUpUnlock/>
            <PopUp3s/>

        </ModalProvider>
    );

}

function PopUpElementLocked() {
    return (
        <PopUp className="TEST" lock>
            <h1>PopUpElementLocked</h1>
            Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.
        </PopUp>
    )
}

function PopUpElement() {
    return (
        <PopUp>
            <h1>PopUpElement</h1>
            Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.
        </PopUp>
    )
}

function PopUp3s() {
    const pop = usePop();

    useEffect(_ =>{ setTimeout(_=>pop.up(
        <div>
            <h1>PopUp3s</h1>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
        </div>
    ), 5000)});

    return null;
}

function PopUpCustomButton() {
    const pop = usePop({lock:true, onDown: (pop, custom) =>{ alert(custom); }});

    useEffect(_ =>{ pop.up(
        <div>
            <h1>PopUpCustomButton</h1>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <button onClick={_ => pop.down(true)}>Yes</button>
            <button onClick={_ => pop.down(false)}>No</button>
        </div>
    )});

    return null;
}

function PopUpUnlock() {
    const pop = usePop({lock:true});

    useEffect(_ =>{ pop.up(
        <div>
            <h1>PopUpUnlock</h1>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <p>Deserunt nisi dolor nulla sunt est deserunt eiusmod esse in. Deserunt nulla incididunt ad ea mollit elit culpa aute amet Lorem consequat. Do irure occaecat ea nostrud eu ut non. Exercitation in incididunt adipisicing excepteur ad do commodo anim amet magna nisi.</p>
            <button onClick={_ => pop.lock(!pop.isLock())}>{pop.isLock() ? "Unlock" : "Lock"}</button>
        </div>
    )});

    return null;
}
