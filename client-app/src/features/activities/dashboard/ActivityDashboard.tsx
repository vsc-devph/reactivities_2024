import { Grid, List } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import ActivityList from "./ActivityList"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    onSelectActivity: (id: string) => void,
    onCancelSelectActivity: () => void,
    editMode: boolean,
    onOpenForm: (id: string) => void,
    onCloseForm: () => void,
    onCreateOrEdit : (activity:Activity) => void,
    onDeleteActivity : (id:string) => void,
    submitting: boolean
}

export default function ActivityDashboard({ activities, selectedActivity, onSelectActivity, onCancelSelectActivity,editMode, onOpenForm, onCloseForm,onCreateOrEdit, onDeleteActivity,submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>

                <ActivityList 
                    activities={activities} 
                    onSelectActivity={onSelectActivity}
                    onDeleteActivity = {onDeleteActivity}
                    submitting={submitting}
                     />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        onCancelSelectActivity={onCancelSelectActivity}
                        onOpenForm={onOpenForm}
                    />}
                {editMode &&
                    <ActivityForm submitting={submitting} activity={selectedActivity} onCloseForm={onCloseForm} onCreateOrEdit={onCreateOrEdit} />
                }
            </Grid.Column>
        </Grid>

    )
}