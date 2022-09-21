import { useEffect, useState } from 'react';
import styles from './CreatePage.module.scss';
import * as Yup from "yup";
import { useFormik } from 'formik';
import TextInput from '@components/UI/inputs/textInput/textInput';
import DateTimePicker from '@components/UI/inputs/dateTimePicker/dateTimePicker';
import FileInput from '@components/UI/inputs/fileInput/fileInput';
import moment from 'moment';
import { DateFormats } from '@source/utils/date';
import Button from '@components/UI/buttons/button/button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@source/utils/routes';

const CreatePage = () => {
  const router = useHistory();

  const validateSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
  });

  const mainFormik = useFormik({
    validationSchema: validateSchema,
    validateOnChange: true,
    validateOnBlur: true, 
    initialValues: {
      eventName: "",
      hostName: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
    },
    onSubmit: async () => {
      handleFormikSubmit();
    }
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if(mainFormik.isSubmitting && mainFormik.errors) {
      const invalidInput = document.querySelector(`[name="${Object.keys(mainFormik.errors)[0]}"`)
      invalidInput?.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
    }
  }, [mainFormik.isSubmitting, mainFormik.errors])

  const handleFormikSubmit = () => {
    console.log("mainFormik.values", mainFormik.values);
  }

  const onResetForm = () => {
    mainFormik.resetForm();
  }

  const handleStartDate = (date: Date) => {
    mainFormik.setFieldValue("startDate", date)
  }

  const handleEndDate = (date: Date) => {
    mainFormik.setFieldValue("endDate", date)
  }

  const onSetFile = (file: File | null) => {
    setFile(file);
  }

  const onDeleteFile = () => {
    setPreview(null);
    return null;
  }

  const onCancel = () => {
    router.push(ROUTES.Landing);
  }

  const {errors, values, touched, handleBlur, handleChange, handleSubmit} = mainFormik;
  return(
    <div className={styles.createPage}>
      <div className={styles.content}>
        <form className={styles.form}>
          <TextInput
            id="eventName"
            label="Event Name"
            className={styles.form_input}
            value={values.eventName}
            touched={touched.eventName}
            error={errors.eventName} 
            handleChange={handleChange} 
          />

          <TextInput 
            id="hostName" 
            label="Host Name"
            className={styles.form_input}
            value={values.hostName}
            touched={touched.hostName}
            error={errors.hostName} 
            handleChange={handleChange} 
          />

          <DateTimePicker 
            label="Start Date"
            className={styles.form_input}
            value={values.startDate} 
            maxDate={new Date()}
            placeholder="Select date"
            onChange={handleStartDate} 
          />

          <DateTimePicker 
            label="End Date"
            className={styles.form_input}
            value={values.endDate} 
            maxDate={new Date()}
            placeholder="Select date"
            onChange={handleEndDate} 
          />

          <TextInput 
            id="location" 
            label="Location"
            className={styles.form_input}
            value={values.location}
            touched={touched.location}
            error={errors.location} 
            handleChange={handleChange} 
          />

          <FileInput
            className={styles.file_input}
            selectedFile={file} 
            setSelectedFile={onSetFile} 
            onDeleteFile={onDeleteFile} 
            preview={preview} 
            loading={false}
          />
        </form>
      </div>

      <div className={styles.form_btns} >
        <Button
          className={styles.cancelBtn}
          onClick={onCancel}
          size="small"
        >
          Cancel
        </Button>

        <Button 
          event="submit"
          onClick={handleSubmit}
          className={styles.form_btn} 
          isLoading={false}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default CreatePage;