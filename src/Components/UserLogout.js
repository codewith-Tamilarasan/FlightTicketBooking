import React, { useState, useEffect } from "react";
import { useAuth } from "./Authentication";
import { useNavigate } from "react-router";
import { Table, Button, Input } from 'antd';
import axios from "axios";

const { Search } = Input;

const UserLogout = () => {
    const authenticate = useAuth();
    const useremail = authenticate.mail;
    const navigate = useNavigate();
    const [bookedFlights, setBookedFlights] = useState([]);

    const handlebooking = async (flightname, id) => {
        try {
            const bookResponse = await axios.post("http://localhost:3000/bookTicket", {
                useremail: useremail,
                flightname: flightname,
                flightid: id
            });

            if (bookResponse.status===200) {
                alert("Ticket Booked");
            } else {
                console.log("Booking failed");
            }
        } catch (error) {
            console.error("Error booking ticket:", error);
        }
    };


    
    const handleViewMyTickets = async () => {
        try {
          const viewmyticketsresponse = await axios.get(`http://localhost:3000/viewmytickets?useremail=${useremail}`);
        
          const flightIds = viewmyticketsresponse.data.data.map(details => details.flightid);
          if (!Array.isArray(flightIds)) {
            console.error('flightIds is not an array');
            return;
          }
      
          const getflightdetails = await axios.get("http://localhost:3000/getflightdetails", {
            params: {
              flightIds: flightIds
            }
          });
      
          const flightDetails = getflightdetails.data.data; // Assuming your server returns flight details
      
          setBookedFlights(flightDetails); 
           console.log(bookedFlights);
        } catch (error) {
          console.log("Error fetching my tickets:", error);
        }
      };
      
    
    
    
    

    const handleLogout = () => {
        authenticate.logout('admin');
        navigate('/');
    };

    const handleviewall = async () => {
        try {
            const viewresponse = await axios.get("http://localhost:3000/viewall");
            if (viewresponse.status === 200 && Array.isArray(viewresponse.data.data)) {
                setDataSource(viewresponse.data.data);
                sessionStorage.setItem('flightData', JSON.stringify(viewresponse.data.data));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        handleviewall();
    }, []);

    useEffect(() => {
        handleViewMyTickets();
    }, []);

    const [dataSource, setDataSource] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value);
        sessionStorage.setItem('searchText', value);
    };

    const getFilteredData = () => {
        if (!dataSource) {
            return [];
        }
        return dataSource.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
    };

    const columns = [
        {
            title: 'Flight Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Departure Time',
            dataIndex: 'departtime',
            key: 'departtime',
        },
        {
            title: 'Arrival Time',
            dataIndex: 'arrivaltime',
            key: 'arrivaltime',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => handlebooking(record.name, record.id)}
                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                >
                    Book Ticket
                </Button>
            ),
        },
    ];

    const columns2 = [
        {
          title: 'Flight Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Departure Time',
          dataIndex: 'departtime',
          key: 'departtime',
        },
        {
          title: 'Arrival Time',
          dataIndex: 'arrivaltime',
          key: 'arrivaltime',
        },
        {
          title: 'From',
          dataIndex: 'from',
          key: 'from',
        },
        {
          title: 'To',
          dataIndex: 'to',
          key: 'to',
        },
      ];
      

 
    return (
        <div className="bg-black-700">
            <div className="border bg-gray-300 border-black-800 flex justify-center p-10 w:auto m-5 rounded-lg">
                <div className="border border-black-500 p-8 bg-gray-100 rounded-lg mr-20 hover:bg-green-800">
                    <h1 className="flex justify-center font-bold text-xl">Book To Fly</h1>
                </div>
                <div>
                    <h2 className="flex justify-center font-bold text-xl"> Welcome {useremail}</h2>
                </div>
                <div className="flex justify-start items-end px-10">
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={handleviewall}>View All Flight</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={handleLogout}>LogOut</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={handleViewMyTickets}>View My Tickets</button>
                    <Search
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 200, height: 40 }}
                    />
                </div>
            </div>

            <div className="flex justify-center border border-black-900 m-9 ">
                <Table
                    dataSource={getFilteredData()}
                    columns={columns}
                    onChange={handleTableChange}
                    pagination={{ position: ['topRight'] }}
                    onHeaderRow={(column) => ({
                        onClick: () => { },
                    })}
                    showSorterTooltip={false}
                    bordered
                    size="middle"
                    loading={dataSource === null}
                />
            </div>

            <div className="border border-blue-200 p-5 ml-80 mr-80 rounded-lg flex justify-center bg-blue-300 ">
                <h1>My Bookings</h1>

            </div>
            <div className="flex justify-center border border-black-900 m-9">
            {bookedFlights && bookedFlights.length > 0 ? (
  <Table
    dataSource={bookedFlights.map((details) => ({
      key: details.flightId,
      flightId: details.flightId,
      ...details.details,
      action: (
        <Button
          type="primary"
          onClick={() => handlebooking(details.details.name, details.details.id)}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Book Ticket
        </Button>
      ),
    }))}
    columns={columns2}
    pagination={{ position: ['topRight'] }}
    onHeaderRow={(column) => ({
      onClick: () => {},
    })}
    showSorterTooltip={false}
    bordered
    size="middle"
    loading={bookedFlights === null}
  />
) : (
  <p>No booked flights found.</p>
)}
</div>
          
        </div>
    );
};

export default UserLogout;
