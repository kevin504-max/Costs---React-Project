import { Link } from 'react-router-dom';

import styles from './ProjectCard.module.css';

import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({ id, name, budget, category, handleRemove }) {
    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span >Budget:</span> U${budget}
            </p>
            <p className={styles.categoryText}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to="/"><BsPencil /> Edit</Link>
                <button><BsFillTrashFill /> Remove</button>
            </div>
        </div>
    );
}

export default ProjectCard;