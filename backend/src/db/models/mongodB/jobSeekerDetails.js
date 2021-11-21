import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
   
    profilePicture: String,
    resumes: [
        {
            url: String,
            name: string
        }
      ],
    coverLetters: [
        {
            url: String,
            name: string
        }
      ],
    contactNumber: String,
    address: {
        street: String,
        apt: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    savedJobs: [{
        jobId: String,
        jobTitle: String,
        companyId:    
            {   
                type: mongoose.Schema.Types.ObjectId,
                ref: "companyDetails"
            },
        companyName: String
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

const JobSeekerDetails = mongoose.model('jobSeekerDetails', jobSeekerSchema);

export default JobSeekerDetails;