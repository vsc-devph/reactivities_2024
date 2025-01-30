import { Formik, Form, ErrorMessage } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const { userStore } = useStore()


    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch((error) => 
                setErrors({ error: error.response.data }))}
        >
            {({ handleSubmit, isSubmitting,errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content='Login to Reactivities' color='teal' textAlign='center' />
                    <TextInput placeholder='Email' name='email' />
                    <TextInput placeholder='Password' name='password' type='password' autocomplete="off" />
                    <ErrorMessage 
                        name='error'
                        render = {
                            ()=> <Label style={{marginBottom:10}} basic color='red' content = {errors.error}></Label>
                        }
                        
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})