<?php
session_start();
include("connect.php");

$firstName = "John";
$lastName = "Doe";


if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];


    $query = mysqli_query($conn, "SELECT firstnam, lastnam FROM `users` WHERE email='$email'");
    
    
    if ($row = mysqli_fetch_assoc($query)) {
        $firstName = $row['firstnam'];
        $lastName = $row['lastnam'];
    }
}
?>





    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Swap Store - Home</title>
        <link rel="stylesheet" href="home-styles.css">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <header>
            <nav class="main-nav">
                <div class="logo">The Swap Store</div>
                <div class="search-bar">
                    <input type="text" id="search-input" placeholder="Search...">
                    <button type="submit" id="search-button"><i class="fas fa-search"></i></button>
                </div>
                <div class="nav-buttons">
                    <a href="user-index.php" class="nav-button"><i class="fas fa-user"></i> Profile</a>
                    <a href="aboutus-index.html" class="nav-button"><i class="fas fa-envelope"></i> Contact Us</a>
                </div>
            </nav>
            <nav class="category-nav">
                <button class="category-button active" data-category="all">All</button>
                <button class="category-button" data-category="item">Items</button>
                <button class="category-button" data-category="skill">Skills</button>
                <button class="category-button" id="add-button">Add</button>
                <button class="category-button hidden" id="add-skill">Add Skill</button>
                <button class="category-button hidden" id="add-item">Add Item</button>
            </nav>
        </header>

        <main>
            <div id="input-section" class="hidden">
                <input type="text" id="user-heading" placeholder="Enter heading here">
                <textarea id="user-description" placeholder="Enter description here"></textarea>
                <br></br>
                <button id="submit-button">Submit</button>
            </div>

            <div id="user-input-container" class="hidden">
            </div>

            <div id="listing-container" class="listing-container">
            </div>
        </main>

        <div id="chat-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Chat with <span id="chat-user"></span></h2>
                <div id="chat-messages"></div>
                <input type="text" id="chat-input" placeholder="Type a message...">
                <button id="send-message">Send</button>
            </div>
        </div>

        <script src="home-script.js"></script>
    </body>
    </html>

    <script>
    const userFirstName = <?php echo json_encode($firstName); ?>;
    const userLastName = <?php echo json_encode($lastName); ?>;
    const fullName = `${userFirstName} ${userLastName}`;
    </script>