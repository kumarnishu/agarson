import { useContext } from 'react';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import UpdateSummaryForm from '../forms/UpdateSummaryForm';
import { IVisitReport } from '../../types/visit.types';
import { Text } from '@rneui/base';
import Dialog from '../styled/DialogComponent';

function UpdateSummaryDialog({ visit }: { visit: IVisitReport }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog fullScreen visible={choice === VisitChoiceActions.edit_summary ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <Text style={{ textAlign: 'center', paddingTop: 20, fontWeight: 'bold', fontSize: 25 }}>{visit.party_name}</Text>
                <UpdateSummaryForm visit={visit} />
            </Dialog>
        </>
    )
}

export default UpdateSummaryDialog


