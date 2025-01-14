import { Tab, TabPane } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite"; 
import { Profile } from "../../app/models/profile";

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({ profile }: Props) {
    const panes = [
        { menuItem: 'About', render: () => <TabPane>About COntent</TabPane> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <TabPane>Event COntent</TabPane> },
        { menuItem: 'Followers', render: () => <TabPane>Follower COntent</TabPane> },
        { menuItem: 'Following', render: () => <TabPane>Following COntent</TabPane> }
    ]
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
        />
    )
})