import React, { useState, useEffect } from "react";
import BookingForm from "../bookings/BookingForm";
import BookingSummary from "../bookings/BookingSummary";
import {
    FaUtensils,
    FaWifi,
    FaTv,
    FaWineGlassAlt,
    FaParking,
    FaCar,
    FaTshirt
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunction";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });
    const [booking, setBooking] = useState(null);
    const [payment, setPayment] = useState(0);
    const { roomId } = useParams();

    useEffect(() => {
        getRoomById(roomId)
            .then(response => {
                setRoomInfo(response);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [roomId]);

    const handleBookingUpdate = (bookingDetails, paymentAmount) => {
        setBooking(bookingDetails);
        setPayment(paymentAmount);
    };

    return (
        <div>
            <section className="container">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                     src={roomInfo.photo ? `data:image/png;base64,${roomInfo.photo}` : 'default-image-url'}
									 alt="Room photo"
									 style={{ width: "100%", height: "200px" }}
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Room Type:</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Price per night:</th>
                                            <td>${roomInfo.roomPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Service:</th>
                                            <td>
                                                <ul className="list-unstyled">
                                                    <li><FaWifi /> Wifi</li>
                                                    <li><FaTv /> Netflix Premium</li>
                                                    <li><FaUtensils /> Breakfast</li>
                                                    <li><FaWineGlassAlt /> Mini bar refreshment</li>
                                                    <li><FaCar /> Car Service</li>
                                                    <li><FaParking /> Parking Space</li>
                                                    <li><FaTshirt /> Laundry</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8 mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-6">
                                <BookingForm onBookingUpdate={handleBookingUpdate} />
                            </div>
                            <div className="col-md-6">
                                {booking && (
                                    <BookingSummary
                                        booking={booking}
                                        payment={payment}
                                        isFormValid={true}
                                        onConfirm={() => console.log('Booking confirmed')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <RoomCarousel />
                </div>
            </section>
        </div>
    );
};

export default Checkout;
