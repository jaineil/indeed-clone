import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
    jobSeekerId: {type : String},
    profilePicture: 
        { type : String },
    resumes: [
        {
            url: { type : String },
            name: { type : String }
        }
      ],
    coverLetters: [
        {
            url: { type : String },
            name: { type : String }
        }
      ],
    contactNumber: { type : String },
    address: {
        street: { type: String },
        apt: { type: String },
        city: { type : String },
        state: { type : String },
        country: { type : String },
        zip: { type : String }
    },
    savedJobs: [{
        jobId: { type : String },
        jobTitle: { type : String },
        companyId:    
            {   
                type: mongoose.Schema.Types.ObjectId,
                ref: "companyDetails"
            },
        companyName: { type : String }
    }],
    // reviews: [{
    //     reviewId:
    //         {   
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "reviews"
    //         },
    //    companyId: 
    //    {   
    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: "companyDetails"
    //    }
    // }]


    
});

const JobSeekerDetails = mongoose.model('jobSeekerDetail', jobSeekerSchema);

export default JobSeekerDetails;