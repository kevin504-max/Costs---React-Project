import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';  

import Message from '../layout/Message';
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

import styles from './Projects.module.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    const location = useLocation();
    console.log(location);
    let message = '';

    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((error) => console.log("Error: ", error));
        }, 3000);
    }, []);

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Register a new project" />
            </div>
            {message && <Message type="success" message={message} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) =>( 
                        <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>No project!</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;