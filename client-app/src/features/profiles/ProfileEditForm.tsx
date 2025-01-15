import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite"; 
import { Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../../app/common/form/TextArea";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore()

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name is required.'),

    })

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                displayName: profile?.displayName, 
                bio: profile?.bio
            }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}>
            {({  isSubmitting,isValid, dirty }) => (

                <Form className="ui form" autoComplete="off">
                    <TextInput placeholder="Display Name" name='displayName' />
                    <TextArea rows={3} name='bio' placeholder={""} />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})