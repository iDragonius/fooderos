import { HashLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div
            className={
                'h-screen w-screen absolute  top-0 bottom-0 right-0 left-0 flex justify-center items-center '
            }
        >
            <HashLoader size={75} color={'#067cff'} speedMultiplier={2} />
        </div>
    )
}

export default Loader
