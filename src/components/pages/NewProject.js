import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    return (
        <div className={styles.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Register your project to add services later</p>
            <ProjectForm />
        </div>
    );
}

export default NewProject;