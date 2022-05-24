const Spinner = () => {
    return (
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <div
                className='inline-block w-8 h-8 text-blue-500 bg-current rounded-full opacity-0 spinner-grow'
                role='status'
            >
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
