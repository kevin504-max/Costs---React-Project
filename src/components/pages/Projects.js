import { useLocation } from 'react-router-dom';

import Message from '../layout/Message';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';

import styles from './Projects.module.css';

function Projects() {
    
    const location = useLocation();
    console.log(location);
    let message = '';

    if(location.state) {
        message = location.state.message;
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Register a new project" />
            </div>
            {message && <Message type="success" message={message} />}
            <Container customClass="start">
                <p>Projects...</p>
            </Container>
        </div>
    );
}

export default Projects;