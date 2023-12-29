import { useContext } from 'react';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import NewVisitForm from '../forms/NewVisitForm';
import { IVisit } from '../../types/visit.types';
import Dialog from '../styled/DialogComponent';


function MakeVisitInDialog({ visit }: { visit: IVisit }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.visit_in ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <NewVisitForm visit={visit} />
            </Dialog>
        </>
    )
}

export default MakeVisitInDialog


