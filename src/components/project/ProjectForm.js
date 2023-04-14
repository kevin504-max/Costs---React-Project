function ProjectForm() {
    return (
        <form>
            <div>
                <input type="text" placeholder="Enter with the name project" />
            </div>
            <div>
                <input type="number" placeholder="Enter with the total budget" />
            </div>
            <div>
                <select name="category_id">
                    <option disabled selected>Select a category</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Register Project" />
            </div>
        </form>
    );
}

export default ProjectForm;