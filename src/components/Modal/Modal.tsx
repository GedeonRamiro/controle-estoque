import { ReactNode } from 'react';

type Props = {
    id: string;
    open: string | ReactNode;
    btnAction: string;
    children: ReactNode;
};

const Modal = ({ id, open, btnAction, children }: Props) => {
    return (
        <div>
            <label htmlFor={`my-modal${id}`} className='cursor-pointer'>
                {open}
            </label>
            <input type='checkbox' id={`my-modal${id}`} className='modal-toggle' />
            <div className=' modal'>
                <div className='relative modal-box'>
                    {children}
                    <div className='flex justify-center modal-action'>
                        <a href={`#`}>
                            <label
                                htmlFor={`my-modal${id}`}
                                className='btn btn-sm sm:btn btn-ghost sm:btn-ghost'
                            >
                                Cancelar
                            </label>
                        </a>
                        <button className='btn btn-sm sm:btn'>{btnAction}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
