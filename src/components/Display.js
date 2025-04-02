import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";
const Display = () => {
    const users = [
        { name: "John Doe", role: "Admin", position: "HR", email: "john@example.com", bio: "Experienced HR professional", age: 35, phone: "123-456-7890", address: { lat: 51.505, lng: -0.09 },profileImage:"https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" },
        { name: "Smith", role: "User", position: "Front-End", email: "jane@example.com", bio: "Passionate about UI/UX", age: 28, phone: "234-567-8901", address: { lat: 51.515, lng: -0.1 },profileImage:"https://thumbs.dreamstime.com/b/successful-employee-desk-office-111161241.jpg" },
        { name: "Sam Wilson", role: "Admin", position: "DBadmin", email: "sam@example.com", bio: "Database expert", age: 40, phone: "345-678-9012" ,address: { lat: 28.6139, lng: 77.2090 },profileImage:"https://static.vecteezy.com/system/resources/previews/036/020/567/non_2x/ai-generated-portrait-of-senior-businessman-in-the-office-photo.jpg"},
        { name: "David", role: "User", position: "Back-End", email: "emily@example.com", bio: "Backend developer", age: 30, phone: "456-789-0123",profileImage:"https://th.bing.com/th/id/OIP.lrODV181gEQh9tI4_Og2zwHaE8?rs=1&pid=ImgDetMain" },
        { name: "Michael Brown", role: "User", position: "QA-Intern", email: "michael@example.com", bio: "Aspiring QA engineer", age: 22, phone: "567-890-1234",address: { lat: 37.0902, lng: -95.7129 },profileImage:"https://th.bing.com/th/id/OIP.1P2HdTo_R1dooa_t_WNcWQHaE8?rs=1&pid=ImgDetMain" }
    ];

    const [selectedUser, setSelectedUser] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("name");
    const [fullProfile, setFullProfile] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [progress, setProgress] = useState(0); 
    const [backgroundGray, setBackgroundGray] = useState(false); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate("/"); 
    };

    const handleNameClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseCard = () => {
        setSelectedUser(null);
        setFullProfile(null);
        setMapVisible(false);
        setButtonClicked(false);
    };

    const handleFullProfile = () => {
        setFullProfile(selectedUser);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const filteredUsers = users.filter((user) => {
        return user[filterBy].toLowerCase().includes(searchTerm.toLowerCase());
    });


    const handleSummaryClick = () => {
        if (!fullProfile?.address?.lat || !fullProfile?.address?.lng) {
            alert("Latitude and Longitude not found");
            return;
        }
        setMapVisible(true);
    };
  
    const handleDetailProfile = (userId) => {
        setIsLoading(true);
        setBackgroundGray(true); 

        let progressInterval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(progressInterval);
                    navigate(`/detail/${userId}`); 
                    setIsLoading(false); 
                    setBackgroundGray(false); 
                    return 100;
                }
                return oldProgress + 10; 
            });
        }, 100); 
    };
    return (
        
        <>
            <style>
                {`
                /* Your existing styles here */
                .map-container {
                    position: absolute  ;
                    left: 260px;
                    top: 3px;
                    width: 400px;
                    height: 5px;
                 
                    
                }
                `}
            </style>
            <style>
                {`
                .table-container {
                    text-align: center;
                    margin: 20px;
                    position: relative;
                }
                .search-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .search-icon {
                    cursor: pointer;
                    font-size: 20px;
                    margin-right: 10px;
                }
                .search-input {
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    display: ${searchVisible ? "inline-block" : "none"};
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.1);
                    z-index: 1;
                }
                .card {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    padding: 20px;
                    width: 300px;
                    position: absolute;
                    top: 90%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 2;
                }
                .card button {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .card button:hover {
                    background-color: #0056b3;
                }
                .name-container {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                }
                .name-container:hover::after {
                    content: "Explore more";
                    position: absolute;
                    left: 100%;
                    margin-left: 10px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 5px;
                    border-radius: 5px;
                    font-size: 12px;
                }
                .cardu {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    padding: 30px;
                    height: 700px;
                    width: 700px;
                    position: absolute;
                    top: 120%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 2;
                }
                .crd {
                    position: relative;
                    left: -240px;
                    padding: 10px;
                    margin-top: 10px;
                    font-size: 15px;
                }
                       .overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.1);
                        z-index: 1;
                    }
                .cardu button {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    position: relative;
                    top: 100px;
                }
                .cardu button:hover {
                    background-color: #0056b3;
                }
                .summary-button {
                position:relative;
                margin:90px;
                    padding: 10px 20px;
                    background-color: ${buttonClicked ? '#d3d3d3' : '#007bff'};
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .summary-button:hover {
                    background-color: ${buttonClicked ? '#a9a9a9' : '#0056b3'};
                }
                    td img{
                    position:relative;
                    top:9px;
                    width:60px;
                    height:50px;
                    border-radius:50%;
                    margin:0;
                    }
                    .card img {
                     position:relative;
                    top:9px;
                    width:60px;
                    height:50px;
                    border-radius:50%;
                    margin:0;
                    }
                    .crd img 
                { position:relative;
                    top:9px;
                    width:60px;
                    height:50px;
                    border-radius:50%;
                    margin:0;
                    }
                    .progress-bar {
                    position:absolute;
                    width: 80%;
                    background-color: #ddd;
                    height: 25px;
                    border-radius: 5px;
                    overflow: hidden;
                 
                }
           
                .progress {
                
                    height: 100%;
                    background-color: #4caf50;
                    width: ${progress}%;
                    transition: width 0.1s;
                }
                    .loading-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.2); /* Gray background */
                        z-index: 5;
                    }
                        .logout-button {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background-color: #dc3545;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .logout-button:hover {
                    background-color: #c82333;
                }
                        
                
                `}
            </style>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {backgroundGray && <div className="loading-overlay"></div>}
            <div className="table-container">
                
                <div className="search-container">
                    <FaSearch className="search-icon" onClick={toggleSearch} />
                    <select 
                        value={filterBy} 
                        onChange={(e) => setFilterBy(e.target.value)} 
                        style={{ padding: '8px', marginRight: '10px' }}
                    >
                        <option value="name">Name</option>
                        <option value="position">Position</option>
                        <option value="email">Email</option>
                        <option value="role">Role</option>
                    </select>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <h2>User Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
           
                            <th>Position</th>
                            <th>Email ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                
                                <td>
                                    <span className="name-container" onClick={() => handleNameClick(user)}>
                                    <img src={user.profileImage} />
                                        {user.name}
                                        </span>
                                </td>
                         
                                <td>{user.position}</td>
                                <td>{user.email}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedUser && (
                    <>
                        <div className="overlay" onClick={handleCloseCard}></div>
                        <div className="card">
                            <img src={selectedUser.profileImage} alt="Profile" />
                            <h3>{selectedUser.name}</h3>
                            <p>Email: {selectedUser.email}</p>
                            <button onClick={handleFullProfile}>Full Profile</button>
                        
                              
                                
                        </div>
                    </>
                )}

                {fullProfile && (
                    <>
                        <div className="overlay" onClick={handleCloseCard}></div>
                        <div className="cardu">
                        {isLoading && (
                    <div className="loading-overlay">
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                )}
                            <div className="crd">
                                <img src={fullProfile.profileImage} alt="Profile" />
                                <h3>{fullProfile.name}</h3>
                                <p>Bio: {fullProfile.bio}</p>
                                <p>Age: {fullProfile.age}</p>
                                <p>Phone: {fullProfile.phone}</p>
                                <p>Email: {fullProfile.email}</p>
                            </div>
                            <button onClick={() => handleDetailProfile(fullProfile.name)}>Detail Profile</button>
                            <button className="summary-button" onClick={handleSummaryClick}>Summary</button>
                            {mapVisible && fullProfile && (
                    
                    <div className="map-container">
                       <h2>Location</h2>
                        <MapContainer
                            center={[fullProfile.address.lat, fullProfile.address.lng]}
                            zoom={13}
                            scrollWheelZoom={false}
                            style={{ width: "100%", height: "400px" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                position={[fullProfile.address.lat, fullProfile.address.lng]}
                                icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}
                            >
                                <Popup>
                                    <h3>{fullProfile.name}</h3>
                                    <p>{fullProfile.role}</p>
                                    <p>{fullProfile.email}</p>
                                </Popup>
                            </Marker>
                        </MapContainer>
                       
                    </div>
                )}
                        </div>
                    </>
                )}
             
            </div>
        </>
    );
};

export default Display;
