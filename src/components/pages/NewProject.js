import{ useNavigate } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                // redirect
                navigate('/projects', { state: { message: "Project created successfully!" } });
            })
            .catch((error) => console.log("Error: ", error));
    }

    return (
        <div className={styles.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Register your project to add services later</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project" />
        </div>
    );
}

export default NewProject;