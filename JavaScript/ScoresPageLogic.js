//stores the table data upon registration
function saveTableData() {
    // Retrieves the table data
    var table = document.getElementById("myTable");
    var tableData = [];

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var rank = row.cells[0].innerHTML;
        var playerName = row.cells[1].innerHTML;
        var rowScore = row.cells[2].innerHTML;

        tableData.push({ rank, playerName, score: rowScore });
    }

    // SaveS the table data in localStorage
    localStorage.setItem("tableData", JSON.stringify(tableData));
}



// Function to load the table data into the website, from local storage
function loadTableData() {
    // Get a reference to the table
    var table = document.getElementById("myTable");

    // Retrieve the table data from localStorage
    var tableData = localStorage.getItem("tableData");

    if (tableData) {
        tableData = JSON.parse(tableData);

        // Clear the table (excluding the header row)
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Populate the table with the stored data
        for (var i = 0; i < tableData.length; i++) {
            var row = table.insertRow(-1); // Add a new row at the end
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = tableData[i].rank;
            cell2.innerHTML = tableData[i].playerName;
            cell3.innerHTML = tableData[i].score;
        }
    }
}




// Function to add the user into the table (button)
function updatePlayerName() {
    // Retrieve the logged-in username from sessionStorage
    var loggedInUsername = sessionStorage.loggedInUsername;

    var userScore = sessionStorage.userScore || 0; // Default to 0 if not set

    // Get a reference to the table
    var table = document.getElementById("myTable");

    if (loggedInUsername) {
        // Check if the user already has a row in the table
        var existingRow = findUserRow(table, loggedInUsername);

        if (existingRow) {
            // If the user already has a row, update the score
            existingRow.cells[2].innerHTML = userScore;

            // Call the updateRanks function after updating the score
            updateRanks(table);
        } else {
            // If the user doesn't have a row, create a new row
            var newRow = table.insertRow(-1); // Use -1 to add a new row at the end

            // Create cells for rank, player name, and score
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);

            // Set the player name to the logged-in username
            cell2.innerHTML = loggedInUsername;

            // Set the score to the user's current score
            cell3.innerHTML = userScore;

            // Call the updateRanks function after adding a new score
            updateRanks(table);
        }

        // Save the updated table data in localStorage
        saveTableData();
    }
}



// Function to update the ranks based on scores
function updateRanks(table) {
    // Get the table data
    var tableData = [];

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var playerName = row.cells[1].innerHTML;
        var rowScore = parseInt(row.cells[2].innerHTML, 10);

        tableData.push({ playerName, score: rowScore, row: row });
    }

    // Sort the tableData based on scores (descending order)
    tableData.sort(function (a, b) {
        return b.score - a.score;
    });

    // Update the ranks and rearrange the rows in the table
    for (var i = 0; i < tableData.length; i++) {
        tableData[i].row.cells[0].innerHTML = (i + 1).toString();
        table.rows[i + 1].parentNode.insertBefore(tableData[i].row, table.rows[i + 1]);
    }
}



// Function to find the row for a specific user
function findUserRow(table, username) {
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        if (row.cells[1].innerHTML === username) {
            return row;
        }
    }
}

//Function to add the user score, each time they they get a new score from the game.
function addUserScore() {
    // Retrieve the logged-in username and score from sessionStorage
    var loggedInUsername = sessionStorage.loggedInUsername;
    var userScore = sessionStorage.userScore || 0; // Default to 0 if not set

    // Get a reference to the table
    var table = document.getElementById("myTable");

    if (loggedInUsername) {
        // Create a new row
        var newRow = table.insertRow(-1); // Use -1 to add a new row at the end

        // Create cells for rank, player name, and score
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        // Set the rank to be the next available rank
        cell1.innerHTML = table.rows.length.toString();

        // Set the player name to the logged-in username
        cell2.innerHTML = loggedInUsername;

        // Set the score to the user's current score
        cell3.innerHTML = userScore;

        // Call the updateRanks function after adding a new score
        updateRanks(table);

        // Save the updated table data in localStorage
        saveTableData();
    }
}
