import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState([projectData || {}]);

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

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleSelect(e) {
        setProject({ 
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,   
            }, 
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Project name" name="name" placeholder="Enter with the project name" handleOnChange={handleChange} value={project[0].name ? project[0].name : ''} />
            <Input type="number" text="Project budget" name="budget" placeholder="Enter with the total budget" handleOnChange={handleChange} value={project[0].budget ? project[0].budget: ''} />
            <Select name="category_id" text="Select the category" options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;