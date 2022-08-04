import styles from '../../LoginModal.module.scss'
import facebook from '../../../../../../assets/img/facebook.svg'
import FacebookAuth from 'react-facebook-auth'
const FacebookButton = ({ onClick }) => (
    <div className={styles.socialNetwork} onClick={onClick}>
        <button>
            <img src={facebook} alt="facebook" />
        </button>
    </div>
)

const Facebook = () => {
    const authenticate = (response) => {
        console.log(response)
    }
    return (
        <FacebookAuth
            appId="1184179632373415"
            callback={authenticate}
            component={FacebookButton}
        />
    )
}

export default Facebook
