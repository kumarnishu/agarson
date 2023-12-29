import { useContext } from 'react';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import StartMydayForm from '../forms/StartMyDayForm';
import Dialog from '../styled/DialogComponent';

function StartMydayDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.start_day ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <StartMydayForm />
            </Dialog>
        </>
    )
}

export default StartMydayDialog


