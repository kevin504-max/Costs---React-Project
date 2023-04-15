import { pasrse, v4 as uuidv4 } from 'uuid';

import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../services/ServiceForm';


function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServicesForm, setShowServicesForm] = useState(false);
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
        setMessage('');

        // Budget validation
        console.log(project[0].budget, project[0].cost)
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

    function createService() {
        setMessage('');

        // Last service
        const lastService = project.services[project.services.length - 1];
        
        console.log('services', project.services);
        lastService.id = uuidv4();
        
        const lastServiceCost = lastService.cost;
        
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
        console.log(project.cost);

        // Maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage("Budget exceeded! Verify the total budget and try again.");
            setType("error");
            project.services.pop();
            return false;
        }

        // Add service cost to project total cost
        project.cost = newCost;

        // Update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                // show services
                console.log(data);
            })
            .catch((error) => console.log("Error: ", error));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServicesForm() {
        setShowServicesForm(!showServicesForm);
    }
console.log(project)
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
                            <div className={styles.servicesFormContainer}>
                                <h2>Add a service:</h2>
                                <button className={styles.btn} onClick={toggleServicesForm}>
                                    {!showServicesForm ? "Add Service" : "Close"}
                                </button>
                                <div className={styles.projectInfo}>
                                    {showServicesForm && (
                                        <ServiceForm handleSubmit={createService} btnText={"Add service"} projectData={project} />
                                    )}
                                </div>
                            </div>
                            <h2>Services</h2>
                            <Container customClass="start">
                                <p>Itens's services</p>
                            </Container>
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