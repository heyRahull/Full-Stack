import Express from 'express';
import { Employee } from '../model/employee.model.js';

// 1. create employee record
export const createEmployee = async (req, res) => {
    try{
        const createdUser = await Employee.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully created Employee record",
            details: createdUser
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to create Employee record",
            error : err.message
        })
    }
}

// 2. Get All employees
export const getAllEmployees = async (req, res) => {
    try{
        const getEmployees = await Employee.find({});
        res.status(200).json({
            success: true,
            message: "Successfully fetched all Employees data",
            count: getEmployees.length,
            details: getEmployees
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to fetch all employees records",
            error: err.message
        })
    }
}

// 3. Update Employee record
export const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedEmployeeRecord = await Employee.findByIdAndUpdate(id,req.body ,{new:true});
        res.status(200).json({
            success: true,
            message: "Successfully updated employee details",
            details: updatedEmployeeRecord
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Not able to update Employee details",
            error: err.message
        })
    }
}

// 4. Delete Employee record
export const deleteEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteEmployeeRecord = await Employee.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted Employee record",
            details: deleteEmployeeRecord
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Not able to delete Employee record",
            error: err.message
        })
    }
}