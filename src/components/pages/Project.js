import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((error) => console.log("Error: ", error))
        }, 2000);
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {project.name 
                ? (
                    <div className={styles.projectDetails}>
                        <Container customClass="column">
                            <div className={styles.detailsContainer}>
                                <h1>Project: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit Project" : "Close"}</button>
                                {!showProjectForm 
                                    ? (
                                        <div className={styles.projectInfo}>
                                            <p><span>Category:</span> {project.category.name}</p>
                                            <p><span>Total Budget:</span> U${project.budget}</p>
                                            <p><span>Total Used:</span> U${project.cost}</p>
                                        </div>
                                    ) 
                                    : (
                                        <div className={styles.projectInfo}>
                                            <p>Project Details</p>
                                        </div>
                                    )
                                }
                            </div>
                        </Container>
                    </div>
                ) 
                : (
                    <Loading />
                )
            }
        </>
    );
}

export default Project;