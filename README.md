Password Generator API:

1. Open terminal and navigate to the backend folder using the command: 
'cd backend'

2. Install dependencies for the password generator API by running the command: 
'pip install -r requirements.txt'

3. Start the API by running the command: 
'uvicorn main:app --reload'

BitCoin Prices API:

1. Open another terminal window and navigate to the backend folder using the command: 
'cd backend'

2. Install required Node.js dependencies for the BitCoin Prices API: 
'npm install express axios'

3. Start the BitCoin Prices API by running the command: 
'node bitcoinPricesAPI.js'

React App:

1. Open another terminal window and navigate to the frontend folder using the command: 
'cd frontend'

2.  Install all the dependencies:
'npm install'

3. Start the React app:
'npm start'

4. Open a web browser and navigate to 'http://localhost:3000'

Testing React App:

1. Navigate to the frontend folder in your terminal.

2. Open the passwordGenerator.jsx and bitcoinPrices.jsx files located in the components folder.

3. Comment out the line import axios from 'axios' in both passwordGenerator.jsx and bitcoinPrices.jsx. This step is necessary to prevent network requests using Axios during testing, as it may interfere with the test results.

4. Run the command npm test in the terminal.

5. Once testing is complete, uncomment the import axios from 'axios' line in both passwordGenerator.jsx and bitcoinPrices.jsx files, and save the changes.