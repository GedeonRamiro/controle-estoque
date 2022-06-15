import { ReactNode } from 'react';

type Props = {
    id: string | number;
    nameBtnOpen: string | ReactNode;
    styleBtnOpen?: string;
    btnAction?: string | ReactNode;
    children: ReactNode;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const Modal = ({ id, nameBtnOpen, styleBtnOpen, btnAction, children, onClick }: Props) => {
    return (
        <div>
            <label htmlFor={`my-modal${id}`} className={styleBtnOpen}>
                {nameBtnOpen}
            </label>
            <input type='checkbox' id={`my-modal${id}`} className='modal-toggle' />

            <div className='flex items-center p-4 modal'>
                <div className='relative modal-box'>
                    {children}
                    <div className='flex items-center justify-center'>
                        <label
                            className='inline-block px-6 py-2 mx-2 text-xs font-medium leading-tight text-blue-600 uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded cursor-pointer hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
                            htmlFor={`my-modal${id}`}
                        >
                            Cancelar
                        </label>

                        {btnAction && (
                            <button onClick={onClick}>
                                <label
                                    className='inline-block  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer'
                                    htmlFor={`my-modal${id}`}
                                >
                                    {btnAction}
                                </label>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
