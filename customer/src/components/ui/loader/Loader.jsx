import { HashLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className={'h-screen w-screen flex justify-center items-center'}>
            <HashLoader size={75} color={'#ff5012'} speedMultiplier={2} />
        </div>
    )
}

export default Loader
