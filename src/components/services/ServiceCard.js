import styles from "../project/ProjectCard.module.css";

import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, cost, description, handleRemove }) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }   

    return (
        <div className={styles.projectCard}>
            <h4>{name }</h4>
            <p><span>Total costs:</span> U${cost}</p>
            <p>Description: {description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}><BsFillTrashFill /> Remove</button>
            </div>
        </div>
    );
}

export default ServiceCard;