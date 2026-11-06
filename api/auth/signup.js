import { post } from "../_lib/http.js";
import { viaCrm } from "../_lib/crm.js";
export default post((req, res, b) => viaCrm(process.env.CRM_SIGNUP_URL, true, b, res), 20);
