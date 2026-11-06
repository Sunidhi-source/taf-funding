import { post } from "../_lib/http.js";
import { viaCrm } from "../_lib/crm.js";
export default post((req, res, b) => viaCrm(process.env.CRM_LOGIN_URL, false, b, res), 30);
