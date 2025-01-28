import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import useQuery from "../../app/util/hooks";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function RegisterSuccess() {
    const email = useQuery().get('email') as string

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success("Verification email sent. Please check inbox of your email.")
        }).catch(error => console.log(error))
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon color='green'>
                <Icon name='check'/>
                Succesfully registered!
            </Header>
            <p>Please check inbox(or spam) of your email to verify your account.</p>
            {
                email && 
                <>
                    <p>Didn't receive the email?</p>
                    <Button primary onClick={handleConfirmEmailResend} content='Resend email' size='huge' />
                </>
            }
        </Segment>
    )
}