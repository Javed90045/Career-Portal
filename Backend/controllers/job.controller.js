import { Job } from "../models/Job.model.js";


//---------------------------Post Job--------------------------------//
//Admin will create job
export const postJob = async (req, res) =>{
    try {
        const{title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId)
        {
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }

        let jobs = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_By:userId
        })

        return res.status(200).json({
            message:"New Job created successfully.",
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

//---------------------------Search All Job--------------------------------//
// Student will Find job
export const getAllJobs = async (req, res) =>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title: {$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1});
        if(!jobs)
        {
            return res.status(404).json({
                message:"Job Not Found",
                success:true
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
} 

//---------------------------Search Job By Id--------------------------------//
// Student wil find job by id
export const getJobById = async (req, res) =>{
    try {
        const jobId = req.params.id;

        const jobs = await Job.findById(jobId);
        if(!jobs)
        {
            return res.status(404).json({
                message:"Job Not Found",
                success:true
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
} 

//--------------------------- List Job Created By Admin --------------------------------//

export const getAdminJobs = async (req, res) =>{
    try {
        const adminId = req.id;

        const jobs = await Job.find({created_By:adminId});

        if(!jobs){
            return res.status(404).json({
                message: "Job Not Found",
                success: true
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

