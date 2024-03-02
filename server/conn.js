import mongoose from "mongoose";

const Conn = async () => {
  try {
    const connt = await mongoose.connect(
      "mongodb+srv://adminHarsh:HrwpVRvyIseASjZ6@jobportal.bydqlj5.mongodb.net/"
    );
    if (connt) console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

export default Conn;
