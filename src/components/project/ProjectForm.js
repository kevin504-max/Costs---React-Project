import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((error) => console.log("Error: ", error));
    }, []);

    return (
        <form className={styles.form}>
            <Input type="text" text="Project name" name="name" placeholder="Enter with the project name" />
            <Input type="number" text="Project budget" name="budget" placeholder="Enter with the total budget" />
            <Select name="category_id" text="Select the category" options={categories} />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;