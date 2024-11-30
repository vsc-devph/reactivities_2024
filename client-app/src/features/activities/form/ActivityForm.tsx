import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined,
    onCloseForm: () => void,
    onCreateOrEdit: (activity: Activity) => void,
}

export default function ActivityForm({ activity: selectedActivity, onCloseForm ,onCreateOrEdit}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState)

    function handleSubmit(){
        onCreateOrEdit(activity)
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value} = event.target
        setActivity({...activity,[name]:value})
    }

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button onClick={handleSubmit} float='right' positive type='submit' content='Submit' />
                <Button onClick={onCloseForm} float='right' type='button' content='Cancel' />
            </Form>
        </Segment>

    )
}