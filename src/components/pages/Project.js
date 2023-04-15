import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((error) => console.log("Error: ", error))
        }, 2000);
    }, [id]);

    function editPost(project) {
        // Budget validation
        if(project[0].budget < project[0].cost) {
            setMessage("The total budget can't be less than the total used");
            setType("error");
            return false;
        }
        fetch(`http://localhost:5000/projects/${project[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Project updated successfully");
                setType("success");
            })  
            .catch((error) => console.log("Error: ", error))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {project.name 
                ? (
                    <div className={styles.projectDetails}>
                        <Container customClass="column">
                            {message && <Message type={type} message={message} />}
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
                                            <ProjectForm handleSubmit={editPost} btnText="Finish" projectData={project} />
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