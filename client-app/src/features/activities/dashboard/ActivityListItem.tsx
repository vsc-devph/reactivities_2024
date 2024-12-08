import { Link } from "react-router-dom";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='assets/user.png'></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Meta>{format(activity.date!,'dd MMM yyyy h:mm:aa')}</Item.Meta>
                            <Item.Description>  by </Item.Description>
                            <Item.Extra>
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!,'dd MMM yyyy h:mm:aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
                <Button
                   name={activity.id}
                   
                   floated='right'
                   content='Delete'
                   color='red' />
            </Segment>
        </Segment.Group>
    )
}