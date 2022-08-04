import React, { useState } from 'react'
import AuthModal from '../../../../components/ui/modals/authModal/AuthModal'
import NonExistUser from './NonExistUser/NonExistUser'
import ExistUser from './ExistUser/ExistUser'
import NonExistUserSc from '../loginModal/authSocial/NonExistUserSC/NonExistUserSc'

const VerifyModal = ({ open, setOpen, setStep, step, exist, sc }) => {
    const [stepSc, setStepSc] = useState(false)
    return (
        <AuthModal open={open} setOpen={setOpen} setStep={setStep}>
            {!sc ? (
                <>
                    {exist ? (
                        <ExistUser
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                        />
                    ) : (
                        <NonExistUser
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                        />
                    )}
                </>
            ) : (
                <>
                    {stepSc ? (
                        <ExistUser
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                            stepSc={stepSc}
                            sc={sc}
                        />
                    ) : (
                        <NonExistUserSc
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                            setStepSc={setStepSc}
                        />
                    )}
                </>
            )}
        </AuthModal>
    )
}

export default VerifyModal
