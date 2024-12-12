import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore()
    return (
        <Segment inverted textAlign="center" vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {
                    userStore.isLoggedIn ? (
                        <>
                            <Header as='h2' inverted content='Hi there! Welcome!'></Header>
                            <Button as={Link} to='/activities' size='huge' inverted content='Take me to activities' />

                        </>
                    ) :
                        (<>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted content='Login' />
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted content='Register' />
                        </>
                        )
                }
            </Container>
        </Segment>
    )
})