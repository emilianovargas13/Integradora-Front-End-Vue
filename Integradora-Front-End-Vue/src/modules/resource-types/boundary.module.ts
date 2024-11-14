import { ResourceTypeController } from "./adapters/resource-types.controller";

const controller = new ResourceTypeController();
const findResourceTypeList = controller.getResourceTypeList;

export { 
    findResourceTypeList 
};