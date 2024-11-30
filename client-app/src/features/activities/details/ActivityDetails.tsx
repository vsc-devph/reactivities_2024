import { Activity } from "../../../app/models/activity";
import { Card,Image, CardContent, CardDescription, CardHeader, CardMeta,  Button } from "semantic-ui-react";

interface Props {
    activity: Activity,    
    onCancelSelectActivity: () => void,
    onOpenForm: (id:string)=>void 
}

export default function ActivityDetails({activity,onCancelSelectActivity,onOpenForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span >{activity.date}</span>
                </CardMeta>
                <CardDescription>
                   {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>onOpenForm(activity.id)} basic content='Edit' color='blue'></Button>
                    <Button onClick={onCancelSelectActivity} basic content='Cancel' color='grey'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )

}