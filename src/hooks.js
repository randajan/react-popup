import { useContext, useState } from 'react';
import { context } from './consts';


export const useModal = () => useContext(context)

export const usePop = props => {
    const modal = useModal();
    return useState(_ => modal.addPop(props))[0];
}