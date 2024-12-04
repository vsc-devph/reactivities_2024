import { Button, Form, Segment } from "semantic-ui-react"; 
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityForm() {

    const { activityStore } = useStore()

    const { selectedActivity, closeForm,createActivity ,updateActivity,loadingMode} = activityStore

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

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loadingMode} onClick={handleSubmit} float='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} float='right' type='button' content='Cancel' />
            </Form>
        </Segment>

    )
})