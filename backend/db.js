// const mongoose = require('mongoose');
// const mongoconnect= "mongodb+srv://gp73092:qwerty123@cluster0.tivkygg.mongodb.net/foodie?retryWrites=true&w=majority"
// const mongoConnector=async()=>{
//     await mongoose.connect(mongoconnect)
//     .then((success)=>{
//         console.log("connected")
//         // const fetch_data= mongoose.connection.db.collection("food_items");
//         // fetch_data.find({}).toArray(function(err,data){
//         //     if(err) console.log(err);
//         //     else console.log(data);
//         // })
//         const { MongoClient } = require('mongodb');
//         const mongoose1 = new MongoClient(mongoconnect);
//         const database = mongoose1.db('foodie')
//         const myc = database.collection('food_items')

//     // Querying data from the collection
//         const cursor=myc.find({});
//         cursor.toArray(function(err,data){
//                 console.log(data);
//                 global.food_items= document;
//           //       // console.log(global.food_items);
          
          
          
//               });
            
        

//     // Iterating over the results
//     // cursor.forEach(document => {
//     //   console.log(document);
//     // });
//     })
//     .catch(err=> console.log(err.message));

// }

// module.exports=mongoConnector;


// const mongoose = require("mongoose");

// const DB = "mongodb+srv://gp73092:qwerty123@cluster0.tivkygg.mongodb.net/foodie?retryWrites=true&w=majority";

// //Mongoose allows query filters to match multiple properties, 
// //even if they're not explicitly defined in the schema.
// mongoose.set('strictQuery', false)


// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log("MongoDB connected successfully");
//     // const fetched_data=await mongoose.connection.db.collection("food_items");
//     // fetched_data.find({}).toArray(function(err,data){
//     // if(err)console.log(err);
//     // else{
//     //     console.log(data);
//     //   }
//     // })
//     const { MongoClient } = require('mongodb');
//     const mongoose1 = new MongoClient(DB);
//     const database = mongoose1.db('foodie')
//     const myc = database.collection('food_items')

//     // Querying data from the collection
//     const cursor = myc.find({});
//     // global.cursor = myc.find({});

//     // Iterating over the results
//     await cursor.forEach(document => {
//       console.log(document);
//       global.food_items= document;
//       // console.log(global.food_items);



//     });
    



  
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;



// const mongoose = require("mongoose");

// const DB = "mongodb+srv://gp73092:qwerty123@cluster0.tivkygg.mongodb.net/foodie?retryWrites=true&w=majority";

// //Mongoose allows query filters to match multiple properties, 
// //even if they're not explicitly defined in the schema.
// mongoose.set('strictQuery', false)


// const connectDB = async () => {
//   try {
//      await mongoose.connect(DB,{useNewUrlParser: true}, async(err,result)=>{
//       if(err) console.log("---",err);
//       else{
//         console.log("connected")
//       }
//      })
    



  
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;








const mongoose = require("mongoose");
const {toArray} =require("underscore")

const DB = "mongodb+srv://gp73092:qwerty123@cluster0.tivkygg.mongodb.net/foodie?retryWrites=true&w=majority";

//Mongoose allows query filters to match multiple properties, 
//even if they're not explicitly defined in the schema.
mongoose.set('strictQuery', false)


const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB connected successfully");
    // const fetched_data=await mongoose.connection.db.collection("food_items");
    // fetched_data.find({}).toArray(function(err,data){
    // if(err)console.log(err);
    // else{
    //     console.log(data);
    //   }
    // })
    const { MongoClient } = require('mongodb');
    const mongoose1 = new MongoClient(DB);
    const database = mongoose1.db('foodie')
    const myc = database.collection('food_items')

    const cursor=await myc.find({}).toArray()
    // console.log(cursor)
    
    global.food_items=cursor;

    global.foodCategory=await database.collection('foodCategory').find({}).toArray();
    








    // // Querying data from the collection
    // const cursor = myc.find({});
    // // global.cursor = myc.find({});

    // // Iterating over the results
    // await cursor.forEach(document => {
    //   console.log(document);
    //   global.food_items= document;
    //   // console.log(global.food_items);



    // });
    



  
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;