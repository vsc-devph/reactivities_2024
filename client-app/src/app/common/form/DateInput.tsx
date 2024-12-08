import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker  from "react-datepicker";

interface Props {
    name: string; 
    placeholder: string;
    showTimeSelect: boolean;
    timeCaption:string;
    dateFormat:string;
    type?: string;
    showLabel?: boolean;
}

export default function DateInput(props: Props) {

    const [field, meta, helpers] = useField(props.name!)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={field.value && new Date(field.value) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}