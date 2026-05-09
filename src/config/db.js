const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error('❌ DNS SRV Lookup Failed');
      console.error('Solutions:');
      console.error('1. Use direct connection string (not +srv://) from MongoDB Atlas');
      console.error('2. Check if your ISP/network blocks DNS SRV lookups');
      console.error('3. Try a VPN if on restricted network');
    }
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('❌ Connection Refused - Check:');
      console.error('   1. MongoDB Atlas IP Whitelist (add your IP)');
      console.error('   2. Network connectivity');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
