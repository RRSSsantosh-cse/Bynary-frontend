import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Detaile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const users = [
            { name: "John Doe", role: "Admin", position: "HR", email: "john@example.com", bio: "Experienced HR professional", age: 35, phone: "123-456-7890", address: { lat: 51.505, lng: -0.09 }, profileImage: "https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", workExperience: "5 years HR management", skills: "Leadership, Communication, HRM", hobbies: "Reading, Traveling" },
            { name: "Smith", role: "User", position: "Front-End", email: "jane@example.com", bio: "Passionate about UI/UX", age: 28, phone: "234-567-8901", address: { lat: 51.515, lng: -0.1 }, profileImage: "https://thumbs.dreamstime.com/b/successful-employee-desk-office-111161241.jpg", workExperience: "3 years Front-End Development", skills: "React, JavaScript, CSS", hobbies: "Gaming, Photography" },
            { name: "Sam Wilson", role: "Admin", position: "DBadmin", email: "sam@example.com", bio: "Database expert", age: 40, phone: "345-678-9012", address: { lat: 28.6139, lng: 77.2090 }, profileImage: "https://static.vecteezy.com/system/resources/previews/036/020/567/non_2x/ai-generated-portrait-of-senior-businessman-in-the-office-photo.jpg", workExperience: "10 years Database Administration", skills: "SQL, NoSQL, Database Optimization", hobbies: "Chess, Traveling" },
            { name: "David", role: "User", position: "Back-End", email: "emily@example.com", bio: "Backend developer", age: 30, phone: "456-789-0123", address: { lat: 56.1304, lng: -106.3468 }, profileImage: "https://th.bing.com/th/id/OIP.lrODV181gEQh9tI4_Og2zwHaE8?rs=1&pid=ImgDetMain", workExperience: "4 years Backend Development", skills: "Node.js, Express, MongoDB", hobbies: "Cooking, Hiking" },
            { name: "Michael Brown", role: "User", position: "QA-Intern", email: "michael@example.com", bio: "Aspiring QA engineer", age: 22, phone: "567-890-1234", address: { lat: 37.0902, lng: -95.7129 }, profileImage: "https://th.bing.com/th/id/OIP.1P2HdTo_R1dooa_t_WNcWQHaE8?rs=1&pid=ImgDetMain", workExperience: "0 years", skills: "Manual Testing, Selenium", hobbies: "Coding, Movies" }
        ];

        const foundUser = users.find(user => user.name === id);
        setUser(foundUser);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        alert("Profile updated successfully!");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.resumeContainer}>
            <div style={styles.profileSection}>
                <div style={styles.profileImage}>
                    <img src={user.profileImage} alt={user.name} style={styles.image} />
                </div>
                <div style={styles.contactDetails}>
                    <label>Name: <input type="text" name="name" value={user.name} onChange={handleInputChange} style={styles.input}/></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Role: <input type="text" name="role" value={user.role} onChange={handleInputChange} style={styles.input}/></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Position: <input type="text" name="position" value={user.position} onChange={handleInputChange}style={styles.input} /></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Email: <input type="text" name="email" value={user.email} onChange={handleInputChange} style={styles.input}/></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Bio: <input type="text" name="bio" value={user.bio} onChange={handleInputChange} style={styles.input}/></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Age: <input type="text" name="age" value={user.age} onChange={handleInputChange} style={styles.input}/></label>
                    <br></br> <br></br>
                    <br></br>
                    <label>Phone: <input type="text" name="phone" value={user.phone} onChange={handleInputChange} style={styles.input}/></label>
                </div>
            </div>

            <div style={styles.detailsSection}>
                <div style={styles.sectionTitle}>Work Experience</div>
                <label><input type="text" name="workExperience" value={user.workExperience} onChange={handleInputChange} style={styles.input}/></label>

                <div style={styles.sectionTitle}>Skills</div>
                <label><input type="text" name="skills" value={user.skills} onChange={handleInputChange} style={styles.input}/></label>

                <div style={styles.sectionTitle}>Hobbies</div>
                <label><input type="text" name="hobbies" value={user.hobbies} onChange={handleInputChange}style={styles.input} /></label>
            </div>
            
            <div style={{ marginTop: "20px" }}>
                <button style={styles.backButton} onClick={() => navigate(-1)}>Back</button>
                <button style={styles.backButton} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

const styles = {
    resumeContainer: {
        display: "flex",
        flexDirection: "column",
        margin: "20px",
    },
    backButton: {
        backgroundColor: "#007BFF",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "10px",
    },
    profileSection: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    profileImage: {
        marginBottom: "20px",
    },
    image: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    detailsSection: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
};

export default Detaile;
