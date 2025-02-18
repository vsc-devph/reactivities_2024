import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
    const { commonStore } = useStore()

    return (
        <Container>
            <Header content='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {
                commonStore.error && (
                    <Segment>
                        <Header as='h4' color='teal' content='Stack trace' />
                        <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                    </Segment>
                )
            }
        </Container>
    )
})