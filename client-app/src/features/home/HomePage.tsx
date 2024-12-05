import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage(){
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home</h1>
            <h3>Go to <Link to='/activities' content="activities">activities</Link> </h3>
        </Container>
    )
}