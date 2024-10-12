import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// router.post('/registercmpny',isAuthenticated, registerCompany);
// router.get('/getcmpny', isAuthenticated, getCompany);
// router.get('/getcmpny/:id', isAuthenticated, getCompanyById);
// router.put('/updatecmpny/:id', isAuthenticated, updateCompany);

router.route("/registercompany").post(isAuthenticated, registerCompany); 
router.route("/getcompany").get(isAuthenticated, getCompany); 
router.route("/getcompanybyid/:id").get(isAuthenticated, getCompanyById); 
router.route("/updatecompany/:id").put(isAuthenticated, updateCompany); 
   
export default router;  



