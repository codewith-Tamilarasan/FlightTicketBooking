const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../sequilize');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const List = require( '../../models/Ticketlist');
const BookedTickets  = require('../../models/BookedTickets');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

//user signup
app.post('/usersignup', async (req, res) => {
  const { email, name, password, id } = req.body;

 try {
    
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      console.log("user already found");
      return res.status(400);
    }
    const username = name;
    const newUser = await User.create({
      id,
      username,
      email,
      password,
    });

    console.log('User created:', newUser.toJSON());

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// admin signup
app.post('/adminsignup', async (req, res) => {
  const { email, name, password, id } = req.body;

  try {
    const existingAdmin = await Admin.findOne({
      where: { email: email },
    });

    if (existingAdmin) {
      console.log("Admin already found");
      return res.status(400).json({ error: 'Admin with this email already found' });
    }

    const adminname = name;
    
    const newAdmin = await Admin.create({
      id,
      adminname,
      email,
      password,
    });

    console.log("Admin created successfully");
    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//userlogin

app.post('/userlogin', async (req, res) => {
  const { email, password } = req.body;
  console.log("user is logging");

  try {

    const userFound = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (userFound) {
     
      res.status(200).json({ message: 'User found', user: userFound });
    } else {
      
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// admin login
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
 console.log("admin runing");
  try {
    const adminFound = await Admin.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (adminFound) {
      res.status(200).json({ message: 'Admin found', admin: adminFound });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// add a list

app.post("/addlist",async(req,res)=>{
  const { name, departtime, arrivaltime, from, to } = req.body;

 try{
  const addtolist = await List.create({
     name,
     departtime,
     arrivaltime,
     from,
     to
  })

  res.status(200).json({ message: 'Admin found', admin: adminFound });
 }

 catch(error)
 {
  console.log("error",error);
 }
})


// delete 

app.post("/deletelist",async(req,res)=>{
 const {name} = req.body;
 const deleteResult = await List.destroy({
  where: {
    name: name
  }


});

if(deleteResult)
{
  res.status(200);

}
else
{
  res.status(400);
}
})

// viewall

app.get("/viewall", async (req, res) => {
  try {
    const viewresponse = await List.findAll();
   console.log(viewresponse);
    res.status(200).json({ data: viewresponse, message: 'Data retrieved successfully' });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500)
  }
}); 


// // add a ticket based on userid
app.post('/bookTicket', async (req, res) => {
  try {
    const { useremail, flightname,flightid } = req.body;
    console.log('Request Body:', req.body);

    console.log("bookingg");
    const result = await BookedTickets.create({
      flightid:flightid,
      useremail: useremail,
      flightname: flightname,
      
    })

    res.status(200).json({ data:result,message:"booked successfully" })
  } catch (error) {
    res.status(201);
    console.log("error", error);
  }
});



// view my tickets


app.get("/viewmytickets", async (req, res) => {
  console.log("viewingg");
  try {
    const { useremail } = req.query;

    const viewmyticketsresponse = await BookedTickets.findAll({
      where: { useremail: useremail },
    });

    res.status(200).json({ data: viewmyticketsresponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// get flights based on flight id

app.get('/getflightdetails', async (req, res) => {
  try {
    const { flightIds } = req.query;
    const flightDetails = await getFlightDetails(flightIds);
    res.json({ data: flightDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getFlightDetails(flightIds) {
  try {
    const flightDetails = await List.findAll({
      where: {
        id: flightIds
      }
    });

    return flightDetails.map(entry => {
      return { flightId: entry.id, details: entry };
    });
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
}



sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Models synced with the database.');

    app.listen(PORT, async () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync models with the database:', error);
  });

