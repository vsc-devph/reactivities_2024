import { Button, Container, Menu } from "semantic-ui-react";
import { Activity } from "../models/activity";

interface Props {
    onOpenForm: () => void
}

export default function NavBar({onOpenForm}:Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={({marginRight:'10px'})}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={onOpenForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}